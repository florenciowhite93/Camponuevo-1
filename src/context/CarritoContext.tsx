"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { Producto, CarritoItem } from "@/types";

interface CarritoState {
  items: CarritoItem[];
  isOpen: boolean;
}

type CarritoAction =
  | { type: "ADD_ITEM"; producto: Producto; cantidad?: number }
  | { type: "REMOVE_ITEM"; productoId: string }
  | { type: "UPDATE_CANTIDAD"; productoId: string; cantidad: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; items: CarritoItem[] };

const initialState: CarritoState = {
  items: [],
  isOpen: false,
};

function carritoReducer(state: CarritoState, action: CarritoAction): CarritoState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.producto.id === action.producto.id
      );
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex].cantidad += action.cantidad || 1;
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { producto: action.producto, cantidad: action.cantidad || 1 },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.producto.id !== action.productoId
        ),
      };
    case "UPDATE_CANTIDAD": {
      if (action.cantidad <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.producto.id !== action.productoId
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.producto.id === action.productoId
            ? { ...item, cantidad: action.cantidad }
            : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "LOAD_CART":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

interface CarritoContextType {
  items: CarritoItem[];
  isOpen: boolean;
  addItem: (producto: Producto, cantidad?: number) => void;
  removeItem: (productoId: string) => void;
  updateCantidad: (productoId: string, cantidad: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrecio: number;
  totalIva: number;
  totalConIva: number;
}

const IVA_RATE = 0.21;
const MAX_CANTIDAD = 99;

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

function sanitizeCartItems(items: unknown): CarritoItem[] {
  if (!Array.isArray(items)) return [];
  
  return items
    .filter((item): item is CarritoItem => {
      return (
        item !== null &&
        typeof item === 'object' &&
        typeof item.producto === 'object' &&
        item.producto !== null &&
        typeof item.producto.id === 'string' &&
        typeof item.cantidad === 'number' &&
        item.cantidad > 0
      );
    })
    .map((item) => ({
      producto: item.producto,
      cantidad: Math.min(Math.max(1, item.cantidad), MAX_CANTIDAD),
    }));
}

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(carritoReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("camponuevo_cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const items = sanitizeCartItems(parsed);
        dispatch({ type: "LOAD_CART", items });
      } catch (e) {
        console.error("Error loading cart:", e);
        localStorage.removeItem("camponuevo_cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("camponuevo_cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (producto: Producto, cantidad?: number) => {
    const safeCantidad = Math.min(cantidad || 1, MAX_CANTIDAD);
    dispatch({ type: "ADD_ITEM", producto, cantidad: safeCantidad });
    dispatch({ type: "OPEN_CART" });
  };

  const removeItem = (productoId: string) => {
    dispatch({ type: "REMOVE_ITEM", productoId });
  };

  const updateCantidad = (productoId: string, cantidad: number) => {
    const safeCantidad = Math.min(Math.max(0, cantidad), MAX_CANTIDAD);
    dispatch({ type: "UPDATE_CANTIDAD", productoId, cantidad: safeCantidad });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const openCart = () => {
    dispatch({ type: "OPEN_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrecio = state.items.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0
  );
  const totalIva = totalPrecio * IVA_RATE;
  const totalConIva = totalPrecio + totalIva;

  return (
    <CarritoContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateCantidad,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        totalItems,
        totalPrecio,
        totalIva,
        totalConIva,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error("useCarrito must be used within a CarritoProvider");
  }
  return context;
}
