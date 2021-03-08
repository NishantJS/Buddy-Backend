import Validator from "validator";
import isEmpty from "is-empty";

const validateLoginInput = ({ email, pass }) => {
  let errors = {};
  if (!email) errors.email = "Email is missing";
  else if (!pass) errors.pass = "Password is missing";
  else {
    email = !isEmpty(email) ? email : "";
    pass = !isEmpty(pass) ? pass : "";

    if (Validator.isEmpty(pass)) errors.pass = "Password field is required";

    if (Validator.isEmpty(email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(email)) {
      errors.email = "Email is invalid";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginInput;
