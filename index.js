const express = require('express');
const app = express();
require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
    extended: true
  }));

const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/healthifyRoutes');
app.use('/', router);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.warn(`App listening on http://localhost:${PORT}`);
});