import { useState } from "react";
import PortalModal from "../PortalModal"

const Good = (props) => {
    const [openp, setOpenP] = useState(false);
    return (
        <div className="main__good">
            <img className="main__photo" src={props.good.picture} onClick={() => setOpenP(true)}/>
            <button className={props.good.favorite ? "like__button"+" "+"like__button_active" : "like__button" } onClick={()=> props.good.favorite ? (props.props.dislike(props.good.id)) : (props.props.like(props.good.id))}><svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3944 2.68343C15.3737 0.561572 12.1524 0.444781 10 2.33751C7.84849 0.445673 4.62717 0.561572 2.60557 2.68343C1.56972 3.7711 1 5.21628 1 6.75507C1 8.29386 1.56972 9.73993 2.60557 10.8267L9.03972 17.5828C9.30462 17.8609 9.65274 18 10 18C10.3473 18 10.6954 17.8609 10.9603 17.5828L17.3944 10.8267C18.4303 9.73993 19 8.29475 19 6.75507C19 5.21628 18.4303 3.77021 17.3944 2.68343Z" stroke="#707070" />
            </svg>
            </button>
            <ul className="main__list">
                <li className="main__list_title">{props.good.title}</li>
                <li className="main__list_price">${props.good.price}</li>
            </ul>
            <div>
            <PortalModal
          isOpen={openp}
          onClose={() => setOpenP(false)}
          good={props.good}
          like={props.like}
          dislike={props.dislike}
          setProductToCart={props.setProductToCart}
        />
            </div>
        </div>
    )
}

export default Good