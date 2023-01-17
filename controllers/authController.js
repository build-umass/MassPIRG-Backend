import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateAccessToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
}

// const generateRefreshToken = (user) => {
//     return jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '365d' });
// }

export const registerUser = async (req, res) => {
    //Hash the password:
    // const salt = await bcrypt.genSalt(12);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Or:
    const hashedPassword = await bcrypt.hashSync(req.body.password, 12);

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
    });
    try
    {
        const savedUser = await user.save();
        const accessToken = generateAccessToken(savedUser);
        res.header('accessToken', accessToken).send({
            success: true,
            message: "Register successfully!",
            token: accessToken,
        });
        // res.send({user: savedUser._id});
    } catch (e)
    {
        return res.status(404).send({
            success: false,
            message: e.message,
        });
    }
}

export const loginUser = async (req, res) => {
    try
    {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email: email });
        if (!foundUser)
        {
            return res.status(200).send({
                success: false,
                message: "Account does not exist",
            })
        };

        //Check if password is corrected
        const validPass = await bcrypt.compare(password, foundUser.password);
        if (!validPass)
        {
            return res.status(200).send({
                success: false,
                message: "Incorrect password or email address",
            })
        };

        //Create and assign token:
        const accessToken = generateAccessToken(foundUser);
        const refreshToken = generateRefreshToken(foundUser);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, //true when deploy
            path: '/',
            sameSite: "strict",
        })
        res.header('accessToken', accessToken).send({
            success: true,
            message: "Logged in successfully!",
            token: accessToken,
        });

    } catch (err)
    {
        res.status(400).send(err.message);
    }
}

// export const googleLoginUser = async (req, res) => {
//     try
//     {
//         const { idToken } = req.body;
//         // console.log(tokenId);
//         const data = await client.verifyIdToken({ idToken: idToken, audience: "868855841872-rqi0fq7l869n55toq9f1js9f977ugd35.apps.googleusercontent.com" });
//         // console.log(data);
//         const payload = data.payload;
//         const { email_verified, email } = payload;
//         if (email_verified)
//         {
//             const foundUser = await User.findOne({ email: email });
//             if (foundUser)
//             {
//                 //Log in
//                 const accessToken = generateAccessToken(foundUser);
//                 res.header('accessToken', accessToken).send({
//                     success: true,
//                     message: "Logged in successfully!",
//                     token: accessToken,
//                 });
//             } else
//             {
//                 //Create new user
//                 let newUser = new User({
//                     email: email,
//                     password: email,
//                 });
//                 const savedUser = await newUser.save();
//                 const accessToken = generateAccessToken(savedUser);
//                 res.header('accessToken', accessToken).send({
//                     success: true,
//                     message: "Logged in successfully!",
//                     token: accessToken,
//                 });
//             }
//         } else
//         {
//             res.send({
//                 success: false,
//                 message: "Email does not existed",
//             });
//         }
//     } catch (err)
//     {
//         console.log(err);
//     }
// }

// export const requestRefreshToken = async (req, res) => {
//     //Take refresh token from user
//     //After set, cookie will be sent automatically in any subsequent request (no need to attach to header or body in request)
//     const refreshToken = req.cookies.refreshToken;
// }

//Send link to email
// export const forgotPassword = async (req, res) => {
//     try
//     {
//         const { email } = req.body;
//         const foundUser = await User.findOne({ email: email });
//         if (!foundUser)
//         {
//             return res.status(200).send({
//                 success: false,
//                 message: "Account does not exist",
//             })
//         };

//         const tempSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
//         const token = jwt.sign({ _id: foundUser._id }, tempSecret, { expiresIn: '20m' });
//         const baseUrl = process.env.FRONT_END_URL;
//         const link = `${baseUrl}/#/newpassword/${token}`
//         // console.log(link);
//         await sendEmail(email, "password reset", link);
//         res.status(201).send({
//             success: true,
//             message: "Reset password has been sent to your email account",
//         })
//     } catch (err)
//     {
//         console.log(err);
//     }
// }

// export const resetPassword = async (req, res) => {
//     try
//     {
//         const { token } = req.params;
//         const newPassword = req.body.password;
//         const tempSecret = process.env.JWT_ACCESS_TOKEN_SECRET
//         const foundUserFromToken = jwt.verify(token, tempSecret);
//         const userId = foundUserFromToken._id;
//         const foundUser = await User.findById(userId);
//         if (!foundUser)
//         {
//             res.status(400).send("Invalid link or token has expired");
//         }
//         const hashedPassword = await bcrypt.hashSync(newPassword, 12);
//         foundUser.password = hashedPassword;
//         await foundUser.save();
//         res.status(201).send({
//             success: true,
//             message: "Succesfully change your password"
//         });

//     } catch (err)
//     {
//         console.log(err);
//     }

// }