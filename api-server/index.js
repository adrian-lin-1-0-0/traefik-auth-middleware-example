const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/hello', (req, res) => {
    console.log('/hello')
    console.log(JSON.stringify(req.headers));
    return res.status(200).json({ message: 'hello world' });
});

app.get('/health', (req, res) => {
    console.log('/health')
    return res.status(200).json({ message: 'health' });
});

app.listen(80, () => {
    console.log('api server is running on port 3001');
});