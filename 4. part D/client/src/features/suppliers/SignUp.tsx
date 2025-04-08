import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Supplier } from '../../models/Supplier';
import { Stock } from '../../models/Stock';
import { signUpSupplier } from './suppliers';
import { AppDispatch } from '../../store/API';
import { AddStocks } from '../stocks/stocks';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddStock = () => {
    const newStock: Stock = {
      name: '',
      price: 0,
      minimumPurchase: 1,
      supplier: { name, password, companyName, numberPhone } as Supplier, // מייצרים את הספק יחד עם המידע
    };
    setStocks([...stocks, newStock]);
  };

  const handleRemoveStock = (index: number) => {
    const updatedStocks = stocks.filter((_, i) => i !== index);
    setStocks(updatedStocks);
  };

  const handleStockChange = <K extends keyof Stock>(index: number, field: K, value: Stock[K]) => {
    const updatedStocks = [...stocks];
    updatedStocks[index][field] = value;
    setStocks(updatedStocks);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const supplierData = { name, password, companyName, numberPhone } as Supplier;
    try {
      const response = await dispatch(signUpSupplier(supplierData)).unwrap();
      if (response.httpStatus === 409) {
        alert('Phone number already exists. Please choose a different one.')
        setNumberPhone('');
      }
      else if (response.httpStatus === 201) {
        const updatedStocks = stocks.map((stock) => ({
          ...stock,
          supplier: { ...stock.supplier, id: response.supplier.id },
        }));
        await dispatch(AddStocks(updatedStocks));
        alert('רישום ספק עבר בהצלחה')
        navigate('/OrdersListGrocer')
      }
    } catch (err) {
      console.log(err);
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
        marginTop: '50px',
      }}
    >
      <Typography variant="h6">Sign Up</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Phone Number"
          type="tel"
          fullWidth
          value={numberPhone}
          onChange={(e) => setNumberPhone(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Company Name"
          fullWidth
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          margin="normal"
        />

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Product List
        </Typography>

        {stocks.map((stock, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <TextField
              label="Product Name"
              fullWidth
              value={stock.name}
              onChange={(e) => handleStockChange(index, 'name', e.target.value)}
              margin="normal"
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={stock.price}
              onChange={(e) => handleStockChange(index, 'price', Number(e.target.value))}
              margin="normal"
            />
            <TextField
              label="Minimum Quantity"
              type="number"
              fullWidth
              value={stock.minimumPurchase}
              onChange={(e) => handleStockChange(index, 'minimumPurchase', Number(e.target.value))}
              margin="normal"
            />
            <Button onClick={() => handleRemoveStock(index)} variant="outlined" color="error">
              Remove Product
            </Button>
          </Box>
        ))}

        <Button onClick={handleAddStock} variant="contained" color="primary" fullWidth>
          Add Product
        </Button>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Submit Registration
        </Button>
      </form>
    </Box>
  );
}

export default SignUp;
