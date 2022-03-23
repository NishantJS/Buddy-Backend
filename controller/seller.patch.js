import { Seller } from "../models/index.js";

const _checkId = async (id) => {
  try {
    const isValid = await Seller.findById(id);
    if (!isValid) throw "Account does not exists";
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error };
  }
};

export default {
  _checkId,
};
