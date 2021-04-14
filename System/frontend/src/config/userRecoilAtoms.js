import { atom } from "recoil";

export const studentAtom = atom({
  key: "studentAtom",
  default: null,
});

export const companyAtom = atom({
  key: "companyAtom",
  default: null,
});

export const practiceSuperviserAtom = atom({
  key: "practiceSuperviserAtom",
  default: null,
});
