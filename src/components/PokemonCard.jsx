function PokemonCard({ pokemonData }) {
  return (
    <div
      className={`pokemon-card p-5 rounded-md mt-5 shadow-xl  border-2 border-${pokemonData.types[0].name}`}
    >
      <div className="pokemon-info w-full text-center">
        <img className="w-[150px] h-[150px]" src={pokemonData.sprite} alt="" />
        <h1>{pokemonData.name}</h1>
        <div className="pokemon-types w-full py-3 space-x-1">
          {pokemonData.types.map((data, index) => {
            return (
              <span
                key={index}
                className={`rounded-md p-1   border-1 text-white bg-${data.name}`}
              >
                {data.name}
              </span>
            );
          })}
        </div>
      </div>

      {pokemonData.moves.map((data, index) => {
        return (
          <div
            key={index}
            className={`pokemon-moves p-2 w-full flex items-start mb-2 rounded-md justify-between bg-${data.type}`}
          >
            <h1 className="text-md">{data.name}</h1>
            {data.power ? <p>{data.power}</p> : <p>0</p>}
          </div>
        );
      })}
    </div>
  );
}

export default PokemonCard;
