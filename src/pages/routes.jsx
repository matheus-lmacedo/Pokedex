import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { PokemonDetails } from "./PokemonDetails"

export const AppRoutes = () => (
     <BrowserRouter>
          <Routes>
               <Route exact path="/" element={<Home />} />
               <Route exact path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
     </BrowserRouter>
)
