import React, { useContext } from 'react';
import './CartItem.css'
import Context from '../../context';
import Button from '../Button/Button';

function CartItem({card, count, sum}) {
  const {setCart} = useContext(Context);
  const amountPerPerson = card.maxPerPerson === (card.countAddToCart || 0);
  const isDisabledCardButton = amountPerPerson;

  return (
      <li className='cart-item'>
        <p className='cart-item__wrap'>{card.productName} (
          <Button
            id={card.id}
            clickHandler={setCart}
            classButton='cart-item__button-remove'
            operation='remove'
            content='-'/>
              {count} шт
          <Button
            id={card.id}
            clickHandler={setCart}
            disabled={isDisabledCardButton}
            classButton='cart-item__button-add'
            operation='add'
            content='+'/>
              ) на сумму {sum} рублей
          <Button
            id={card.id}
            clickHandler={setCart}
            classButton='cart-item__clear'
            operation='clear'
            content='удалить'/>
        </p>
      </li>
  )
}

export default CartItem;