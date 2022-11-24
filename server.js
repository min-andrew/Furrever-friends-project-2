const path = require('path');
const express = require('express');
const session = require('express-session');
const hb = require('express-handlebars');
const apiRoutes = require('./controllers');
const util = require('./utils/helpers');
//deciding a npm to use
//const doggy = require('')

//sequlize connection
const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

//setup express and port with env(secured)
const app = express();
const PORT = process.env.PORT || 3001;

const hbjs = hb.create({ util })

const cookie = {
    secret: 'browser history cookie',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
      db: sequelize
    })
  };
  
app.use(session(cookie));

app.engine('handlebars', hbjs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(apiRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
