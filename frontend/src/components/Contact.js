import React, {useEffect} from 'react'
import axios from 'axios';
import Messages from "./Messages";

export default function Contact(){

    const [token, setToken] = React.useState('')
    const [hidden, setHidden] = React.useState(1)
    const [message, setMessage] = React.useState('')
    const [formData, setFormData] = React.useState({
        email: "",
        username: "",
        message: ""
    })


    function HandleChange(event){
        const {username, password} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function HandleSubmit(event){
        event.preventDefault()
        let data1 = new FormData();

        data1.append('username',formData.username)
        data1.append('email',formData.email)
        data1.append('message',formData.message)

        const tok = token.csrfToken
        axios.post('/contact/', data1).then(response => {
            setMessage('Your message was sent')
            setHidden('')
            setTimeout(() => setHidden(1), 3000)
        }).catch(response => {
            setMessage('Something gone wrong. More information: ' + response)
            setHidden('')
            setTimeout(() => setHidden(1), 3000)
        })
    }


    return (
        <>
            <Messages hidden={hidden} message={message}/>
            <div className="container">
                <div className="display-1 text-center p-5">Contact</div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Blandit aliquam etiam erat velit. In est ante in nibh mauris cursus mattis.
                    Amet tellus cras adipiscing enim eu turpis egestas. Libero id faucibus nisl tincidunt eget.
                    Varius duis at consectetur lorem donec. Tincidunt ornare massa eget egestas purus viverra accumsan in.
                    Id faucibus nisl tincidunt eget nullam non nisi est.
                    Auctor elit sed vulputate mi sit. Lorem mollis aliquam ut porttitor leo a diam.
                    Facilisis mauris sit amet massa vitae. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis.
                    Turpis egestas integer eget aliquet nibh praesent. Faucibus turpis in eu mi.
                    Vitae tortor condimentum lacinia quis vel eros donec ac odio.
                    Nisi porta lorem mollis aliquam ut porttitor leo a diam.
                    Vestibulum lectus mauris ultrices eros in cursus.
                    Tellus orci ac auctor augue mauris augue.
                </p>
            </div>
            <div className="container">
                <hr/>
            </div>

            <div className="pb-5">

                <div className="d-flex justify-content-center">

                    <form onSubmit={HandleSubmit}>
                        <div className="form-group">
                            <input className="p-1" required id="email" value={formData.email} onChange={HandleChange}
                                   type="text" name="email" placeholder="E-mail"/>
                        </div>
                        <div className="form-group mt-2">
                            <input className="p-1" required id="username" value={formData.username} onChange={HandleChange}
                                   type="text" name="username" placeholder="Username"/>
                        </div>
                        <div className="form-group mt-3">
                            <textarea className="p-1" required id="message" onChange={HandleChange}
                                      name="message" value={formData.message} placeholder="Your message" rows="5" cols="70"/>
                        </div>
                        <div className="form-group">
                            <br/>
                            <input type="submit" value="Send" className="btn btn-success"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}