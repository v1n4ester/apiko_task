import { NavLink } from 'react-router-dom'
import basket from '../../assets/header-images/basket.svg'
import heart from '../../assets/header-images/heart.svg'
import logo from '../../assets/header-images/logo.svg'
import s from './Header.module.css'

const Header = () => {
    return (
        <div className={s.header}>
            <div>
                <NavLink to="/main"><img className={s.logo} src={logo} /></NavLink>
            </div>
            <div className='header__buttons'>
                <NavLink to="/likes"><img className={s.likes} src={heart} /></NavLink>
                <NavLink to="/box"><img className={s.box} src={basket} /></NavLink>
            </div>
            <div className='header__login'>
                <h2>Register || <NavLink to="/login">Log In</NavLink></h2>
            </div>
        </div>
    )
}

export default Header