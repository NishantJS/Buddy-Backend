import { Seller } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getToken = (id) => {
  const payload = { seller: id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const _create = async ({ email, pass, provider = false }) => {
  try {
    const sellerDataObj = {
      email,
    };

    if (pass) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      sellerDataObj["pass"] = await bcrypt.hash(pass, salt);
    }

    if (provider) {
      sellerDataObj[provider.source] = provider["id"];
    }

    if (!provider && !pass) {
      if (pass)
        throw new Error("Please provide password for non-provider logins");
    }

    const newSeller = await new Seller(sellerDataObj);

    const seller = await newSeller.save();
    if (!seller) throw new Error();
    seller.pass = undefined;
    return {
      error: false,
      token: getToken(seller._id),
      seller,
      data: "Login Successful",
      status: 201,
    };
  } catch (error) {
    return {
      error: true,
      data:
        error?.message || "⚠ Some error occurred while creating an Account.",
    };
  }
};

const _findAll = async (res) => {
  try {
    const sellers = await Seller.find();
    return res.status(302).json(sellers);
  } catch (error) {
    return res.status(500).json({
      error: true,
      data: error?.message || "⚠ Some error occurred while retrieving Users",
    });
  }
};

const _checkOne = async ({ email, pass = false }) => {
  try {
    const seller = await Seller.findOne({ email }).select("_id").lean();

    if (seller)
      return {
        error: true,
        data: `Account exists with ${email}👯‍♂️`,
        status: 409,
      };
    return await _create({ email, pass });
  } catch (error) {
    return {
      error: true,
      data: error?.message || "⚠ Some error occurred while checking Email",
    };
  }
};

const _checkWithProvider = async ({ email, provider }) => {
  try {
    const seller = await Seller.findOne({ email }).select("-pass").lean();

    if (seller && seller[provider.source]) return getToken(seller._id);
    else if (seller && !seller[provider.source]) {
      const { source, id } = provider;
      const response = await Seller.updateOne(
        { _id: seller?._id },
        { [source]: id },
        {
          upsert: true,
        }
      );
      if (response["modifiedCount"] === 1) {
        return getToken(seller._id);
      } else
        return {
          error: true,
          data: "Merged failed! Please try again💥",
          status: 403,
        };
    }
    return await _create({ email, provider, pass: false });
  } catch (error) {
    return {
      error: true,
      data: error?.message || "⚠ Some error occurred while checking Email",
    };
  }
};

const _findOne = async ({ email, pass }) => {
  try {
    const seller = await Seller.findOne({ email }).select("-__v").lean();

    if (!seller) {
      return {
        error: true,
        data: `Seller account not found with ${email} ❌`,
        status: 404,
      };
    } else if (seller) {
      const match = await bcrypt.compare(pass, seller.pass);

      if (match) {
        seller.pass = undefined;

        return {
          token: getToken(seller._id),
          seller,
          data: "Login Successful",
          error: false,
        };
      } else
        return { data: "Password is incorrect ❌", error: true, status: 401 };
    }
  } catch (error) {
    return {
      error: true,
      data:
        error?.message || `⚠ Error retrieving seller account with id ${email}`,
    };
  }
};

const _delete = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) throw new Error("Please pass email address");

    const seller = await Seller.deleteOne({
      email: new RegExp(`^${email}`, "i"),
    });
    if (!seller.deletedCount) {
      return res.status(404).json({ error: true, data: "Seller Not Found ❌" });
    } else
      return res.status(200).json({
        error: false,
        data: `Account deleted ❌. We are sorry to let you go 😢`,
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      data:
        error.message ||
        `⚠ Could not delete seller with ${email}! Please try again later`,
    });
  }
};

const _getOneById = async (id) => {
  try {
    if (!id) throw new Error();

    const seller = await Seller.findById(id).select("-pass").lean();
    if (!seller)
      return {
        error: true,
        data: "Account not fount! Login Again",
        status: 401,
      };

    return { error: false, seller };
  } catch (error) {
    return {
      data: "Session expired! Please Login Again💥",
      error: true,
      status: 401,
    };
  }
};

export default {
  _create,
  _delete,
  _findAll,
  _findOne,
  _checkOne,
  _getOneById,
  _checkWithProvider,
};

export { _checkOne, _findOne, _getOneById, _checkWithProvider };
