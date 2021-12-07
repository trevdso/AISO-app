import { atom } from "recoil";

export const devices = atom({
  key: "devices",
  default: [],
});

export const currentDevice = atom({
  key: "currentDevice",
  default: null,
});
