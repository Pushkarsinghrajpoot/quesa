const app = require('./app');
const { connectDB } = require('./config/db');

// Load environment variables
require('dotenv').config();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
