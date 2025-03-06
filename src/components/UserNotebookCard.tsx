import {Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import bookImg from "../assets/book-4299814_640.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

export interface UserNotebookCardProps {
    id: number;
    title: string;
    owner_name: string;
    created_at: string;
    description: string;
}

export const UserNotebookCard = (props: UserNotebookCardProps) => {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }).replace(",", "");
    };

    return (
        <Card sx={{position: 'relative'}} className={'mx-14 px-6'}>
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
                <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
                    <CardHeader
                        title={props.title}
                        subheader={`By: ${props.owner_name}, ${formatDateTime(props.created_at)}`}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {props.description}
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
                <Box sx={{display: 'flex', alignItems: 'center', mb: 0.5}}>
                    <FavoriteIcon color="error" fontSize="small"/>
                    <Typography variant="caption" sx={{ml: 0.5}}>
                        123
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <CommentIcon color="action" fontSize="small"/>
                    <Typography variant="caption" sx={{ml: 0.5}}>
                        45
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
}
