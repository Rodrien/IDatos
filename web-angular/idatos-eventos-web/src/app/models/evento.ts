export interface Evento {
  id: number;
  url: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  imageUrl: string;
  latitud: string;
  longitud: string;
  dates: string[];
  categories: Categoria[];
}

export interface Categoria {
  id: number;
  name: string;
}
