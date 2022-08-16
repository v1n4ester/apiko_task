import React from "react";
import ReactDOM from "react-dom";
import HistoryProduct from "../Account Page/HistoryProduct";
import close from '../../assets/main-images/close.svg';
import { modalHelper } from "../utils/modal-helper";
const modal = document.getElementById("modal-container");

const HistoryDetails = (props) => {
    modalHelper(props.onClose);
    let itemsCount = 0
    let itemsCost = 0
    const stateChanger=(numb, price)=>{
        itemsCount = (itemsCount + numb);
        itemsCost = (itemsCost + (numb * price))
    }
    const items = [ ...props.good.items]
    items.forEach(el=>stateChanger(el.quantity, el.orderedPrice))
    const historyList = props.good.items.map(el => <HistoryProduct key={el.product.id} good={el} />)
    if (!props.isOpen) return null;
    return ReactDOM.createPortal(
        <div className="black-cover">
            <div className="history__modal">
            <button className="portal__modal-button_close" onClick={props.onClose}><img className="authorize__modal-image" src={close} /></button>
                <h2 className="history__modal-title">Order details ID {}</h2>
                {historyList}
                <div className="history__modal-container">
                    <div className="history__modal-list-container">
                        <ul className="history__modal__list">
                            <li className="history__modal-list-text">Date:</li>
                            <li className="history__modal-list-text">Address:</li>
                        </ul>
                        <ul className="history__modal-value">
                            <li className="history__modal-list-value">{props.good.createdAt}</li>
                            <li className="history__modal-list-value">{props.good.shipment.address},{props.good.shipment.city},{props.good.shipment.country}</li>
                        </ul>
                    </div>
                    <div className="history__modal-list-container">
                        <ul className="history__modal__list">
                            <li className="history__modal-list-text">Items:</li>
                            <li className="history__modal-list-text">Total:</li>
                        </ul>
                        <ul className="history__modal-value">
                            <li className="history__modal-list-value">{itemsCount}</li>
                            <li className="history__modal-list-value">$ {itemsCost}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        ,
        modal
    );
};

export default HistoryDetails;