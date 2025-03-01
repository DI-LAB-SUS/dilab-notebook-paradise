import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";


const GitHubUserNotAllowedRoute = () => {
    const [searchParams] = useSearchParams();
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const user = searchParams.get("username");
        if (user) {
            setUsername(user);
        }
    }, [searchParams]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="background.default"
            color="text.primary"
            className={'mt-20'}
        >
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        padding: 3,
                        borderRadius: 2,
                        textAlign: "center",
                        maxWidth: 400,
                        bgcolor: "background.paper",
                    }}
                >
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        無使用權限
                    </Typography>
                    <Typography variant="body1" color="error.main">
                        {username ? `此 GitHub 使用者在此無使用權限: ${username}` : "No username provided."}
                    </Typography>
                    <br/>
                    <Button variant="outlined" href={'/login'}>重來一次</Button>
                </Paper>
            </motion.div>
        </Box>
    );
}

export default GitHubUserNotAllowedRoute;
