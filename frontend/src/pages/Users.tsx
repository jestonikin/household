import { Grid, Paper, Stack } from '@mui/material';
import Text from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import UserService from "../services/UserService";

// interface User {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
// }

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  const getUsers = () => {
    UserService.getUsers()
      .then((data: any) => setUsers(data))
      .catch((error) => console.error("Error fetching message:", error));
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {users.map((user, index) => (
          <Grid size={3} key={index}>
            <Paper sx={{ p: 2 }}>
              <Stack rowGap={1}>
                <Grid container spacing={2}>
                  <Grid size={6}>{user.firstname}</Grid>
                  <Grid size={6}>{user.lastname}</Grid>
                </Grid>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Users