import { useState, useEffect } from "react";
import Carousel from "./components/Carousel";
import "./App.css";

interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  stock: number;
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
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setFilteredProducts(data.products);
          getCategories(data.products);
        });
    };
    fetchData();
  }, [setCategories, setFilteredProducts]);
  console.log(products);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  //handle filter change
  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  //since categories were not present in the data, we need to extract them from the products
  const getCategories = (products: Product[]) => {
    const categories = products.map((product) => product.category);
    const uniqueCategories = Array.from(new Set(categories));
    setCategories(["All", ...uniqueCategories]);
  };

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  return (
    <>
      <select value={selectedCategory} onChange={handleFilter}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <h1>Products</h1>
      <div className="container">
        {filteredProducts.map((product: Product) => (
          <div className="product" key={product.id}>
            <Carousel images={product.images} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      {modal && <div className="modal">
        <button onClick={closeModal}>Close</button>
        <h1>Modal</h1>
      </div>}
    </>
  );
}

export default App;
