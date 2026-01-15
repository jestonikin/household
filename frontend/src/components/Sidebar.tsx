import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import Text from '@mui/material/Typography';
import { DrawerWidth, Routes } from '../utils/constants';
import theme from '../theme';

interface Props {
  handleDrawer: (value: boolean) => void;
  open: boolean;  
}

const activeStyle = { 
  borderRadius: '2px',
  boxShadow: 'inset 4px 0 0 #ffffff',
};

const Sidebar: React.FC<Props> = ({ handleDrawer, open }) => {
  const location = useLocation();

  const DrawerComponent = (variant: 'temporary' | 'permanent', isOpen: boolean, onClose?: () => void) => (
    <Drawer
      variant={variant}
      open={isOpen}
      onClose={onClose}
      sx={{
        display: { xs: variant === 'temporary' ? 'block' : 'none', md: variant === 'permanent' ? 'block' : 'none' },
        boxSizing: 'border-box',
        '& .MuiDrawer-paper': {
          width: DrawerWidth,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        },
      }}
      slotProps={{
        root: {
          keepMounted: true,
        },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Text component={Link} color="white" to="/household" sx={{ fontSize: 20, fontWeight: 'bold', textDecoration: 'none' }}>
          DOLE
        </Text>
      </Toolbar>
      
      <List>
        {Routes.map(({ text, path, icon }) => (
          <ListItem key={path} disablePadding sx={path === location.pathname ? activeStyle : undefined}>
            <ListItemButton component={Link} to={path} sx={{ px: 3 }}>
              <ListItemIcon>{icon}</ListItemIcon>

              <ListItemText>
                <Text variant="subtitle2">{text}</Text>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <Box component="nav" sx={{ width: { md: DrawerWidth }, flexShrink: { md: 0 } }}>
      {DrawerComponent('temporary', open, () => handleDrawer(false))}
      {DrawerComponent('permanent', true)}
    </Box>
  );
};

export default Sidebar;
