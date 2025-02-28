import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

    const { productId } = useParams();
    const { products, currency,addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');


    const fetchProductData = async () => {
        products.map((product) => {
            if (product._id === productId) {
                setProductData(product);
                setImage(product.images[0]);
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData();
    }, [productId]);


    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
            {/* Product data */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/* product image */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {
                            productData.images.map((img, index) => (
                                <img key={index} src={img} alt="product" className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" onClick={() => setImage(img)} />
                            ))
                        }
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={image} alt="product" className="w-full h-auto" />
                    </div>
                </div>
                {/* product details */}
                <div className="flex-1">
                    <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className='w-3 5 ' />
                        <img src={assets.star_icon} alt="" className='w-3 5 ' />
                        <img src={assets.star_icon} alt="" className='w-3 5 ' />
                        <img src={assets.star_icon} alt="" className='w-3 5 ' />
                        <img src={assets.star_dull_icon} alt="" className='w-3 5 ' />
                        <p className='pl-2'>(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
                    <p className=" text-gray-500 md:w-4/5 mt-5">{productData.description}</p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button onClick={() => { setSize(item) }} key={index} className={`border py-2 px-4 bg-gray-300 cursor-pointer ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">Add to Cart</button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available.</p>
                        <p>Easy return and Exchange Policy within 7 days.</p>
                    </div>
                </div>
            </div>
            {/* Description and Review Section */}
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 borer px-6 py-6 text-s text-gray-500">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore perspiciatis architecto sapiente dignissimos, quasi tempora voluptatibus id officiis laboriosam delectus cum consequuntur nesciunt voluptatem accusamus deleniti iusto similique? Blanditiis, esse!</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quo commodi ipsam veniam ut, aspernatur eaque eius odit quisquam totam!</p>
                </div>
            </div>
            {/*  display related products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : <div className='opacity-0'></div>
}

export default Product