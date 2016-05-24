'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  getRover,
  postRover,
  putRover,
  deleteRover
} = require('./rover_controller');
const {
  badRequest,
  genericError,
  pageNotFound
} = require('./error_middleware');
const app = express();

// Cors.
app.use(cors());

// Handle JSON requests.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Treat the build/ folder as the root of the server for static assets.
app.use('/', express.static(`${ __dirname }/../build`));

// Hitting the root will launch the front-end client.
app.get('/', function (req, res) {
  res.render('index');
});

// Rover API.
app.use('/', router.route('/rover')
  .get(getRover)
  .post(postRover)
  .put(putRover)
  .delete(deleteRover));

// Error handlers.
app.use([badRequest, genericError, pageNotFound]);

// Start server on environment PORT, or 3000 if none specified.
const server = app.listen((process.env.PORT || 3000)), function () {
  console.log(`Server started on port ${ server.address().port }`);
});
