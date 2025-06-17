import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { featuredProducts } from '../data/products';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          bgcolor: 'background.paper',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(212, 179, 107, 0.1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            border: `1px solid ${theme.palette.secondary.main}`,
          },
        }}
      >
        <Box
          sx={{
            height: 300,
            width: '100%',
            backgroundImage: `url(${product.images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            },
            '&:hover:before': {
              opacity: 1,
            },
          }}
        />
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, minHeight: '48px' }}
          >
            {product.description.slice(0, 80)}...
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box component="span" sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
              R$
            </Box>
            {product.price.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

const Home = () => {
  const theme = useTheme();

  return (
    <Box sx={{ pb: 8 }}>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ height: '70vh', marginBottom: '4rem' }}
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                position: 'relative',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${product.images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  color: 'white',
                  p: 4,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      mb: 2,
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.secondary.main,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      fontWeight: 600,
                    }}
                  >
                    R$ {product.price.toFixed(2)}
                  </Typography>
                </motion.div>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Container maxWidth="xl">
        <Typography
          variant="h3"
          sx={{
            mb: 6,
            textAlign: 'center',
            color: theme.palette.primary.main,
            fontWeight: 700,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 3,
              backgroundColor: theme.palette.secondary.main,
            },
          }}
        >
          Produtos em Destaque
        </Typography>

        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 