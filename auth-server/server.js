const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Use the promises version for async/await

const app = express();
const PORT = process.env.PORT || 3080;
const cors = require('cors');


// Use the cors middleware
app.use(cors());

console.log('test**********')
// Middleware
app.use(bodyParser.json());

const dbFilePath = './users.json'; // Path to the JSON file

// Initialize the user database (create the file if it doesn't exist)
const initializeDatabase = async () => {
  try {
    await fs.access(dbFilePath);
  } catch (error) {
    // File doesn't exist, create an empty array
    await fs.writeFile(dbFilePath, '[]');
  }
};

// Registration endpoint
app.post('/api/register', async (req, res) => {
    console.log(req)
  const { email, password, firstName, lastName } = req.body;

  // Basic validation (you should add more robust validation)
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required.' });
  }

  // Load existing users from the file
  const users = JSON.parse(await fs.readFile(dbFilePath));

  // Check if the email already exists
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'email already exists.' });
  }

  // Save the user (you should hash the password before saving it)
  const newUser = { email, password, firstName, lastName };
  users.push(newUser);

  // Save the updated users array back to the file
  await fs.writeFile(dbFilePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'success' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Load existing users from the file
  const users = JSON.parse(await fs.readFile(dbFilePath));

  // Find the user by email and check the password (you should compare hashed passwords)
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  res.json({ message: 'success', firstName: user.firstName, lastName: user.lastName});
});

// Start server
const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

app.post('/api/accountExists', async (req, res) => {
    const { email } = req.body;
  
    // Load existing users from the file
    const users = JSON.parse(await fs.readFile(dbFilePath));
  
    // Check if the email exists in the user list
    const accountExists = users.some(user => user.email === email);
  
    res.json({ accountExists });
  });

  // Verify token endpoint
app.post('/api/verify', async (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(400).json({ error: 'Token is required.' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
  
      // If verification is successful, you can send additional information if needed
      res.json({ verified: true, user: decoded });
    } catch (error) {
      // Token verification failed
      res.status(401).json({ error: 'Invalid token.' });
    }
  });

startServer();