import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Redirect, Route} from 'react-router-dom';
import Messages from "./Messages";
import { useNavigate } from "react-router-dom";

export default function AddNew(){

    const [categories, setCategories] = React.useState()
    const [hidden, setHidden] = React.useState(1)
    const [message, setMessage] = React.useState('')
    const [addItem, setAddItem] = React.useState({
        name: "",
        description: "",
        price: "",
        image: "",
        cat: "",
        owner: localStorage.getItem('id')
    })

    function handleChange(event){
        const {username, email,  password1, password2} = event.target
        setAddItem(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    useEffect(() => {
        axios.get('/get_categories/').then(response => {
            setCategories(response.data)
        })
    }, [])

    function handleChange(event){
        const {name, description,  price, image, cat} = event.target
        setAddItem(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        let data = new FormData();
        data.append('name', addItem.name)
        data.append('description', addItem.description)
        data.append('price', addItem.price)
        data.append('image', addItem.image)
        data.append('cat', addItem.cat)
        data.append('owner', addItem.owner)
        console.log(addItem)
        axios.post('/add_new/', data).then(response => {
            <Redirect to='/' />
        }).catch(response => {
            setMessage('Something gone wrong. More information: ' + response)
            setHidden('')
            setTimeout(() => setHidden(1), 3000)
        })
    }

    if(categories !== undefined){
        const cat = categories.map(x => {
            return(
                <option key={x.id} value={x.name} id={x.id}>{x.name}</option>
            )
        })
        return(
            <>
            <Messages hidden={hidden} message={message}/>
            <div className="container add-form">

                <form onSubmit={handleSubmit}  className="form-general">
                    <label htmlFor="name">Name: </label>
                    <input required id="name" name="name" type="text" value={addItem.name}
                           onChange={handleChange} className="form-control"/>
                    <label htmlFor="description">Description:</label>
                    <textarea required="" id="description" name="description" rows="10"
                              value={addItem.description} onChange={handleChange} className="form-control"/>
                    <label htmlFor="price">Price: </label>
                    <input required id="price" name="price"  type="text" value={addItem.price}
                         onChange={handleChange}  className="form-control"/>
                    <label htmlFor="image">Image: </label>
                    <input required id="image" name="image"  type="text" value={addItem.image}
                           onChange={handleChange} className="form-control"/>
                    <br/>
                    <label htmlFor="cat">Category:</label>
                    <select required name="cat" id="cat" value={addItem.cat} onChange={handleChange}
                            className="form-control" itemID={cat.id} >
                        <option defaultValue="-" id="-" >----</option>
                        {cat}
                    </select>
                    <input hidden="1" type="text" id="owner" name="owner"
                           defaultValue={localStorage.getItem('id')} />
                    <input type="submit" className="btn btn-success btn-add-new" value="Add"/>
                </form>
            </div>
        </>
        )

    }else {
        return (
            <div className="container text-center">
                <div className="loading bg-dark mt-5 p-3 text-white">
                    Loading...
                </div>
            </div>)
    }



}