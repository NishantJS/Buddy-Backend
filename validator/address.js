const validateAddressInput = ({
  full_name,
  line1,
  line2,
  city,
  phone,
  pin,
  state,
}) => {
  let errors = "";

  if (!full_name) errors = "Full name is required field";
  if (!line1) errors = "Line1 is required field";
  if (!line2) errors = "Line2 is required field";
  if (!city) errors = "City is required field";
  if (!phone) errors = "Phone is required field";
  if (!pin) errors = "Pincode is required field";
  if (!state) errors = "State is required field";
  return {
    errors,
    isValid: !errors,
  };
};

export default validateAddressInput;
