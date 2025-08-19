import express from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { sendToken } from "../helpers/JsonToken.js";
import dotenv from "dotenv"
import md5 from "md5";
dotenv.config()
const router = express.Router();

const oAuth2Client = new OAuth2Client(
    '1021003224063-gprhsennt0tv0rl9bhc3ifh74sc4kobc.apps.googleusercontent.com',
    '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',
    'https://ss2-w16p.onrender.com/api/auth/oauth'
);

async function getUserData(access_token) {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    return await response.json();
}

router.get("/login", (req, res) => {
    console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID); // Debug
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid",
        ],
        prompt: "consent",
    });
    console.log("Generated URL:", authorizeUrl); // Debug
    res.redirect(authorizeUrl);
});

router.get("/oauth", async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) throw new Error("No authorization code provided");

        const { tokens } = await oAuth2Client.getToken(code);
        const userData = await getUserData(tokens.access_token);

        console.log(userData,"userData");
        
        let user = await User.findOne({ email: userData.email });
        
        
        if (!user) {
            user = new User({
                username: userData.name,
                email: userData.email,
                googleId: userData.sub,
                avatar: userData.picture,
                password: null,
            });
            await user.save();
        } else {

            user.username = userData.name;
            user.avatar = userData.picture;
            user.googleId = userData.sub,
            await User.updateOne({ _id: user._id }, {
                username: userData.name,
                avatar: userData.picture,
                googleId: userData.sub,
            })
        }

        user.password = "";
   
        
        const token = user.getJwtToken();
        console.log(token,"token 1");
        
        
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        };
        
        res.status(200)
            .cookie("token", token, options)
            .redirect("https://ss2-11x.pages.dev");
    } catch (error) {
        console.error("Google OAuth error:", error);
        // res.redirect("http://localhost:5173/register?error=auth_failed");
        res.redirect("http://localhost:5173/login?e=fa");
    }
});

export default router;
