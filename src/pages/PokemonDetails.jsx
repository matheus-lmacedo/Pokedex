import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { ThemeContext, themes } from "../contexts/ThemeContext/ThemeContext"
import styled from "styled-components"

async function getDetails(id) {
     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)

     const data = response.data;
     async function getName() {
          const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
          return pokemonName
     }

     async function getId() {
          const pokemonId = data.id.toString().padStart(3, '0')
          return pokemonId
     }

     async function getSprites() {
          const pokemonSprite = data.sprites.other['official-artwork'].front_default
          return pokemonSprite
     }

     async function getText() {
          const result = await axios.get(data.species.url)
          return result.data['flavor_text_entries'][0].flavor_text.
               replace(/\n/g, ' ').replace(/\f/g, ' ').trim().replace('é', 'E');
     }

     async function getCategory() {
          const result = await axios.get(data.species.url)
          return result.data.genera[7].genus.replace(' Pokémon', '');
     }

     async function getTypes() {
          const pokemonTypes = data.types
               .map(type => type.type.name)
               .map(type => type.charAt(0).toUpperCase() + type.slice(1));

          return pokemonTypes;
     }

     async function getAbilities() {
          const pokemonAbilities = data.abilities[0].ability.name.charAt(0).toUpperCase() +
               data.abilities[0].ability.name.slice(1);
          return pokemonAbilities
     }

     async function getHeight() {
          const pokemonHeight = (data.height / 10).toFixed(1).replace('.', ',');
          return pokemonHeight
     }

     async function getWeight() {
          const pokemonWeight = (data.weight / 10).toFixed(1).replace('.', ',');
          return pokemonWeight
     }

     const pokemonText = await getText()
     const pokemonTypes = await getTypes()
     const pokemonName = await getName()
     const pokemonId = await getId()
     const pokemonSprites = await getSprites()
     const pokemonCategory = await getCategory()
     const pokemonHeight = await getHeight()
     const pokemonWeight = await getWeight()
     const pokemonAbilities = await getAbilities()


     const results = {
          name: pokemonName,
          id: pokemonId,
          types: pokemonTypes,
          text: pokemonText,
          sprites: pokemonSprites,
          category: pokemonCategory,
          height: pokemonHeight,
          weight: pokemonWeight,
          ability: pokemonAbilities
     }

     return results;
}

export const PokemonDetails = () => {
     const [pokemon, setPokemon] = useState({})
     const [loading, setLoading] = useState(true)
     const { theme } = useContext(ThemeContext)
     const { id } = useParams()

     const formattedId = parseInt(id, 10).toString();

     useEffect(() => {
          setLoading(true)
          async function fetchDetails() {
               const pokemon = await getDetails(formattedId)
               setPokemon(pokemon)
               setLoading(false)
          }

          fetchDetails()
     }, [formattedId])

     const navigate = useNavigate();

     const handleBackClick = () => {
          navigate('/');
          window.location.reload();
     };

     return (
          <Main style={{ backgroundColor: theme.background, color: theme.color }}>
               {loading ? (
                    <div>Loading...</div>
               ) : (
                    <Container>
                         <Header>
                              <Link to='/' onClick={handleBackClick}>
                                   <img style={{
                                        backgroundColor: 'inherit',
                                        position: 'absolute',
                                        zIndex: '1',
                                        top: '10px',
                                        left: '15px'
                                   }}
                                        src='/Arrow.png' />
                              </Link>


                              <Div type={pokemon.types[0]}>
                                   <img style={{ width: '150px' }}
                                        src={pokemon.sprites}
                                        alt={pokemon.name}
                                   />
                              </Div>

                         </Header>

                         <div className="pokemon-info">
                              <h1>{pokemon.name}</h1>
                              <p>{`N° ${pokemon.id}`}</p>

                              <div className="element-container">
                                   {pokemon.types.map((type, index) => {
                                        return (
                                             <Type key={index} type={type}>{type}</Type>
                                        )
                                   })}
                              </div>

                              <div>
                                   <p style={{
                                        marginBottom: '20px',
                                        borderBottom: '1px solid black',
                                        paddingBottom: '20px',
                                        color: themes.color
                                   }}>{pokemon.text}</p>

                                   <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '10px' }}>
                                        <div>
                                             <p style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  gap: '5px',
                                                  marginBottom: '5px',
                                                  fontSize: '12px',
                                             }}>

                                                  <img src='/Weight.png' /> WEIGHT</p>

                                             <P>{`${pokemon.weight} kg`}</P>
                                        </div>

                                        <div>
                                             <p style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  gap: '5px',
                                                  marginBottom: '5px',
                                                  fontSize: '12px',
                                             }}>

                                                  <img src="/Height.png" /> HEIGHT</p>

                                             <P>{`${pokemon.height} m`}</P>
                                        </div>
                                   </div>

                                   <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '10px' }}>
                                        <div>
                                             <p style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  gap: '5px',
                                                  marginBottom: '5px',
                                                  fontSize: '12px',
                                             }}>
                                                  <img src="/Category.png" /> CATEGORY</p>

                                             <P>{pokemon.category}</P>
                                        </div>

                                        <div>
                                             <p style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  gap: '5px',
                                                  marginBottom: '5px',
                                                  fontSize: '12px',
                                             }}>
                                                  <img src="/Ability.png" /> ABILITY</p>

                                             <P>{pokemon.ability}</P>
                                        </div>
                                   </div>
                              </div>

                         </div>
                    </Container>
               )}
          </Main>
     )
}

