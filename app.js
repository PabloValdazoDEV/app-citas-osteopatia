const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan')
const methodOverride = require('method-override');
const { create } = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: 'views/partials',
    helpers: require('./utils/helpers')
});
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: process.env.SECRET_KEY || 'clave_secreta',
    resave: false,
    saveUninitialized: false
}));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  
  app.use(
    session({
      store: new pgSession({
        pool: pool,
        tableName: 'Session',
      }),
      secret: process.env.SESSION_SECRET || 'SECRET',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: 'strict',
      },
    })
  );
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

const router = require('./router');
app.use('/', router);

app.listen(PORT,()=>{
    console.log(`El servidor esta activo y esta escuchando por el puerto ${PORT}`)
})