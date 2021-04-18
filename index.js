const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

const usersRoute = require('./routes/users-route');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/bank/users', usersRoute);

app.listen(process.nextTick.PORT || port, () => {
  console.log(`application start at ${port}`);
})
