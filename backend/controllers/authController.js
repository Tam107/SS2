import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URL;

const oAuth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_SECRET,
    REDIRECT_URI
);

async function getUserData(access_token) {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    return await response.json();
}

export const loginWithGoogle = (req, res) => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid",
        ],
        prompt: "consent",
    });
    res.redirect(authorizeUrl);
};

export const googleOAuth = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) throw new Error("No authorization code provided");

        const { tokens } = await oAuth2Client.getToken(code);
        const userData = await getUserData(tokens.access_token);

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
            await User.updateOne(
                { _id: user._id },
                {
                    username: userData.name,
                    avatar: userData.picture,
                    googleId: userData.sub,
                }
            );
        }

        user.password = "";

        const token = user.getJwtToken();

        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        };

        res
            .status(200)
            .cookie("token", token, options)
            .redirect(REDIRECT_URI);
    } catch (error) {
        console.error("Google OAuth error:", error);
        res.redirect("http://localhost:5173/login?e=fa");
    }
};
