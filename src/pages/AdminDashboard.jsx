import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button, 
  Grid, 
  List, 
  ListItem, 
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Fade,
  Zoom
} from '@mui/material';
import { students } from '../data/students';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const AdminDashboard = () => {
  const { user, mealStatus, updateMealStatus, logout } = useApp();
  const navigate = useNavigate();
  const [scannedStudent, setScannedStudent] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const html5QrScanner = new Html5QrcodeScanner(
      "qr-reader",
      { 
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      },
      false
    );

    html5QrScanner.render(onScanSuccess, onScanFailure);
    setScanner(html5QrScanner);

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [user, navigate]);

  const onScanSuccess = (decodedText) => {
    const student = students.find(s => s.email === decodedText);
    if (student) {
      setScannedStudent(student);
    }
  };

  const onScanFailure = (error) => {
    console.warn(`QR Code scan error: ${error}`);
  };

  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
    setShowConfirmation(true);
  };

  const handleConfirmMeal = () => {
    if (scannedStudent && selectedMeal) {
      updateMealStatus(scannedStudent.email, selectedMeal.id, true);
      setShowConfirmation(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setScannedStudent(null);
        setSelectedMeal(null);
        if (scanner) {
          scanner.clear();
          scanner.render(onScanSuccess, onScanFailure);
        }
      }, 2000);
    }
  };

  const handleCancelMeal = () => {
    setShowConfirmation(false);
    setSelectedMeal(null);
  };

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
          className="normal-text"
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 'var(--border-radius)',
            textShadow: '2px 2px 4px rgba(0, 0, 0)'
          }}
        >
          Admin Dashboard
        </Typography>

        <Fade in={showSuccess}>
          <Alert 
            severity="success" 
            className="success-message"
            sx={{ 
              mb: 2,
              position: 'fixed',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              minWidth: 300
            }}
          >
            Meal has been successfully marked as served!
          </Alert>
        </Fade>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              className="glass-effect qr-scanner-container"
              sx={{ 
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
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
                QR Code Scanner
              </Typography>
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div id="qr-reader"></div>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Zoom in={!!scannedStudent}>
              <Paper 
                elevation={3} 
                className="glass-effect"
                sx={{ 
                  p: 3,
                  height: '100%',
                  minHeight: 400
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
                  Scanned Student
                </Typography>
                {scannedStudent ? (
                  <>
                    <List>
                      <ListItem 
                        className="hover-lift"
                        sx={{
                          mb: 1,
                          borderRadius: 'var(--border-radius)'
                        }}
                      >
                        <ListItemText
                          primary="Name"
                          secondary={scannedStudent.name}
                          primaryTypographyProps={{
                            fontWeight: 'bold',
                            color: 'primary.main'
                          }}
                        />
                      </ListItem>
                      <ListItem
                        className="hover-lift"
                        sx={{
                          mb: 1,
                          borderRadius: 'var(--border-radius)'
                        }}
                      >
                        <ListItemText
                          primary="Email"
                          secondary={scannedStudent.email}
                          primaryTypographyProps={{
                            fontWeight: 'bold',
                            color: 'primary.main'
                          }}
                        />
                      </ListItem>
                    </List>

                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        mt: 3, 
                        mb: 2,
                        fontWeight: 'bold',
                        color: 'primary.main'
                      }}
                    >
                      Select Meal to Serve
                    </Typography>
                    <Grid container spacing={2}>
                      {meals.map((meal) => {
                        const isServed = mealStatus[scannedStudent.email]?.[meal.id] || false;
                        return (
                          <Grid item xs={12} key={meal.id}>
                            <Button
                              fullWidth
                              variant={isServed ? "contained" : "outlined"}
                              color={isServed ? "success" : "primary"}
                              onClick={() => !isServed && handleMealSelect(meal)}
                              startIcon={isServed ? <CheckCircleIcon /> : <CancelIcon />}
                              disabled={isServed}
                              className={`meal-button ${isServed ? 'served' : ''}`}
                              sx={{
                                py: 1.5,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textTransform: 'none',
                                borderRadius: 'var(--border-radius)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: 'var(--shadow-md)'
                                }
                              }}
                            >
                              <Typography variant="body1">{meal.label}</Typography>
                              <Typography variant="body2">
                                {isServed ? 'Served' : 'Not Served'}
                              </Typography>
                            </Button>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </>
                ) : (
                  <Box 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography 
                      color="text.secondary"
                      sx={{
                        textAlign: 'center',
                        py: 4,
                        fontStyle: 'italic',
                        fontSize: '1.1rem'
                      }}
                    >
                      Scan a student's QR code to view their information
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Zoom>
          </Grid>
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

      <Dialog
        open={showConfirmation}
        onClose={handleCancelMeal}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          className: 'glass-effect',
          sx: {
            borderRadius: 'var(--border-radius)'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            color: 'primary.main', 
            fontWeight: 'bold',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Confirm Meal Service
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to mark {selectedMeal?.label} as served for {scannedStudent?.name}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCancelMeal} 
            color="primary"
            className="hover-lift"
            sx={{
              borderRadius: 'var(--border-radius)',
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmMeal} 
            color="primary" 
            variant="contained"
            className="hover-lift"
            sx={{
              borderRadius: 'var(--border-radius)',
              px: 3
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 