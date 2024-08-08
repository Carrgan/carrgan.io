export const getCryptoRandomInt = (min: number, max: number) => {
  const range = max - min + 1;
  const randomValues = new Uint32Array(1);
  window.crypto.getRandomValues(randomValues);
  return min + (randomValues[0] % range);
};
