import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Typography, Container, Paper, Grid, Button } from '@mui/material';

const StudentDashboard = () => {
  const { user, mealStatus, logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'student') {
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
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Student Dashboard
        </Typography>
        
        <Paper 
          elevation={3} 
          className="glass-effect"
          sx={{ 
            p: 3, 
            mb: 4,
            borderRadius: 'var(--border-radius)'
          }}
        >
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Welcome, {user.name}
          </Typography>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Your QR Code
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 2,
            p: 2,
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <QRCodeSVG value={user.email} size={200} />
          </Box>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ fontStyle: 'italic' }}
          >
            Show this QR code to the admin to mark your meals
          </Typography>
        </Paper>

        <Grid container spacing={2}>
          {meals.map((meal) => (
            <Grid item xs={12} sm={6} key={meal.id}>
              <Paper
                elevation={3}
                className="glass-effect"
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: mealStatus[user.email]?.[meal.id] ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 255, 255, 0.9)',
                  color: mealStatus[user.email]?.[meal.id] ? 'success.main' : 'inherit',
                  transition: 'all 0.3s ease',
                  borderRadius: 'var(--border-radius)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--shadow-md)'
                  }
                }}
              >
                <Typography 
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1
                  }}
                >
                  {meal.label}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{
                    fontWeight: mealStatus[user.email]?.[meal.id] ? 'bold' : 'normal'
                  }}
                >
                  {mealStatus[user.email]?.[meal.id] ? '✓ Served' : 'Not Served'}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={logout}
            className="hover-lift"
            sx={{
              borderRadius: 'var(--border-radius)',
              px: 4,
              py: 1.5
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentDashboard; 