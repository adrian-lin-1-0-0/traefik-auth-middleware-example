const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    return res.status(200).json({ message: 'health' });
});

app.post('/auth/login', (req, res) => {
    console.log('/login');
    const { username, password } = req.body;
    
    if (username === 'adrian' && password === 'pass') {
        const token = jwt.sign({ username }, JWT_SECRET);
        return res.status(200).json({ token });
    }
    
    return res.status(400).json({ message: 'invalid credentials' });
});


app.get('/auth/valid', (req, res) => {
    console.log('/valid');
    const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'no token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = decoded.username;
    console.log(200);
    res.set('X-Auth-User', user);

    return res.status(200).json({ message: 'token is valid' });
  } catch (error) {
    console.log(401);
    return res.status(401).json({ message: 'token is not valid' });
  }
});

app.listen(80, () => {
  console.log('auth server is running on port 3000');
});
