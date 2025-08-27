import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Authconnect } from '../../../Clints-all-components/AuthincationPages/Authincation/Authincation';

const PaymentPage = () => {
  const { currentUser } = useContext(Authconnect);
  const userId = currentUser?.uid;

  const [finalOrders, setFinalOrders] = useState([]);
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:5000/finalizedorders/${userId}`)
      .then(res => setFinalOrders(res.data || []))
      .catch(err => console.error(err));

    axios.get(`http://localhost:5000/checkout/finalize/${userId}`)
      .then(res => {
        if (res.data?.payments?.length) {
          setCheckoutData(res.data.payments[res.data.payments.length - 1]);
        }
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [userId]);

  const totalAmount = finalOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePayNow = () => {
    if (!selectedMethod) return Swal.fire('Select Payment', 'Please select a payment method', 'info');

    Swal.fire({
      title: `Confirm Payment`,
      text: `Pay $${totalAmount.toFixed(2)} via ${selectedMethod}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Pay Now',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) Swal.fire('Success!', `Payment successful via ${selectedMethod}.`, 'success');
    });
  };

  const handleCancelOrder = (orderId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This order will be permanently removed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel It',
      cancelButtonText: 'No, Keep It',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/finalizedorders/${userId}/${orderId}`)
          .then(() => setFinalOrders(prev => prev.filter(order => order._id !== orderId)))
          .catch(() => Swal.fire('Error!', 'Failed to cancel the order.', 'error'));
      }
    });
  };

  const handleCancelAllOrders = () => {
    if (!finalOrders.length) return Swal.fire('Info', 'No orders to cancel', 'info');

    Swal.fire({
      title: 'Are you sure?',
      text: "All your orders will be permanently removed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel All',
      cancelButtonText: 'No, Keep Them',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/finalizedorders/${userId}`)
          .then(() => setFinalOrders([]))
          .catch(() => Swal.fire('Error!', 'Failed to cancel all orders.', 'error'));
      }
    });
  };

  if (loading) return <div className="text-center text-xl mt-10">Loading your orders...</div>;

  const paymentCards = [
    { country: 'Bangladesh', method: 'Bkash', color: 'bg-pink-500', icon: '/icons/bkash.png', flag: '/flags/bd.png' },
    { country: 'Bangladesh', method: 'Nagad', color: 'bg-orange-500', icon: '/icons/nagad.png', flag: '/flags/bd.png' },
    { country: 'India', method: 'Paytm', color: 'bg-blue-500', icon: '/icons/paytm.png', flag: '/flags/in.png' },
    { country: 'US', method: 'Stripe', color: 'bg-purple-500', icon: '/icons/stripe.png', flag: '/flags/us.png' },
    { country: 'US', method: 'PayPal', color: 'bg-blue-600', icon: '/icons/paypal.png', flag: '/flags/us.png' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-500">Complete Your Payment</h1>

      {/* Billing Info */}
      {checkoutData?.billing && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-orange-200 transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Billing & Delivery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Name:</strong> {checkoutData.billing.name}</p>
            <p><strong>Email:</strong> {checkoutData.billing.email}</p>
            <p><strong>Phone:</strong> {checkoutData.billing.phone}</p>
            <p><strong>Address:</strong> {checkoutData.billing.address}</p>
            {checkoutData.billing.city && <p><strong>City:</strong> {checkoutData.billing.city}</p>}
            {checkoutData.billing.postalCode && <p><strong>Postal Code:</strong> {checkoutData.billing.postalCode}</p>}
            {checkoutData.billing.country && <p><strong>Country:</strong> {checkoutData.billing.country}</p>}
          </div>
        </div>
      )}

      {/* Orders Cards */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-700">Your Orders</h2>
          {finalOrders.length > 0 && (
            <button
              onClick={handleCancelAllOrders}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow"
            >
              Cancel All
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {finalOrders.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No items found.</p>
          ) : finalOrders.map(item => (
            <div key={item._id} className="bg-gradient-to-r from-orange-50 via-white to-orange-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition relative border border-orange-100">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p>Quantity: <strong>{item.quantity}</strong></p>
              <p>Price: <strong>${item.price.toFixed(2)}</strong></p>
              <p>Total: <strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
              <button
                onClick={() => handleCancelOrder(item._id)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl shadow"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
        {finalOrders.length > 0 && (
          <div className="text-right text-2xl font-bold mt-4 text-gray-800">
            Total: ${totalAmount.toFixed(2)}
          </div>
        )}
      </div>

      {/* Payment Methods */}
   <div className="mt-16 max-w-7xl mx-auto px-4">
  <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
    Choose Your Payment Method
  </h2>

  {/* Horizontal Scroll Payment Cards */}
  <div className="flex overflow-x-auto space-x-6 px-2 py-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
    {[
      ...paymentCards,
      { country: 'UK', method: 'Apple Pay', color: 'bg-gray-900', icon: '/icons/applepay.png', flag: '/flags/uk.png' },
      { country: 'Canada', method: 'Google Pay', color: 'bg-green-600', icon: '/icons/googlepay.png', flag: '/flags/ca.png' },
      { country: 'Australia', method: 'AfterPay', color: 'bg-blue-600', icon: '/icons/afterpay.png', flag: '/flags/au.png' },
    ].map((card, idx) => (
      <div
        key={idx}
        onClick={() => setSelectedMethod(card.method)}
        className={`min-w-[220px] md:min-w-[260px] flex-shrink-0 relative cursor-pointer rounded-3xl p-8 flex flex-col items-center justify-center text-white border-4 transition-all duration-300
          ${card.color}
          ${selectedMethod === card.method ? 'border-yellow-400 scale-105 shadow-2xl' : 'border-transparent shadow-md'}
          hover:scale-105 hover:shadow-xl`}
      >
        {/* Country Flag */}
        <img
          src={card.flag}
          alt={card.country}
          className="w-12 h-12 absolute top-4 right-4 rounded-full border-2 border-white object-cover shadow-md"
        />

        {/* Payment Icon */}
        <img
          src={card.icon}
          alt={card.method}
          className="w-28 h-28 mb-4 object-contain"
        />

        {/* Method & Country */}
        <h3 className="text-2xl font-bold">{card.method}</h3>
        <p className="text-sm mt-1 text-gray-200">{card.country}</p>

        {/* Glow Effect */}
        {selectedMethod === card.method && (
          <span className="absolute inset-0 rounded-3xl border-2 border-yellow-400 animate-pulse shadow-[0_0_25px_#facc15]"></span>
        )}
      </div>
    ))}
  </div>

  {/* Pay Now Button */}
  <div className="mt-14 text-center">
    <button
      onClick={handlePayNow}
      className="px-20 w-full  py-5 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-extrabold text-xl rounded-full shadow-2xl transform transition hover:scale-105 hover:shadow-3xl duration-300"
    >
      Pay Now
    </button>
  </div>
</div>



    </div>
  );
};

export default PaymentPage;
