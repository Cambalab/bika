var BICICLETERIAS = require('./mock-bicicleterias').data;
var redis = require('./redis-backend');

function findNear(req, res, next) {
  var lat = req.query.lat;
  var lng = req.query.lng;

  if(!lat && !lng) {
    return res.json({"status" : "error", "message" : 'Lat or Lng not sent.'});
  }

  redis.findBicicleterias(lng, lat, 2, 'km')
    .then( function(result) { res.json({"status" : "success", "result" : result }); })
    .fail( function(err) { res.json({"status" : "error", "message" : err}); });
}

function findById(req, res, next) {
  var id = req.params.id;

  if(!id) {
    return res.json({"status" : "error", "message" : 'Id not sent.'});
  }

  redis.findById(id)
    .then( function(result) { res.json({"status" : "success", "result" : result }); })
    .fail( function(err) { res.json({"status" : "error", "message" : err}); });
}

exports.findNear = findNear;
exports.findById = findById;
