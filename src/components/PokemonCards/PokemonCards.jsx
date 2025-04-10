import styled from "styled-components";
import { Link } from "react-router-dom";

export const PokemonCards = ({ pokemons, loading }) => {
     return (
          <>
               <div
                    style={{
                         backgroundColor: 'inherit',
                         width: '100%',
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                         justifyContent: 'center',
                         gap: '20px',
                         padding: '10px',
                    }}>

                    {
                         loading ? (
                              <div>Loading...</div>
                         ) : (
                              pokemons.map((pokemon, index) => (
                                   pokemon && pokemon.types ? (
                                        <Link key={index} to={`/pokemon/${pokemon.id}`}>
                                             <Card key={index} type={pokemon.types[0]}>
                                                  <div className="card-info">
                                                       <h2 style={{ color: '#333333', fontSize: '12px' }}>{`N° ${pokemon.id}`}</h2>
                                                       <h1 style={{ color: 'black', fontSize: '21px', fontWeight: 'bolder' }}>{pokemon.name}</h1>
                                                       <div className="types-container">
                                                            {pokemon.types.map((type, index) => (
                                                                 <Type key={index} type={type}>{type}</Type>
                                                            ))}
                                                       </div>
                                                  </div>
                                                  <div className="pokemon-sprite">
                                                       <img style={{ width: '70px' }} src={pokemon.sprite} alt={pokemon.name} />
                                                  </div>
                                             </Card>
                                        </Link>
                                   ) : null
                              ))
                         )
                    }
               </div>
          </>
     );
};

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
color: black;
  font-size: 10px;
  font-weight: bolder;
  border-radius: 30px;
`;

const Card = styled.div`
background-color: ${(props) => {
          switch (props.type) {
               case 'Grass':
                    return '#EDF6EC';
               case 'Fire':
                    return '#FCF3EB';
               case 'Water':
                    return '#EBF1F8';
               case 'Electric':
                    return '#FBF8E9';
               case 'Psychic':
                    return '#FCEEEF';
               case 'Poison':
                    return '#F5EDF8';
               case 'Fighter':
                    return '#FCEEEF';
               case 'Flying':
                    return '#F1F4FA';
               case 'Rock':
                    return '#F7F5F1';
               case 'Ground':
                    return '#F9EFEA';
               case 'Steel':
                    return '#ECF1F3';
               case 'Bug':
                    return '#F1F6E8';
               case 'Dark':
                    return '#ECEBED';
               case 'Normal':
                    return '#F1F2F3';
               case 'Ice':
                    return '#F1FBF9';
               case 'Ghost':
                    return '#EBEDF4';
               case 'Fairy':
                    return '#FBF1FA';
               case 'Dragon':
                    return '#E4EEF6';
               default:
                    return '#EBF1F8';
          }
     }};
display: flex;
align-items: center;
justify-content: space-between;
border-radius: 15px;
transition: 0.3s ease-in-out;
cursor: pointer;
height: 102px;
width: 328px;

&:hover{
     box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
}

.card-info {
     margin-left: 10px;
     padding: 20px;
     width: 170px;
     display: flex;
     flex-direction: column;
}

.types-container {
     display: flex;
     gap: 10px;
     transform: translateY(5px);
     margin-bottom: 10px;
}

.types-container p {
     display: flex;
     align-items: center;
     justify-content: center;
     width: 50px;
     height: 20px;
     border-radius: 30px;
}

.pokemon-sprite {
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
     background-image: ${(props) => {
          switch (props.type) {
               case 'Grass':
                    return "url('Grass.png')";
               case 'Fire':
                    return "url('Fire.png')";
               case 'Water':
                    return "url('Water.png')";
               case 'Electric':
                    return "url('Electric.png')";
               case 'Psychic':
                    return "url('Psychic.png')";
               case 'Poison':
                    return "url('Poison.png')";
               case 'Fighting':
                    return "url('Fighting.png')";
               case 'Flying':
                    return "url('Flying.png')";
               case 'Rock':
                    return "url('Rock.png')";
               case 'Ground':
                    return "url('Ground.png')";
               case 'Steel':
                    return "url('Steel.png')";
               case 'Bug':
                    return "url('Bug.png')";
               case 'Dark':
                    return "url('Dark.png')";
               case 'Normal':
                    return "url('Normal.png')";
               case 'Ice':
                    return "url('Ice.png')";
               case 'Ghost':
                    return "url('Ghost.png')";
               case 'Fairy':
                    return "url('Fairy.png')";
               case 'Dragon':
                    return "url('Dragon.png')";
               default:
                    return "url('default.png')";
          }
     }};
     background-repeat: no-repeat;
     background-position: center center;
     border-radius: 15px;
     height: 102px;
     width: 126px;
     display: flex;
     align-items: center;
}

.pokemon-sprite img {
     margin: 0 auto;
}
`
