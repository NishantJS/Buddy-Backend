import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../aws/s3.js";
import productValidator from "../validator/productValidator.js";
import Product from "../controller/product.js";
import { _updateProductAdd } from "../controller/seller.patch.js";

const product = Router();

const saveImage = multer();

product.post("/add", saveImage.array("product_image", 3), async (req, res) => {
  try {
    if (!req?.user?.seller || !req.body?.title) throw new Error("Unauthorized");
    const formData = req?.files;

    let length = formData.length;
    if (!length) throw new Error("Please provide files to upload!");

    //? higher order functions returning Promises for success and false for rejection
    //? for loop to avoid using Promise.allSettled()

    for (let index = 0; index < formData.length; index++) {
      const folderAndFileName =
        req?.user?.seller + "/" + req.body.title + index;
      const fileUploaded = await uploadFile(formData[index], folderAndFileName);
      if (!fileUploaded) length--;
    }

    if (!length) throw new Error("All the provided images are corrupt!");

    const { error, data, product } = await addProduct(
      { ...req.body, images: length },
      req.user.seller
    );

    if (error) throw new Error(data);
    await _updateProductAdd(req.user.seller, product._id, product.title);

    return res.status(200).json({
      error: false,
      data: "Product added successful",
      length,
      product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, data: error?.message || "Image upload failed" });
  }
});

export default product;

const addProduct = async (body, seller) => {
  try {
    const uci = calculateUCI(body?.category, body?.sub_category);
    if (!uci) throw new Error("Invalid UCI");
    const sizes = JSON.parse(body?.sizes);
    const description = { main: body?.description };

    const bodyData = { ...body, seller, uci, sizes, description };
    const { errors, isValid } = productValidator(bodyData);

    if (!isValid) return { error: !isValid, data: errors };

    const { error, data, product } = await Product._create(bodyData);
    return { error, data, product };
  } catch (error) {
    console.log(error);
    return { error: true, data: error?.message };
  }
};

const calculateUCI = (category, sub_cateory) => {
  if (!category || !sub_cateory) return 0;
  const values = {
    Dog: 100,
    Cat: 200,
    Food: 0,
    Treats: 1,
    Health: 2,
    Toys: 3,
    Grooming: 4,
  };
  return values[category] + values[sub_cateory];
};
