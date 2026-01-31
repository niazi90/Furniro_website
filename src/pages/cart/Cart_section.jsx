import React, { useEffect, useState } from 'react';
import './Cart_section.css';
import deleteicon from '/delete.svg';
import { cartAPI } from '../../services/api';
import { getImageUrl } from '../../utils/imageUrl';

const Cart_section = () => {
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await cartAPI.get();
      const data = res.data?.data || { items: [], subtotal: 0 };

      // Compute subtotal in case backend doesn't provide it
      const computedSubtotal = data.items.reduce(
        (sum, item) => sum + ((item.price || item.product?.price || 0) * (item.quantity || 1)),
        0
      );

      setCart({ ...data, subtotal: computedSubtotal });
    } catch (err) {
      console.error('Cart fetch error:', err);
      setCart({ items: [], subtotal: 0 });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await cartAPI.removeItem(id);
      fetchCart();
    } catch (err) {
      console.error('Remove item error:', err);
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading cart...</p>;
  if (cart.items.length === 0) return <p style={{ textAlign: 'center' }}>Cart is empty</p>;

  return (
    <div className='parent_cart'>
      <div className='child_cart'>
        <ul>
          <li></li>
          <li>Product</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Subtotal</li>
          <li></li>
        </ul>

        {cart.items.map((item) => {
          const itemPrice = item.price || item.product?.price || 0;
          const itemTotal = itemPrice * (item.quantity || 1);

          return (
            <div className='cartbody' key={item._id}>
              <img
                src={getImageUrl(item.product?.image)}
                alt={item.product?.title || 'Product'}
              />
              <p>{item.product?.title || 'Product'}</p>
              <p>Rs. {itemPrice.toLocaleString()}</p>
              <p>{item.quantity || 1}</p>
              <p>Rs. {itemTotal.toLocaleString()}</p>
              <img
                className='deleteicon'
                src={deleteicon}
                alt='delete'
                onClick={() => removeItem(item._id)}
              />
            </div>
          );
        })}
      </div>

      <div className='right-cart'>
        <h1 className='carttotal'>Cart Totals</h1>
        <div className='subtotal'>
          <p>Subtotal</p>
          <p>Rs. {cart.subtotal.toLocaleString()}</p>
        </div>

        <div className='subtotal'>
          <h3>Total</h3>
          <p>Rs. {cart.subtotal.toLocaleString()}</p>
        </div>

        <Link to='/checkout'>
          <button className='checkoutbtn'>Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart_section;
