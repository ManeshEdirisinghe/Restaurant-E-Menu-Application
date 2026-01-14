export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary: string[];
  popular: boolean;
  spicyLevel: number;
  preparationTime: number;
}
