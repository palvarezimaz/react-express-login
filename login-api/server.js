const express = require('express');
const app = express();
const logger = require('./middlewares/logger');

const port = 3001;

const userData = {
  userEmail: 'test@company.xyz',
  userPassword: 'test',
};

let isUserLogged = false;

app.listen(port, () =>
  console.log(
    `The server for is listening on port ${port}`
  )
);

app.use(logger);

app.use(express.json());

app.get('/', (req, res) => res.send(new Date()));

app.post('/login', (req, res) => {
  const { userEmail, userPassword } = req.body;

  console.log('Someone is trying to log in');

  if (
    userEmail === userData.userEmail &&
    userPassword === userData.userPassword
  ) {
    isUserLogged = true;
    res.json({ isUserLogged });
    console.log('ok creds on server');
  } else {
    isUserLogged = false;
    res.json({ error: 'Incorrect credentials' });
    console.log('wrong creds on server');
  }
});

app.put('/logout', (req, res) => {
  isUserLogged = false;
  console.log('user has logged out');
});
