import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar';

import {
    BrowserRouter as Router,
} from "react-router-dom";

let listItem = JSON.parse(localStorage.getItem('todoList')); //those are already prresent in LocalStroage
if(listItem == null)
{
    listItem = [];  //if localstroage is null
}
const App = () => {
    const [input, setInput] = useState("");
    const [items, setItems] = useState(listItem);
    const [elementToBeUpdated, setElementToBeUpdated] = useState("");
    const [editingMode, setEditingMode] = useState(false);

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(items))
    }, [items])

    const addItem = () => {
        if (editingMode === true) {
            const index = items.indexOf(elementToBeUpdated);
            items[index] = input;
            // console.log(items);
            setItems([...items]);
            setEditingMode(false);
            setInput("");
        }
        else {
            if (input) {  //if input value should not be empty
                setItems([...items, input]) //tricky
                setInput("");
            }
        }
    }

    const handleDelete = (ele) => {
        const index = items.indexOf(ele);
        if (index > -1) {
            items.splice(index, 1)
        }
        // console.log(items);
        setItems([...items]); 
    }

    const handleDeleteAll = (items) => {
        items = [];
        setItems([...items]); 
    }

    const handleEdit = (ele) => {
        setInput(ele);
        setElementToBeUpdated(ele);
        setEditingMode(true);
    }

    return (
        <>
            <Router>
                <Navbar />
                <div className="container c1">
                    <div>
                        <div className="card-body c1">
                            <input type="text" placeholder="Enter Item..." className='form-control c4' value={input} onChange={(e) => setInput(e.target.value)} />
                            <br />
                            <button type="button" className="btn btn-success" onClick={() => addItem()} >Add</button>
                        </div>
                    </div>
                    <div className="c2">
                        
                        {
                            items.map((ele, index) => {
                                return (
                                    <div className="container" key={index}>
                                        <p className="c3">{ele}
                                            <button type="button" className="btn btn-warning" onClick={() => handleEdit(ele)} ><i className="fa-solid fa-pen-to-square"></i></button>
                                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(ele)} ><i className="fa-solid fa-trash-can"></i></button> </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button type="button" className="btn btn-danger my-3" onClick={() => handleDeleteAll(items)}>Delete All</button>
                </div>
            </Router>
        </>
    )
}

export default App
