import "./Game.css";
import { CARD_POOL } from "../constants";
import { pickCards } from "./pokemon";

export default function Game({
  pokemon,
  setPokemon,
  score,
  setScore,
  setGameStatus,
  hiScore,
  setHiScore,
  round,
  setRound,
}) {
  function handleClick(e) {
    const clicked = pokemon.find((card) => card.id === e.target.dataset.id);

    // Increments round to trigger re-render
    setRound(round + 1);

    if (clicked.isSelected) {
      setGameStatus("lose");
    } else {
      if (score === CARD_POOL - 1) setGameStatus("win");
      if (score + 1 > hiScore) setHiScore(score + 1);

      clicked.isSelected = true;
      setScore(score + 1);
      setPokemon(pokemon);
    }
  }

  const cards = pickCards(pokemon).map((card) => (
    <button
      key={card.id}
      type="button"
      onClick={handleClick}
      className="card-button"
    >
      <img
        src={card.images.large}
        alt={card.name}
        data-id={card.id}
        className="card"
      />
    </button>
  ));

  return (
    <div className="cards" key={round}>
      {cards}
    </div>
  );
}
