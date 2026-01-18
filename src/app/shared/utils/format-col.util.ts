export const formatColumn = (col: string): string => {
  if (!col) return '';

  return col.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str);
};
