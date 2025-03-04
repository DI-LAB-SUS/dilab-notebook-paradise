import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../stores/token-store.ts";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";

const LoginRoute = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const { token, setToken } = useTokenStore();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed.");
            }

            setToken(data.session.access_token);
            setMessage("Login successful!");
            navigate("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message);
            }
        }
    };

    // New submit handler that prevents the default behavior.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleLogin();
    };

    /**
     * After GitHub auth and redirected into this webpage, the JWT will be saved into the HttpOnly Cookie.
     */
    const handleGitHubLogin = async () => {
        window.location.href = "/api/auth/login/github";
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }} // Start fully transparent, shifted left
            animate={{ opacity: 1, x: 0 }} // Fade in & slide to position
            exit={{ opacity: 0 }} // Fade out (if unmounting)
            transition={{ duration: 0.5 }} // Animation duration
        >
            <Box className="table mx-auto mt-12">
                <Card sx={{ minWidth: 450 }}>
                    {/* Form wrapper for login inputs */}
                    <form onSubmit={handleSubmit}>
                        <CardContent className="flex items-center justify-center flex-col gap-5 mt-5">
                            <Typography variant="h5">登入帳號</Typography>
                            <TextField
                                type="email"
                                id="email"
                                label="Email"
                                variant="outlined"
                                className="w-full"
                                autoComplete={'email'}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                type="password"
                                id="password"
                                label="Password"
                                variant="outlined"
                                className="w-full"
                                autoComplete={'password'}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Typography>{message}</Typography>
                        </CardContent>
                        <CardActions className="flex flex-col items-center justify-center mb-10 gap-2">
                            <Button type="submit" size="large" variant="outlined" className="w-1/5">
                                登入
                            </Button>
                        </CardActions>
                    </form>
                    {/* Separate GitHub login action */}
                    <CardActions className="flex flex-col items-center justify-center mb-10 gap-2">
                        <IconButton aria-label="GitHub" size="large" onClick={handleGitHubLogin}>
                            <GitHubIcon fontSize="inherit" />
                        </IconButton>
                    </CardActions>
                </Card>
            </Box>
        </motion.div>
    );
};

export default LoginRoute;
