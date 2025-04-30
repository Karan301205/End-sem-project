import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Typography, Container, Paper, Grid, Button } from '@mui/material';

const StudentDashboard = () => {
  const { user, mealStatus, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const meals = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'dinner', label: 'Dinner' }
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Student Dashboard
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your QR Code
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <QRCodeSVG value={user.email} size={200} />
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            Show this QR code to the admin to mark your meals
          </Typography>
        </Paper>

        <Grid container spacing={2}>
          {meals.map((meal) => (
            <Grid item xs={12} sm={6} key={meal.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: mealStatus[user.email]?.[meal.id] ? '#4caf50' : '#f5f5f5',
                  color: mealStatus[user.email]?.[meal.id] ? 'white' : 'inherit',
                  transition: 'all 0.3s ease'
                }}
              >
                <Typography variant="h6">{meal.label}</Typography>
                <Typography variant="body2">
                  {mealStatus[user.email]?.[meal.id] ? 'Served' : 'Not Served'}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="outlined" color="primary" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentDashboard; 