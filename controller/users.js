import { User, isObjectId } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getToken = (id) => {
  const payload = { user: id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const _create = async ({ email, pass, provider = false }) => {
  try {
    const userDataObj = {
      email,
    };

    if (pass) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      userDataObj["pass"] = await bcrypt.hash(pass, salt);
    }

    if (provider) {
      userDataObj[provider.source] = provider["id"];
    }

    if (!provider && !pass) {
      if (pass)
        throw new Error("Please provide password for non-provider logins");
    }

    const newUser = await new User(userDataObj);

    const user = await newUser.save();
    if (!user) throw new Error();

    user.pass = undefined;
    return {
      error: false,
      token: getToken(user._id),
      user,
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
    const users = await User.find();
    return res.status(302).json(users);
  } catch (error) {
    return res.status(500).json({
      error,
      data: error?.message || "⚠ Some error occurred while retrieving Users",
    });
  }
};

const _checkOne = async ({ email, pass = false }) => {
  try {
    const user = await User.findOne({ email }).select("_id").lean();

    if (user)
      return {
        error: true,
        data: `Account exists with ${email}👯‍♀️`,
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
    const user = await User.findOne({ email }).select("-pass").lean();

    if (user && user[provider.source]) return getToken(user._id);
    else if (user && !user[provider.source]) {
      const { source, id } = provider;
      const response = await User.updateOne(
        { _id: user?._id },
        { [source]: id },
        {
          upsert: true,
        }
      );
      if (response["modifiedCount"] === 1) {
        return getToken(user._id);
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
    const user = await User.findOne({ email }).select("-__v").lean();

    if (!user) {
      return {
        error: true,
        data: `User not found with ${email} ❌`,
        status: 404,
      };
    } else if (user && user?.pass) {
      const match = await bcrypt.compare(pass, user.pass);

      if (match) {
        user.pass = undefined;

        return {
          token: getToken(user._id),
          user,
          data: "Login Successful",
          error: false,
        };
      } else
        return { data: "Password is incorrect ❌", error: true, status: 401 };
    } else {
      return {
        data: "Account already exists with a different provider! You can login through that and add password there for email login",
        error: true,
        status: 409,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: error?.message || `⚠ Error retrieving user with id ${email}`,
    };
  }
};

const _delete = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.deleteOne({ email });
    if (!user.deletedCount) {
      return res.status(404).json({ error: true, data: "User Not Found ❌" });
    } else
      return res.status(200).json({
        error: false,
        data: `Account deleted ❌. We are sorry to let you go 😢`,
      });
  } catch (error) {
    return res.status(500).json({
      error: true,
      data: error?.message || `⚠ Could not delete user with ${email}`,
    });
  }
};

const _getOneById = async (id) => {
  try {
    if (!id) throw new Error();

    const user = await User.findById(id).select("-pass").lean();
    if (!user)
      return {
        error: true,
        data: "Account not fount! Login Again",
        status: 401,
      };

    return { error: false, user };
  } catch (error) {
    return {
      data: "Session expired! Please Login Again💥",
      error: true,
      status: 401,
    };
  }
};

const _updateAddress = async (_id, address) => {
  try {
    if (!isObjectId(_id)) throw new Error("Invalid ID");
    if (address["isPrimary"] === true) {
      await User.findOneAndUpdate(
        _id,
        {
          $set: { "address.$[elem].isPrimary": false },
        },
        { arrayFilters: [{ "elem.isPrimary": true }] }
      );
    }

    const updatedAddress = await User.findByIdAndUpdate(
      _id,
      {
        $addToSet: {
          address: {
            full_name: address.full_name,
            line1: address.line1,
            line2: address.line2,
            state: address.state,
            city: address.city,
            phone: address.phone,
            pin: address.pin,
            isPrimary: address.isPrimary,
          },
        },
      },
      { new: true }
    );

    if (!updatedAddress)
      return {
        error: true,
        data: "Make sure you are providing all parameters while making an API call",
      };

    return {
      error: false,
      data: "Address added successfully",
    };
  } catch (error) {
    return {
      error: true,
      data: error?.message || "Wrong Token. Please Login Again!",
    };
  }
};

const _deleteAddress = async (_id, index) => {
  try {
    if (!isObjectId(_id)) throw new Error("Invalid ID");

    const updatedAddress = await User.findByIdAndUpdate(_id, {
      $pull: {
        address: { _id: index },
      },
    });

    if (!updatedAddress)
      return {
        error: true,
        data: "Make sure you are providing all parameters while making an API call",
      };

    return {
      error: false,
      data: "Address removed successfully",
    };
  } catch (error) {
    return {
      error: true,
      data: error?.message || "Wrong Token. Please Login Again!",
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

export {
  _checkOne,
  _findOne,
  _getOneById,
  _checkWithProvider,
  _updateAddress,
  _deleteAddress,
};
