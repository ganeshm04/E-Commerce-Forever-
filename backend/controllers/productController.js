import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";


// functions for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(image => image !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let img = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image"
                });
                return img.secure_url;
            }
            )
        );

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            images: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();


        // console.log(name, description, price, category, subCategory, sizes, bestseller)
        // console.log(images);
        // console.log(imagesUrl);

        res.json({ success: true, msg: "product created successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: error.message });
    }
}



// functions for add product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: error.message });
    }

}


// functions for add product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// functions for add product
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: error.message });
    }
}


export { addProduct, removeProduct, listProducts, singleProduct }