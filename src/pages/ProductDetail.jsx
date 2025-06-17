import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  useTheme,
  IconButton,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getProductById } from '../data/products';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
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
              }}
            >
              <Swiper
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Navigation, Pagination]}
                style={{ aspectRatio: '1' }}
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{ color: theme.palette.primary.main }}
            >
              {product.name}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: theme.palette.secondary.main,
                fontWeight: 600,
                mb: 4,
              }}
            >
              R$ {product.price.toFixed(2)}
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
              sx={{
                mt: 4,
                py: 2,
                fontSize: '1.1rem',
              }}
              onClick={() => window.open('https://wa.me/5511999999999?text=' + encodeURIComponent(`Olá, tenho interesse no produto ${product.name} (Código: ${product.id})`), '_blank')}
            >
              Entrar em Contato
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 