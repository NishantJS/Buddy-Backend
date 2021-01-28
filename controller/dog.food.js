import DogFood from "../models/dogs/dog_food.model.js";

const _create = async (req, res) => {
  try {
    let { title, thumbnail, type, images, price, brand } = req.body;
    const newItem = await new DogFood({
      title,
      thumbnail,
      type,
      images,
      price,
      brand,
    });
    const dog_food = await newItem.save();
    return res.status(201).send({ dog_food });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const _findAll = async (req, res) => {
  try {
    let dog_food;
    if (req.query.type) {
      dog_food = await DogFood.find(
        { type: req.query.type },
        { _id: 0, __v: 0 }
      );
    } else {
      dog_food = await DogFood.find({}, { _id: 0, __v: 0 });
    }
    return res.status(302).send(dog_food);
  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message || "some error occured" });
  }
};

const _findOne = async (req, res) => {
  try {
    const title = req.query.title;
    const dog_food = await DogFood.findOne({ title: title });

    if (!dog_food) {
      return res.status(404).send({
        message: `dog_food not found with id ${req.query.title}`,
      });
    } else {
      return res.status(302).send(dog_food);
    }
  } catch (err) {
    return res.status(500).send({
      message: `Error retrieving product with id ${req.query.title} with error ${err}`,
    });
  }
};

export default { _create, _findAll, _findOne };
