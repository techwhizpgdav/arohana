import React from 'react';
import './EventsCards.css';
import { useNavigate } from 'react-router-dom';

function CategoryCards({ category, length }) {
  const navigate = useNavigate();
  const cards = [];
  const numCards = length;
  for (let i = 0; i < numCards; i++) {
    cards.push(
      <div className="col" key={i} >
        <div className="container" onClick={() => {navigate('/categories/'+ category[i].id +'/' + category[i].name)}}>
          <div className="front" style={{ backgroundImage: `url(${category[i].background_image})` }}>
            <div className="inner">
              <span className=''>{category[i].name}</span>
            </div>
          </div>
          <div className="back"  style={{ backgroundImage: `url(${category[i].background_image})` }}
          >
            <div className="inner">
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper  bg-gradient-to-tr">
      <h1></h1>
      <div className="cols">
        {cards}
      </div>
    </div>
  );
}


export default CategoryCards;
