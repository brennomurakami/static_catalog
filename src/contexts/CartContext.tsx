import { createContext, useContext, useState, ReactNode } from 'react';

/* ---------- Tipos ---------- */
export interface CartItem {
  id: string | number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string | number) => void;
  changeQty: (id: string | number, delta: number) => void;
  clearCart: () => void;
  total: number;
}

/* ---------- Contexto ---------- */
const CartContext = createContext<CartContextType | undefined>(undefined);

/* Hook de acesso */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider');
  return ctx;
}

/* ---------- Provider ---------- */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  /* adiciona ou soma quantidade */
  function addItem(item: CartItem) {
    setItems((prev) => {
      const existente = prev.find((i) => i.id === item.id);
      if (existente) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantidade: i.quantidade + item.quantidade }
            : i,
        );
      }
      return [...prev, item];
    });
  }


  function changeQty(id: string | number, delta: number) {
    setItems(prev =>
      prev
        .map(it =>
          it.id === Number(id)
            ? { ...it, quantidade: it.quantidade + delta }
            : it,
        )
        .filter(it => it.quantidade > 0),
    );
  }

  function removeItem(id: string | number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce(
    (soma, it) => soma + it.preco * it.quantidade,
    0,
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, changeQty, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
