const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.raw({ type: 'application/json' }));

app.get('/', (req, res) => res.send('Hello Railway!'));

// Generic webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('Webhook received:', {
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString()
  });
  
  res.status(200).json({
    status: 'success',
    message: 'Webhook received',
    timestamp: new Date().toISOString()
  });
});

// Stripe webhook endpoint
app.post('/webhook/stripe', (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  console.log('Stripe webhook received:', {
    signature: sig,
    body: req.body,
    timestamp: new Date().toISOString()
  });
  
  res.status(200).json({
    status: 'success',
    message: 'Stripe webhook received',
    timestamp: new Date().toISOString()
  });
});

// SendGrid webhook endpoint
app.post('/webhook/sendgrid', (req, res) => {
  console.log('SendGrid webhook received:', {
    body: req.body,
    timestamp: new Date().toISOString()
  });
  
  res.status(200).json({
    status: 'success',
    message: 'SendGrid webhook received',
    timestamp: new Date().toISOString()
  });
});

// Generic POST endpoint for testing
app.post('/api/webhook', (req, res) => {
  console.log('API webhook received:', {
    body: req.body,
    query: req.query,
    timestamp: new Date().toISOString()
  });
  
  res.status(200).json({
    status: 'success',
    message: 'API webhook processed',
    received: req.body,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📡 Webhook endpoints available:`);
  console.log(`   - POST /webhook`);
  console.log(`   - POST /webhook/stripe`);
  console.log(`   - POST /webhook/sendgrid`);
  console.log(`   - POST /api/webhook`);
});
