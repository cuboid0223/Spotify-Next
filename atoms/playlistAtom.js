import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState",
  default: null,
});

// store clicked playlist id
export const playlistIdState = atom({
  key: "playlistIdState",
  default: "0La8YPuTvYmByUm88sPXSg",
});
