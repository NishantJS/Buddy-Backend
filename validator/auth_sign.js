import isEmail from "validator/lib/isEmail.js";
import isLength from "validator/lib/isLength.js";
import isEmpty from "validator/lib/isEmpty.js";

const validateAuthInput = ({ email, pass }) => {
  let errors = "";

  if (!email) errors = "Email is required field";
  else if (!pass) errors = "Password is required field";
  else {
    if (isEmpty(pass)) errors = "Password field is required";

    if (isEmpty(email)) {
      errors = "Email field is required";
    } else if (!isEmail(email)) {
      errors = "Email is invalid";
    }
    if (!isLength(pass, { min: 6, max: 30 }))
      errors = "Password must be at least 6 characters and max 30";
  }
  return {
    errors,
    isValid: !errors,
  };
};

export default validateAuthInput;
