import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import UserNotebookCard from "../components/UserNotebookCard.tsx";

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
                        <UserNotebookCard title={'Title'} author={'Author'} description={'Description'} />
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
