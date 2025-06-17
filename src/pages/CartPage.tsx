import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Grid,
  IconButton,
} from '@mui/material';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';

const WHATSAPP_NUM = '5521997741525';
const placeholder = 'https://via.placeholder.com/56';

/* shuffle util ------------------------------------------------- */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CartPage() {
  const { items, total, removeItem, clearCart, changeQty } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' }); // ou 'smooth'
  }, []);

  /* link WhatsApp ---------------------------------------------- */
  const gerarMensagemWhatsApp = () => {
    const itensDescricao = items
      .map(
        (it) =>
          `• ${it.nome} x${it.quantidade} = R$ ${(it.preco * it.quantidade).toFixed(
            2,
          )}`,
      )
      .join('%0A');
    return (
      `Olá! Quero comprar os seguintes itens:%0A${itensDescricao}%0A` +
      `Subtotal: R$ ${total.toFixed(2)}`
    );
  };
  const link = `https://wa.me/${WHATSAPP_NUM}?text=${gerarMensagemWhatsApp()}`;

  /* itens relacionados */
  const idsNoCarrinho = items.map((it) => Number(it.id));
  const relacionados = shuffleArray(
    products.filter((p) => !idsNoCarrinho.includes(p.id)),
  ).slice(0, 4);

    /* render  */
  return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Carrinho de Compras
        </Typography>

        {items.length === 0 ? (
          <Typography>Seu carrinho está vazio.</Typography>
        ) : (
          <>
            {/* LISTA DO CARRINHO */}
            <List>
              {items.map((it) => (
                <ListItem
                  key={it.id}
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          changeQty(it.id, -1);
                        }}
                        disabled={it.quantidade === 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography>{it.quantidade}</Typography>

                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          changeQty(it.id, 1);
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>

                      <Button
                        color="error"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(it.id);
                        }}
                        sx={{ ml: 1 }}
                      >
                        Remover
                      </Button>
                    </Box>
                  }
                >
                  {/* avatar */}
                  <ListItemAvatar sx={{ mr: 2 }}>
                    <Avatar
                      component={RouterLink}
                      to={`/product/${it.id}`}
                      variant="square"
                      src={it.imagem || placeholder}
                      sx={{ width: 120, height: 120 }}
                    />
                  </ListItemAvatar>

                  {/* nome + preço (link) */}
                  <Box
                    component={RouterLink}
                    to={`/product/${it.id}`}
                    sx={{
                      flexGrow: 1,
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    <Typography variant="subtitle1"
                    sx={{ fontSize: '2.2rem', fontWeight: 600 }}>
                      {it.nome}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ fontSize: '1.3rem', mt: 0.5 }}
                    >
                      R$ {(it.preco * it.quantidade).toFixed(2)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>

            {/* subtotal + botões */}
            <Typography
              variant="h2"              // ex.: mesmo variant do nome
              color="text.primary"
              sx={{ fontSize: '1.6rem', mt: 3 }}   // ajuste tamanho e margem
            >
              Total: <strong>R$ {total.toFixed(2)}</strong>
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="success"
                component="a"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprar no WhatsApp
              </Button>
              <Button variant="outlined" color="error" onClick={clearCart}>
                Limpar carrinho
              </Button>
            </Box>

            {/* itens relacionados */}
            {relacionados.length > 0 && (
              <>
                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                  Itens relacionados
                </Typography>

                <Grid container spacing={4}>
                  {relacionados.map((prod) => (
                    <Grid key={prod.id} size={{ xs: 12, sm: 6, md: 3 }}>
                      <ProductCard product={prod} compact />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </>
        )}
      </Box>
    );
  }