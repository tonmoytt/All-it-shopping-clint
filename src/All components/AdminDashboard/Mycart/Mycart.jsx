// MyCart.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Authconnect } from '../../Clints-all-components/AuthincationPages/Authincation/Authincation';
import { useNavigate } from 'react-router-dom';

const Mycart = () => {
  const { currentUser } = useContext(Authconnect);
  const userId = currentUser?.uid;
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  // Fetch cart
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    axios.get(`http://localhost:5000/posts/${userId}`)
      .then(res => setCartItems(res.data.map(i => ({ ...i, quantity: 1, confirmed: false }))))
      .finally(() => setLoading(false));
  }, [userId]);

  // Remove item
  const handleRemoveItem = (id) => {
    const item = cartItems.find(i => i._id === id);
    Swal.fire({
      title: 'Remove item?',
      icon: 'warning', showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((res) => {
      if (res.isConfirmed) {
        axios.delete(`http://localhost:5000/posts/${id}`)
          .then(() => {
            setCartItems(prev => prev.filter(i => i._id !== id));
            if (item.confirmed) setCheckoutTotal(prev => prev - item.price * item.quantity);
            Swal.fire('Removed!', 'Item removed from cart', 'success');
          });
      }
    });
  };

  // Change quantity
  const handleQuantityChange = (id, type) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item._id === id) {
          const newQty = type === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
          if (item.confirmed) setCheckoutTotal(prev => prev - item.price * item.quantity + item.price * newQty);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Confirm / Cancel order
  const handleToggleOrder = async (item) => {
    try {
      if (!item.confirmed) {
        await axios.post('http://localhost:5000/confirmorder', {
          userId, productId: item._id, quantity: item.quantity
        });
        setCartItems(prev => prev.map(i => i._id === item._id ? { ...i, confirmed: true } : i));
        setCheckoutTotal(prev => prev + item.price * item.quantity);
        Swal.fire('Confirmed!', 'Order added', 'success');
      } else {
        await axios.delete(`http://localhost:5000/confirmorder/${item._id}?userId=${userId}`);
        setCartItems(prev => prev.map(i => i._id === item._id ? { ...i, confirmed: false } : i));
        setCheckoutTotal(prev => prev - item.price * item.quantity);
        Swal.fire('Canceled!', 'Order canceled', 'info');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Something went wrong', 'error');
    }
  };

  // Proceed to checkout
  const handleProceedCheckout = async () => {
    const confirmedItems = cartItems.filter(i => i.confirmed);
    if (!confirmedItems.length) return Swal.fire('No Orders', 'Please confirm at least one item', 'info');

    try {
      await axios.post('http://localhost:5000/confirmorder/finalize', {
        userId,
        orders: confirmedItems.map(i => ({   
        productId: i._id,
        name: i.name,
        description: i.description,
        image: i.image,
        quantity: i.quantity,
        price: i.price }))
      });
      Swal.fire('Success!', 'Checkout successful', 'success');
      setCartItems(prev => prev.map(i => i.confirmed ? { ...i, confirmed: false, quantity: 1 } : i));
      setCheckoutTotal(0);
      navigate('/checkout');
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Checkout failed', 'error');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!cartItems.length) return <p className="text-center mt-10 text-gray-500">Your cart is empty.</p>;

  return (
    <div className="mt-14 md:mt-20 w-11/12 md:w-9/12 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-indigo-700 text-center">My Cart</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cartItems.map(item => (
          <div key={item._id} className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-500 rounded-2xl overflow-hidden flex flex-col">
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
              <span className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full cursor-pointer hover:bg-red-700"
                onClick={() => handleRemoveItem(item._id)}>
                <FaTrash size={16} />
              </span>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm flex-grow">{item.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleQuantityChange(item._id, 'decrease')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-lg"><FaMinus /></button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item._id, 'increase')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-lg"><FaPlus /></button>
                </div>
                <span className="text-green-600 font-bold text-lg">৳{(item.price * item.quantity).toFixed(2)}</span>
              </div>

              <button onClick={() => handleToggleOrder(item)}
                className={`mt-6 w-full text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${item.confirmed ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {item.confirmed ? 'Cancel Order' : 'Confirm Order'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col md:flex-row justify-between items-center bg-indigo-50 p-6 rounded-2xl shadow-lg">
        <span className="text-xl md:text-2xl font-bold text-gray-800">Total: ৳{checkoutTotal.toFixed(2)}</span>
        <button onClick={handleProceedCheckout} className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition-transform duration-300 transform hover:scale-105">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Mycart;