const Main = styled.main`
margin: 50px auto;
width: 360px;
border-radius: 30px;
`

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => {
          switch (props.type) {
               case 'Grass': return '#63BC5A';
               case 'Fire': return '#FF9D55';
               case 'Water': return '#5090D6';
               case 'Electric': return '#F4D23C';
               case 'Psychic': return '#FA7179';
               case 'Poison': return '#B567CE';
               case 'Fighting': return '#CE416B';
               case 'Flying': return '#89AAE3';
               case 'Rock': return '#C5B78C';
               case 'Ground': return '#D97845';
               case 'Steel': return '#5A8EA2';
               case 'Bug': return '#91C12F';
               case 'Dark': return '#5A5465';
               case 'Normal': return '#919AA2';
               case 'Ice': return '#73CEC0';
               case 'Ghost': return '#5269AD';
               case 'Fairy': return '#EC8FE6';
               case 'Dragon': return '#0B6DC3';
               default: return '#5090D6';
          }
     }};

     background-image: ${(props) => {
          switch (props.type) {
               case 'Grass': return "url('/Grass.png')";
               case 'Fire': return "url('/Fire.png')";
               case 'Water': return "url('/Water.png')";
               case 'Electric': return "url('/Electric.png')";
               case 'Psychic': return "url('/Psychic.png')";
               case 'Poison': return "url('/Poison.png')";
               case 'Fighting': return "url('/Fighting.png')";
               case 'Flying': return "url('/Flying.png')";
               case 'Rock': return "url('/Rock.png')";
               case 'Ground': return "url('/Ground.png')";
               case 'Steel': return "url('/Steel.png')";
               case 'Bug': return "url('/Bug.png')";
               case 'Dark': return "url('/Dark.png')";
               case 'Normal': return "url('/Normal.png')";
               case 'Ice': return "url('/Ice.png')";
               case 'Ghost': return "url('/Ghost.png')";
               case 'Fairy': return "url('/Fairy.png')";
               case 'Dragon': return "url('/Dragon.png')";
               default: return "url('/default.png')";
          }
     }};

background-repeat: no-repeat;
background-position: center;
background-size: 204px 204px;

  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  height: 260px;
`;

const Container = styled.div`
background-color: inherit;
width: 100%;
height: 100%;
border-top-left-radius: 30px;
border-top-right-radius: 30px;
border-bottom-left-radius: 30px;
border-bottom-right-radius: 30px;
border: 1px solid black;

.pokemon-info {
     padding: 20px;
     display: flex;
     flex-direction: column;
     gap: 2px;
}

.pokemon-info h1 {
     font-size: 25px;
}

.pokemon-info p {
     font-size: 17px;
     margin-bottom: 20px;
}

.element-container {
     display: flex;
     align-items: center;
     gap: 20px;
     margin-bottom: 10px;
}

.element-container p{
     border-radius: 30px;
     padding: 0px 30px;
}
`

const P = styled.p`
background-color: #ffffff;
color: black;
border-radius: 15px;
border: 1px solid grey;
width: 154px;
height: 43px;
display: flex;
align-items: center;
justify-content: center;
font-weight: bolder;
`

const Type = styled.p`
  background-color: ${(props) => {
          switch (props.type) {
               case 'Grass':
                    return '#63BC5A'
               case 'Fire':
                    return '#FF9D55';
               case 'Water':
                    return '#5090D6';
               case 'Electric':
                    return '#F4D23C';
               case 'Psychic':
                    return '#FA7179';
               case 'Poison':
                    return '#B567CE';
               case 'Fighter':
                    return '#CE416B';
               case 'Flying':
                    return '#89AAE3';
               case 'Rock':
                    return '#C5B78C';
               case 'Ground':
                    return '#D97845';
               case 'Steel':
                    return '#5A8EA2';
               case 'Bug':
                    return '#91C12F';
               case 'Dark':
                    return '#5A5465';
               case 'Normal':
                    return '#919AA2';
               case 'Ice':
                    return '#73CEC0';
               case 'Ghost':
                    return '#5269AD';
               case 'Fairy':
                    return '#EC8FE6';
               case 'Dragon':
                    return '#0B6DC3';
               default:
                    return '#5090D6';
          }
     }};

     font-size: 10px;
     font-weight: bolder;
     border-radius: 30px;
`;

const Header = styled.header`
position: relative;
`
