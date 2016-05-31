var config = require('./config');
var async = require('async');
var Q = require('q');
var _ = require('lodash');
var bicicleterias = require('./mock-bicicleterias').data;

// Set up connection to Redis
var redis_conn = require("redis");
var redis = redis_conn.createClient(config.redis.url, {detect_buffers: true, no_ready_check: false});

redis.on("error", function (err) {
  console.log("Error: " + err);
  process.exit(-1);
});

redis.on("ready", function () {
  var version = redis.server_info.redis_version;
  if(version[0] <= 3 && version[1] < 1) {
    console.log('Error: Must have redis >= 3.2');
    process.exit(-1);
  }

  var add = function(data)  {
    var dataStr = JSON.stringify(data);
    exports.addBicicleteria(dataStr).then(
      function(res) {
        console.log('Loading bicicleterias', data);
        exports.addBicicleteriaGeo(res, data.lng, data.lat);
      }
    );
  };

  if(config.addDefaultValues) {
    _.forEach(bicicleterias, add);
  }

});

// get user id if exists otherwise create user
exports.findUser = function(token) {
  var nextId = config.store.next_id + ':' + 'user';
  var deferred = Q.defer();

  redis.hget(config.store.auths, token, function(err, reply) {
    if(err) {
     deferred.reject(err);
     return;
    }
    if(reply === null) {
      redis.incr(nextId, function(err, reply) {
        if(err) {
          deferred.reject(err);
          return;
        }
        redis.hset(config.store.auths, token, reply, function(err, reply) {
          if(err) {
            deferred.reject(err);
            return;
          }
          deferred.resolve(reply);
        });
      });
    } else {
      deferred.resolve(reply);
    }
  });

  return deferred.promise;
};

exports.addBicicleteriaGeo = function(location, lng, lat, userId) {
  var dfd = Q.defer();
  var bicicleteriasGeoSet = config.store.bicicleteriasGeoSet;
  var geoArgs = [ bicicleteriasGeoSet, lng, lat, location ];
  redis.geoadd(geoArgs, function (err, reply) {
    if(err) {
      dfd.reject(err);
      return;
    }
    return dfd.resolve(reply);
  });

  return dfd.promise;
};

exports.findById = function(id) {
  var res = null;
  var bicicleteria = config.store.bicicleteriasStr + ':' + id;
  var dfd = Q.defer();
  redis.get(bicicleteria, function (err, reply) {
    if(err) {
      dfd.reject(err);
      return;

    }

    if(reply) {
      res = _.extend(JSON.parse(reply) , { id: id });
    }

    return dfd.resolve(res);
  });

  return dfd.promise;
};

exports.findLocationsByMember = function(member, radius, unit, userId) {
  var bicicleteriasGeoSet = config.store.bicicleteriasGeoSet;
  var geoArgs = [ bicicleteriasGeoSet, member, radius, unit ];
  var deferred = Q.defer();

  redis.georadiusbymember(geoArgs, function(err, response) {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(response);
    }
  });

  return deferred.promise;
};

exports.findBicicleterias = function(long, lat, radius, unit, userId) {
  var dfd = Q.defer();
  exports.findLocationsByCoords(long, lat, radius, unit, userId).then(
    function(res) {
      Q.all( _.map(res, exports.findById)).then(
        function(res) {
          dfd.resolve(res);
        }
      );
    }
  );
  return dfd.promise;
};

exports.findLocationsByCoords = function(long, lat, radius, unit, userId) {
  var bicicleteriasGeoSet = config.store.bicicleteriasGeoSet;
  var geoArgs = [ bicicleteriasGeoSet, long, lat, radius, unit ];
  var deferred = Q.defer();

  redis.georadius(geoArgs, function(err, response) {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(response);
    }
  });

  return deferred.promise;
};

exports.findLocationPos = function(member, userId) {
  var bicicleteriasGeoSet = config.store.bicicleteriasGeoSet;
  var geoArgs = [ bicicleteriasGeoSet, member ];
  var deferred = Q.defer();

  redis.geopos(geoArgs, function(err, response) {
    if(err) {
      deferred.reject(err);
    } else {
      var obj = {};
      if(_.every(response, Boolean)) {
        obj = { member: member, long: response[0][0], lat: response[0][1] };
      }
      deferred.resolve(obj);
    }
  });

  return deferred.promise;
};

exports.addBicicleteria = function(data) {
  var bicicleteriasSet = config.store.bicicleteriasSet;
  var bicicleteriasStr = config.store.bicicleteriasStr;
  var nextId = config.store.next_id + ':' + 'bicicleterias';
  var dfd = Q.defer();

  redis.incr(nextId, function(err, id) {
    if(err) {
      dfd.reject(err);
      return;
    }

    bicicleteriasStr = bicicleteriasStr + ':' + id;
    redis.set(bicicleteriasStr, data, function(err, response) {
      if(err) {
        dfd.reject(err);
        return;
      }

      redis.sadd(bicicleteriasSet, id, function (err, reply) {
        if(err) {
          dfd.reject(err);
          return;
        }
        return dfd.resolve(id);
      });
    });
  });

  return dfd.promise;
};
