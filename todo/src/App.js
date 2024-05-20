import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'


const App = () => {

  const [pass, setpass] = useState("");
  const [add, setAdd] = useState([])
  const [toggle, setToggle] = useState(true)
  const [edit, setEdit] = useState(null)
  // console.log(`edit---${edit}`)
  // console.log(add)
  const change = (e) => {
    setpass(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    if (pass == "") {
      // alert("Field can not be empty")
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Field can not be empty!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })

    } else if (pass && !toggle) {
      setAdd(add.map((elem) => {
        // console.log(elem);
        if (elem === edit) {
          return elem, pass
        }
        return elem
      }))

    } else {
      
      setAdd((old) => {
        return [...old, pass]
      })
    };
    setpass("");
    setToggle(true)
  };

  const update = (e) => {
    e.preventDefault();
    const editVal = e.target.getAttribute('edit')
    setToggle(false)
    setpass(editVal)
    setEdit(editVal)
  };

  const remove = (e) => {
    e.preventDefault();
    setpass("");
    setToggle(true)

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let z = e.target.getAttribute('delete')
        setAdd(add.filter(y => y !== z))
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  return (
    <>
      <div className="main">
        <div className="center">
          <h1 style={{ textAlign: "center" }}>List Container</h1>
          <div className="input-group mb-3">
            <input name="input" value={pass} onChange={change} type="text" className="form-control" placeholder="Add your favorite items" aria-label="Recipient's username" aria-describedby="button-addon2" />
            {
              toggle ? <button onClick={submit} className="btn btn-outline-secondary cart" type="button" id="button-addon2"><i className="bi bi-bag-plus-fill"></i></button> :
                <button onClick={submit} className="btn btn-outline-secondary cart" type="button" id="button-addon2"><i className="bi bi-pencil-square"></i></button>
            }

          </div>

          <ol className="list-group list-group-flush">
            {add.map((val, index) => {
              return (
                <>
                  <li className="list">&emsp;{val}
                    <a href="" className="link-dark"><i delete={val} onClick={remove} className="bi bi-shield-fill-x cross float-end px-2" /></a>
                    <a href="" className="link-dark"><i edit={val} onClick={update} className="bi bi-pencil-square float-end"></i></a>
                  </li>
                </>
              )
            })}
          </ol>
          
        </div>
        <div className="button">
          <NavLink to="/list" type="button" className="btn btn-info rounded">Go to Crud with Backend&rarr; </NavLink>
          </div>
      </div>
    </>
  )
}
export default App;
