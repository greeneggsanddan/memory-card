import "./Modal.css";
import { reset } from "./pokemon";
import { CARD_POOL } from "../constants";
import winGif from "../assets/win.gif";
import loseGif from "../assets/lose.gif";

export default function Modal({
  gameStatus,
  setGameStatus,
  score,
  setScore,
  pokemon,
  setPokemon,
  round,
  setRound,
}) {
  function playAgain() {
    setGameStatus("");
    setScore(0);
    reset(pokemon);
    setPokemon(pokemon);
    setRound(round + 1);
  }

  return (
    <div className="overlay">
      <div className="overlay-container">
        <div className="overlay-title">You {gameStatus}!</div>
        <img
          className="gif"
          src={gameStatus === "win" ? winGif : loseGif}
          alt=""
        />
        <div className="overlay-text">
          You caught {score} out of {CARD_POOL} Pokémon.
        </div>
        <button className="play-again" type="button" onClick={playAgain}>
          Play again
        </button>
      </div>
    </div>
  );
}
