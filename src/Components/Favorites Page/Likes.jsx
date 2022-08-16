import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import Preloader from '../../Preloader/Preloader';
import { dislike, getFavoriteGoods, getGoods, getSearchedGoods, like, searchTextAC } from '../../Redux/goods-reducer'
import Good from '../utils/Good'

class Favorite extends React.Component {
    componentDidMount = () => {
        if (this.props.isAuth) {
            this.props.getFavoriteGoods()
        }
    }
    render() {
        if (this.props.loading) {
            return <Preloader />
        }
        if (!this.props.isAuth) {
            return <Navigate to={"/main"} />
        }
        let goodsList
        if (this.props.goods && this.props.goods.length > 0) {
            goodsList = this.props.goods.map(g => <div key={g.id} hidden={!g.favorite}><Good like={this.props.like} isAuth={this.props.isAuth}
                dislike={this.props.dislike} good={g} props={{ ...this.props }} setProductToCart={this.props.setProductToCart} /></div>)
        } else {
            return <div className='no-items'>
                <h4 className='no-items__text'>No items in this page yet</h4>
                <NavLink className="no-items__link" onClick={() => window.location.reload(false)} to={"/main"}>Return to main page</NavLink>
            </div>
        }


        return (
            <div className={"main"}>
                <div className='main__goods'>
                    {goodsList}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    goods: state.main.goods,
    serchText: state.main.searchText,
    isAuth: state.auth.isAuth,
    loading: state.auth.loading
})

export default connect(mapStateToProps, { getGoods, searchTextAC, getSearchedGoods, like, dislike, getFavoriteGoods })(Favorite) 
