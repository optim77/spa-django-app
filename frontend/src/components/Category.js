import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

class getItemCategory extends React.Component {
}

export default function Category(){
    const [items, setItems] = React.useState();
    const cat = useParams();
    useEffect(() => {
        axios.get(`/category/${cat.slug}`).then(response => {
            setItems(response.data)
        })
    }, [])

    if (items){
        const container = items.map(x => {
            return(
                <div key={x.id} className="col-3 item-category-tab text-center ">
                    <Link className="text-dark" to={'/item/' + x.id}>
                        <img className="item-category-image" src={x.image} alt="item-image"/>
                        <p>{x.name}</p>
                        <p className="price-category">{x.price} $</p>
                    </Link>
                </div>
            )
        })

        return (
        <div className="container">
            <div className="row">
                <p className="amount-items-category">{items.length} products in this category</p>
                {container}
            </div>
        </div>
    )
    }
    else{
        return null
    }




}