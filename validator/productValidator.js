const validateProductInput = (product) => {
  let errors = errorMessage(product);

  return {
    errors,
    isValid: !errors,
  };
};

const errorMessage = (product) => {
  try {
    const { title = "", images = [], uci = 0, stock, sizes = [] } = product;
    if (uci < 100 || uci > 300) return "Invalid uci";
    if (images.length < 2) return "Error getting images";
    if (title.length < 3 || title.length > 90)
      return "Title length should be min 3 and not more than 90";
    if (!stock) return "stock is required field";
    if (!sizes || sizes < 2) return "size is required field";
    sizes.forEach(({ size, price, retail_price }) => {
      if (!size) throw new Error("size missing");
      if (!price) throw new Error("price missing");
      if (!retail_price) return "retail price missing";
    });
    return false;
  } catch (error) {
    return error?.message || true;
  }
};

export default validateProductInput;
