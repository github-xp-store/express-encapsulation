const redis = require('redis');

const set = (key, value, time) => {
  const client = redis.createClient();
  client.set(key, value);
  client.expire(key, time || 3600 * 24);
  client.quit();
};

const get = (key) =>
  new Promise((resolve, reject) => {
    const client = redis.createClient();
    client.get(key, (err, response) => {
      client.quit();
      if (err) reject(err);
      else resolve(response);
    });
  });

const del = (key) => {
  const client = redis.createClient();
  client.del(key);
  client.quit();
};

const keys = (key, type) =>
  new Promise((resolve, reject) => {
    const client = redis.createClient();
    const _key = type ? `*#${key}` : `${key}#*`;
    client.keys(_key, (err, response) => {
      client.quit();
      if (err) reject(err);
      else resolve(response[0]);
    });
  });

module.exports = {
  set,
  get,
  del,
  keys,
};
