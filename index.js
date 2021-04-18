const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

const usersRoute = require('./routes/users-route');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.json({ success: { id: 1, email: 'asfasf@asfasf.com' } })
})
app.use('/bank/users', usersRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`application start at ${5000}`);
})
