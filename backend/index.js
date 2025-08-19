import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from "./routers/users.js";
import chatRoute from "./routers/chat.js";
import googleAuthRoute from "./routers/googleAuth.js";
// import serviceHotelRoute from "./routes/serviceHotel.js"; 
// import facilityHotel from "./routes/facilityHotel.js"; 
// import uploadRoute from "./routes/upload.js"; 
// import policyRoute from "./routes/policy.js"
// import hotelsRoute from "./routes/hotels.js";
import adminsRoute from "./routers/admin.js";
import apiRoute from "./routers/api.js";
import documentRoute from "./routers/document.js";
// import roomsRoute from "./routes/rooms.js";
import swaggerDocs from "./swagger.js";
import cookieParser from "cookie-parser"; // Keep .jsx if necessary
import cors from "cors";
// import googleAuthRoute from "./routes/googleAuth.js";


const app = express();
dotenv.config();

// Set strictQuery option
mongoose.set('strictQuery', true); // or false, depending on your needs

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.log("Error connecting to mongoose", e);
    }
};
// Call the connect function
connect();

mongoose.connection.on("disconnected", () => {
    console.log(" Disconnected to MongoDB");
});

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ss2-11x.pages.dev"
    ],
    credentials: true
}));

// route

app.use("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
});


app.use("/api/auth", googleAuthRoute);

app.use("/api/users", usersRoute);
// app.use("/api/hotels", hotelsRoute);
// app.use("/api/rooms", roomsRoute);
app.use("/api/admin", adminsRoute);
app.use("/api/callAPI/", apiRoute);
app.use("/api/document/", documentRoute);
app.use("/api/chat/", chatRoute);
// app.use("/api/auth", googleAuthRoute);
// app.use("/api/servicesHotel", serviceHotelRoute);
// app.use("/api/facilityHotel", facilityHotel);
// app.use("/api/upload", uploadRoute);
// app.use("/api/policy", policyRoute);

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        // stack: error.stack,
    });
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App listening on 8080`);
    swaggerDocs(app, PORT); // Initialize Swagger
});
