import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Random(){
    const [isLoading, setLoading] = useState(true);
    const [random, setRandom] = useState();

    useEffect(() => {
        axios.get('/get_random').then(response => {
            setRandom(response.data);
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
    const items = random.map(x => {
        return(
            <div key={x.id} className="col-3 explore-item">
                <Link  className="text-dark" to={'/item/' + x.id}>
                    <img className="explore-image" src={x.image} alt="item-image"/>
                    <p>{x.name}</p>
                    <p className="price-category">{x.price} $</p>
                </Link>
            </div>
        )
    })

    return(
        <div className="container text-center mb-5">
            <div className="row">
                <hr/>
                <p className="display-3">Explore</p>
                {items}
            </div>
        </div>
    )

}