import { CARD_POOL, DISPLAYED_CARDS } from "../constants";

export default function randomizePokemon(pokemonData) {
  const ids = [];

  while (ids.length < CARD_POOL) {
    const id = Math.floor(Math.random() * 69);
    if (!ids.includes(id)) ids.push(id);
  }

  const random = ids.map((id) => {
    const pokemon = pokemonData.data[id];
    return {
      ...pokemon,
      isSelected: false,
    };
  });

  return random;
}

export function reset(pokemon) {
  pokemon.forEach((card) => {
    card.isSelected = false;
  });
}

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

export function pickCards(pokemon) {
  const shuffled = shuffle(pokemon);
  const half = shuffled.slice(0, DISPLAYED_CARDS);

  // Checks for an unselected card in the subarray and displays the other subarray if all selected
  const picked = half.some((card) => card.isSelected === false)
    ? half
    : shuffled.slice(DISPLAYED_CARDS);

  return picked;
}
