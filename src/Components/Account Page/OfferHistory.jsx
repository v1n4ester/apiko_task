import React, { useState } from 'react'
import HistoryDetails from '../Portals/HistoryDetails';

const OfferHistory = (props)=>{
    const[openHistory, setOpenHistory] = useState(false)
    const day = props.offers.updatedAt.slice(8,10);
    const month = props.offers.updatedAt.slice(5,7);
    const year = props.offers.updatedAt.slice(0,4);
    const date = day + "." + month + "." + year
    return <div className='account__orders'>
        <ul className='account__orders-list'>
            <li className='account__orders-list_text'>Order ID:</li>
            <li className='account__orders-list_text'>Date:</li>
        </ul>
        <ul className='account__orders-list'>
            <li className='account__orders-list_button' onClick={()=>setOpenHistory(true)}>{props.offers.id}</li>
            <li className='account__orders-list_number'>{date}</li>
        </ul>
        <p className='account__orders-price'>Price <span className='account__orders-span'>${props.offers.totalPrice}</span></p>
        <HistoryDetails isOpen={openHistory} onClose={()=>setOpenHistory(false)} good={props.offers}/>
    </div>
}

export default OfferHistory