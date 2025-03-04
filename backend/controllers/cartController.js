import userModel from "../models/userModel.js";

// add products to user cart
const addToCart = async (req, res) => {
    try {
        const {userId, productId, size } = req.body;
        console.log("Cart Controller - Request Body:", req.body);
        console.log("Cart Controller - Headers:", req.headers);
        console.log("addtocart", userId, productId, size);
        
        const userData = await userModel.findById(userId).select('-password');
        console.log("Cart Controller - User Data:", userData);
        
        let cartData = await userData.cartData;
        if (cartData[productId]) {
            if (cartData[productId][size]) {
                cartData[productId][size] += 1
            }
            else {
                cartData[productId][size] = 1
            }
        }
        else {
            cartData[productId] = {}
            cartData[productId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


// update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, productId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[productId][size] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        console.log(userData);
        
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { addToCart, updateCart, getUserCart }