import { Button, ButtonProps } from '@mui/material';
import { useCart } from '../contexts/CartContext';

interface Props extends ButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];        // ?? agora sabemos que há imagens
  };
  quantidade?: number;
}

export default function AddToCartButton({
  product,
  quantidade = 1,
  ...btnProps    // <-- captura sx, fullWidth, color, etc.
}: Props) {
  const { addItem } = useCart();

  return (
    <Button
      variant="contained"
      color="secondary"
      {...btnProps}
      onClick={() =>
        addItem({
          id: product.id,
          nome: product.name,
          preco: product.price,
          quantidade,
          imagem: product.images?.[0] ?? '',
        })
      }
    >
      Adicionar ao carrinho
    </Button>
  );
}
