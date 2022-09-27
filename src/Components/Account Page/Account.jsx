import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AccountForm from '../Forms/AccountForm';
import Likes from '../Favorites Page/Likes';
import OffersContainer from './OffersContainer';
import { setAccountButton } from '../../Redux/app-reducer';
import { dislike, getCategories, getChoosedCategoryProducts, getGoods, getSearchedGoods, like, searchTextAC, setCurrentSort, setProductToCart } from '../../Redux/goods-reducer';
import Preloader from '../../Preloader/Preloader';
import { getFirstLetters } from '../utils/FirsLettersFunction';

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCategory: 0,
            selectedType: "latest",
            limit: 0,
            hiddenSelector: "block",
        }

    }

    hundleSelectorChange = (field) => (key) => {
        if (this.state.limit != 0) {
            this.state.limit = 0
        }
        this.setState({ [field]: key }, () => {
            if (this.state.selectedCategory === 0) {
                this.props.getGoods(this.state.selectedType, this.state.limit)
            } else {
                this.props.getChoosedCategoryProducts(this.state.selectedCategory, this.state.selectedType, this.state.limit)
            }
        })
    }

    hundleLoadMore = () => {
        this.state.limit += 12;
        if (this.state.selectedCategory === 0) {
            this.props.getGoods(this.state.selectedType, this.state.limit)
        } else {
            this.props.getChoosedCategoryProducts(this.state.selectedCategory, this.state.selectedType, this.state.limit)
        }
    }

    componentDidMount = () => {
        this.props.getGoods(this.props.sortedBy, this.state.limit);
        this.props.getCategories()
    }

    onTextChange = (e) => {
        const text = e.target.value;
        this.props.searchTextAC(text)

    }

    onSubmit = (evt) => {
        if (evt.key === 'Enter') {
            this.props.getSearchedGoods(this.props.serchText);
            this.state.hiddenSelector = "none"
        }
    }

    onSortingChange = (id) => {
        this.props.setCurrentSort(id)
    }


    setEditForm = () => {
        this.props.setAccountButton("edit")
    }
    setOfferHistory = () => {
        this.props.setAccountButton("history")
    }
    setFavorites = () => {
        this.props.setAccountButton("favorites")
    }

    render() {
        if(this.props.loading){
            return <Preloader/>
        }
        let name
        if (this.props.isAuth) {
            name = getFirstLetters(this.props.userName)
        } else {
            return <Navigate to={"/main"} />
        }
        return (
            <div className='account'>
                <div className='account__info'>
                    <p className='account__logo'>{name}</p>
                    <p className='account__name'>{this.props.userName}</p>
                </div>
                <div className='account__buttons-container'>
                    <button className={this.props.accountButton === "edit" ? "account__button account__button_active" : "account__button"} onClick={this.setEditForm}>Edit Account</button>
                    <button className={this.props.accountButton === "history" ? "account__button account__button_active" : "account__button"} onClick={this.setOfferHistory}>Orders History</button>
                    <button className={this.props.accountButton === "favorites" ? "account__button account__button_active" : "account__button"} onClick={this.setFavorites}>Favourites</button>
                </div>
                <div id='account__page'>
                    {this.props.accountButton == "edit" && <AccountForm />}
                    {this.props.accountButton == "history" && <OffersContainer />}
                    {this.props.accountButton == "favorites" && <Likes />}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    goods: state.main.goods,
    serchText: state.main.searchText,
    categories: state.main.categories,
    function: state.main.lastFunction,
    currentCategory: state.main.currentCategory,
    sortedBy: state.main.sortedBy,
    disabledButton: state.main.disabledButton,
    userName: state.auth.fullName,
    isAuth: state.auth.isAuth,
    accountButton: state.app.accountButton,
    loading: state.auth.loading
})

export default connect(mapStateToProps, { getGoods, searchTextAC, getSearchedGoods, like, dislike, getCategories, getChoosedCategoryProducts, setCurrentSort, setProductToCart, setAccountButton })(Account) 