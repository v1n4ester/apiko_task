import { useEffect, useState } from "react";

const CartSorted = (props) => {
    useEffect(()=>{
        setProductCount(props.good.productCount)
    }, [props])
    const [productCount, setProductCount] = useState(props.good.productCount || 1);
    const totalCost = productCount * props.good.price;
    const onButtonClick=(numb, type)=>{
        setProductCount(numb)
        props.updateCountInCart(props.good, type)
    }
    return (
        <div className="main__good">
            <div>
                <img className="main__photo" src={props.good.picture} />
            </div>
            <div>
                <h2>{props.good.title}</h2>
            </div>
            <div>
                <button onClick={()=>props.removeProductFromCart(props.good)}>Remove</button>
                <button disabled={productCount == 1 && true} onClick={() => onButtonClick(productCount - 1)}>-</button>
                <h3>{productCount}</h3>
                <button onClick={() => onButtonClick(productCount + 1, "plus")}>+</button>
            </div>
            <div>
                <p>Price:</p>
                <p>{totalCost}</p>
            </div>
        </div>
    )
}

export default CartSorted