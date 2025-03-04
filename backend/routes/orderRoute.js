import express from 'express';
import {placeOrder,placeOrderStripe,allOrder,userOrders,updateStatus, verifyStripe} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter=express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrder);
orderRouter.post('/status',adminAuth,updateStatus);


// Payment Features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);

// User Feature

orderRouter.post("/userorders",authUser,userOrders);

// verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe);
// orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay);


export default orderRouter

