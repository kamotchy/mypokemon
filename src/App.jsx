import { useState } from "react";
import axios from "axios";

import PokemonCard from "./components/PokemonCard";
import { api } from "./global/constants";

function App() {
  const [pokemonData, setPokemonData] = useState({
    name: null,
    types: [],
    sprite: null,
    moves: [],
  });

  async function fetchPokemon(id) {
    try {
      const data = (await axios.get(`${api}/pokemon/${id}`)).data;
      return [data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async function fetchMoves(randomMoves) {
    let moves = [];
    for await (const m of randomMoves) {
      const data = (await axios.get(`${api}/move/${m}`)).data;
      moves.push({
        name: data.name,
        power: data.power,
        type: data.type.name,
      });
    }

    return moves;
  }

  async function onSubmit() {
    let id = Math.floor(Math.random() * 1008) + 1;
    const [pokemon, err] = await fetchPokemon(id);

    if (err) console.error(err);

    let pokemonName = pokemon.name;
    let pokemonSprite = pokemon.sprites.other.home.front_default;
    let pokemonType = [];
    pokemon.types.map((type) => {
      pokemonType.push({
        name: type.type.name,
      });
    });

    let randomMoves = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * pokemon.moves.length);
      let move = pokemon.moves[index].move.name;

      if (randomMoves.includes(move)) continue;
      randomMoves.push(pokemon.moves[index].move.name);
    }

    let pokemonMoves = await fetchMoves(randomMoves);

    setPokemonData({
      name: pokemonName,
      types: pokemonType,
      sprite: pokemonSprite,
      moves: pokemonMoves,
    });
  }

  console.log(pokemonData);
  return (
    <div className="App px-11 py-8">
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={onSubmit}
          className="px-3 py-1 text-white bg-dragon mt-5 rounded-md"
        >
          Random
        </button>
        {pokemonData.name ? (
          <PokemonCard pokemonData={pokemonData} />
        ) : (
          <div className="data">
            <h1 className="text-xl text-center">No random pokemon yet</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
