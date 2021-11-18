import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'UserData',
  initialState: {
    // userData: JSON.parse(getCookie('udatxu')),
    // statusLogin: JSON.parse(getCookie('udatxu-stat'))
  },
  reducers: {
    loginStatus: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userData = action.payload
    },
  },
})

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer