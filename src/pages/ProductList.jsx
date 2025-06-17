import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';


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
            <Grid key={product.id} xs={12} sm={6} md={4}>
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