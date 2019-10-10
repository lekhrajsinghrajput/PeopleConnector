const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = validateRegisterInput = data => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 to 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field can't be empty";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field can't be empty";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field can't be empty";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 to 30 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Password must match";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
