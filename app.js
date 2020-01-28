const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/getTariffs', async (req, res) => {
  const response = await fetch('http://frontend.usdev.ru/tarif.csv')
      .catch(err => {
        console.log(err);
        res.status(200).send({'status': false, 'msg': err.message});
      });
  let tariffs = await response.text();

  tariffs = tariffs.split('\n').map(t => t.split(',')).filter(t => t[0] !== '');
  const headers = tariffs.shift();

  tariffs = tariffs.map(t => {
    const r = {};
    headers.forEach((h, i) => r[h] = t[i]);
    return r;
  });

  res.send({'status': 'OK', tariffs});
});

app.use(express.static('public'));
app.use((req, res) => {
  res.status(404).send('404. Страница не существует');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту.`);
});
