import AppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Button, IconButton, Popover, Stack, Toolbar } from '@mui/material';
import Text from '@mui/material/Typography';
import { useState } from 'react';
import { DrawerWidth, Routes } from '../utils/constants';
import { Logout, Menu } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

interface AppbarProps extends MuiAppBarProps {
  handleDrawer: (value: any) => void;
}

const Appbar: React.FC<AppbarProps> = ({ handleDrawer }) => {
  const location = useLocation();
  const currentRoute = Routes.find((route: any) => route.path === location.pathname);

  const storedUser = localStorage.getItem("token");
  const user = storedUser ? JSON.parse(storedUser) : null;;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  const open = Boolean(anchorEl);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { md: `calc(100% - ${DrawerWidth}px)` },
          backgroundColor: 'white',
          color: 'black',
          '& > .MuiToolbar-root': { pr: 1 }
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={() => handleDrawer(true)}
            edge="start"
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <Menu sx={{ color: 'black' }}  />
          </IconButton>

          <Text variant="subtitle1" fontWeight="medium" color="black" noWrap component="div" sx={{ flexGrow: 1, fontSize: { sm: "18px"} }}>
            { currentRoute ? currentRoute.text : 'Page Not Found' }
          </Text>

          <IconButton onClick={handleClick}>
            <Avatar sx={{ textTransform: 'uppercase', height: '35px', width: '35px' }}></Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        elevation={3}
      >
        <Box sx={{ width: '200px', py: 1 }}>
          <Stack alignItems="center" py={2} spacing={1}>
            <Avatar sx={{ bgcolor: '#5daa60', width: '50px', height: '50px', fontSize: '25px', textTransform: 'uppercase' }}>
              A
            </Avatar>

            <Text sx={{ fontSize: '12px', color: '#707070' }}>
              {!!user ? user.firstname : ''}
            </Text>
          </Stack>

          <Button
            fullWidth
            startIcon={<Logout />}
            sx={{ textTransform: 'capitalize', fontWeight: 'normal', color: '#555555', display: 'flex', justifyContent: 'flex-start', px: '20px', py: 1 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default Appbar;
