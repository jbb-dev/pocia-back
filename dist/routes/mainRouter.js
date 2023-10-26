const express = require('express');
const mainRouter = express.Router();
const mainController = require("../controllers/mainController");
mainRouter
    .get("/chat", mainController.getConversation)
    .post("/chat", mainController.chatWithAssistant);
module.exports = mainRouter;
//# sourceMappingURL=mainRouter.js.map