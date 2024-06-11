export default (
  x: number,
  y: number
): { xPercentage: number; yPercentage: number } | null => {
  if (x === 0 && y === 0) {
    return null;
  }

  const total = x + y;
  const xPercentage = (x / total) * 100;
  const yPercentage = (y / total) * 100;

  return { xPercentage, yPercentage };
};
