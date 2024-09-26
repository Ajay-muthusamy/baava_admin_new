import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://baava-backend-new-1.onrender.com/user/order-details');
        setOrders(response.data);
      } catch (error) {
        console.log('Error fetching data from the server:', error);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = async (orderId) => {
    try {
      const response = await axios.get(`https://baava-backend-new-1.onrender.com/pdf/generate-pdf/${orderId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `order-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log('Error downloading PDF:', error);
    }
  };

  return (
    <div className="w-[40vh] md:p-6 md:w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Order Details</h1>
      <div>
        <h1 className='font-bold font-mono text-2xl text-center'>Welcome to BAVA CRACKERS</h1>
        <h1 className='font-bold font-mono text-1xl text-center'>Admin : LOGAJITH</h1>
      </div>
      <div className="overflow-x-auto">
        <table className=" bg-white border border-gray-300 rounded-lg text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">WhatsApp</th>
              <th className="py-2 px-4 border-b">Country</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Order Date & Time</th>
              <th className="py-2 px-4 border-b">PDF</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                {order.products.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    {index === 0 && (
                      <>
                        <td className="py-2 px-4" rowSpan={order.products.length}>{order.orderId}</td>
                        <td className="py-2 px-4" rowSpan={order.products.length}>{order.name}</td>
                        <td className="py-2 px-4" rowSpan={order.products.length}>{order.phone}</td>
                        <td className="py-2 px-4" rowSpan={order.products.length}>{order.whatsapp}</td>
                        <td className="py-2 px-4" rowSpan={order.products.length}>{order.country}</td>
                        <td className="py-2 px-4" rowSpan={order.products.length}>{order.address}</td>
                        <td className="py-2 px-4" rowSpan={order.products.length}>Rs. {order.totalAmount}.00</td>
                        <td className="py-2 px-4" rowSpan={order.products.length}>{new Date(order.createdAt).toLocaleString()}</td>
                        <td className="py-2 px-4" rowSpan={order.products.length}>
                          <button 
                            onClick={() => downloadPDF(order._id)} 
                            className="bg-green-500 text-white px-3 py-1 rounded text-xs sm:text-sm"
                          >
                            Download PDF
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
