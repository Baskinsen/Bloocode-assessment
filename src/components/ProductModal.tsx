import Carousel from "./Carousel";
import Quantity from "./Quantity";


interface Product {
    product: {
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
    onClose: () => void;
    
}

const ProductModal = ({ product, onClose }: Product) => {

   
    console.log(product)
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div className="modal-product-description">
            <Carousel images={product.images} />
            <div>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>
                <span>Rating:</span> {product.rating} / 5
              </p>
              <div style={{ display: "flex" }}>
                <p style={{ margin: "auto 0" }}>
                  <span>Price:</span> ${product?.price}
                </p>
                <Quantity stock={product?.stock} />
              </div>
            </div>
          </div>
          <div className="modal-product-review">
            <h3>Reviews</h3>
            {product.reviews.map((review, index) => (
              <div key={index} className="modal-reviews">
                <div className="modal-review-header">
                  <h4>{review.reviewerName}</h4>
                  <p>{review.reviewerEmail}</p>
                </div>
                <div>
                  <h5>Comment</h5>
                  <p>{review.comment}</p>
                  <p>
                    <span>Rating:</span> {review.rating} / 5
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default ProductModal;