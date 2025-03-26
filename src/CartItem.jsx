import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseFloat(calculateTotalCost(item)), 0).toFixed(2);
  };

  // Update the number of items in the cart (for cart icon)
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Continue shopping button handler
  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent default behavior if inside a form
    if (onContinueShopping) onContinueShopping(e); // Call the function from the parent
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Remove item if quantity reaches 0
    }
  };

  // Remove item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Dispatch the removeItem action
  };

  // Calculate total cost for an individual item (quantity * unit cost)
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.replace(/[^0-9.]/g, "")); // Extract numeric value from cost string
    return (item.quantity * itemCost).toFixed(2); // Calculate total cost for the item
  };

  // Checkout functionality (for future implementation)
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2> {/* Display total cost */}
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div> {/* Display the item cost */}
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div> {/* Subtotal of the item */}
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button> {/* Delete button */}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
        {/* Optional: Display the total number of items in the cart */}
        Total Items: {calculateTotalItems()}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
