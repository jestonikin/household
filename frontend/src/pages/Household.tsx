import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import UserService from '../services/UserService';

const Household = () => {
  const [households, setHouseholds] = useState<any[]>([]);

  const getHouseholds = () => {
    UserService.getHouseholds()
      .then((data: any) => setHouseholds(data))
      .catch((error) => console.error('Error fetching households:', error));
  };

  useEffect(() => {
    getHouseholds();
  }, []);

  const initialFormData = {
    father_name: '',
    mother_name: '',
    father_occupation: '',
    mother_occupation: '',
    home_address: '',
    family_income: '',
    house_status: {
      rent: false,
      living_with_parents_or_relative: false,
      owned: false,
      others: false,
    },
  };

  const [formData, setFormData] = useState(initialFormData);

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
      house_status: {
        ...prev.house_status,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UserService.createHousehold(formData)
      .then(() => {
        getHouseholds();
        setFormData(initialFormData);
      })
      .catch((error) => console.error('Error creating household:', error));
  };

  return (
    <>

     <Grid
          container
          spacing={2}
          sx={{ color: '#555555', borderBottom: '1px solid #ddd', p: 1, fontWeight: 'bold' }}
        >
          <Grid size={2}>Fatther's Name</Grid>
          <Grid size={2}>Mother's Name</Grid>
          <Grid size={2}>Father's Occupation</Grid>
          <Grid size={2}>Mother's Occupation</Grid>
          <Grid size={2}>Home Address</Grid>
          <Grid size={2}>Family Income</Grid>
        </Grid>
    
      {households.map((household, index) => (
        <Grid
          container
          key={index}
          spacing={2}
          sx={{ color: '#555555', borderBottom: '1px solid #ddd', p: 1 }}
        >
          <Grid size={2}>{household.father_name}</Grid>
          <Grid size={2}>{household.mother_name}</Grid>
          <Grid size={2}>{household.father_occupation}</Grid>
          <Grid size={2}>{household.mother_occupation}</Grid>
          <Grid size={2}>{household.home_address}</Grid>
          <Grid size={2}>{household.family_income}</Grid>
        </Grid>
      ))}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          mt: 4,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          New Household
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Father's Name"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Mother's Name"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Father's Occupation"
              name="father_occupation"
              value={formData.father_occupation}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Mother's Occupation"
              name="mother_occupation"
              value={formData.mother_occupation}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Home Address"
              name="home_address"
              value={formData.home_address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Family Income"
              name="family_income"
              value={formData.family_income}
              onChange={handleChange}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <FormControl component="fieldset">
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                House Status
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.house_status.rent}
                      onChange={handleCheckboxChange}
                      name="rent"
                    />
                  }
                  label="Rent"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.house_status.living_with_parents_or_relative}
                      onChange={handleCheckboxChange}
                      name="living_with_parents_or_relative"
                    />
                  }
                  label="Living with Parents or Relative"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.house_status.owned}
                      onChange={handleCheckboxChange}
                      name="owned"
                    />
                  }
                  label="Owned"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.house_status.others}
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
