import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import arrow from '../../assets/header-images/arrow.svg'
import basket from '../../assets/header-images/basket.svg'
import heart from '../../assets/header-images/heart.svg'
import logo from '../../assets/header-images/logo.svg'
import PleaseAuthorize from '../Portals/PleaseAuthorizePortal'
import { logout } from '../../Redux/auth-reducer'
import RegisterForm from '../Forms/Register'
import { withNavigate } from '../Cart/Cart'
import LoginForm from '../Forms/Login'
import { getFirstLetters } from '../utils/FirsLettersFunction'

const Header = (props) => {
    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside);
    }, [])
    const ReloadPage = () => {
        if (window.location.pathname === "/main") {
            return window.location.reload(false)
        }
    }
    const handleClickOutside = e => {
        if (
          !e.target.classList[0].includes("header__options-list") &&
          !e.target.classList[0].includes("header__options-name") &&
          !e.target.classList[0].includes("header__options-button") &&
          !e.target.classList[0].includes("header__arrow_active")
        ) {
            setOptionsList(false)
        }
    };
    const navigateToAccount=()=>{
        setOptionsList(!optionsList);
        return props.navigate('/account')

    }
    const [optionsList, setOptionsList]=useState(false)
    let userName
    let name
    if (props.isAuth) {
        userName = props.userName.split(' ')[0]
        name = getFirstLetters(props.userName)
    }
    
    const [openLog, setOpenLog] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openAsk, setOpenAsk] = useState(false);
    return (
        <div className={"header"}>
            <NavLink to="/main" onClick={ReloadPage}><img className={"header__logo"} src={logo} /></NavLink>
            <div className="header__buttons-container">
                <div className='header__buttons'>
                    {props.isAuth ? <NavLink to="/likes"><img className={"header__symbol"} src={heart} /></NavLink> :
                        <img onClick={() => setOpenAsk(true)} className={"header__symbol"} src={heart} />}
                    {props.isAuth ? <NavLink to="/cart"><img className={"header__symbol"} src={basket} /></NavLink> :
                        <img onClick={() => setOpenAsk(true)} className={"header__symbol"} src={basket} />}
                </div>
                <div className='header__login'>
                    {props.isAuth ?
                        <div className='header__forms-container'>
                            <span className='header__greeting'> Welcome, {userName}!</span>
                            {/* <NavLink to='/account'>{name}</NavLink> */}
                            {/* <span className='header__user-logo' onClick={() => props.logout()}>Log Out</span> */}
                            <span className='header__user-logo'>{name}</span>
                            <img className={optionsList? "header__arrow_active" : "header__arrow"} onClick={()=>setOptionsList(!optionsList)} src={arrow}/>
                            {optionsList && <ul className='header__options-list'>
                                <li className='header__options-name'>{props.userName} <span className='header__options-span'>{props.email}</span></li>
                                <li className='header__options-button' onClick={navigateToAccount}>Settings</li>
                                <li className='header__options-button header__logout' onClick={() => props.logout()}>Log Out</li>
                            </ul>}
                        </div> :
                        <div className='header__forms-container'>
                            <span className='header__form' onClick={() => {setOpenRegister(true)}}>Register</span>
                            <div className='header__between'></div>
                            <span className='header__form' onClick={() => setOpenLog(true)}> Log In </span>
                        </div>}
                </div>
            </div>
            <PleaseAuthorize
                isOpen={openAsk}
                openLogIn={() => setOpenLog(true)}
                openRegister={() => setOpenRegister(true)}
                onClose={() => setOpenAsk(false)} />
            <RegisterForm
                isOpen={openRegister}
                onClose={() => setOpenRegister(false)}
                openLogIn={() => setOpenLog(true)} />
            <LoginForm
                isOpen={openLog}
                onClose={() => setOpenLog(false)}
                openRegister={() => setOpenRegister(true)} />
                
        </div>
    )
}

const mapStateToProps = (state) => ({
    userName: state.auth.fullName,
    isAuth: state.auth.isAuth,
    email: state.auth.email,
})

export default compose(connect(mapStateToProps, { logout, }),withNavigate)(Header)