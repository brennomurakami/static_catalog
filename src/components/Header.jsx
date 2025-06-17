import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const categories = [
  'Tênis',
  'Agasalho',
  'Relógios',
  'Perfumes',
  'Camisetas',
  'Camisetas de Time',
  'Outros',
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
    handleClose();
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
        borderBottom: `3px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              gap: '16px'
            }}
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src={logo}
              alt="All Star Imports Logo"
              sx={{
                height: { xs: '40px', md: '50px' },
                width: 'auto',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
              }}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                color: theme.palette.secondary.main,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                '& span': {
                  color: '#fff',
                },
              }}
            >
              <Box component="span">ALL</Box>&nbsp;
              <Box component="span" sx={{ color: theme.palette.secondary.main }}>STAR</Box>&nbsp;
              <Box component="span">IMPORTS</Box>
            </Typography>
          </motion.div>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    bgcolor: '#000',
                    color: '#fff',
                    '& .MuiMenuItem-root': {
                      '&:hover': {
                        bgcolor: 'rgba(212, 179, 107, 0.1)',
                        color: theme.palette.secondary.main,
                      },
                    },
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 3, ml: 'auto' }}>
              {categories.map((category) => (
                <motion.div
                  key={category}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    color="inherit"
                    onClick={() => handleCategoryClick(category)}
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: '0%',
                        height: '2px',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: theme.palette.secondary.main,
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover': {
                        color: theme.palette.secondary.main,
                        backgroundColor: 'transparent',
                        '&:after': {
                          width: '80%',
                        },
                      },
                    }}
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 