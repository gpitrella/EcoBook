import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const homeSlice = createSlice({  
  name: "home",
  initialState: {
    firstAccess: false,
    books: [],
    yourWhishBooks: [],
    yourCarBooks: [],
    bookDetail: null,
    categorySelected: "",
    productsFilterByCategory: [],
    productSelected: {},
  },
  reducers: {
    setFirstAccess: (state, action) => {
      state.firstAccess = action.payload;
    },
    setBooks: (state, action) => {
      state.books = Object.values(action.payload);
    },
    setWishBooks: (state, action) => {
      state.yourWhishBooks = action.payload;
    },
    setCarBooks: (state, action) => {
      state.yourWhishBooks = action.payload;
    },
    addBook: (state, action) => {      
      if(action.payload.status === "Wishlist") {
        state.yourWhishBooks = [ ...state.yourWhishBooks, action.payload.bookId ];
        AsyncStorage.setItem('@yourwishlists', JSON.stringify(state.yourWhishBooks));
      } else if(action.payload.status === "Shoppinglist") {
        state.yourCarBooks = [ ...state.yourCarBooks, action.payload.bookId ];
        AsyncStorage.setItem('@yourcarlists', JSON.stringify(state.yourCarBooks));
      } 
    },
    updateBook: (state, action) => {
      const index = state.yourWhishBooks.findIndex((b) => b === action.payload.bookId);
      const indexCar = state.yourCarBooks.findIndex((b) => b === action.payload.bookId);
      if (index === -1) {
        state.yourCarBooks.splice(indexCar, 1);
        state.yourWhishBooks = [ ...state.yourWhishBooks, action.payload.bookId ];
      } else if (indexCar === -1) {
        state.yourWhishBooks.splice(index, 1);
        state.yourCarBooks = [ ...state.yourCarBooks, action.payload.bookId ];
      } 
      AsyncStorage.setItem('@yourwishlists', JSON.stringify(state.yourWhishBooks));
      AsyncStorage.setItem('@yourcarlists', JSON.stringify(state.yourCarBooks));
    },
    removeBook: (state, action) => {
      const index = state.yourWhishBooks.findIndex((b) => b === action.payload.bookId);
      const indexCar = state.yourCarBooks.findIndex((b) => b === action.payload.bookId);
      if (index !== -1) state.yourWhishBooks.splice(index, 1);
      if (indexCar !== -1) state.yourCarBooks.splice(indexCar, 1);
      AsyncStorage.setItem('@yourwishlists', JSON.stringify(state.yourWhishBooks));
      AsyncStorage.setItem('@yourcarlists', JSON.stringify(state.yourCarBooks));       
    },
    publishBook: (state, action) => {
      state.books = [ ...state.books, action.payload ];
      AsyncStorage.setItem('@lists', JSON.stringify(state.books));
    },
  },
});

export const { 
  setBooks,
  setWishBooks,
  setCarBooks, 
  addBook, 
  updateBook, 
  removeBook, 
  publishBook, 
  setFirstAccess } = homeSlice.actions;

export default homeSlice.reducer;