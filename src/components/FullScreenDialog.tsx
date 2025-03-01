import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            筆記瀏覽器
                        </Typography>
                    </Toolbar>
                </AppBar>
                <iframe src="/api/upload/default-sites/upload-webpage-tut" title="description" className={'h-full'}></iframe>
                {/*<List>*/}
                {/*    <ListItemButton>*/}
                {/*        <ListItemText primary="Phone ringtone" secondary="Titania" />*/}
                {/*    </ListItemButton>*/}
                {/*    <Divider />*/}
                {/*    <ListItemButton>*/}
                {/*        <ListItemText*/}
                {/*            primary="Default notification ringtone"*/}
                {/*            secondary="Tethys"*/}
                {/*        />*/}
                {/*    </ListItemButton>*/}
                {/*</List>*/}
            </Dialog>
        </React.Fragment>
    );
}
