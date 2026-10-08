"use client";

import { useEffect } from "react";
import { useCartStore, selectCartCount, selectCartSubtotal, type CartLine } from "@/lib/cart-store";

/**
 * Cart state is persisted to localStorage, but rehydration is deferred until
 * after mount so server HTML and the first client render stay identical.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);
  return <>{children}</>;
}

export function useCartOpen() {
  return useCartStore((s) => s.isOpen);
}

export function useCartLines(): CartLine[] {
  return useCartStore((s) => s.lines);
}

export function useCartCount(): number {
  return useCartStore(selectCartCount);
}

export function useCartSubtotal(): number {
  return useCartStore(selectCartSubtotal);
}

export function useCartActions() {
  const addLine = useCartStore((s) => s.addLine);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const clear = useCartStore((s) => s.clear);
  const open = useCartStore((s) => s.open);
  const close = useCartStore((s) => s.close);
  return { addLine, setQuantity, removeLine, clear, open, close };
}
