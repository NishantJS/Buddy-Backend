import Dogs from "./dogs.js";
import Cats from "./cats.js";

const _create = async (body) => {
  try {
    const uci = String(body.uci);
    const category = Number(uci[0]);
    const sub_category = Number(uci[2]);

    if (category === 1) return await Dogs._create(body, sub_category);
    if (category === 2) return await Cats._create(body, sub_category);
    throw new Error("Invalid UCI");
  } catch (error) {
    console.log(error);
    return { error: true, data: error?.message || "something went wrong" };
  }
};

const _delete = async () => {};

export default {
  _create,
  _delete,
};
