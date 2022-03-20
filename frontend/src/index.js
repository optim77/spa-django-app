import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import styled from "styled-components";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header'
import Categories from './components/Categories'
import Random from './components/Random'
import Footer from "./components/Footer";
import Category from './components/Category'
import Item from './components/Item'
import AddNew from "./components/AddItem";
import Account from "./components/Account";
import Edit from "./components/Edit";
import axios from 'axios';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Contact from './components/Contact';
//axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
//axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <React.StrictMode>
                <Header/>
                <Switch>
                    <Route exact path="/">
                        <Categories />
                        <Random/>
                    </Route>

                    <Route exact path="/contact">
                        <Contact/>
                    </Route>
                    <Route path="/categories/:slug">
                        <Category />
                    </Route>
                    <Route path="/item/:id">
                        <Item />
                    </Route>
                    <Route path="/add_new">
                        <AddNew/>
                    </Route>
                    <Route path="/profile/">
                        <Account/>
                    </Route>
                    <Route path="/edit/:id">
                        <Edit/>
                    </Route>
                </Switch>
                <Footer/>
            </React.StrictMode>
        </div>
    </BrowserRouter>
    ,
    document.getElementById('app')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
