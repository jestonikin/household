import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import UserService from '../services/UserService';

const Household = () => {

    const [households, setHouseholds] = useState<any[]>([]);

  const getHouseholds = () => {
    UserService.getHouseholds()
      .then((data: any) => setHouseholds(data))
      // .catch((error) => console.error("Error fetching message:", error));
  }

  useEffect(() => {
    getHouseholds();
  }, []);

  const [formData, setFormData] = React.useState({
    fatherName: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    homeAddress: '',
    familyIncome: '',
    houseStatus: {
      rent: false,
      livingWithParentsOrRelative: false,
      owned: false,
      others: false,
    },
  });
 
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      houseStatus: {
        ...prev.houseStatus,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    UserService.createHousehold(formData)
      .then((data: any) => { console.log(data);
      })

    // console.log('Form Data:', formData);
  };

  return (
    <>
      {/* <Stack direction="row" columnGap={2} sx={{ my: 2 }}>
        <Button variant="text">Add</Button>
        <Button variant="text">Edit</Button>
        <Button variant="text">Delete</Button>
      </Stack> */}

      {households.map((household, index) => (
        <Grid container key={index} spacing={2} sx={{ color: '#555555', borderBottom: 'solid 1px #dddddd'}}>
          <Grid size={2} sx={{ p: 1 }}>{household.father_name}</Grid>
          <Grid size={2} sx={{ p: 1 }}>Sample</Grid>
          <Grid size={2} sx={{ p: 1 }}>Sample</Grid>
          <Grid size={2} sx={{ p: 1 }}>Sample</Grid>
          <Grid size={2} sx={{ p: 1 }}>Sample</Grid>
          <Grid size={2} sx={{ p: 1 }}>Sample</Grid>
        </Grid>
      ))}


       <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        New Household
      </Typography>

      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label="Father's Name"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Mother's Name"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Father's Occupation"
            name="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Mother's Occupation"
            name="motherOccupation"
            value={formData.motherOccupation}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Home Address"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Family Income"
            name="familyIncome"
            value={formData.familyIncome}
            onChange={handleChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid size={6}>
          <FormControl component="fieldset">
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              House Status
            </Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.houseStatus.rent}
                    onChange={handleCheckboxChange}
                    name="rent"
                  />
                }
                label="Rent"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.houseStatus.livingWithParentsOrRelative}
                    onChange={handleCheckboxChange}
                    name="livingWithParentsOrRelative"
                  />
                }
                label="Living with Parents or Relative"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.houseStatus.owned}
                    onChange={handleCheckboxChange}
                    name="owned"
                  />
                }
                label="Owned"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.houseStatus.others}
                    onChange={handleCheckboxChange}
                    name="others"
                  />
                }
                label="Others"
              />
            </FormGroup>
          </FormControl>
        </Grid>


        <Grid size={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Household;
