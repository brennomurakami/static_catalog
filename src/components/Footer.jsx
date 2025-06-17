import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'black',
        color: 'white',
        py: 6,
        borderTop: `3px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{xs: 12, md: 4}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="All Star Imports Logo"
                  sx={{
                    height: '80px',
                    width: 'auto',
                    mb: 2,
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
                  }}
                />
              </motion.div>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Sua loja de produtos importados de alta qualidade
              </Typography>
            </Box>
          </Grid>

          <Grid size={{xs: 12, md: 4}}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.secondary.main,
                mb: 2,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Categorias
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              {['Tênis', 'Agasalho', 'Relógios', 'Perfumes', 'Camisetas', 'Camisetas de Time'].map((category) => (
                <Typography
                  key={category}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      color: theme.palette.secondary.main,
                      cursor: 'pointer',
                    },
                  }}
                >
                  {category}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid size={{xs: 12, md: 4}}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.secondary.main,
                mb: 2,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Contato
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                WhatsApp: (11) 99999-9999
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Email: contato@allstarimports.com
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Instagram: @allstarimports
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.5)' }}
          >
            © {new Date().getFullYear()} All Star Imports. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 