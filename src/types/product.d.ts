export interface Product {
    id: number;
    name: string;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: string;
    stock: number;
    rating: number;
    reviews: [
      {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
      }
    ];
}
