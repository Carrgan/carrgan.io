interface ICharacterRange {
  start: number;
  end: number;
}

type ICharacterType = "number" | "uppercase" | "lowercase" | "symbol";

const UPPERCASE: ICharacterRange = { start: 65, end: 90 };
const LOWERCASE: ICharacterRange = { start: 97, end: 122 };
const NUMBER: ICharacterRange = { start: 48, end: 57 };
const SYMBOL = "@#$%^&*";

const getRandomIntInclusive = (min: number, max: number) => {
  // [min, max]
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getCharacter = (value: number) => String.fromCharCode(value);

const getRandomCharacter = (type: ICharacterType) => {
  let code = 0;
  switch (type) {
    case "uppercase":
      code = getRandomIntInclusive(UPPERCASE.start, UPPERCASE.end);
      return getCharacter(code);
    case "lowercase":
      code = getRandomIntInclusive(LOWERCASE.start, LOWERCASE.end);
      return getCharacter(code);
    case "number":
      code = getRandomIntInclusive(NUMBER.start, NUMBER.end);
      return getCharacter(code);
    case "symbol":
      code = getRandomIntInclusive(0, SYMBOL.length - 1);
      return SYMBOL[code] || "";
  }
};

export const getPassword = (type: ICharacterType[], length: number): string => {
  let count = 0;
  if (type.length < 1) {
    console.warn("Type can't be empty");
    return "";
  }
  let password = "";
  while (count < length) {
    count += 1;
    const typeIndex = getRandomIntInclusive(0, type.length - 1);
    password += getRandomCharacter(type[typeIndex] as ICharacterType);
  }
  return password;
};
