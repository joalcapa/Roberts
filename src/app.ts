import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hi world!');
});

app.listen(port, () => {
    return console.log(`Server is running in port ${port}`);
});
