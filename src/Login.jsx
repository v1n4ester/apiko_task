import { Field, Formik } from "formik";
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { login } from './Redux/auth-reducer';

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {visiblePassword : false}
    }
    setVisiblePassword=()=>(this.setState({visiblePassword: !this.state.visiblePassword}))
    validateLoginForm = values => {
        const errors = {};
        if (!values.password) {
            return
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(values.password)) {
            errors.password = "invalid password"
        }

        return errors
    };

    validationSchema = yup.object().shape({
        password: yup.string().typeError('should be a string')
            .max(35, 'max 8 characters').min(8, 'min 2 characters').required('required'),
        email: yup.string().email('Email should be correct').required('required'),
    });

    render() {
        if (this.props.isAuth) {
            return <Navigate to={"/main"} />
        }
        return (
            <div>
                <h1>Login</h1>

                <Formik
                    initialValues={{
                        password: '',
                        email: ''
                    }}
                    validate={this.validateLoginForm}
                    validateOnBlur
                    onSubmit={(values) => {
                        if (values.email == ""|| values.password == "") { return }
                        else { this.props.login( values.email, values.password) }
                    }}
                    validationSchema={this.validationSchema}
                >
                    {(formik) => {
                        return <div>
                            <p>
                                <Field type="email"
                                    name={'email'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    placeholder='email'

                                />
                            </p>
                            {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
                            <p>
                                <Field type={this.state.visiblePassword ? "text" : "password"}
                                    name={'password'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    placeholder='password'

                                />
                            </p>
                            {/* {formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>} */}
                            <Field 
                                type="button"
                                onClick={this.setVisiblePassword}
                                value="show password"/>
                            {this.props.fullName == 'something went wrong' && <div><h4>Common error</h4></div>}
                            {console.log(formik.errors)}
                            <Field 
                                type="button"
                                disabled={!formik.isValid}
                                onClick={formik.handleSubmit}
                                value="Send"/>
                        </div>
                    }
                    }
                </Formik>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userId: state.auth.userId
    }

}

export default connect(mapStateToProps, { login })(LoginForm)