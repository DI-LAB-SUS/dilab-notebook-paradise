import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import {Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import bookImg from '../assets/book-4299814_640.png'

const HomeRoute = () => {
    return (
        <Box className={'flex justify-center p-4 w-full'}>
            {/*Left side (70%)*/}
            <Box className={"flex-[7] p-4 flex flex-col gap-4 justify-center"}>
                <motion.h1
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    className="text-2xl text-center font-bold text-white drop-shadow-lg tracking-wide"
                >
                    最新上傳筆記
                </motion.h1>

                {/* Use motion.div for staggered animations */}
                {[...Array(5)].map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: index * 0.2 // Staggered delay for each card
                        }}
                    >
                        <Card sx={{ position: 'relative' }} className={'mx-14 px-6'}>
                            <Box className={'flex'}>
                                {/* Left side image */}
                                <CardMedia
                                    component="img"
                                    image={bookImg}
                                    alt="Random"
                                    sx={{
                                        width: 100,
                                    }}
                                    className={'my-auto h-full object-cover'}
                                />
                                {/* Right side content */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <CardHeader title="Card Title" />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            This is a description for the card. It provides a brief overview of the content.
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Box>
                            {/* Overlay box for likes and comments */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    bgcolor: 'rgba(62,62,62,0.7)',
                                    borderRadius: 1,
                                    p: 0.5
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                    <FavoriteIcon color="error" fontSize="small" />
                                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                                        123
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CommentIcon color="action" fontSize="small" />
                                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                                        45
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </motion.div>
                ))}
            </Box>

            {/*Right side (30%)*/}
            <div className={"flex-[3] p-4 flex justify-start"}>
                <motion.h1
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    className="text-2xl text-start font-bold text-white drop-shadow-lg tracking-wide"
                >
                    本週精選（敬請期待）
                </motion.h1>
            </div>
        </Box>
    )
}

export default HomeRoute;
