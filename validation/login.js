const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  if (!Validator.matches(data.username, /^[^<>%$\\/";&]*$/)) {
    errors.username = 'Special characters are not allowed: < > \\ / % $ " ; &';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.matches(data.password, /^[^<>%$\\/";&]*$/)) {
    errors.password = 'Special characters are not allowed: < > \\ / % $ " ; &';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
