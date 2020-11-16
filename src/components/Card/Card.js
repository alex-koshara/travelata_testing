import React, { useContext } from 'react';
import './Card.css';
import Context from '../../context';
import Button from '../Button/Button';

function Card({card, index}) {
  const {setCart} = useContext(Context);
  const amount = card.amount - (card.countAddToCart || 0);
  const amountPerPerson = card.maxPerPerson === (card.countAddToCart || 0);
  const isDisabledCardButton = !amount || amountPerPerson;
  const isMaxPerPerson = amount > 0 && amountPerPerson;

  return (
    <li className="card">
      <p className="card__wrap">
        <b className="card__index">{index + 1}</b>
        <span className="card__text">Осталось {amount} {card.productName} по {card.price} рублей</span>
        <Button
          id={card.id}
          disabled={isDisabledCardButton}
          clickHandler={setCart}
          classButton='card__button'
          operation='add'
          content='Добавить в корзину'/>
      </p>
      {isMaxPerPerson && <span className="card__max-per-person">К сожалению данный товар ограничен за одну покупку. Вы можете приобрести не более {card.maxPerPerson} шт.</span>}
    </li>
  )
}

export default Card;