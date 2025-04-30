import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { students } from '../data/students';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QrCodeIcon from '@mui/icons-material/QrCode';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check for admin login
    if (email === 'admin123' && password === 'admin000') {
      login({ email, role: 'admin' });
      navigate('/admin');
      return;
    }

    // Check for student login
    const student = students.find(s => s.email === email && s.password === password);
    if (student) {
      login({ email: student.email, role: 'student' });
      navigate('/student');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper 
          elevation={3} 
          className="glass-effect"
          sx={{ 
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 'var(--border-radius)'
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 'bold',
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Meal Tracking System
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 2,
                borderRadius: 'var(--border-radius)'
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 'var(--border-radius)'
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 'var(--border-radius)'
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                py: 1.5,
                borderRadius: 'var(--border-radius)',
                background: 'var(--primary-gradient)',
                '&:hover': {
                  background: 'var(--primary-gradient)',
                  opacity: 0.9
                }
              }}
            >
              Sign In
            </Button>
          </Box>

          <Divider sx={{ width: '100%', my: 3 }} />

          <Box sx={{ width: '100%', mt: 2 }}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              How to Use the System
            </Typography>

            <Paper 
              elevation={0}
              sx={{ 
                p: 2,
                mb: 2,
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                borderRadius: 'var(--border-radius)'
              }}
            >
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Step 1: Login as Student" 
                    secondary="Use the student credentials below to login and get your QR code"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <QrCodeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Step 2: Save QR Code" 
                    secondary="Take a screenshot or note down your QR code from the student dashboard"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LogoutIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Step 3: Logout" 
                    secondary="Click the logout button to return to the login page"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Step 4: Login as Admin" 
                    secondary="Use the admin credentials below to login"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RestaurantIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Step 5: Scan & Mark Meal" 
                    secondary="Scan the student's QR code and select the meal to mark as served"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Step 6: Verify" 
                    secondary="Logout as admin, login as student again to verify the meal status"
                  />
                </ListItem>
              </List>
            </Paper>

            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Login Credentials
            </Typography>
            
            <Paper 
              elevation={0}
              sx={{ 
                p: 2,
                mb: 2,
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                borderRadius: 'var(--border-radius)'
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                Admin Access
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Email: admin123
              </Typography>
              <Typography variant="body2">
                Password: admin000
              </Typography>
            </Paper>

            <Paper 
              elevation={0}
              sx={{ 
                p: 2,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderRadius: 'var(--border-radius)'
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" color="success.main">
                Student Access
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Email: krn@zxc.com
              </Typography>
              <Typography variant="body2">
                Password: 1234
              </Typography>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 