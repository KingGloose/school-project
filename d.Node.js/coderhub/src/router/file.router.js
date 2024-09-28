const Router = require("koa-router");
const fileRouter = new Router({ prefix: "/upload" });

const bodyParser = require("koa-bodyparser");

const { verifyAuth } = require("../middleware/auth.middleware");
const {
  AvaterInfo,
  PictrueInfo,
  GetPrictrue,
} = require("../controller/file.controller");
const {
  AvaterUpload,
  PrictureUpload,
  prictrueResize,
} = require("../middleware/file.middleware");

/*
   1.
*/
fileRouter.post("/avater", verifyAuth, AvaterUpload, AvaterInfo);

/*
   2.
*/
fileRouter.post(
  "/pictrue",
  verifyAuth,
  PrictureUpload,
  prictrueResize,
  bodyParser(),
  PictrueInfo
);

fileRouter.get("/pictrue/:id", GetPrictrue);

module.exports = fileRouter;
