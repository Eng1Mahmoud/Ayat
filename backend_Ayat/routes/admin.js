const { Login, replay, SendMessageToUser,getAllUsers } = require("../controlars/admin");
const authMiddleware = require("../controlars/auth");

const adminRoutes = (app) => {
  app.post("/login", Login);
  app.post("/sendMessageToUser", authMiddleware, SendMessageToUser);
  app.post("/replay", authMiddleware, replay);
  app.get("/AllUser", authMiddleware, getAllUsers);
};

module.exports = adminRoutes;
