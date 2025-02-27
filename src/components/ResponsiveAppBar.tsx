import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AttractionsIcon from '@mui/icons-material/Attractions';
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

const pages = ['筆記圖書館（敬請期待）', '活動規劃（敬請期待）', '競賽儀錶板（敬請期待）'];
const settings = ['個人資料', '帳號設定', '個人分數', '登出'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSettingClick = async (setting: string) => {
        switch (setting) {
            case '個人資料':
                console.log('Navigating to Profile');
                // Navigate to profile page
                break;
            case '帳號設定':
                console.log('Navigating to Account Settings');
                // Navigate to account settings page
                break;
            case '個人分數':
                console.log('Showing personal score');
                // Show personal score
                break;
            case '登出':
                try {
                    console.log('Logging out');
                    // Include HttpOnly cookie credentials, for the token to get deleted.
                    const response = await fetch('/api/auth/logout', {credentials: 'include'});
                    if (!response.ok) {
                        throw new Error(`Logout HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json(); // Convert response to JSON
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                break;
            default:
                console.log(`Unknown setting: ${setting}`);
        }
        handleCloseUserMenu();
    };

    return (
        <motion.div
            initial={{opacity: 0, y: -50}}  // Start transparent and 50px up
            animate={{opacity: 1, y: 0}}   // Fade in and slide down
            transition={{duration: 0.5, ease: "easeOut"}}  // Smooth transition
        >
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to={'/'}>
                            <AttractionsIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        </Link>
                        <Link to={'/'}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                環球讀書天堂
                            </Typography>
                        </Link>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{display: {xs: 'block', md: 'none'}}}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography sx={{textAlign: 'center'}}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AttractionsIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            環球讀書天堂
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                                        <Typography sx={{textAlign: 'center'}}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </motion.div>
    );
}

export default ResponsiveAppBar;
