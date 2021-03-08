import Validator from "validator";
import isEmpty from "is-empty";

function validateRegisterInput(data) {
  let errors = {};

  if (!data.username.fname) errors.fname = "First Name is required field";
  else if (!data.username.lname) errors.lname = "Last Name is required field";
  else if (!data.email) errors.email = "Email is required field";
  else if (!data.pass) errors.pass = "Password is required field";
  else {
    let {
      username: { fname, lname },
      email,
      pass,
    } = data;

    email = !isEmpty(email) ? email : "";
    pass = !isEmpty(pass) ? pass : "";
    fname = !isEmpty(fname) ? fname : "";
    lname = !isEmpty(lname) ? lname : "";

    if (Validator.isEmpty(fname)) errors.fname = "First Name is required";
    if (Validator.isEmpty(lname)) errors.lname = "Lirst Name is required";
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
