import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader';
import { setAccountButton } from '../../Redux/app-reducer';
import Likes from '../Favorites Page/Likes';
import AccountForm from '../Forms/AccountForm';
import { getFirstLetters } from '../utils/FirsLettersFunction';
import OffersContainer from './OffersContainer';

class Account extends React.Component {
    componentWillUnmount = () => {
        this.props.setAccountButton("")
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
        if (this.props.loading) {
            return <Preloader />
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
    userName: state.auth.fullName,
    isAuth: state.auth.isAuth,
    accountButton: state.app.accountButton,
    loading: state.auth.loading
})

export default connect(mapStateToProps, { setAccountButton })(Account) 