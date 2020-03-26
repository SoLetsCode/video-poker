// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "rootroot",
      database: "videopoker_db",
      charset: "utf8",
      insecureAuth: true
    }
  },
  production: {
    client: "mysql",
    connection: process.env.JAWSDB_URL
  }
};
