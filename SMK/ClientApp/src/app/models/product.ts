import { Categories } from "./categories.enum";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imagesPath: string;
  category: string;
}
