import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const deliveryPrice = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            try {
                const tokenData = JSON.parse(atob(token.split('.')[1]));
                setUserId(tokenData._id);
            } catch (error) {
                console.log(error);
                toast.error(error.message || 'Something went wrong');
            }
        } else {
            localStorage.removeItem('token');
            setUserId('');
        }
    }, [token]);

    const addToCart = async (productId, size) => {
        if (!size) {
            toast.error('Please select a size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[productId]) {
            if (cartData[productId][size]) {
                cartData[productId][size] += 1;
            }
            else {
                cartData[productId][size] = 1;
            }
        }
        else {
            cartData[productId] = {};
            cartData[productId][size] = 1;       
        }
        setCartItems(cartData);
        if (token) {
            try {
                console.log("Frontend - Token being sent:", token);
                console.log("Frontend - Request data:", { productId, size });
                
                await axios.post(backendUrl + "/api/cart/add", 
                    { productId, size }, 
                    { 
                        headers: { token }
                    }
                );
            } catch (error) {
                console.log(error);
               
                    toast.error(error.message || 'Something went wrong');
                
            }
        }
    }

    const getCount = () => {
        let count = 0;
        for (let item in cartItems) {
            for (let size in cartItems[item]) {
                try {
                    count += cartItems[item][size];
                } catch (error) {

                }
            }
        }
        return count;
    }

    const updateQuantity = async (productId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[productId][size] = quantity;
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update", 
                    { 
                        productId, 
                        size, 
                        quantity,
                    }, 
                    { 
                        headers: { 
                            token
                        } 
                    }
                );
            } catch (error) {
                console.log(error);
                
                    toast.error(error.message || 'Something went wrong');
                
            }
        }
    }


    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                backendUrl + "/api/cart/get", 
                {}, // empty body
                { 
                    headers: { 
                        token
                    } 
                }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemsInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemsInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/products/list");
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }


    }


    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token])
    
    useEffect(() => {
        getProductsData();
    }, [])

    


    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])


    const value = {
        products, 
        currency, 
        deliveryPrice, 
        search, 
        setSearch, 
        showSearch,
        setShowSearch, 
        cartItems, 
        addToCart, 
        getCount, 
        updateQuantity,
        getCartAmount, 
        navigate, 
        backendUrl, 
        token, 
        setToken, 
        setCartItems,
        userId, 
    }
    return (

        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
};

export default ShopContextProvider;