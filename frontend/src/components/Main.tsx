import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Users from '../pages/Users';
import Household from '../pages/Household';
import Login from '../pages/Household';
import { Box, Container, Toolbar } from '@mui/material';


const Main = () => (
  <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh' }}>
    <Toolbar />

    <Container maxWidth="xl" sx={{ pt: 2, pb: 3 }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/household" element={<Household />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Suspense>
    </Container>
  </Box>
);

export default Main;
