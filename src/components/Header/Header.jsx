import { useContext, useState } from "react"
import styled from "styled-components"
import { ThemeContext, themes } from "../../contexts/ThemeContext/ThemeContext";
import "@theme-toggles/react/css/DarkInner.css"
import { DarkInner } from "@theme-toggles/react"
import { loadSearchedPokemon } from "../../services/getPokemonsData";

export const Header =
     ({
          search,
          setSearch,
          setPokemons,
          selectedType,
          handleTypeChange
     }) => {
          const { theme, toggleTheme } = useContext(ThemeContext)

          const handleChange = (e) => {
               setSearch(e.target.value)
          }

          const handleKeyDown = async (e) => {
               if (e.key === 'Enter') {
                    if (e.target.value === '') {
                         return []
                    }

                    const srch = await loadSearchedPokemon(search)
                    setPokemons(srch)
               }
          }

          return (
               <HeaderStyle>
                    <Input
                         type="text"
                         value={search}
                         onChange={handleChange}
                         onKeyDown={handleKeyDown}
                         name="search"
                         placeholder="| Search Pokemon..."
                    />

                    <div style={{ display: 'flex', gap: '30px' }}>
                         <Select name="filter" id="filter" value={selectedType} onChange={handleTypeChange}>
                              <option value="all-types">All types</option>
                              <option value="1">Normal</option>
                              <option value="2">Fighting</option>
                              <option value="3">Flying</option>
                              <option value="4">Poison</option>
                              <option value="5">Ground</option>
                              <option value="6">Rock</option>
                              <option value="7">Bug</option>
                              <option value="8">Ghost</option>
                              <option value="9">Steel</option>
                              <option value="10">Fire</option>
                              <option value="11">Water</option>
                              <option value="12">Grass</option>
                              <option value="13">Electric</option>
                              <option value="14">Psychic</option>
                              <option value="15">Ice</option>
                              <option value="16">Dragon</option>
                              <option value="17">Dark</option>
                              <option value="18">Fairy</option>
                         </Select>

                         <DarkInner duration={750} toggle={toggleTheme} toggled={theme == themes.light} />
                    </div>
               </HeaderStyle>
          )
     }

const HeaderStyle = styled.header`
background-color: inherit;
width: 100%;
height: 110px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
border-top-left-radius: 30px;
border-top-right-radius: 30px;
border: 1px solid black;

.theme-toggle svg{
     transform: translateY(4px);
     height: 1.5em;
     width: 2em;
}
`

const Input = styled.input`
border: 1px solid black;
border-radius: 30px;
padding: 10px;
padding-left: 35px;
height: 35px;
background-image: url('Search.png');
background-repeat: no-repeat;
background-position: 10px center;
margin-bottom: 12px;

&:focus {
     border-color: none;
     outline: black;
   }

::placeholder {
     color: #242424;
   }
`

const Select = styled.select`
background-color: #242424;
color: #ffffff;
padding: 4px 10px;
border-radius: 30px;
display: flex;
align-items: center;
justify-content: center;
`
