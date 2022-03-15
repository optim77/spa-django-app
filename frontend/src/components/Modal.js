import React, {useRef, useEffect} from "react";
import {useSpring, animated} from "react-spring";
import styled from "styled-components";
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import Messages from "./Messages";
import DjangoCSRFToken from "django-react-csrftoken/src";


const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 50px;
  right: 30px;
  width: 32px;
  height: 32px;
  padding: 10px;
  z-index: 10;
  background-color:black;
  color: white;
`;

const getCookies = (name) => {
    var cookies = {};
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(function (c) {
            var m = c.trim().match(/(\w+)=(.*)/);
            if(m !== undefined) {
                cookies[m[1]] = decodeURIComponent(m[2]);
            }
        });
    }
    if (name) {
        return cookies[name]
    }
    return cookies;
}

export const Modal = ({showLogin, setShowLogin}) => {

    // Get CSRF token, needed to sent form to API
    const [csrf, setCsrf] = React.useState('');
    const [user, setUser] = React.useState()
    useEffect(() => {
        axios.get('/csrf').then(response => {
            setCsrf(response.data);
        });
    }, []);

    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })
    function handleSubmit(event){
        event.preventDefault()
        let data = new FormData()
        data.append("username", formData.username)
        data.append("password", formData.password)

        const token = getCookies()
        console.log(formData.username)
        console.log(formData.password)
        axios.post('/login_user/', data).then(response => {

            localStorage.setItem('user', response.data.username)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('id', response.data.id)
            localStorage.setItem('auth', true)
            localStorage.setItem('is_staff', response.data.is_staff)
            window.location.reload()
        }).catch(response =>{
            console.log(response)
        })
    }

    //Handle changes done in form and sent it to values
    function handleChange(event){
        const {username, password} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    // Add pop in animation to login window
    const modalRef = useRef()
    const animation = useSpring({
        congif: {
            duration: 250
        },
        opacity: showLogin ? 1 : 0,
        transform: showLogin ? `translateY(0%)` : `translateY(-100%)`
    })

    const closeLogin = e => {
        if(modalRef.current === e.target){
            setShowLogin(false);
        }
    }

    return(
        <>
            {showLogin ? (
                <div className="background-wrapper" ref={modalRef} onClick={closeLogin}>
                    <animated.div style={animation}>
                        <div className="modal-wrapper" showlogin={showLogin.toString()}>
                            <div className="modal-content">
                                <form onSubmit={handleSubmit}>
                                    <br/>
                                    <h1>Login</h1><br/>
                                    <input placeholder="username" value={formData.username} type="text"
                                           onChange={handleChange} name="username"/><br/>
                                    <input placeholder="password" type="password"
                                           onChange={handleChange} value={formData.password} name="password" /> <br/>
                                    <input type="submit" value="Login" className="btn btn-primary mt-5" />
                                </form>

                            </div>
                        </div>
                        <CloseModalButton
                            aria-label='Close modal'
                            onClick={() => setShowLogin(prev => !prev)}
                        />
                    </animated.div>
                </div>
            ) : null}
        </>
    )
}


export const SignModal = ({showSign, setShowSign}) => {
    // Get CSRF token, needed to sent form to API
    const [csrf, setCsrf] = React.useState('');
    const [user, setUser] = React.useState()
    const [hidden, setHidden] = React.useState(1)
    const [message, setMessage] = React.useState('')

    useEffect(() => {
        axios.get('/csrf').then(response => {
            setCsrf(response.data);
        });
    }, []);

    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password1: "",
        password2: ""
    })

    const modalRef = useRef()
    const animation = useSpring({
        congif: {
            duration: 250
        },
        opacity: showSign ? 1 : 0,
        transform: showSign ? `translateY(0%)` : `translateY(-100%)`
    })


    function handleSubmit(event){
        event.preventDefault()
        let data = new FormData()
        data.append('username', formData.username)
        data.append('email', formData.email)
        data.append('password1', formData.password1)
        data.append('password2', formData.password2)

        axios.post('/sign/', data).then(response => {
            setShowSign(false)
            setMessage('Created account')
            setHidden('')
            setTimeout(() => setHidden(1), 3000)
        }).catch(response => {
            setMessage('Something gone wrong. More information: ' + response)
            setHidden('')
            setTimeout(() => setHidden(1), 3000)
        })
    }

    //Handle changes done in form and sent it to values
    function handleChange(event){
        const {username, email,  password1, password2} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const closeSign = e => {
        if(modalRef.current === e.target){
            setShowSign(false);
        }
    }
    return (
        <>
            <Messages hidden={hidden} message={message}/>
            { showSign ? (
                <div className="background-wrapper" ref={modalRef} onClick={closeSign}>
                    <animated.div style={animation}>
                        <div className="modal-wrapper" showsign={showSign.toString()}>
                            <div className="modal-content">
                                <form onSubmit={handleSubmit}>
                                    <br/>
                                    <h1>Sign Up!</h1><br/>
                                    <input placeholder="Username" value={formData.username} type="text"
                                           onChange={handleChange} name="username"/><br/>
                                    <input placeholder="Email" value={formData.email} type="email"
                                           onChange={handleChange} name="email"/><br/>
                                    <input placeholder="Password" type="password"
                                           onChange={handleChange} value={formData.password1} name="password1" /> <br/>
                                    <input placeholder="Repeat password" type="password"
                                           onChange={handleChange} value={formData.password2} name="password2" /> <br/>
                                    <input type="submit" value="Sign Up" className="btn btn-primary mt-5" />
                                </form>
                            </div>
                        </div>
                        <CloseModalButton
                            aria-label='Close modal'
                            onClick={() => setShowSign(prev => !prev)}
                        />
                    </animated.div>
                </div>
            ) : null}
        </>
    )
}