import React from "react";
import Messages from "./Messages";
import {useEffect} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
export default function AddCategory(){

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
        data.append('image', addItem.image)
        axios.post('/add_category/', data).then(response => {
            <Redirect to='/' />
        }).catch(response => {
            setMessage('Something gone wrong. More information: ' + response)
            setHidden('')
            setTimeout(() => setHidden(1), 3000)
        })
    }

    return(
        <div className="container add-form">
            <Messages hidden={hidden} message={message}/>
            <form onSubmit={handleSubmit}  className="form-general">
                <label htmlFor="name">Name: </label>
                <input required id="name" name="name" type="text" value={addItem.name}
                       onChange={handleChange} className="form-control"/>
                <label htmlFor="description">Description:</label>
                <textarea required="" id="description" name="description" rows="10"
                          value={addItem.description} onChange={handleChange} className="form-control"/>
                <label htmlFor="image">Image: </label>
                <input required id="image" name="image"  type="text" value={addItem.image}
                       onChange={handleChange} className="form-control"/>
                <input type="submit" className="btn btn-success btn-add-new" value="Add"/>
            </form>
        </div>
    )

}