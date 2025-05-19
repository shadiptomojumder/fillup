import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface CartItem extends Omit<Product, "quantity"> {
//     id: string;
//     quantity: number;
// }

export interface ICartItem {
    id: string;
    name: string;
    price: number;
    finalPrice?: number;
    images?: string;
    stock?: number;
    count: number;
}

interface CartState {
    items: ICartItem[];
    isLoading: boolean;
}

const initialState: CartState = {
    items: [],
    isLoading: false, // Add isLoading state
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<ICartItem, "count">>) => {
            state.isLoading = true;
            const { id, name, price, finalPrice, images, stock } = action.payload;
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push({
                    id,
                    name,
                    price,
                    finalPrice,
                    images: images?.[0] || "", // Store only the first image if available
                    stock,
                    count: 1,
                });
            }
            state.isLoading = false;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.isLoading = true;
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.isLoading = false;
        },
        deleteFromCart: (state, action: PayloadAction<string>) => {
            state.isLoading = true;
            state.items = state.items.filter((item) => item.id !== action.payload); // Remove entire item
            state.isLoading = false;
        },
        updateCount: (state, action: PayloadAction<{ id: string; count: number }>) => {
            state.isLoading = true;
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.count = action.payload.count;
            }
            state.isLoading = false;
        },
        clearCart: (state) => {
            state.isLoading = true;
            state.items = [];
            state.isLoading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading, addToCart, removeFromCart, deleteFromCart, updateCount, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
