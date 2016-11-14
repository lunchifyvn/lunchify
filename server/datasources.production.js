module.exports = {
  db: {
    name: 'db',
    connector: 'mongodb',
    url: process.env.DB_MONGO_URL,
  },
};

