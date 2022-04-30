const validateProductInput = (product) => {
  let errors = errorMessage(product);

  return {
    errors,
    isValid: !errors,
  };
};

const errorMessage = (product) => {
  try {
    const { title = "", uci = 0, sizes = [] } = product;
    if (uci < 100 || uci > 300) return "Invalid UCI";
    if (title.length < 3 || title.length > 30)
      return "Title length should be min 3 and not more than 30";
    if (!sizes) return "size is required field";
    sizes.forEach(({ size, price, retail_price, stock, allowed }) => {
      if (!size) throw "size missing";
      if (!price) throw "price missing";
      if (!retail_price) return "retail price missing";
      if (!stock) return "stock is required field";
      if (!allowed) return "allowed is required field";
    });
    return false;
  } catch (error) {
    return error?.message || true;
  }
};

export default validateProductInput;
