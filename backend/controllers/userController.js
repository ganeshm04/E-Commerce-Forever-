import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}


// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't  exists"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            return res.status(201).json({
                success: true,
                token
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });

        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

// Route for user registeration
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // checking whether the user already exists
        const exits = await userModel.findOne({
            email
        });

        if (exits) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: " Please enter a valid email"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be atleast 8 characters"
            });
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        if (user) {
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                token
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// ROute for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
        else{
        res.json({ success: false, message:"Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}


export { loginUser, registerUser, adminLogin }


