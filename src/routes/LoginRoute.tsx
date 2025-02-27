import {useEffect, useState} from "react";
import {Box, Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useTokenStore} from "../stores/token-store.ts";

const LoginRoute = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const { setToken } = useTokenStore();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed.");
            }

            setToken(data.session.access_token);
            setMessage("Login successful!");
            navigate('/');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message);
            }
        }
    };

    /**
     * After GitHub auth and redirected into this webpage, the JWT will be saved into the HttpOnly Cookie.
     */
    const handleGitHubLogin = async () => {
        window.location.href = '/api/auth/github-login';
    };

    useEffect(() => {
    }, []);

    return (
        <Box className="table mx-auto mt-12">
            <Card sx={{minWidth: 450}}>
                <CardContent className={'flex items-center justify-center flex-col gap-5 mt-5'}>
                    <Typography variant={'h5'}>
                        登入帳號
                    </Typography>
                    <TextField type={'email'} id="outlined-basic" label="Email" variant="outlined" className={'w-full'}
                               onChange={(e) => setEmail(e.target.value)}/>
                    <TextField type={'password'} id="outlined-basic" label="Password" variant="outlined"
                               className={'w-full'} onChange={(e) => setPassword(e.target.value)} />
                    <Typography>
                        {message}
                    </Typography>
                </CardContent>
                <CardActions className={'flex items-center justify-center mb-10'}>
                    <Button size="medium" variant="outlined" className={'w-full'} onClick={handleLogin}>登入</Button>
                    <Button size="medium" variant="outlined" className={'w-full'} onClick={handleGitHubLogin}>GitHub 登入</Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default LoginRoute;
