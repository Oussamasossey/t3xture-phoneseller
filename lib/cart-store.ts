"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartLine {
  key: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  color: string;
  storage: number;
  unitPrice: number;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  lastAddedKey: string | null;
  addLine: (line: Omit<CartLine, "key" | "quantity">, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

/** Same colour + storage = same line, otherwise we add a distinct row. */
const lineKey = (line: Pick<CartLine, "productId" | "color" | "storage">) =>
  `${line.productId}:${line.color}:${line.storage}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      lastAddedKey: null,
      addLine: (line, quantity = 1) =>
        set((state) => {
          const key = lineKey(line);
          const existing = state.lines.find((l) => l.key === key);
          const lines = existing
            ? state.lines.map((l) =>
                l.key === key ? { ...l, quantity: Math.min(l.quantity + quantity, 99) } : l
              )
            : [...state.lines, { ...line, key, quantity }];
          return { lines, lastAddedKey: key, isOpen: true };
        }),
      setQuantity: (key, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.key !== key)
              : state.lines.map((l) => (l.key === key ? { ...l, quantity } : l)),
        })),
      removeLine: (key) =>
        set((state) => ({ lines: state.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "phonehub-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
      // Hydration runs in an effect (see CartProvider) so SSR and the first
      // client render match exactly.
      skipHydration: true,
    }
  )
);

export const selectCartCount = (state: CartState) =>
  state.lines.reduce((sum, l) => sum + l.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
