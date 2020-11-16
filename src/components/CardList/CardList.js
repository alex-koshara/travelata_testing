import React from 'react';
import './CardList.css'
import Card from '../Card/Card';

function CardList({cards, categoryCount}) {

  return (
    <section className="card-list">
      <h2>Имеющиеся категории товаров {categoryCount}</h2>
      <ul className="card-list__list">
        {cards.map((card, index) => {
          return (
            <Card
              key={card.id}
              card={card}
              index={index}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default CardList;