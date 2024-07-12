import Carousel from "./Carousel";

const ProductModal = ({ product, onClose }) => {
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
              <p>Rating: {product.rating} / 5</p>
              <p>Price: ${product.price}</p>
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
                  <p style={{ fontWeight: "bold" }}>Rating: {review.rating} / 5</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default ProductModal;