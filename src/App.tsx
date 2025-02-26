import './App.css'
import {Route, Routes} from "react-router-dom";
import HomeRoute from "./routes/HomeRoute.tsx";
import HelloRoute from "./routes/HelloRoute.tsx";

function App() {
  return (
    <>
        <h1>???</h1>
        <Routes>
            <Route path={'/'} element={<HomeRoute />} />
            <Route path={'/hello'} element={<HelloRoute />} />
        </Routes>
    </>
  )
}

export default App
