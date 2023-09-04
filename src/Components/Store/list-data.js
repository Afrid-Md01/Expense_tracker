import { createSlice } from "@reduxjs/toolkit";

const initialListState = {
  Expenses: [],
  totalAmount: 0,
  editingId: null,
};

const list_dataSlice = createSlice({
  name: "list_data",
  initialState: initialListState,
  reducers: {
    addExpense(state, action) {

        const existingItem = state.Expenses.find((expense) => expense.id === action.payload.id);

        if(existingItem){
        }
        else{
          state.totalAmount =
          state.totalAmount + Number(action.payload.expense.amount);
          const updatedItems = state.Expenses.concat({
            ...action.payload.expense,
            id: action.payload.id,
          });
    
          state.Expenses = updatedItems;
        }
    },
    removeExpense(state, action) {
      const existingCartItemIndex = state.Expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const existingItem = state.Expenses[existingCartItemIndex];

      const updatedtotalAmount =
        state.totalAmount - Number(existingItem.amount);

      const updatedItems = state.Expenses.filter(
        (expense) => expense.id !== action.payload.id
      );

      state.Expenses = updatedItems;
      state.totalAmount = updatedtotalAmount;
    },
    clearOnLogout(state) {
      state.Expenses = [];
      state.totalAmount = 0;
      state.editingId = null;
    },

    editingIdHandler(state, action) {
      state.editingId = action.payload.id;
    },

    clearEditingId(state) {
      state.editingId = null;
    },
  },
});

export const list_dataActions = list_dataSlice.actions;
export default list_dataSlice.reducer;
