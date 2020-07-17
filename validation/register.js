const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  if (!Validator.matches(data.username, /^[^<>%$\\/";&]*$/)) {
    errors.username =
      "Username can't contain special characters: < > \\ / % $ \" ; &";
  }
  if (!Validator.isLength(data.username, { min: 3, max: 50 })) {
    errors.username = "Username must be 3-50 characters long";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (
    !Validator.matches(
      data.password,
      /^(?=.*[A-Za-z.])(?=.*\d)[A-Za-z\d.]{6,20}$/
    )
  ) {
    errors.password =
      "Password must be 6-20 characters long and must contain alphanumeric characters including at least 1 letter and 1 number. It may contain dots.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
