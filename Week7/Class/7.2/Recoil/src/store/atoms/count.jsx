import { atom, selector } from "recoil";


export const countAtom = atom({
    key: "countAtom", // this is to uniquely identify this atom across the app
    default: 0
});

export const evenSelector = selector({
    key: 'evenSelector', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const count = get(countAtom);
  
      return count%2;
    },
  });