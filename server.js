const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/dist', '/index.html'));
});

app.listen(PORT, function () {
  console.log(`App listen port - ${PORT}!`);
}); 