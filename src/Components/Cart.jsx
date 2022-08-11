import React from 'react'
import { Field, Formik } from "formik";
import { connect } from 'react-redux'
import s from '../Components/Main/Main.module.css'
import { getProductsInCart, removeProductFromCart, updateCountInCart } from '../Redux/goods-reducer';
import CartSorted from './CartSorted'
import * as yup from 'yup'
import { getCountries } from '../Redux/auth-reducer';
import CustomCountrySelect from '../CustomCountrySelect';
import { sendOffer } from '../Redux/offer-reducer';


class Cart extends React.Component {
    startPage=()=>{
        const products = JSON.parse(sessionStorage.getItem('cart'))
        this.props.getProductsInCart(products)
        this.props.getCountries()
    }

    componentDidMount=()=>{
        this.startPage()
    }

    // validateLoginForm = values => {
    //     const errors = {};
    //     if (!values.password) {
    //         return
    //     } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(values.password)) {
    //         errors.password = "invalid password"
    //     }

    //     return errors
    // };

    // validationSchema = yup.object().shape({
    //     password: yup.string().typeError('should be a string')
    //         .max(35, 'max 35 characters').min(8, 'min 8 characters').required('required'),
    //     email: yup.string().email('Email should be correct').required('required'),
    // });

    render() {
        let goodsList = this.props.goods.map(g=><CartSorted key={g.id}
             good={g} removeProductFromCart={this.props.removeProductFromCart} updateCountInCart={this.props.updateCountInCart}/>)
        return (
            <div className={s.main}>
                <div>
                    {goodsList}
                </div>
                <div>
                <Formik
                    initialValues={{
                        fullName: '',
                        phone: '',
                        country: '',
                        city: '',
                        address: '',
                        
                    }}
                    // validate={this.validateLoginForm}
                    validateOnBlur
                    onSubmit={(values) => {
                        // if (values.email == ""|| values.password == "") { return }
                        // else { this.props.sendOffer(this.props.goods, values) }
                        this.props.sendOffer(this.props.goods, values)
                    }}
                    // validationSchema={this.validationSchema}
                >
                    {(formik) => {
                        return <div>
                            <p>
                                <Field type="text"
                                    name={'fullName'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fullName}
                                    placeholder='Full Name'

                                />
                            </p>
                            <p>
                                <Field type="text"
                                    name={'phone'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                    placeholder='phone'

                                />
                            </p>
                                <CustomCountrySelect
                                defaultText="Country"
                                optionsList={this.props.countries}
                                onClick={(country)=>formik.values.country = country} 
                                /> 
                            {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
                            <p>
                                <Field type={ "text"}
                                    name={'city'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                    placeholder='city'

                                />
                            </p>
                            {/* {formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>} */}
                            <p>
                                <Field type='text'
                                    name={'address'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                    placeholder='address'

                                />
                            </p>
                            {this.props.fullName == 'something went wrong' && <div><h4>Common error</h4></div>}
                            {/* {console.log(formik.errors)} */}
                            <Field 
                                type="button"
                                // disabled={!formik.isValid}
                                onClick={formik.handleSubmit}
                                value="Confirms the purchase"/>

                            <Field 
                                type="button"
                                disabled={!formik.isValid}
                                onClick={formik.handleSubmit}
                                value="Continue shopping"/>
                        </div>
                    }
                    }
                </Formik>
                </div>
            </div>
        )
    }

}

const mapStateToProps=(state)=>({
    goods: state.main.goods,
    countries: state.auth.countries
})

export default connect(mapStateToProps, {getProductsInCart, removeProductFromCart, updateCountInCart, getCountries, sendOffer})(Cart) 
