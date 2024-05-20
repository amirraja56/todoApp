import React, { useEffect, useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const List = () => {

    const [input, setInput] = useState("");
    const [getdata, setGetdata] = useState([]);
    // console.log(input)
    const change = (e) => {
        e.preventDefault()
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (input === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Field can not be empty!',
            })
        } else {
            try {
               const response=await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}`, input);  
            //    console.log(response);
               if(response){
                window.location.reload()
               }  
            } catch (err) {
                console.log(err)
                alert("server not found")
            }
        }
    };


    useEffect(() => {
        const getData = async () => {
            try {
                const getList = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}`)
                // console.log(getList.data)
                setGetdata(getList.data)
            } catch (err) {
                console.log(err)
            
            }
        }
        getData();
    });


    const handleUpdate = async (id, oldData) => {
        const newInput = window.prompt("Edit your Data", oldData)
        if ( newInput === "" ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Field can not be empty or Null !',
            })
        } else if (newInput === null) {

        } else {
            try {
                await axios.patch(`${process.env.REACT_APP_BACKEND_SERVER}${id}`, { "input": newInput });
                // console.log("added")
            } catch (err) {
                console.log(err)
                alert(err)
            }
        }
    };


    const handleDelete = async (id, input) => {
        // console.log(id)

        if (window.confirm(`do you want to delete "${input}"`))
            try {
                // Make a DELETE request to the API endpoint
                await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}${id}`);
                console.log('Data deleted successfully');
                // Handle any additional logic after deletion
            } catch (error) {
                console.error('Error deleting data:', error.message);
                // Handle error
                alert(error)
            }
    };

    return (
        <>
            <div className="main">
                <div className="center">
                    <h1 style={{ textAlign: "center" }}>List Container</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input name="input" value={input.name} onChange={change} type="text" className="form-control" placeholder="Add your favorite items" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button className="btn btn-outline-secondary cart" type="submit" id="button-addon2"><i class="bi bi-bag-plus-fill"></i></button>
                        </div>
                    </form>
                    <ol className="list-group list-group-flush">
                        {getdata.map((object, i) => (
                            <li key={i} className="list"> {object.input}
                                <a href="" className="link-dark"><i onClick={(e) => handleDelete(object._id, object.input, e.preventDefault())} className="bi bi-shield-fill-x cross float-end px-2" /></a>
                                <a href="" className="link-dark"><i onClick={(e) => handleUpdate(object._id, object.input, e.preventDefault())} className="bi bi-pencil-square float-end" /></a>
                            </li>
                        ))
                        }
                    </ol>
                    
                </div>
                <div className="button">
                <NavLink to="/" type="button" className="btn btn-info rounded">&larr;Go to Back </NavLink>
                </div>
            </div>
        </>
    )
}
export default List;
