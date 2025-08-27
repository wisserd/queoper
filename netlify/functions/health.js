import { neon } from '@netlify/neon';

// Initialize Neon database connection
const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

export const handler = async (event, context) => {
  try {
    // Test database connection
    const [result] = await sql`SELECT NOW() as current_time, 'OnPurpose Platform' as platform`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        status: 'healthy',
        platform: 'OnPurpose - Connection, Not Dating',
        database: 'connected',
        timestamp: result.current_time,
        environment: process.env.NODE_ENV || 'development'
      })
    };
  } catch (error) {
    console.error('Health check failed:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        status: 'unhealthy',
        platform: 'OnPurpose - Connection, Not Dating',
        database: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
