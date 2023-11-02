export const formatterNumber = (value: number) => {
  return parseFloat(String(value / 1000000000000000000))
}