export interface Outlet {
  _id: string;

  // API তে নেই → optional
  title?: string;
  city?: string;
  area?: string;
  address?: string;

  // API তে আছে
  name: string;
  status: boolean;

  mobile?: number;
  mapLink?: string;
  image?: string;
  vectorImage?: string;
  slug?: string;
  priority?: boolean;
  createdAt?: string;
}
