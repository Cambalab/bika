var config = {};

config.app = {
};

config.redis = {
  url: process.env.REDISCLOUD_URL || 'redis://localhost:6379',
};

config.addDefaultValues = process.env.ADD_DEFAULT_VALUES || 0;

config.store = {
  auths: 'auths',
  next_id: 'next_id',
  bicicleteriasGeoSet: 'bicicleteriasGeoSet',
  bicicleteriasStr: 'bicicleteriasStr',
  bicicleteriasSet: 'bicicleteriasSet'
};

module.exports = config;
