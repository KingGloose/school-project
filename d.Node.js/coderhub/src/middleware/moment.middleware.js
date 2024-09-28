const errorType = require("../constants/error-types");

const ContentIsNull = async (context, next) => {
  const { content } = context.request.body;

  if (!content || content == "") {
    const error = new Error(errorType.CONTENT_IS_NULL);
    return context.app.emit("error", error, context);
  }

  await next();
};

module.exports = {
  ContentIsNull,
};
