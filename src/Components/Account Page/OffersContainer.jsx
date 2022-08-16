import React from 'react'
import { connect } from 'react-redux'
import OfferHistory from './OfferHistory'
import { getOffers } from '../../Redux/offer-reducer'

class OffersContainer extends React.Component {
    componentDidMount=()=>{
        this.props.getOffers()
    }
    render() {
        let offersList
        if(this.props.offers){
            offersList = this.props.offers.map(g=><OfferHistory key={g.id} offers={g}/>)
        }else{
            return <div className='history__error'>
                No offers in history
            </div>
        }
        return (
            <div>
                {offersList}
            </div>)
    }

}

const mapStateToProps=(state)=>({
    offers: state.offer.offers
})

export default connect(mapStateToProps, { getOffers})(OffersContainer) 
