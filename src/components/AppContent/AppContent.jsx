import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import styled from "styled-components";
import { Header } from "../Header/Header";
import { getPokemonsData } from "../../services/getPokemonsData";
import { PokemonCards } from "../PokemonCards/PokemonCards";
import { Footer } from "../Footer/Footer";

export const AppContent = () => {
    const { theme } = useContext(ThemeContext);
    const [amount, setAmount] = useState(5);
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true)
    const [selectedType, setSelectedType] = useState('all-types');

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            const results = await getPokemonsData(amount, selectedType);
            setLoading(false);
            return results;
        };

        const loadData = async () => {
            let results = await fetchPokemons();
            setPokemons(results);
        };

        loadData();

    }, [amount, search, selectedType]);

    return (
        <Main style={{ backgroundColor: theme.background, color: theme.color }} >
            <Header
                search={search}
                setSearch={setSearch}
                setPokemons={setPokemons}
                selectedType={selectedType}
                handleTypeChange={handleTypeChange}
            />

            <PokemonCards pokemons={pokemons} loading={loading} />
            <Footer setAmount={setAmount} />
        </Main>
    );
};

const Main = styled.main`
  margin: 50px auto;
  width: 360px;
  border-radius: 30px;
`
