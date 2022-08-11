import { NavLink } from 'react-router-dom'
import basket from '../../assets/header-images/basket.svg'
import heart from '../../assets/header-images/heart.svg'
import logo from '../../assets/header-images/logo.svg'
import s from './Header.module.css'
import LoginForm from '../../Login'
import RegisterForm from '../../Register'
import { useState } from 'react'

const Header = () => {
    const ReloadPage=()=>{
        if(window.location.pathname === "/main"){
            return window.location.reload(false)
        }
    }
    const [openLog, setOpenLog] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    return (
        <div className={s.header}>
            <div>
                <NavLink to="/main" onClick={ReloadPage}><img className={s.logo} src={logo} /></NavLink>
            </div>
            <div className='header__buttons'>
                <NavLink to="/likes"><img className={s.likes} src={heart} /></NavLink>
                <NavLink to="/cart"><img className={s.box} src={basket} /></NavLink>
            </div>
            <div className='header__login'>
                <h2><a onClick={() => setOpenRegister(true)}>Register</a>|| <a onClick={() => setOpenLog(true)}>Log In</a></h2>
            </div>
            <RegisterForm 
            isOpen={openRegister}
            onClose={() => setOpenRegister(false)}/>
            <LoginForm 
            isOpen={openLog}
            onClose={() => setOpenLog(false)}/>
        </div>
    )
}

export default Header