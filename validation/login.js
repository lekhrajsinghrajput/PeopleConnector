const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = validateLoginInput = data => {
  const errors = {};
  console.log(data);
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field can't be empty";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field can't be empty";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
