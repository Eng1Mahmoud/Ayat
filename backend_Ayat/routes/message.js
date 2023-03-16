const { MessageUser } = require("../controlars/message");

const RoutesMessage = (app) => {
  app.post("/contact", MessageUser);
};

module.exports = RoutesMessage;
