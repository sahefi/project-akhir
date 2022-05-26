import React from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


class User extends React.Component {
    constructor() {
        super();
        this.state = {
            user: [],
            isModalOpen: false,
            token: "",
            id_user: 0,
            theimage: false,
            name_user: "",
            image_user: "",
            address_user: "",
            level_user: "",
            gender_user: "",
            age_user: 0,
            phone_user: "",
            email_user: "",
            password_user: "",
            search: "",
            isModalPw: false
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/login'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false,
            isModalPw: false,
        })
    }

    getUser = () => {
        let url = 'http://localhost:8000/user/'
        axios.get(url)
            .then(res => {
                this.setState({
                    user: res.data.data
                })
                console.log(this.state.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8000/user/" + id
        if (window.confirm("Are you sure to delete this user ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getUser()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findUser = (event) => {
        let url = "http://localhost:8000/user/find";
        if (event.keyCode === 13) {
            // menampung data keyword pencarian
            let form = {
                find: this.state.search
            }
            // mengakses api untuk mengambil data pegawai
            // berdasarkan keyword
            axios.post(url, form)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    this.setState({ user: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            name_user: item.name_user,
            img_user: item.img_user,
            address_user: item.address_user,
            gender_user: item.gender_user,
            age_user: item.age_user,
            phone_user: item.phone_user,
            email_user: item.email_user,
            id_user: item.id_user,
            action: "update"
        })
    }

    handleEditPw = (item) => {
        this.setState({
            isModalPw: true,
            id_user: item.id_user,
            password_user: item.password_user
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name_user: "",
            img_user: null,
            address_user: "",
            gender_user: "",
            age_user: null,
            phone_user: "",
            email_user: "",
            password_user: "",
            action: "insert"
        })
    }

    handleSavePw = (e) => {
        e.preventDefault()
        let data = {
          password_user: this.state.password_user
        }
        if (window.confirm("Are you sure to change password?")) {
          let url = "http://localhost:8000/user/update/" + this.state.id_user
          axios.put(url, data)
            .then(res => {
              window.location = '/user'
            })
            .catch(err => {
              console.log(err)
            })
        }
      }

    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()

        form.append("name_user", this.state.name_user)
        form.append("img_user", this.state.img_user)
        form.append("address_user", this.state.address_user)
        form.append("gender_user", this.state.gender_user)
        form.append("age_user", this.state.age_user)
        form.append("phone_user", this.state.phone_user)
        form.append("email_user", this.state.email_user)
        form.append("password_user", this.state.password_user)

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8000/user/"
            axios.post(url, form)
                .then(res => {
                    this.getUser()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8000/user/" + this.state.id_user
            axios.put(url, form)
                .then(res => {
                    this.getUser()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.getUser()
    }



    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">User</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Cari..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findUser} />

                        </div>
                        <div className="col-3 mt-5">
                            <button className="btn btn-dark" id="btn-blue" onClick={() => this.handleAdd()}>Add Data</button>
                        </div>
                    </div>


                    <table className="table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_user}</td>
                                        <td>{item.name_user}</td>
                                        <td>{item.address_user}</td>
                                        <td>{item.phone_user}</td>
                                        <td>{item.gender_user}</td>
                                        <td>{item.age_user}</td>
                                        <td>{item.email_user}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="sky" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleDrop(item.id_user)}><i className="fa fa-trash"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleEditPw(item)}>Password</button>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br></br>



                </div>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>User</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name_user" placeholder="Input name"
                                    value={this.state.name_user} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address_user" placeholder="Input address"
                                    value={this.state.address_user} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select type="text" name="gender_user" onChange={this.handleChange} >
                                    <option value={this.state.gender_user}>{this.state.gender_user}</option>
                                    <option value="P">Female</option>
                                    <option value="L">Male</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" name="age_user" placeholder="Input Age"
                                    value={this.state.age_user} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone_user" placeholder="Input phonenumber" value={this.state.phone_user}
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" name="img_user" placeholder="Input image"
                                    onChange={this.handleFile} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email_user" value={this.state.email_user} placeholder="Masukkan gambar"
                                    onChange={this.handleChange} />
                            </Form.Group>
                            {this.state.action == "insert" &&
                            <Form.Group className="mb-2" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password_user" value={this.state.password_user} placeholder="Masukkan password"
                                    onChange={this.handleChange} />
                            </Form.Group>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" type="submit" id="blue">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                
                <Modal show={this.state.isModalPw} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Password</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSavePw(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password_user" value={this.state.password_user} placeholder="Masukkan password"
                                    onChange={this.handleChange} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" type="submit" id="blue">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default User;