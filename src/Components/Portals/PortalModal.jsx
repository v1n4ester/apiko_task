import React, { useState } from "react";
import ReactDOM from "react-dom";
import close from '../../assets/main-images/close.svg';
import { withNavigate } from "../Cart/Cart";
import { modalHelper } from "../utils/modal-helper";
const modal = document.getElementById("modal-container");

const PortalModal = (props) => {
    const [productCount, setProductCount] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const totalCost = productCount * props.good.price;
    const product = props.good;
    modalHelper(props.onClose);

    const setProductToCart = (product, productCount) => {
        props.setProductToCart(product, productCount);
        setAddedToCart(true)
        props.onClose()
    }

    const buyNow=()=>{
        props.setProductToCart(product, productCount);
        setAddedToCart(true)
        props.onClose()
        return props.navigate('/cart')
    }

    const portalHelper = (place) => {
        document.addEventListener("mousedown", (e) => {
            if (!place.contains(e.target)) {
                setAddedToCart(false)
            }
        });
    }

    portalHelper(modal)

    if (addedToCart) {
        return ReactDOM.createPortal(
            <div className="added__portal">
                <h4 className="added__portal-text">The <span className="added__portal-name">{product.title}</span> is successfully added to cart</h4>
                <img className="added__portal-button" onClick={() => setAddedToCart(false)} src={close} />
            </div>
            , modal)
    }
    if (!props.isOpen) return null;
    return ReactDOM.createPortal(
        <div className="black-cover">
            <div className="good__modal">
                <button className="portal__modal-button_close" onClick={props.onClose}><img className="authorize__modal-image" src={close} /></button>
                <div className="good__modal-container">
                    <div className="good__modal-photo_container">
                        <img className="good__modal-photo" src={props.good.picture} />
                    </div>
                    <div className="good__modal-text">
                        <h2 className="good__modal-title">{props.good.title}</h2>
                        <p className="good__modal-desc">{props.good.description}</p>
                        <p className="good__modal-price">PRICE <span className="good__modal-price_span">${props.good.price}</span></p>
                        <div className="good__modal-count_container">
                            <button className="good__modal-button_count good__modal-button_minus" disabled={productCount == 1 && true} onClick={() => setProductCount(productCount - 1)}>-</button>
                            <h3 className="good__modal-count">{productCount}</h3>
                            <button className="good__modal-button_count" onClick={() => setProductCount(productCount + 1)}>+</button>
                        </div>
                        <div className="good__modal-list_container">
                            <ul className="good__modal-list_text">
                                <li className="good__modal-list_item good__modal-list_first-item">items :</li>
                                <li className="good__modal-list_item">total :</li>
                            </ul>
                            <ul className="good__modal-list_numbers">
                                <li >{productCount}</li>
                                <li >$  {totalCost}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button className="good__modal-button_submit good__modal-button_cart" onClick={() => setProductToCart(product, productCount)}>ADD TO CART</button>
                <button className={props.good.favorite ? "good__modal-button_submit good__modal-button_favorite" : "good__modal-button_submit"} onClick={() => props.good.favorite ? (props.dislike(props.good.id)) : (props.like(props.good.id))}>{props.good.favorite ? "ADDED TO FAVORITES" : 'ADD TO FAVORITES'}</button>
                <button className="good__modal-button_submit good__modal-button_buy" onClick={buyNow}>BUY NOW</button>
            </div>
        </div>,
        modal
    );
};

export default withNavigate(PortalModal);