import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    isPlayerDiv: false,
    songPath: "",
    img: "",
    tittle:"",
    desc:"",
  },
  reducers: {
    setDiv(state) {
      state.isPlayerDiv = true;
    },
    closeDiv(state) {
      state.isPlayerDiv = false;
    },
    changeSong(state, action) {
      const PathOfSong = action.payload;
      state.songPath = PathOfSong;
    },
    changeImage(state, action) {
      const imgOfSong = action.payload;
      state.img = imgOfSong;
    },
    changeTittle(state, action) {
      const tittleOfSong = action.payload;
      state.tittle = tittleOfSong;
    },
    changeDesc(state, action) {
      const descOfSong = action.payload;
      state.desc = descOfSong;
    },
  },
});

export const playerActions=playerSlice.actions;
export default playerSlice.reducer;
