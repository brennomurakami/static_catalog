import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { getProductsByCategory } from '../data/products';

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
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
          }}
        />
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2 }}
            noWrap
          >
            {product.description}
          </Typography>
          <Typography
            variant="h6"
            color="secondary"
            sx={{ fontWeight: 600 }}
          >
            R$ {product.price.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

const ProductList = () => {
  const { category } = useParams();
  const theme = useTheme();
  const products = getProductsByCategory(category);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        sx={{
          mb: 6,
          textAlign: 'center',
          color: theme.palette.primary.main,
          textTransform: 'capitalize',
        }}
      >
        {category.replace('-', ' ')}
      </Typography>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {products.length === 0 && (
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mt: 4,
          }}
        >
          Nenhum produto encontrado nesta categoria.
        </Typography>
      )}
    </Container>
  );
};

export default ProductList; 