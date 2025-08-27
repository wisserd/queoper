import { neon } from '@netlify/neon';

// Initialize Neon database connection
const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

export const handler = async (event, context) => {
  const { httpMethod, path } = event;
  
  // Handle CORS preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: ''
    };
  }
  
  try {
    // API info endpoint
    if (path === '/.netlify/functions/api' || path === '/api') {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          platform: 'OnPurpose - Connection, Not Dating',
          version: '1.0.0',
          status: 'operational',
          endpoints: {
            health: '/.netlify/functions/health',
            hosts: '/.netlify/functions/database?path=/hosts',
            users: '/.netlify/functions/database?path=/users',
            bookings: '/.netlify/functions/database?path=/bookings'
          },
          database: 'Neon PostgreSQL',
          hosting: 'Netlify',
          pilot: {
            location: 'NYC',
            target_hosts: 50,
            categories: [
              'Local Experts',
              'Cultural Guides', 
              'Wellness Coaches',
              'Creative Mentors',
              'Professional Networkers'
            ]
          }
        })
      };
    }
    
    // Test database connection for API endpoint
    const [dbTest] = await sql`SELECT 'OnPurpose API Connected' as message, NOW() as timestamp`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: dbTest.message,
        timestamp: dbTest.timestamp,
        platform: 'OnPurpose NYC Pilot',
        status: 'live'
      })
    };
    
  } catch (error) {
    console.error('API function error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'API temporarily unavailable',
        platform: 'OnPurpose',
        status: 'error'
      })
    };
  }
};
