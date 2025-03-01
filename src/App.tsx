import './App.css'
import {Route, Routes} from "react-router-dom";
import HomeRoute from "./routes/HomeRoute.tsx";
import HelloRoute from "./routes/HelloRoute.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar.tsx";
import LoginRoute from "./routes/LoginRoute.tsx";
import ProtectedRoutes from './routes/ProtectedRoutes.tsx';
import UploadRoute from "./routes/UploadRoute.tsx";
import GitHubUserNotAllowedRoute from "./routes/GitHubUserNotAllowedRoute.tsx";
import FullScreenIFrameDialog from "./components/FullScreenIFrameDialog.tsx";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <ResponsiveAppBar />

        <FullScreenIFrameDialog />

        <Routes>
            <Route path={'/login'} element={<LoginRoute />} />

            {/*Login route guard.*/}
            <Route element={<ProtectedRoutes />}>
                <Route path={'/'} element={<HomeRoute />} />
                <Route path={'/hello'} element={<HelloRoute />} />
                <Route path={'/upload'} element={<UploadRoute />} />
            </Route>

            <Route path="/githubauth-usernotallowed" element={<GitHubUserNotAllowedRoute />} />
        </Routes>
    </ThemeProvider>
  )
}

export default App;
