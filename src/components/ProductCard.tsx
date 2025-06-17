import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';


interface ProductCardProps {
  product: {
    id: number | string;
    name: string;
    price: number;
    description: string;
    images: string[];
  };
  compact?: boolean;   // ? NOVO
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addItem } = useCart();

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: { y: 0, filter: 'brightness(1)' },
        hover: { y: -10, filter: 'brightness(1.05)' },
        tap:   { y: -4  },
      }}
      style={{ cursor: 'pointer', position: 'relative' }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* --- IMAGEM ------------------------------------------------ */}
      <Box
        sx={{
          height: 300,
          width: '100%',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          backgroundImage: `url(${product.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* --- CONTEÚDO -------------------------------------------- */}
      <Box
        sx={{
          p: 3,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          bgcolor: 'background.paper',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(212,179,107,0.1)',
          transition: 'border-color 0.3s',
          '&:hover': { borderColor: theme.palette.secondary.main },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, minHeight: 48 }}
        >
          {product.description.slice(0, 80)}?
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Box component="span" sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>R$</Box>
          {product.price.toFixed(2)}
        </Typography>
      </Box>

      {/* --- BOTÃO ADICIONAR (aparece só no hover) --------------- */}
      <motion.div
        variants={{
          rest:  { opacity: 0, pointerEvents: 'none', y: 10 },
          hover: { opacity: 1, pointerEvents: 'auto', y: 0 },
        }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
        }}
        onClick={(e) => {
          e.stopPropagation(); // impede navegação para detalhes
          addItem({ id: product.id, nome: product.name, preco: product.price, quantidade: 1, imagem: product.images?.[0] ?? '',});
        }}
      >
        <IconButton
          sx={{
            bgcolor: 'rgba(0,0,0,0.7)',
            '&:hover': { bgcolor: theme.palette.secondary.main },
          }}
        >
          <ShoppingCartOutlinedIcon sx={{ color: '#fff' }} />
        </IconButton>
      </motion.div>
    </motion.div>
  );
}
