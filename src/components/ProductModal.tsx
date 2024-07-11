

const ProductModal = ({ product, onClose }) => {
    console.log(product)
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default ProductModal;