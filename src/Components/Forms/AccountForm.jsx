import { Field, Formik } from "formik";
import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { login, successChanged } from '../../Redux/auth-reducer';

class LoginForm extends React.Component {
    setVisiblePassword = () => (this.setState({ visiblePassword: !this.state.visiblePassword }))
    validateLoginForm = values => {
        const errors = {};
        if (!values.password) {
            return
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(values.password)) {
            errors.password = "invalid password"
        }

        return errors
    };

    validationSchema1 = yup.object().shape({
        email: yup.string().email('Email should be correct').test('isValid', "invalid email", value => /\S+@\S+/.test(value)).required('required'),
        fullName: yup.string().test('isValid', "invalid full name", value => /^[a-zA-Z\s]+$/.test(value)).required('required'),
        phone: yup.string().test('isValid', "invalid phone number", value => /^(\+)?([0-9]){10,14}$/.test(value)).required('required'),
        country: yup.string().typeError('should be a string'),
        city: yup.string().typeError('should be a string'),
        address: yup.string().typeError('should be a string')
    });

    validationSchema2 = yup.object().shape({
        password: yup.string().typeError('should be a string')
            .test('isValid', "invalid password", value => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(value)).required('required'),
        newPassword: yup.string().typeError('should be a string')
            .test('isValid', "invalid password", value => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(value)).required('required'),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'passwords are not same').required('required'),
    });

    render() {
        if (this.props.successChange) {
            alert("success");
            this.props.successChanged(false)
        }
        return <div className="account__form">
            <h1 className="account__form-title">Main information</h1>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    phone: '',
                    country: '',
                    city: '',
                    address: ''
                }}
                validate={this.validateLoginForm}
                validateOnBlur
                onSubmit={(values) => {
                    if (values.email == "" || values.password == "") { return }
                    else { this.props.login(values.email, values.password) }
                }}
                validationSchema={this.validationSchema1}
            >
                {(formik) => {
                    return <div className="account__form-container">
                        <p className="account__input-container">
                            <Field type="text"
                                className={formik.touched.fullName && formik.errors.fullName ? "form-input cart__form-input-error" : "form-input"}
                                name={'fullName'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.fullName}
                            />
                            <span className='login__form-placeholder'>Full Name</span>
                            {formik.touched.fullName && formik.errors.fullName && <span className="cart__form-error">{formik.errors.fullName}</span>}
                        </p>
                        <p className="account__input-container">
                            <Field type="email"
                                className={formik.touched.email && formik.errors.email ? "form-input cart__form-input-error" : "form-input"}
                                name={'email'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            <span className='login__form-placeholder'>Email</span>
                            {formik.touched.email && formik.errors.email && <span className="cart__form-error">{formik.errors.email}</span>}
                        </p>
                        <p className="account__input-container">
                            <Field type={'text'}
                                className={formik.touched.phone && formik.errors.phone ? "form-input cart__form-input-error" : "form-input"}
                                name={'phone'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />
                            <span className='login__form-placeholder'>Phone</span>
                            {formik.touched.phone && formik.errors.phone && <span className="cart__form-error">{formik.errors.phone}</span>}
                        </p>
                        <p className="account__input-container">
                            <Field type={'text'}
                                className={formik.touched.country && formik.errors.country ? "form-input cart__form-input-error" : "form-input"}
                                name={'country'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.country}
                            />
                            <span className='login__form-placeholder'>Country</span>
                            {formik.touched.country && formik.errors.country && <span className="cart__form-error">{formik.errors.country}</span>}
                        </p>
                        <p className="account__input-container">
                            <Field type={'text'}
                                className={formik.touched.city && formik.errors.city ? "form-input cart__form-input-error" : "form-input"}
                                name={'city'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.city}
                            />
                            <span className='login__form-placeholder'>City</span>
                            {formik.touched.city && formik.errors.city && <span className="cart__form-error">{formik.errors.city}</span>}
                        </p>
                        <p className="account__input-container">
                            <Field type={'text'}
                                className={formik.touched.address && formik.errors.address ? "form-input cart__form-input-error" : "form-input"}
                                name={'address'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                            />
                            <span className='login__form-placeholder'>Address</span>
                            {formik.touched.address && formik.errors.address && <span className="cart__form-error">{formik.errors.address}</span>}
                        </p>
                        <Field
                            type="button"
                            className="account__form-button"
                            disabled={!formik.isValid}
                            onClick={formik.handleSubmit}
                            value="Save" />
                    </div>
                }
                }
            </Formik>
            <h1 className="account__form-title">Change password</h1>
            <Formik
                initialValues={{
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                }}
                validate={this.validateLoginForm}
                validateOnBlur
                onSubmit={(values) => {
                    if (values.email == "" || values.password == "") { return }
                    else { this.props.login(values.email, values.password) }
                }}
                validationSchema={this.validationSchema}
            >
                {(formik) => {
                    return <div className="account__form-container">
                        <p className="account__input-container">
                            <Field type="password"
                                className={formik.touched.password && formik.errors.password ? "form-input cart__form-input-error" : "form-input"}
                                name={'email'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <span className='login__form-placeholder'>Current Password</span>
                            {formik.touched.password && formik.errors.password && <span className="cart__form-error">{formik.errors.password}</span>}
                        </p>
                        <p className="account__input-container">
                            <Field type={"text"}
                                className={formik.touched.newPassword && formik.errors.newPassword ? "form-input cart__form-input-error" : "form-input"}
                                name={'newPassword'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPassword}
                            />
                            <span className='login__form-placeholder'>New Password</span>
                            {formik.touched.newPassword && formik.errors.newPassword && <span className="cart__form-error">{formik.errors.newPassword}</span>}
                        </p>
                        <p className="account__input-container">
                            <Field type={"password"}
                                className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "form-input cart__form-input-error" : "form-input"}
                                name={'confirmPassword'}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                            />
                            <span className='login__form-placeholder'>Confirm Password</span>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && <span className="cart__form-error">{formik.errors.confirmPassword}</span>}
                        </p>
                        <Field
                            type="button"
                            className="account__form-button"
                            disabled={!formik.isValid}
                            onClick={formik.handleSubmit}
                            value="Change Password" />
                    </div>
                }
                }
            </Formik>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userId: state.auth.userId,
        successChange: state.auth.successChange
    }
}

export default connect(mapStateToProps, { login, successChanged })(LoginForm)