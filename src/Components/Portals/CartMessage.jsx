import React from "react";
import ReactDOM from "react-dom";
import close from '../../assets/main-images/close.svg';
import { modalHelper } from "../utils/modal-helper";
const modal = document.getElementById("modal-container");

const CartMessage = (props) => {
    modalHelper(props.onClose);
    if (!props.isOpen) return null;
    const redirect = () =>{
        props.navigate("/account")
        props.setAccountButton("history")
    }
    return ReactDOM.createPortal(
        <div className="black-cover">
            <div className="thanks__modal">
                <button className="portal__modal-button_close" onClick={props.onClose}><img className="authorize__modal-image" src={close} /></button>
                <h4 className="thanks__modal-title">Thank you for your purchase</h4>
                <p className="thanks__modal-text">We will send you a notification when your order arrives to you</p>
                <button className="thanks__modal-button  " onClick={props.onClose}>Continue shopping</button>
                <button onClick={redirect} className="thanks__modal-button thanks__modal-button-history " >View order history</button>
            </div>
        </div>
        ,
        modal
    );
};

export default CartMessage;