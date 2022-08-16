import React from 'react'
import { NavLink } from 'react-router-dom'
import { Field, Formik } from "formik";
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { getProductsInCart, removeProductFromCart, updateCountInCart, getGoods } from '../../Redux/goods-reducer';
import CartSorted from './CartSorted'
import * as yup from 'yup'
import { getCountries } from '../../Redux/auth-reducer';
import CustomCountrySelect from './CustomCountrySelect';
import { sendOffer, setShowMessage } from '../../Redux/offer-reducer';
import { compose } from 'redux';
import CartMessage from '../Portals/CartMessage';
import Preloader from '../../Preloader/Preloader';

export function withNavigate(Children) {
    return (props) => {
        const history = useNavigate()
        return <Children {...props} navigate={history} />
    }
}


class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsCount: 0,
            itemsCost: 0,
        }

    }
    startPage = () => {
        const products = JSON.parse(sessionStorage.getItem('cart'))
        if (this.props.isAuth) {
            this.props.getProductsInCart(products)
            this.props.getCountries()
        }
    }
    componentDidMount = () => {
        this.startPage();
    }
    sendOffer = (goods, values) => {
        this.props.sendOffer(goods, values);
    }

    continueShopping=()=>{
        return this.props.navigate('/main')
    }

    closeMessage=()=>{
        this.props.setShowMessage(false)
        return this.props.navigate('/main')
    }

    setItemsCount = (value) => {
        this.state.itemsCount = value
    }

    setItemsCost = (value) => {
        this.state.itemsCost = value
    }

    hundlePlusMinusButton = (text, value) => {
        if (text === "minus") {
            this.setState({
                itemsCount:  this.state.itemsCount + 1,
                itemsCost: this.state.itemsCost - value
            })}
    }

    validateFullName = values => {
        let error
        if (!values) {
            return
        } else if (!/^[a-zA-Z\s]+$/.test(values)) {
            error = "invalid fullName"
        }
        return error
    };

    validatePhone = values => {
        let error
        if (!values) {
            return
        } else if (!/^(\+)?([0-9]){10,14}$/.test(values)) {
            error = "invalid phone"
        }
        return error
    }

    validationSchema = yup.object().shape({
        fullName: yup.string().typeError('Should be a string').required('Required'),
        phone: yup.string().typeError('Should be a string').required('Required'),
        city: yup.string().typeError('Should be a string').required('Required'),
        address: yup.string().typeError('Should be a string').required('Required')
    });

    render() {
        if(this.props.loading){
            return <Preloader/>
        }
        if (!this.props.isAuth) {
            return <Navigate to={"/main"} />
        }
        let goodsList
        let itemsCount = 0
        let itemsCost = 0
        if (this.props.goods) {
            goodsList = this.props.goods.map(g => <CartSorted key={g.id}
                good={g} removeProductFromCart={this.props.removeProductFromCart} updateCountInCart={this.props.updateCountInCart} hundleClickButton={(text, value)=>this.hundlePlusMinusButton(text, value)} />)
            for (let i of this.props.goods) {
                itemsCount += i.productCount
            }
            for (let i of this.props.goods) {
                itemsCost += i.productCount * i.price
            }
        } else {
            return <div className='no-items'>
                <h4 className='no-items__text'>No items in this page yet</h4>
                <NavLink className='no-items__link' to={"/main"}>Return to main page</NavLink>
            </div>
        }
        this.state.itemsCount = itemsCount;
        this.state.itemsCost = itemsCost;
        return (
            <div className={"cart"}>
                {this.props.showMessage && <CartMessage isOpen={this.props.showMessage}
                        onClose={this.closeMessage}/>}
                <h2 className='cart__title'>My cart</h2>
                <div className='cart__container'>
                    <div className='cart__goods'>
                        {goodsList}
                    </div>
                    <Formik
                        initialValues={{
                            fullName: '',
                            phone: '',
                            country: '',
                            city: '',
                            address: '',

                        }}
                        validateOnBlur
                        onSubmit={(values) => {
                            if (Object.values(values).some(el=> el == "")) { return }
                            else { this.sendOffer(this.props.goods, values) }

                        }}
                        validationSchema={this.validationSchema}
                    >
                        {(formik) => {
                            return <div className='cart__form'>
                                <p className='cart__input-container'>
                                    <Field type="text"
                                        id={'cart/fullName'}
                                        validate={this.validateFullName}
                                        className={formik.touched.fullName && formik.errors.fullName? "cart__form-input cart__form-input-error": "cart__form-input"}
                                        name={'fullName'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.fullName}
                                    />
                                    <span className='cart__form-placeholder'>Full Name</span>
                                    {formik.touched.fullName && formik.errors.fullName && <span className="cart__form-error">{formik.errors.fullName}</span>}
                                </p>
                                <p className='cart__input-container'>
                                    <Field type="text"
                                        validate={this.validatePhone}
                                        className={formik.touched.phone && formik.errors.phone? "cart__form-input cart__form-input-error": "cart__form-input"}
                                        name={'phone'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                    />
                                    <span className='cart__form-placeholder'>Phone</span>
                                    {formik.touched.phone && formik.errors.phone && <span className="cart__form-error">{formik.errors.phone}</span>}
                                </p>
                                <div className='cart__form-wrapper'>
                                    <CustomCountrySelect
                                        name={'country'}
                                        defaultText="Country"
                                        optionsList={this.props.countries}
                                        onClick={(country) => formik.values.country = country}
                                    />
                                    {formik.touched.country && formik.values.country == "" && <span className="cart__form-error">Required</span>}
                                </div>
                                <p className={'cart__input-container'}>
                                    <Field type={"text"}
                                        className={formik.touched.city && formik.errors.city? "cart__form-input cart__form-input-error": "cart__form-input"}
                                        name={'city'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.city}
                                    />
                                    <span className='cart__form-placeholder'>City</span>
                                    {formik.touched.city && formik.errors.city && <span className="cart__form-error">{formik.errors.city}</span>}
                                </p>
                                <p className='cart__input-container'>
                                    <Field type='text'
                                        className={formik.touched.address && formik.errors.address? "cart__form-input cart__form-input-error": "cart__form-input"}
                                        name={'address'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.address}
                                    />
                                    <span className='cart__form-placeholder'>Address</span>
                                    {formik.touched.address && formik.errors.address && <span className="cart__form-error">{formik.errors.address}</span>}
                                </p>
                                <div className='cart__list-container'>
                                    <ul className='cart__form-list_text'>
                                        <li className='cart__list-text_item'>Items</li>
                                        <li className='cart__list-text_item'>Total</li>
                                    </ul>
                                    <ul className='cart__form-list_number'>
                                        <li className='cart__list-number_item'>{this.state.itemsCount}</li>
                                        <li className='cart__list-number_item'>$ {this.state.itemsCost}</li>
                                    </ul>
                                </div>
                                {this.props.offerError && <span className="cart__form-error">Request error</span>}
                                <Field
                                    type="button"
                                    className="cart__form-button_confirm"
                                    disabled={!formik.isValid}
                                    onClick={formik.handleSubmit}
                                    value="Confirms the purchase" />

                                <Field
                                    type="button"
                                    className="cart__form-button_continue"
                                    onClick={this.continueShopping}
                                    value="Continue shopping" />
                            </div>
                        }
                        }
                    </Formik>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    goods: state.main.goods,
    countries: state.auth.countries,
    isAuth: state.auth.isAuth,
    offerError: state.offer.offerError,
    showMessage: state.offer.showMessage,
    loading: state.auth.loading
})

export default compose(connect(mapStateToProps, { getProductsInCart, removeProductFromCart, updateCountInCart, getCountries, sendOffer, getGoods, setShowMessage }), withNavigate)(Cart) 
