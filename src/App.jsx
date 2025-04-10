import { createGlobalStyle } from "styled-components"
import { ThemeProvider } from "./contexts/ThemeContext/ThemeContext"
import { AppRoutes } from "./pages/routes.jsx"

function App() {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <AppRoutes />
      </ThemeProvider>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
  color: inherit;
  border: none;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: #242424;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  background-color: inherit;
}
`

export default App
