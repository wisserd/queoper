const { Pool } = require('pg');

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Helper function to execute queries
const query = async (text, params) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
};

// OnPurpose Platform Database Functions
export const handler = async (event, context) => {
  const { httpMethod, path, body } = event;
  
  try {
    // Parse request body if present
    const data = body ? JSON.parse(body) : {};
    
    switch (httpMethod) {
      case 'GET':
        return await handleGet(path, event.queryStringParameters);
      case 'POST':
        return await handlePost(path, data);
      case 'PUT':
        return await handlePut(path, data);
      case 'DELETE':
        return await handleDelete(path, event.queryStringParameters);
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('Database function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

// GET handlers
async function handleGet(path, params) {
  if (path.includes('/hosts')) {
    return await getHosts(params);
  } else if (path.includes('/users')) {
    return await getUsers(params);
  } else if (path.includes('/bookings')) {
    return await getBookings(params);
  }
  
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Endpoint not found' })
  };
}

// Host functions
async function getHosts(params) {
  const { category, status = 'approved' } = params || {};
  
  let query = `SELECT * FROM hosts WHERE status = $1`;
  let queryParams = [status];
  
  if (category) {
    query += ` AND category = $2`;
    queryParams.push(category);
  }
  
  const hosts = await sql(query, queryParams);
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ hosts })
  };
}

// User functions
async function getUsers(params) {
  const { id } = params || {};
  
  if (id) {
    const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ user })
    };
  }
  
  const users = await sql`SELECT id, email, name, created_at FROM users ORDER BY created_at DESC LIMIT 50`;
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ users })
  };
}

// Booking functions
async function getBookings(params) {
  const { hostId, userId, status } = params || {};
  
  let query = `SELECT * FROM bookings WHERE 1=1`;
  let queryParams = [];
  let paramIndex = 1;
  
  if (hostId) {
    query += ` AND host_id = $${paramIndex}`;
    queryParams.push(hostId);
    paramIndex++;
  }
  
  if (userId) {
    query += ` AND user_id = $${paramIndex}`;
    queryParams.push(userId);
    paramIndex++;
  }
  
  if (status) {
    query += ` AND status = $${paramIndex}`;
    queryParams.push(status);
    paramIndex++;
  }
  
  query += ` ORDER BY created_at DESC`;
  
  const bookings = await sql(query, queryParams);
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ bookings })
  };
}

// POST handlers
async function handlePost(path, data) {
  if (path.includes('/hosts')) {
    return await createHost(data);
  } else if (path.includes('/users')) {
    return await createUser(data);
  } else if (path.includes('/bookings')) {
    return await createBooking(data);
  }
  
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Endpoint not found' })
  };
}

// Create host application
async function createHost(data) {
  const { name, email, category, description, rate, experience } = data;
  
  const [host] = await sql`
    INSERT INTO hosts (name, email, category, description, rate, experience, status, created_at)
    VALUES (${name}, ${email}, ${category}, ${description}, ${rate}, ${experience}, 'pending', NOW())
    RETURNING *
  `;
  
  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ host, message: 'Host application submitted successfully' })
  };
}

// Create user
async function createUser(data) {
  const { name, email, phone } = data;
  
  const [user] = await sql`
    INSERT INTO users (name, email, phone, created_at)
    VALUES (${name}, ${email}, ${phone}, NOW())
    RETURNING *
  `;
  
  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ user, message: 'User created successfully' })
  };
}

// Create booking
async function createBooking(data) {
  const { hostId, userId, date, time, duration, totalAmount } = data;
  
  const [booking] = await sql`
    INSERT INTO bookings (host_id, user_id, date, time, duration, total_amount, status, created_at)
    VALUES (${hostId}, ${userId}, ${date}, ${time}, ${duration}, ${totalAmount}, 'pending', NOW())
    RETURNING *
  `;
  
  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ booking, message: 'Booking created successfully' })
  };
}

// PUT and DELETE handlers (placeholder)
async function handlePut(path, data) {
  return {
    statusCode: 501,
    body: JSON.stringify({ error: 'PUT method not implemented yet' })
  };
}

async function handleDelete(path, params) {
  return {
    statusCode: 501,
    body: JSON.stringify({ error: 'DELETE method not implemented yet' })
  };
}
