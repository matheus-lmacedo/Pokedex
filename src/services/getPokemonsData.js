import axios from "axios"

async function loadPokemons(amount, type) {
     try {
          let url = `https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=0`;
          if (type !== 'all-types') {
               url = `https://pokeapi.co/api/v2/type/${type}`;
          }
          const response = await axios.get(url);
          let pokemons = [];
          if (type === 'all-types') {
               pokemons = response.data.results.slice(0, amount);
          } else {
               pokemons = response.data.pokemon.slice(0, amount).map(pokemon => pokemon.pokemon);
          }


          return pokemons;
     } catch (error) {
          console.error("Erro ao carregar os pokémons:", error.message);
          return [];
     }
}

async function loadPokemonsId(amount, type) {
     const response = await loadPokemons(amount, type)
     const pokemonsWithId = response.map((pokemon) => {
          const url = pokemon.url
          const id = url.split('/')[6].padStart(3, '0')
          return id
     })

     return pokemonsWithId
}

async function loadPokemonsTypes(amount, type) {
     const response = await loadPokemons(amount, type)
     const pokemonTypes = await Promise.all(
          response.slice(0, amount).map(async (pokemon) => {
               const types = await axios.get(pokemon.url);
               const fetchedTypes = types.data.types;

               const typeNames = fetchedTypes.map(type => {
                    const name = type.type.name;
                    return name.charAt(0).toUpperCase() + name.slice(1);
               });

               return typeNames
          })
     );

     return pokemonTypes
}

async function loadPokemonSprites(amount, type) {
     const response = await loadPokemons(amount, type)
     const pokemonSprites = await Promise.all(
          response.slice(0, amount).map(async (pokemon) => {
               const url = await axios.get(pokemon.url)
               const sprite =
                    url.data.sprites.other['official-artwork'].front_default

               return sprite
          })
     )

     return pokemonSprites
}

export async function loadSearchedPokemon(search) {
     const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
     const data = results.data
     try {
          const pokemonUrl = data.species.url
          const pokemonName = data.species.name
          const pokemonsId = data.id
          const pokemonType = data.types.map(type => type.type).map(type => type.name)
          const pokemonSprite = data.sprites.other['official-artwork'].front_default

          const types = pokemonType.map(type => type.charAt(0).toUpperCase() + type.slice(1))
          const id = pokemonsId.toString().padStart(3, '0');

          const results = {
               name: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1),
               id: id,
               url: pokemonUrl,
               types: types,
               sprite: pokemonSprite
          }

          return [results]

     } catch (err) {
          console.error('Error fetching data', err.message)
     }
}

export async function getPokemonsData(amount, type) {
     try {
          const pokemons = await loadPokemons(amount, type)
          const pokemonsId = await loadPokemonsId(amount, type)
          const pokemonTypes = await loadPokemonsTypes(amount, type)
          const pokemonSprites = await loadPokemonSprites(amount, type)

          const results = pokemons.map((pokemon, index) => {
               return {
                    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                    url: pokemon.url,
                    id: pokemonsId[index],
                    types: pokemonTypes[index],
                    sprite: pokemonSprites[index]
               };
          });

          return results
     } catch (err) {
          console.error('Error fetching data', err.message)
          return []
     }
}
