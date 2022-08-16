import { Field, Formik } from "formik";
import React from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import * as yup from 'yup';
import close from '../../assets/main-images/close.svg';
import password_close from '../../assets/main-images/password_close.svg';
import password_open from '../../assets/main-images/password_open.svg';
import { modalHelper } from "../utils/modal-helper";
import { register } from '../../Redux/auth-reducer';
import { offersError } from "../../Redux/offer-reducer";
const modal = document.getElementById("modal-container");

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visiblePassword: false }
    }
    onClickButton=()=>{
        this.props.openLogIn()
        this.props.onClose()
        this.props.offersError(false)
    }
    setVisiblePassword = () => (this.setState({ visiblePassword: !this.state.visiblePassword }))
    validationSchema = yup.object().shape({
        password: yup.string().typeError('should be a string')
        .test('isValid',"invalid password", value=> /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(value)).required('required'),
        email: yup.string().email('Email should be correct').test('isValid',"invalid email", value=> /\S+@\S+/.test(value)).required('required'),
        fullName: yup.string().test('isValid',"invalid full name", value=> /^[a-zA-Z\s]+$/.test(value)).required('required'),
        phone: yup.string().test('isValid',"invalid email", value=> /^(\+)?([0-9]){10,14}$/.test(value)).required('required'),
    });

    render() {
        if (this.props.isAuth) {
            return
        } else if (!this.props.isOpen) {
            return null;
        }
        modalHelper(this.props.onClose)
        return ReactDOM.createPortal(
            <div className="black-cover">
                <div className="form">
                    <Formik
                        initialValues={{
                            fullName: '',
                            password: '',
                            email: '',
                            phone: ''
                        }}
                        validateOnBlur
                        onSubmit={(values) => {
                            if (Object.values(values).some(el=> el == "")) { return }
                            else {  this.props.register(values.fullName, values.email, values.password, values.phone)}
                        }}
                        validationSchema={this.validationSchema}
                    >
                        {(formik) => {
                            return <div className="form-container register__form">
                                <img className="form__button_close" onClick={this.props.onClose} src={close} />
                                <h1 className="form__title">Register</h1>
                                <p className="form__input-container">
                                    <Field type="text"
                                        className={formik.touched.fullName && formik.errors.fullName? "form-input cart__form-input-error": "form-input"}
                                        name={'fullName'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.fullName}
                                    />
                                    <span className='login__form-placeholder'>Full Name</span>
                                    {formik.touched.fullName && formik.errors.fullName && <span className="cart__form-error">{formik.errors.fullName}</span>}
                                </p>
                                <p className="form__input-container">
                                    <Field type="email"
                                        className={formik.touched.email && formik.errors.email? "form-input cart__form-input-error": "form-input"}
                                        name={'email'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    <span className='login__form-placeholder'>Email</span>
                                    {formik.touched.email && formik.errors.email && <span className="cart__form-error">{formik.errors.email}</span>}
                                </p>
                                <p className="form__input-container">
                                    <Field type='phone'
                                        className={formik.touched.phone && formik.errors.phone? "form-input cart__form-input-error": "form-input"}
                                        name={'phone'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                    />
                                    <span className='login__form-placeholder'>Phone number</span>
                                    {formik.touched.phone && formik.errors.phone && <span className="cart__form-error">{formik.errors.phone}</span>}
                                </p>
                                <p className="form__input-container">
                                    <Field type={this.state.visiblePassword ? "text" : "password"}
                                        className={formik.touched.password && formik.errors.password? "form-input cart__form-input-error": "form-input"}
                                        name={'password'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    <span className='login__form-placeholder'>Password</span>
                                    {formik.touched.password && formik.errors.password? <span className="cart__form-error">{formik.errors.password}</span>: <span>The password has to be at least at least 1 letter, 1special symbol, 1 number</span>}
                                    <img className={this.state.visiblePassword ? "form-button_password-close" : "form-button_password"}
                                        onClick={this.setVisiblePassword} src={this.state.visiblePassword ? password_close: password_open} />
                                </p>
                                {this.props.offerError && <span className="cart__form-error">Bad request</span>}
                                <Field
                                    type="button"
                                    className="form__submit-button"
                                    disabled={!formik.isValid}
                                    onClick={formik.handleSubmit}
                                    value="Register" />
                            </div>
                        }
                        }
                    </Formik>
                    <div className="form__box">
                        <h2 className="form__box-text">I already have an account,<span className="form__box-span" onClick={this.onClickButton}>Log In</span></h2>
                    </div>
                </div>
            </div>
            ,
            modal
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userId: state.auth.userId,
        offerError: state.offer.offerError
    }

}

export default connect(mapStateToProps, { register, offersError })(LoginForm)