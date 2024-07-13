import { useState, useEffect } from "react";
import Carousel from "./components/Carousel";
import Modal from "./components/ProductModal";
import AOS from "aos";
import 'aos/dist/aos.css'
import { Product } from "./types/product";
import "./App.css";
import Quantity from "./components/Quantity";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("None");
  const [modal, setModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product);
  useEffect(() => {
    AOS.init();
    const fetchData = async () => {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setFilteredProducts(data.products);
          getCategories(data.products);
          setLoading(false)
        });
    };
    fetchData();
  }, [setCategories, setFilteredProducts]);
  console.log(products);

  useEffect(() => {
    let updatedProducts = products
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
        updatedProducts = updatedProducts.filter(
          (product) => product.category === selectedCategory
        );
    }
     if (sortOption !== "None") {
       updatedProducts = sortProducts(updatedProducts, sortOption);
     }
     setFilteredProducts(updatedProducts);
    
  }, [selectedCategory, products, sortOption, setFilteredProducts]);


  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };


 const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
   setSortOption(event.target.value);
 };

 const sortProducts = (products: Product[], option: string): Product[] => {
   const sortedProducts = [...products];
   if (option === "Price: Low to High") {
     sortedProducts.sort((a, b) => a.price - b.price);
   } else if (option === "Price: High to Low") {
     sortedProducts.sort((a, b) => b.price - a.price);
   } else if (option === "Rating: Low to High") {
     sortedProducts.sort((a, b) => a.rating - b.rating);
   } else if (option === "Rating: High to Low") {
     sortedProducts.sort((a, b) => b.rating - a.rating);
   }
   return sortedProducts;
 };

  const getCategories = (products: Product[]) => {
    const categories = products.map((product) => product.category);
    const uniqueCategories = Array.from(new Set(categories));
    setCategories(["All", ...uniqueCategories]);
  };

  const openModal = (
    product: Product
  ) => {
    setModal(true);
    setSelectedProduct({
          id: product?.id,
        name: product?.name,
        title: product?.title,
        price: product?.price,
        description: product?.description,
        images: product?.images,
        category: product?.category,
        stock: product?.stock,
        rating: product?.rating,
        reviews: [...product.reviews],
        
    } as Product);
    document.body.classList.add("no-scroll")
    
  };

  const closeModal = () => {
    setModal(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <>
      {loading && (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {!loading && (
        <>
          <div className="header">
            <h1>Products</h1>
            <div>
              <span>Filter by:</span>
              <select value={selectedCategory} onChange={handleFilter}>
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select value={sortOption} onChange={handleSortChange}>
                <option value="None">None</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Rating: Low to High">Rating: Low to High</option>
                <option value="Rating: High to Low">Rating: High to Low</option>
              </select>
            </div>
          </div>

          <div className="container">
            {filteredProducts?.map((product: Product) => (
              <div
                className="product"
                data-aos="fade-up"
                data-aos-offset="100"
                data-aos-duration="500"
                key={product?.id}
                onClick={() => openModal( product)}
              >
                <Carousel images={product?.images} />
                <h3>{product?.title}</h3>
                <p
                  data-aos="fade-up"
                  data-aos-offset="0"
                  data-aos-duration="1500"
                >
                  {product?.description}
                </p>
                <p>
                  <span>Rating:</span> {product?.rating} / 5
                </p>
                <div style={{ display: "flex" }}>
                  <p style={{ margin: "auto 0" }}>
                    <span>Price:</span> ${product?.price}
                  </p>
                  <Quantity stock={product?.stock} />
                </div>
              </div>
            ))}
          </div>
          {modal && <Modal onClose={closeModal} product={selectedProduct} />}
        </>
      )}
    </>
  );
}

export default App;
