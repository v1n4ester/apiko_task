import React from "react";

const HistoryProduct = (props) => {
    return (
    <div className="history__good">
            <img className="cart__photo" src={props.good.product.picture} />
            <div className="cart__info">
                <h2 className="cart__good-title">{props.good.product.title}</h2>
                <p>Items: <span className="history__good-quantity">{props.good.quantity}</span></p>
            </div>
            <div className="cart__list-container">
                <ul className="cart__list">
                    <li className="cart__list-text">Price:</li>
                    <li className="cart__list-price">${props.good.orderedPrice}</li>
                </ul>
            </div>
        </div>
)};

export default HistoryProduct;