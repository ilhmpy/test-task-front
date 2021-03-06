export const sortByDate = (array: any[]) => {
  return array.sort((x: any, y: any) => {
      const a = new Date(x.creationDate);
      const b = new Date(y.creationDate);
      return a > b ? -1 : a < b ? 1 : 0;
  }); 
}; 