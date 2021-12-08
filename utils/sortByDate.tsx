import { NewsCommentModel, NewsViewModel } from "../types/news";
import { UsersViewModel } from "../types/users";

export function sortByDate(array: UsersViewModel[]) {
  return array.sort((x: any, y: any) => {
    const a = new Date(x.creationDate);
    const b = new Date(y.creationDate);
    return a > b ? -1 : a < b ? 1 : 0;
  }); 
}; 