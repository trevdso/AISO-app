import { atom } from "recoil";

export const userLoggedIn = atom({
  key: "userLoggedIn",
  default: false,
});
