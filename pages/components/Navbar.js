import React from 'react';
import Link from 'next/link'
import { useSelector } from 'react-redux';

function Navbar() {
  const cart = useSelector(state => state.cart)
  const quantity = cart.cart.cartTotalQuantity; 
  return (
    <div>
      <nav>
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
                </li>      
            <li>{quantity > 0 ? (
              <>
              <Link href="/cart">
              <p>cart({quantity})</p>                
               </Link>
             </>
            ) : (
              <>
               <Link href="/cart">
               <p>cart</p>                
                </Link>
              </>
            
            )}
               
            </li>        
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
