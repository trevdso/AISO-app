import { atom } from "recoil";

export const userLoggedIn = atom({
  key: "userLoggedIn",
  default: false,
});

export const username = atom({
  key: "username",
  default: null,
});
