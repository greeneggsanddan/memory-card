import { useState, useEffect } from "react";
import "./App.css";
import randomizePokemon from "./components/pokemon";
import Game from "./components/Game";
import Modal from "./components/Modal";
import cardback from "./assets/cardback.jpg";

export default function App() {
  const [pokemon, setPokemon] = useState(null);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [round, setRound] = useState(0);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const response = await fetch(
          "https://api.pokemontcg.io/v2/cards?q=set.id:base1+supertype:Pok%C3%A9mon",
          { mode: "cors" },
        );
        const pokemonData = await response.json();
        const random = randomizePokemon(pokemonData);
        if (mounted) setPokemon(random);
      } catch (error) {
        alert(`Error: ${error}`);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container">
      <div className="title">PokéMemory</div>
      <div className="description">
        Try to catch them all! You can only pick a card once.
      </div>
      {pokemon ? (
        <Game
          pokemon={pokemon}
          setPokemon={setPokemon}
          score={score}
          setScore={setScore}
          setGameStatus={setGameStatus}
          hiScore={hiScore}
          setHiScore={setHiScore}
          round={round}
          setRound={setRound}
        />
      ) : (
        <div className="cards">
          <img className="card-back" src={cardback} alt="" />
          <img className="card-back" src={cardback} alt="" />
          <img className="card-back" src={cardback} alt="" />
          <img className="card-back" src={cardback} alt="" />
          <img className="card-back" src={cardback} alt="" />
        </div>
      )}
      <div className="scores">
        <div className="score">Score: {score}</div>
        <div className="hi-score">Hi-score: {hiScore}</div>
      </div>
      {gameStatus === "win" || gameStatus === "lose" ? (
        <Modal
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          score={score}
          setScore={setScore}
          pokemon={pokemon}
          setPokemon={setPokemon}
          round={round}
          setRound={setRound}
        />
      ) : (
        ""
      )}
    </div>
  );
}
