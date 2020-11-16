import React from 'react';
import CartItem from '../CartItem/CartItem';
import './Cart.css';
const plural = require('plural-ru');

function Cart({cards}) {
  const cardsToCart = cards.filter(card => card.countAddToCart);
  const cartSum = cardsToCart.reduce((sum, card) => {
    return sum + (card.countAddToCart * card.price)
  }, 0);
  const cardCount = cardsToCart.reduce((sum, card) => {
    return sum + card.countAddToCart
  }, 0)

  return (
    <div className="cart">
      {
        cardsToCart.length
        ? (
            <>
              <h2>В корзине {cardCount} {plural(cardCount, 'товар', 'товара', 'товаров')} на сумму {cartSum} рублей</h2>
              <ol>
                {
                  cardsToCart.map((card, index) => {
                  return <CartItem
                            key={card.id}
                            card={card}
                            index={index}
                            count={card.countAddToCart}
                            sum={card.price * card.countAddToCart}
                          />
                  })
                }
              </ol>
            </>
          )
        : <p>Корзина пуста</p>
      }
    </div>
  )
}

export default Cart;