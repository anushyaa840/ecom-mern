import React from 'react';

function Cart({ cartItems, removeFromCart }) {
  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart!</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <button className="btn remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
