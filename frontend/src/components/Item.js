import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

function DeleteItem(){
    const [deleted, setDeleted] = React.useState()
    const id = document.getElementById('itemIdContainer').getAttribute('data-value')
    useEffect(() => {
        axios.post(`/delete_item/${id}/`).then(response => {
            setDeleted(true)
            console.log(response)
        }).catch(response => {
            console.log(response)
        })
    }, [])
}

export default function ShowSingleItem(){

    const[item, setItem] = React.useState()
    const id = useParams()

    useEffect(() => {
        axios.get(`/item/${id.id}`).then(response =>{
            setItem(response.data)
        })
    }, [])
    if(item !== undefined){



        let buttons = null;
        const edit = '/edit/' + item[0][0].id
        if ((localStorage.getItem('auth') && localStorage.getItem('id') === item[0][0].owner) || localStorage.getItem('is_staff')  ){
            buttons = (
                <>
                    <Link to={edit}  className="btn btn-primary m-2">Edit</Link>
                    <button onClick={DeleteItem} className="btn btn-danger">Delete</button>
                </>
            )
        }else{
            buttons = (
                <>
                    <button className="btn btn-success">Buy</button>
                </>
            )
        }

        const [similiar_items] = item[1]
        const similiar = similiar_items.map(x => {
            return (
                <div key={x.id} className="col-2">
                    <Link target="_blank" className="text-dark text-center" to={'/item/' + x.id}>
                        <img className="similar-item-image" src={ x.image } alt=""/>
                        <p>{ x.name }</p>
                        <p>{ x.price } $</p>
                    </Link>
                </div>
            )
        })


        const container = (
            <>
                <div className="container">
                    <div className="row">
                        <div id="itemIdContainer" data-value={item[0][0].id} hidden="1">1</div>
                        <div className="col-12 text-center item-head-name">
                            <p>{item[0][0].name}</p>
                        </div>
                        <div className="col-5">
                            <img className="item-image" src={ item[0][0].image } alt="item-image"/>
                        </div>
                        <div className="col-7 mb-3">
                            <small>Added: { item[0][0].created }</small>
                            <hr/>
                            <p>{ item[0][0].description }</p>
                            <p className="price-category">{ item[0][0].price }$</p>

                            {buttons}
                            <br/>
                        </div>
                        <hr/>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p>Others:</p>
                        </div>
                        {similiar}
                    </div>
                </div>
            </>
        )

        return container

    }
    else{

        return null
    }


}