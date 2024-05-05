module.exports = (message, code = 400) => {
  const err = new Error(message || "something went wrong");
  err.code = code;
  return err;
};
