import { userSchemaRegister, userSchemaLogin } from "../schemas.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

//Check if req.body is valid input for register
export const validateUserRegister = async (req, res, next) => {
    const { error } = userSchemaRegister.validate(req.body);
    if (error)
    {
        return res.status(400).send({
            // success: false,
            message: error.details[0].message,
        });
    }
    let foundUser = await User.findOne({ email: req.body.email });
    if (foundUser)
    {
        return res.status(400).send({
            // success: false,
            message: "This email is already associated with another account. Please try again with a different email",
        });
    }
    next();
}

//Check if req.body is valid input for login
export const validateUserLogin = (req, res, next) => {
    const { error } = userSchemaLogin.validate(req.body);
    if (error)
    {
        return res.status(400).send({
            // success: false,
            message: error.details[0].message,
        });
    }
    next();
}

export const verifyToken = async (req, res, next) => {
    const token = req.header("accessToken");
    // console.log(token);
    if (!token)
    {
        return res.status(401).send("Access denied");
    }
    try
    {
        const verified = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        //Decode the token to find the user data (id), then use this id to find the user data in database
        // console.log(verified);
        req.user = verified;
        // console.log(req.user);
        next();
    } catch (e)
    {
        console.log(e);
        return res.status(403).send("Invalid token");
    }
}