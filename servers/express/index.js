const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.all('/', (req, res) => {
  console.log('Just got a request!');
  res.send('Yo!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
