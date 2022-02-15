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
        localStorage.setItem("todoList", JSON.stringify(items));
    }, [items])

    const handleInsert = () => {
        if (editingMode === true) {
            alert("Click 'Update' button to update the note first");
        }
        else if (input) {  //if input value should not be empty
            setItems([...items, input]) //trickyy
            setInput("");
        }
        else {
            alert("Enter something to insert");
        }
    }

    const handleDelete = (ele) => {
        const index = items.indexOf(ele);
        if (index > -1) {
            items.splice(index, 1)
        }
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
  
    const handleUpdate = () => {
        if (editingMode === true) {
            const index = items.indexOf(elementToBeUpdated);
            items[index] = input;
            setItems([...items]);
            setEditingMode(false);
            setInput("");
        }
        else {
            alert("Click on edit button of an existing note to update");
        }
    }
    
    const handleSearch = () => {
        if(editingMode === true){
            alert("Click 'Update' button to update the note first");
        }
        else if (input === "") {
            alert("Enter something to search");
        }
        else {
            const searchObj = items.filter((ele) => {
                return ele.includes(input);
            })
            if (searchObj.length !== 0) {
                alert("Found Notes --> " + searchObj);
            }
            else {
                alert("No Notes Found")
            }
        }
    }

    return (
        <>
            <Router>
                <Navbar />
                <div className="container c1">
                    <div>
                        <div className="card-body c8">
                            <input type="text" placeholder="Enter Your Note..." className='form-control c4' value={input} onChange={(e) => setInput(e.target.value)} />
                            <br />
                            <div className="container c7 my-2" >
                                <button type="button" className="btn btn-success" onClick={() => handleInsert()} >Insert</button>
                                <button type="button" className="btn btn-success mx-2" onClick={() => handleUpdate()} >Update</button>
                                <button type="button" className="btn btn-success" onClick={() => handleSearch()} >Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="c2">
                        {
                            items.map((ele, index) => {
                                return (
                                    <div className="container c10" key={index}>
                                        <p className="c3">{ele}
                                            <button type="button" className="btn btn-warning c5" onClick={() => handleEdit(ele)} data-bs-toggle="tooltip" data-bs-placement="buttom" title="edit"><i className="fa-solid fa-pen-to-square"></i></button>
                                            <button type="button" className="btn btn-danger c6" onClick={() => handleDelete(ele)} data-bs-toggle="tooltip" data-bs-placement="buttom" title="delete"><i className="fa-solid fa-trash-can"></i></button> </p>
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
