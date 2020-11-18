import React, { useEffect } from 'react';
import './App.css';
import Button from './components/Button/Button';
import CardList from './components/CardList/CardList'
import Cart from './components/Cart/Cart';
import Context from './context';
import { storage, clearStorage } from './utils/storage';

const MIN_COUNT_CARD = 0;
const LIMIT_CARDS = 5;
const URL = 'https://my-json-server.typicode.com';
const GITHUB_DB = 'alex-koshara/travelata_testing/products';

function App() {
  const [cards, setCards] = React.useState(storage('cards') || []);
  const [loading, setLoading] = React.useState(true);
  const [categoryCount, setCategoryCount] = React.useState(0);

  function recalculateCategoty(cards) {
    return cards.filter(card => {
      return checkAmount(card);
    }).length;
  }

  function checkAmount(card) {
    const cartCount = card.countAddToCart || 0;
    return (card.amount - cartCount) > 0 && (card.maxPerPerson - cartCount) > 0;
  }

  function setAppDefaultSettings(cards) {
    setCards(cards);
    setCategoryCount(recalculateCategoty(cards));
    setLoading(false);
  }

  useEffect(() => {
    if (cards.length) {
      setAppDefaultSettings(cards);
    } else {
      fetch(`${URL}/${GITHUB_DB}?_limit=${LIMIT_CARDS}`)
        .then(response => response.json())
        .then(cards => {
          setAppDefaultSettings(cards);
        })
    }
  }, [])

  useEffect(() => {
    setCategoryCount(recalculateCategoty(cards))
    setCards(cards)

    storage('cards', cards);
  }, [cards])

  function setCountCardToCart(card, operation) {
    card.countAddToCart = card.countAddToCart || MIN_COUNT_CARD;
    switch (operation) {
      case 'add':
        return card.countAddToCart++;
      case 'remove':
        return card.countAddToCart--;
      case 'clear':
        return card.countAddToCart = 0;
      default:
        return card.countAddToCart = 0;;
    }
  }

  function getCurrentCard(cards, id) {
    return cards.find(card => card.id === id);
  }

  function setCart(id, operation) {
    const currentCard = getCurrentCard(cards, id);
    setCountCardToCart(currentCard, operation);

    setCards(cards.map(card => {
      if (card.id === currentCard.id) {
        cards.countAddToCart = currentCard.countAddToCart;
      }

      return card;
    }))
  }

  return (
    <Context.Provider value={{ setCart }}>
      <div className='container'>
        {
          cards.length
          ? (<div className='main'>
              <CardList cards={cards} categoryCount={categoryCount} />
              <Cart cards={cards} />
              <Button
                  clickHandler={clearStorage}
                  classButton='button--clear'
                  operation='clear'
                  content='Очистить localStorage'/>
            </div>)
          : (loading ? null : <p>No cards</p>)
        }
      </div>
    </Context.Provider>
  );
}

export default App;
