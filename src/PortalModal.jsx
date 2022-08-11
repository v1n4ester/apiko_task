import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { modalHelper } from "./Components/utils/modal-helper";
const modal = document.getElementById("modal-container");

const PortalModal = (props) => {
    const [productCount, setProductCount] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const totalCost = productCount * props.good.price;
    const product = props.good;
    modalHelper(props.onClose, modal);

    const setProductToCart=(product, productCount)=>{
        props.setProductToCart(product, productCount);
        setAddedToCart(true)
        props.onClose()
    }
    
    if (addedToCart) {
        return ReactDOM.createPortal(
        <div>
            <button className="close" onClick={()=>setAddedToCart(false)}>X</button>
            <h4>The <span>{product.title}</span> is successfully added to cart</h4>
        </div>
    ,modal)
    }
    if (!props.isOpen) return null;
    return ReactDOM.createPortal(
        <div className="modal">
            <button className="close" onClick={props.onClose}>X</button>
            <img className="main__photo" src={props.good.picture} />
            <ul className="main__list">
                <li className="main__list_title">{props.good.title}</li>
                <li className="main__list_title">{props.good.description}</li>
                <li className="main__list_price">PRICE ${props.good.price}</li>
            </ul>
            <button disabled={productCount==1 && true} onClick={()=>setProductCount(productCount-1)}>-</button>
            <h3>{productCount}</h3> 
            <button onClick={()=>setProductCount(productCount+1)}>+</button>

            <ul>
                <li> items : {productCount}</li>
                <li> total : {totalCost}</li>
            </ul>

            <button onClick={()=>setProductToCart(product, productCount)}>ADD TO CART</button>
            <button onClick={()=> props.good.favorite ? (props.dislike(props.good.id)) : (props.like(props.good.id))}>{props.good.favorite? "ADDED TO FAVORITES" : 'ADD TO FAVORITES'}</button>
            <button >BUY NOW</button>
        </div>,
        modal
    );
};

export default PortalModal;