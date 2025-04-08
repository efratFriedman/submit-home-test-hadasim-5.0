import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../store/API';
import { Grocer } from '../models/Grocer';
import { Supplier } from '../models/Supplier';
import { loginGrocer } from './grocer/grocer';
import { loginSupplier } from './suppliers/suppliers';

function Login() {
  const [password, setPassword] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const isGrocer = useSelector((state: RootState) => state.grocer.isGrocer);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isGrocer);

    if (isGrocer) {
      const grocerData = { name: "ef", password } as Grocer;
      try {
        const grocer = await dispatch(loginGrocer(grocerData)).unwrap();
        if (grocer.httpStatus === 200) {
          navigate('/HomePageGrocer');
        } else if (grocer.httpStatus === 401) {
          alert('Incorrect password, please try again.');
          setPassword('');
        }
      } catch (err) {
        console.error('Error signing in:', err);
      }
    } else {
      const supplierData = { password, numberPhone } as Supplier;
      try {
        const supplier = await dispatch(loginSupplier(supplierData)).unwrap();
        if (supplier.httpStatus === 200) {
          navigate('/OrdersListGrocer');
        } else if (supplier.httpStatus === 401) {
          alert('Incorrect password, please try again.');
          setPassword('');
        } else {
          navigate('/SignUp');
        }
      } catch (err) {
        console.error('Error signing in:', err);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        boxShadow: 3,
        borderRadius: 2,
        width: 300,
        margin: 'auto',
        marginTop: '100px',
      }}
    >
      <h2>log in</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {!isGrocer && (
          <TextField
            label="phone number"
            type='tel'
            fullWidth
            value={numberPhone}
            onChange={(e) => setNumberPhone(e.target.value)}
            margin='normal'
          />
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          submit
        </Button>
      </form>
      {!isGrocer && (
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          dont have account? <Button variant="text" onClick={() => navigate('/SignUp')}>SignUp</Button>
        </Typography>
      )}
    </Box>
  );
}

export default Login;