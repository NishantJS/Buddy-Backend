import Dogs from "./dogs.js";
import Cats from "./cats.js";

const _create = async (body) => {
  try {
    if (body.uci[0] === 1) return await Dogs._create(body);
    else return await Cats._create(body);
  } catch (err) {
    return { error: true, data: err?.message || "something went wrong" };
  }
};

const _delete = async () => {

}

export default {
  _create,
  _delete,
};