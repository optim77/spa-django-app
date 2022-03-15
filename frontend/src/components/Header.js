import React, {useState} from 'react'
import styled from "styled-components";
import {Modal, SignModal} from "./Modal";
import {Link} from 'react-router-dom';


export default function Header(){

    const [showLogin, setShowLogin] = useState(false);
    const [showSign, setShowSign] = useState(false);

    const openSing = () => {
        setShowSign(prev => !prev)
    }
    const openLogin = () => {
        setShowLogin(prev => !prev)
    }
    let staffActions = null

    console.log(localStorage.getItem('is_staff'))
    if(localStorage.getItem('is_staff') == 'true'){
        staffActions = (
            <>
                <button className="text-white nav-cat btn btn-success">Add Category</button>
            </>
        )
    }

    function logout(){
        localStorage.removeItem('user')
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        localStorage.removeItem('auth')
        window.location.reload()
    }


    if(localStorage.getItem('id')){
        return (
            <nav className="navbar navbar-light navbar-expand-lg bg-dark">
                <Link className="text-white  nav-logo head-title" to="/">SellIt</Link>
                <Link className="text-white nav-cat btn" to="/contact">Contact</Link>
                <button className="text-white nav-cat btn" href="">About Us</button>
                <Link  className="text-white nav-cat btn btn-primary" to="/add_new/">Add New</Link>
                <Link className="text-white nav-cat btn btn-primary" to="/profile/">Account</Link>
                <button onClick={logout} className="text-white nav-cat btn btn-primary">Logout</button>
                {staffActions}
                <Modal showLogin={showLogin} setShowLogin={setShowLogin} />
                <SignModal showSign={showSign} setShowSign={setShowSign}/>
            </nav>
        )
    }else{
        return(

            <nav className="navbar navbar-light navbar-expand-lg bg-dark">
                <Link className="text-white  nav-logo head-title" to="/">SellIt</Link>
                <Link className="text-white nav-cat btn" to="/contact">Contact</Link>
                <button className="text-white nav-cat btn" href="">About Us</button>
                <button onClick={openLogin} className="text-white nav-cat btn btn-primary">Login</button>
                <button onClick={openSing}  className="text-white nav-cat btn btn-primary">Sign Up</button>
                <Modal showLogin={showLogin} setShowLogin={setShowLogin} />
                <SignModal showSign={showSign} setShowSign={setShowSign}/>
            </nav>

        )

    }

}