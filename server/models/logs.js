const bookshelf = require("../bookshelf");

const Logs = bookshelf.model("Logs", {
  tableName: "logs",
  inventories: function() {
    return this.belongsTo("User");
  }
});

module.exports = Logs;
