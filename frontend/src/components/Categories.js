import React, {useState, useEffect} from "react";
import {ReactDOM} from "react-dom";
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Categories(){

    const [isLoading, setLoading] = useState(true);
    const [category, setCategory] = useState();

    useEffect(() => {
        axios.get('/get_categories').then(response => {
            setCategory(response.data);
            setLoading(false);
        });
    }, [])

    if (isLoading){
        return (
            <div className="container text-center">
                <div className="loading bg-dark mt-5 p-3 text-white">
                    Loading...
                </div>
            </div>)
    }
    const cat = category.map(x => {
        return(
            <div key={x.id} className="col-2 ">
                <Link className="text-dark text-center" to={'/categories/' + x.slug}>
                    <img className="category-image" src={x.image} alt="category-image"></img>
                    <p className="text-center">{x.name}</p>
                </Link>
            </div>
        )
    })

    return (
        <div className="container text-center">
            <hr/>
            <p className="display-3">Categories</p>
            <div className="row ">
                {cat}
            </div>
        </div>
    )
}
