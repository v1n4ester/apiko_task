import { useEffect, useState } from "react";
import trash from '../../assets/main-images/trash.svg'

const CartSorted = (props) => {
    useEffect(() => {
        setProductCount(props.good.productCount)
    }, [props])
    const [productCount, setProductCount] = useState(props.good.productCount || 1);
    const totalCost = productCount * props.good.price;
    const onButtonClick = (numb, type) => {
        setProductCount(numb)
        props.updateCountInCart(props.good, type)
        props.hundleClickButton(type, props.good.price)

    }
    return (
        <div className="cart__good">
            <img className="cart__photo" src={props.good.picture} />
            <div className="cart__info">
                <h2 className="cart__good-title">{props.good.title}</h2>
                <div className="cart__info_container">
                    <button className="cart__trash" onClick={() => props.removeProductFromCart(props.good)}><img src={trash} /></button>
                    <div className="good__modal-count_container">
                        <button className="good__modal-button_count good__modal-button_minus" disabled={productCount == 1 && true} onClick={() => onButtonClick(productCount - 1)}>-</button>
                        <h3 className="good__modal-count">{productCount}</h3>
                        <button className="good__modal-button_count" onClick={() => onButtonClick(productCount + 1, "plus")}>+</button>
                    </div>
                </div>
            </div>
            <div className="cart__list-container">
                <ul className="cart__list">
                    <li className="cart__list-text">Price:</li>
                    <li className="cart__list-price">${totalCost}</li>
                </ul>
            </div>
        </div>
    )
}

export default CartSorted