import { Field, Formik } from "formik";
import React from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import * as yup from 'yup';
import { login } from '../../Redux/auth-reducer';
import { modalHelper } from "../utils/modal-helper";
import close from '../../assets/main-images/close.svg';
import password_close from '../../assets/main-images/password_close.svg';
import password_open from '../../assets/main-images/password_open.svg';
import { offersError } from "../../Redux/offer-reducer";
const modal = document.getElementById("modal-container");

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visiblePassword: false }
    }
    onClickButton=()=>{
        this.props.openRegister();
        this.props.onClose();
        this.props.offersError(false)
    }
    setVisiblePassword = () => (this.setState({ visiblePassword: !this.state.visiblePassword }))
    validateLoginForm = values => {
        const errors = {};
        if (!values.email) {
            return
        } else if (!/\S+@\S+/.test(values.email)) {
            errors.email = "invalid email"
        }

        return errors
    };

    validationSchema = yup.object().shape({
        password: yup.string().typeError('should be a string').required('required'),
        email: yup.string().email('Email should be correct').required('required')
    });

    login = (email, password) => {
        this.props.login(email, password);
    }

    render() {
        if (this.props.isAuth) {
            return null
        } else if (!this.props.isOpen) {
            return null;
        }
        modalHelper(this.props.onClose)
        return ReactDOM.createPortal(
            <div className="black-cover">
                <div className="form">
                    <Formik
                        initialValues={{
                            password: '',
                            email: ''
                        }}
                        validate={this.validateLoginForm}
                        validateOnBlur
                        onSubmit={(values) => {
                            if (Object.values(values).some(el=> el == "")) { return }
                            else {  this.login(values.email, values.password)}
                        }}
                        validationSchema={this.validationSchema}
                    >
                        {(formik) => {
                            return <div className="form-container login-form">
                                <img className="form__button_close" onClick={this.props.onClose} src={close} />
                                <h1 className="form__title">Login</h1>
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
                                    <Field type={this.state.visiblePassword ? "text" : "password"}
                                        className={formik.touched.phone && formik.errors.phone? "form-input form-input-error": "form-input"}
                                        name={'password'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    <span className='login__form-placeholder'>Password</span>
                                    {formik.touched.password && formik.errors.password && <span className="cart__form-error">{formik.errors.password}</span>}
                                    <img className={this.state.visiblePassword ? "form-button_password-close" : "form-button_password"}
                                        onClick={this.setVisiblePassword} src={this.state.visiblePassword? password_close: password_open} />
                                </p>
                                {this.props.offerError && <span className="cart__form-error">Email or password incorrect</span>}
                                <Field
                                    type="button"
                                    className="form__submit-button"
                                    disabled={!formik.isValid}
                                    onClick={formik.handleSubmit}
                                    value="Login" />
                            </div>
                        }
                        }
                    </Formik>
                    <div className="form__box">
                        <h2 className="form__box-text">I have no account,<span className="form__box-span" onClick={this.onClickButton}>Register now</span></h2>
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

export default connect(mapStateToProps, { login, offersError })(LoginForm)