import express from 'express';

const app = express();

app.use((req, res, next) => {
  // Resolving CORS problems by accepting * as origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/hello', (req, res) => {
  res.status(200).end();
});

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
