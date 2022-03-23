const validateProductInput = (product) => {
  let errors = errorMessage(product);

  return {
    errors,
    isValid: !errors,
  };
};

const errorMessage = (product) => {
  const { title="", images=[], uci=0, stock, sizes} = product;
  if (uci < 100 || uci > 300) return "Invalid uci";
  if (images.lenth<2) return "Error getting images";
  if (title.lenth < 3 || title.lenth > 90) return "Title length should be min 3 and not more than 90";
  if (!stock) return "stock is required field";
  if (!sizes) return "size is required field";
  return "";
}

export default validateProductInput;
