if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/small-utils.min.js")
}else {
  module.exports = require("./dist/small-utils.js")
}