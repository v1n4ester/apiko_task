import React from "react";
import ReactDOM from "react-dom";
import close from '../../assets/main-images/close.svg';
import { modalHelper } from "..//utils/modal-helper";
const modal = document.getElementById("modal-container");

const PleaseAuthorize = (props) => {
    modalHelper(props.onClose, modal);
    const onClickButton = (text) => {
        if (text === "log") {
            props.openLogIn()
        } else {
            props.openRegister()
        }
        props.onClose()
    }

    if (!props.isOpen) return null;
    return ReactDOM.createPortal(
        <div className="black-cover">
            <div className="authorize__modal">
                <button className="portal__modal-button_close" onClick={props.onClose}><img className="authorize__modal-image" src={close} /></button>
                <h4 className="authorize__modal-title">To continue please register or log in</h4>
                <button className="authorize__modal-button " onClick={() => onClickButton("log")}>Continue to sign in</button>
                <button className="authorize__modal-button " onClick={onClickButton}>Continue to register</button>
                <button className="authorize__modal-button authorize__modal-button_guest " onClick={props.onClose}>Continue as guest</button>
            </div>
        </div>
        ,
        modal
    );
};

export default PleaseAuthorize;