// Node server
// nodemon watches for changes

const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient; Do I need this? Erase
const cors = require('cors');
const mongodb = require('./db/connect');
// const indexRoutes = require('./routes'); Do I need this? Erase

const port = process.env.PORT || 8080
const app = express();

// Use the routes
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );

    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
  .use(cors({ origin: '*'}));
// app.use('/index', indexRoutes); Do I need this? Erase
   // localhost:3000/index


// app.use('/', require('./routes/user'));
// localhost:8080/

// Added Errorhandling for L06 -- logs to a file so you can see what the errors (if any) are
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on port ${port}`)
    }
}); 

// OAuth
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Check to see if someone is logged in
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(json.stringify(req.oidc.user));
})

app.use('/', require('./routes'));





// const express = require('express');
// const cors = require('cors');
// const app = express();

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app
//   .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
//   // .use(cors()) Erase
//   .use(express.json())
//   .use(express.urlencoded({ extended: true }))
//   .use('/', require('./routes/game'))
//   .use('/', require('./routes/user'))

//   // Added from teacher Erase comment
//   .use((req, res, next) => {
//     res.setHeader("Access-Controll-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
//     );

//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "POST, GET, PUT, PATCH, OPTIONS, DELETE"
//     );
//     next();
//   })
//   .use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
//   .use(cors({ origin: '*'}));
//   // *******************************

// // Added Errorhandling for L06 -- logs to a file so you can see what the errors (if any) are
// process.on('uncaughtException', (err, origin) => {
//   console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);  
// });  

// const db = require('./models/server');
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connected to the database!');
//   })
//   .catch((err) => {
//     console.log('Cannot connect to the database!', err);
//     process.exit();
//   });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });