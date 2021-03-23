import Validator from "validator";
import isEmpty from "is-empty";

function validateRegisterInput(data) {
  let errors = {};

  if (!data.email) errors.email = "Email is required field";
  else if (!data.pass) errors.pass = "Password is required field";
  else {
    let { email, pass } = data;

    email = !isEmpty(email) ? email : "";
    pass = !isEmpty(pass) ? pass : "";

    if (Validator.isEmpty(pass)) errors.pass = "Password field is required";

    if (Validator.isEmpty(email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(email)) {
      errors.email = "Email is invalid";
    }
    if (!Validator.isLength(pass, { min: 6, max: 30 }))
      errors.pass = "Password must be at least 6 characters and max 30";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default validateRegisterInput;
