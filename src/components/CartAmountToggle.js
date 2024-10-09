import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function CartAmountToggle({ amount, setDecrease, setIncrease }) {
  return (
    <div className="cart-button" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
      <div className="amount-toggle" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button onClick={() => setDecrease()} >
          <FaMinus />
        </button>
        <div className="amount-style" >{amount}</div>
        <button onClick={() => setIncrease()} style={{ padding: '10px' }}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default CartAmountToggle;
