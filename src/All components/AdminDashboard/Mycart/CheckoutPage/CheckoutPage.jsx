import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { Authconnect } from '../../../Clints-all-components/AuthincationPages/Authincation/Authincation';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { currentUser } = useContext(Authconnect);
  const userId = currentUser?.uid;

  const [finalOrders, setFinalOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState({ name: '', email: '', phone: '', address: '' });
  const Navigate = useNavigate();

  // ✅ Fetch finalized orders
  useEffect(() => {
    if (!userId) return;

    axios.get(`https://al-it-server.vercel.app/finalizedorders/${userId}`)
      .then(res => {
        const ordersWithQty = res.data.map(item => ({ ...item, quantity: item.quantity || 1 }));
        setFinalOrders(ordersWithQty);
      })
      .catch(err => console.error('Error fetching orders:', err))
      .finally(() => setLoading(false));
  }, [userId]);

  // ✅ Handle Quantity Change
  const handleQuantityChange = (id, type) => {
    const order = finalOrders.find(o => o._id === id);
    if (!order) return;

    const newQty = type === 'increase' ? order.quantity + 1 : Math.max(1, order.quantity - 1);

    axios.put(`https://al-it-server.vercel.app/finalizedorders/${userId}/${id}`, { quantity: newQty })
      .then(() => {
        setFinalOrders(prev => prev.map(o => o._id === id ? { ...o, quantity: newQty } : o));
      })
      .catch(err => console.error('Error updating quantity:', err));
  };

  // ✅ Handle Delete with SweetAlert Confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition',
        cancelButton: 'bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:opacity-90 transition',
        actions: 'swal-actions-gap'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://al-it-server.vercel.app/finalizedorders/${userId}/${id}`)
          .then(() => {
            setFinalOrders(prev => prev.filter(o => o._id !== id));
            Swal.fire({
              title: 'Deleted!',
              text: 'Item removed successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'bg-green-600 text-white px-4 py-2 rounded-lg'
              },
              buttonsStyling: false
            });
          })
          .catch(() => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete item.',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'bg-red-600 text-white px-4 py-2 rounded-lg'
              },
              buttonsStyling: false
            });
          });
      }
    });
  };

  // ✅ Billing Input Change
  const handleBillingChange = e => {
    setBilling(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Handle Payment
  const handlePayment = () => {
    if (!billing.name || !billing.email || !billing.phone || !billing.address) {
      return Swal.fire('Incomplete Info', 'Please fill all billing details', 'warning');
    }

    axios.post(`https://al-it-server.vercel.app/checkout/finalize/${userId}`, {
      orders: finalOrders,
      billing
    })
      .then((res) => {
        if (res.data.insertedId || res.data.success) {
          Swal.fire('Success!', 'Payment processed and billing info saved!', 'success');
          setFinalOrders([]);
          setBilling({ name: '', email: '', phone: '', address: '' });
          Navigate('/payment');
        } else {
          Swal.fire('Error', 'Failed to save payment info', 'error');
        }
      })
      .catch(() => Swal.fire('Error', 'Payment failed', 'error'));
  };

  const subtotal = finalOrders.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  // ✅ Spinner Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!finalOrders.length) return <p className="text-center mt-10 text-gray-500">No finalized orders yet.</p>;

  return (
    <div className="w-11/12 md:w-10/12 mx-auto mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Orders Section */}
      <div className="lg:col-span-2 space-y-4">
        {finalOrders.map(order => (
          <div key={order._id} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md gap-4">
            <img src={order.image} alt={order.name} className="w-28 h-28 object-cover rounded-lg" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold text-lg text-indigo-700">{order.name}</h3>
              <p className="text-gray-500 text-sm">{order.description}</p>
              <p className="text-green-600 font-bold mt-1">৳{order.price.toFixed(2)} each</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-3">
              <div className="flex items-center gap-2">
                <button onClick={() => handleQuantityChange(order._id, 'decrease')} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                  <FaMinus />
                </button>
                <span className="font-semibold">{order.quantity}</span>
                <button onClick={() => handleQuantityChange(order._id, 'increase')} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                  <FaPlus />
                </button>
              </div>
              <button onClick={() => handleDelete(order._id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                <FaTrash />
              </button>
              <p className="font-bold text-indigo-700 text-center md:text-right">
                ৳{(order.price * order.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="font-bold text-xl text-gray-700 mb-2">Order Summary</h3>
        <div className="flex justify-between"><span>Subtotal:</span><span>৳{subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Tax (5%):</span><span>৳{tax.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold text-lg"><span>Total:</span><span>৳{total.toFixed(2)}</span></div>

        <h3 className="font-bold text-xl text-gray-700 mt-4 mb-2">Billing Details</h3>
        <input type="text" name="name" placeholder="Full Name" value={billing.name} onChange={handleBillingChange} className="w-full border p-3 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="email" name="email" placeholder="Email" value={billing.email} onChange={handleBillingChange} className="w-full border p-3 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="text" name="phone" placeholder="Phone" value={billing.phone} onChange={handleBillingChange} className="w-full border p-3 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <textarea name="address" placeholder="Address" value={billing.address} onChange={handleBillingChange} className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400" />

        <button onClick={handlePayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-transform transform hover:scale-105">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
