import { useState } from 'react';
import { Box } from '@mui/material';
import Appbar from './Appbar.tsx';
import Sidebar from './Sidebar.tsx';
import Main from './Main.tsx';

const Layout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawer = (value: any) => {   
    setOpen(value);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Appbar handleDrawer={handleDrawer} />
      <Sidebar handleDrawer={handleDrawer} open={open} />
      <Main />
    </Box>
  )
}

export default Layout