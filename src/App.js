import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar';

import {
    BrowserRouter as Router,
} from "react-router-dom";

let listItem = JSON.parse(localStorage.getItem('todoList')); //those are already prresent in LocalStroage
if (listItem == null) {
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
                setItems([...items, input]) //trickyy
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

    const searchItem = () => {
        if (input == null) {
            alert("Enter Something to Search");
        }
        else {
            const searchObj = items.filter((ele) => {
                return ele.includes(input);
            })
            alert("Search Results -->" + searchObj);
        }
    }

    return (
        <>
            <Router>
                <Navbar />
                <div className="container c1">
                    <div>
                        <div className="card-body c8">
                            <input type="text" placeholder="Enter Item..." className='form-control c4' value={input} onChange={(e) => setInput(e.target.value)} />
                            <br />
                            <div className="container c7" >
                                <button type="button" className="btn btn-success" onClick={() => addItem()} >Add</button>
                                <button type="button" className="btn btn-success mx-2" onClick={() => searchItem()} >Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="c2">

                        {
                            items.map((ele, index) => {
                                return (
                                    <div className="container" key={index}>
                                        <p className="c3">{ele}
                                            <button type="button" className="btn btn-warning c5" onClick={() => handleEdit(ele)} ><i className="fa-solid fa-pen-to-square"></i></button>
                                            <button type="button" className="btn btn-danger c6" onClick={() => handleDelete(ele)} ><i className="fa-solid fa-trash-can"></i></button> </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button type="button" className="btn btn-danger my-3 c9" onClick={() => handleDeleteAll(items)}>Delete All</button>
                </div>
            </Router>
        </>
    )
}

export default App
