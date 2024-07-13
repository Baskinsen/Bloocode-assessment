import { useState } from "react"


interface Stock {
  stock: number

}
const Quantity = ({stock}: Stock) => {

    const [quantity, setQuantity] = useState(0)

    const decreaseQuantity = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      quantity !== 0 ? setQuantity(quantity - 1) : 0;
      event.stopPropagation();
    };

    const increaseQuantity = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      setQuantity(quantity + 1);
      event.stopPropagation();
    };
    return (
      <>
        <div style={{ display: "flex", margin: "auto" }}>
          <button
            onClick={(event)=>decreaseQuantity(event)}
            className="quantity-button"
            disabled={quantity === 0}
          >
            &#10094;
          </button>
          <span style={{ margin: "auto" }}>{quantity}</span>
          <button
            onClick={(event)=>increaseQuantity(event)}
            className="quantity-button"
            disabled={quantity === stock}
          >
            &#10095;
          </button>
        </div>
        <div>
          <button style={{ backgroundColor: "rgba(24, 32, 42, 0.87)", color: 'white' }} onClick={(event)=> event.stopPropagation()}>
            Add To Cart
          </button>
        </div>
      </>
    );
}


export default Quantity