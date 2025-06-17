import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  useTheme,
  IconButton,
  Paper,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { getProductById } from '../data/products';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const product = getProductById(id);

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Produto não encontrado
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Voltar para Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ mb: 4 }}
        color="primary"
      >
        <ArrowBackIcon />
      </IconButton>

      <Grid container spacing={4} alignItems="flex-start">
        {/* Coluna da esquerda - Carrossel */}
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                bgcolor: 'background.paper',
                border: '1px solid rgba(212, 179, 107, 0.2)',
                maxWidth: '500px',
                margin: '0 auto',
              }}
            >
              <Swiper
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Navigation, Pagination, Thumbs]}
                style={{ 
                  aspectRatio: '1',
                }}
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        bgcolor: '#f5f5f5',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            {/* Miniaturas das imagens */}
            <Box sx={{ 
              mt: 2, 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '500px',
              margin: '0 auto',
            }}>
              {product.images.map((image, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    '&:hover': {
                      border: `2px solid ${theme.palette.secondary.main}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </Paper>
              ))}
            </Box>
          </motion.div>
        </Grid>

        {/* Coluna da direita - Informações */}
        <Grid item xs={12} md={7}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ maxWidth: '600px' }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                {product.name}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.secondary.main,
                  fontWeight: 600,
                  mb: 4,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1,
                  fontSize: { xs: '1.8rem', md: '2rem' },
                }}
              >
                <Box component="span" sx={{ fontSize: '1rem', color: 'text.secondary' }}>
                  R$
                </Box>
                {product.price.toFixed(2)}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                {product.description}
              </Typography>

              <Box
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  mb: 4,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Detalhes do Produto
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  • Categoria: {product.category}
                  <br />
                  • Produto {product.featured ? 'em destaque' : 'regular'}
                  <br />
                  • Código do produto: #{product.id}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                startIcon={<WhatsAppIcon />}
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 12px rgba(212, 179, 107, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(212, 179, 107, 0.4)',
                  },
                }}
                onClick={() => window.open('https://wa.me/5511999999999?text=' + encodeURIComponent(`Olá, tenho interesse no produto ${product.name} (Código: ${product.id})`), '_blank')}
              >
                Entrar em Contato
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 