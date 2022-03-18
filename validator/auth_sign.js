import Validator from "validator";

const validateRegisterInput=({ email, pass }) =>{
  let errors = "";

  if (!email) errors = "Email is required field";
  else if (!pass) errors = "Password is required field";
  else {
    if (Validator.isEmpty(pass)) errors = "Password field is required";

    if (Validator.isEmpty(email)) {
      errors = "Email field is required";
    } else if (!Validator.isEmail(email)) {
      errors = "Email is invalid";
    }
    if (!Validator.isLength(pass, { min: 6, max: 30 }))
      errors = "Password must be at least 6 characters and max 30";
  }
  return {
    errors,
    isValid: !errors,
  };
}

export default validateRegisterInput;
