export const splitArray = <T,>(array: T[], subNum: number) => {
  let index = 0;
  const newArray: T[][] = [];
  while (index < array.length - 1) {
    newArray.push(array.slice(index, (index += subNum)));
  }
  return newArray;
};
