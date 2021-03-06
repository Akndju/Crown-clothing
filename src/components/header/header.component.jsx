import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header=({currentUser, hidden, toggleCartHidden})=>(
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>Shop</Link>
            <Link className='option' to='/shop'>Contact</Link>
            {currentUser?
            <div className='Option' onClick={()=>{auth.signOut()}}>Sign out</div>
            :<Link className='option' to='/signin'>Sign in</Link>}
            <CartIcon />
        </div>
        {hidden? null: (<CartDropdown />)}
    
    </div>

)

const mapStateToProps= ({user: {currentUser}, cart: {hidden}})=>({
    currentUser, hidden
})



export default connect(mapStateToProps)(Header);