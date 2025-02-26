import './App.css'
import {Route, Routes} from "react-router-dom";
import HomeRoute from "./routes/HomeRoute.tsx";
import HelloRoute from "./routes/HelloRoute.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./components/TopBar.tsx";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <TopBar />

        <Routes>
            <Route path={'/'} element={<HomeRoute />} />
            <Route path={'/hello'} element={<HelloRoute />} />
        </Routes>
    </ThemeProvider>
  )
}

export default App
