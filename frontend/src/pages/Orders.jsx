import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrdersData = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      console.log(response.data);
      if (response.data.success) {
        let allOrdersItem = [];
        
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          })
        });
        setOrderData(allOrdersItem.reverse());

      }
    } catch (error) {
      console.log(error);
    }
  }

 

  useEffect(() => {
    loadOrdersData();
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.slice(1, 4).map((product, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:justify-between  md:items-center gap-4'>
              <div className='flex items-start gap-6 txt-sm'>
                <img src={product.images[0]} alt="" className='w-16 sm:w-20' />
                <div>
                  <p className='sm:text-base font-medium'>{product.name}</p>
                  <div className='flex items-center gap-5 mt-1 text-base text-gray-500'>
                    <p>{currency}{product.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>Quantity: {product.quantity}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>Size: {product.size}</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(product.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-400'>{product.paymentMethod}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{product.status}</p>
                </div>
                <button onClick={loadOrdersData} className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer">Track Order</button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders