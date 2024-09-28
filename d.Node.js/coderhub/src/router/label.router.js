const Router = require("koa-router");
const LabelRouter = new Router({ prefix: "/label" });

const { create, addLabel, list } = require("../controller/label.controller");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");

/*
   1.verifyAuth
   2.create
*/
LabelRouter.post("/", verifyAuth, create);

/*
   1.
*/
LabelRouter.post(
  "/labels/:momentId",
  verifyAuth,
  verifyPermission("moment"),
  verifyLabelExists,
  addLabel
);

/*
  1.
*/
LabelRouter.get("/", verifyAuth, list);


module.exports = LabelRouter;
