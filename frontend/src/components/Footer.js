import React from "react";
import {Link} from 'react-router-dom'

export default function Footer(){

    return (
        <footer className="bg-dark text-center p-2 mt-auto">
            <div className="text-center text-white p-3">
                SellIt
                <hr/>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-3">
                                <Link className="text-white" to={'/'}>Main</Link>
                            </div>
                            <div className="col-3">
                                <Link className="text-white" to={'/contact/'}>Contact</Link>
                            </div>
                            <div className="col-3">
                                <a className="text-white" href="">Sign Up</a>
                            </div>
                            <div className="col-3">
                                <a className="text-white" href="">About Us</a>
                            </div>
                        </div>
                    </div>
            </div>
        </footer>
    )

}