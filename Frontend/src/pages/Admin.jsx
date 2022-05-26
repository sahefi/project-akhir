import React from 'react';
import $ from 'jquery';
import { Modal, Button, Form } from 'react-bootstrap';
import Navbar from '../component/Navbar';
import axios from 'axios';

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            admin: [],
            isModalOpen: false,
            token: "",
            id_admin: 0,
            theimage: false,
            name_admin: "",
            img_admin: "",
            address_admin: "",
            level_admin: "",
            gender_admin: "",
            age_admin: 0,
            phone_admin: "",
            email_admin: "",
            password_admin: "",
            search: "",
            isModalPw: false
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/signin'
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
            isModalPw: false
        })
    }


    handleSavePw = (e) => {
        e.preventDefault()
        let data = {
            password_admin: this.state.password_admin
        }
        if (window.confirm("Are you sure to change password?")) {
            let url = "http://localhost:8000/admin/update/" + this.state.id_admin
            axios.put(url, data)
                .then(res => {
                    this.getAdmin()
                    window.location = '/admin'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    handleEditPw = (item) => {
        this.setState({
            isModalPw: true,
            id_admin: item.id_admin,
            password_admin: item.password_admin
        })
    }

    getAdmin = () => {
        let url = 'http://localhost:8000/admin/'
        axios.get(url)
            .then(res => {
                this.setState({
                    admin: res.data.data
                })
                console.log(this.state.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleDrop = (id) => {
        let url = "http://localhost:8000/admin/" + id
        if (window.confirm("Are you sure to delete this user ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getAdmin()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findAdmin = (event) => {
        let url = "http://localhost:8000/admin/find";
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
                    this.setState({ admin: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            name_admin: item.name_admin,
            img_admin: item.img_admin,
            address_admin: item.address_admin,
            gender_admin: item.gender_admin,
            age_admin: item.age_admin,
            phone_admin: item.phone_admin,
            email_admin: item.email_admin,
            id_admin: item.id_admin,
            action: "update"
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name_admin: "",
            img_admin: null,
            address_admin: "",
            gender_admin: "",
            age_admin: "",
            phone_admin: "",
            email_admin: "",
            password_admin: "",
            action: "insert"
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()

        form.append("name_admin", this.state.name_admin)
        form.append("img_admin", this.state.img_admin)
        form.append("address_admin", this.state.address_admin)
        form.append("gender_admin", this.state.gender_admin)
        form.append("age_admin", this.state.age_admin)
        form.append("phone_admin", this.state.phone_admin)
        form.append("email_admin", this.state.email_admin)
        form.append("password_admin", this.state.password_admin)

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8000/admin/"
            axios.post(url, form)
                .then(res => {
                    this.getAdmin()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8000/admin/" + this.state.id_admin
            axios.put(url, form)
                .then(res => {
                    this.getAdmin()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.getAdmin()
    }



    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">Admin</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search Category..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findAdmin} />

                        </div>
                        <div className="col-3 mt-5">
                            <button onClick={() => this.handleAdd()} className="btn btn-dark" id="btn-blue">Add Data</button>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Admin ID</th>
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
                            {this.state.admin.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id_admin}</td>
                                        <td>{item.name_admin}</td>
                                        <td>{item.address_admin}</td>
                                        <td>{item.phone_admin}</td>
                                        <td>{item.gender_admin}</td>
                                        <td>{item.age_admin}</td>
                                        <td>{item.email_admin}</td>

                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="sky" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-dark m-1" id="light" onClick={() => this.handleDrop(item.id_admin)}><i className="fa fa-trash"></i></button>
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
                        <Modal.Title>Admin</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name_admin" placeholder="Input name"
                                    value={this.state.name_admin} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address_admin" placeholder="Input address"
                                    value={this.state.address_admin} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select type="text" name="gender_admin" onChange={this.handleChange} >
                                    <option value={this.state.gender_admin}>{this.state.gender_admin}</option>
                                    <option value="P">Female</option>
                                    <option value="L">Male</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" name="age_admin" placeholder="Input Age"
                                    value={this.state.age_admin} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone_admin" placeholder="Input phonenumber" value={this.state.phone_admin}
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" name="img_admin" placeholder="Input image"
                                    onChange={this.handleFile} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email_admin" value={this.state.email_admin} placeholder="Masukkan gambar"
                                    onChange={this.handleChange} />
                            </Form.Group>
                            {this.state.action === "insert" &&
                                <Form.Group className="mb-2" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password_admin" value={this.state.password_admin} placeholder="Masukkan password"
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
                        <Modal.Title>Edit Password</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSavePw(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password_admin" value={this.state.password_admin} placeholder="Masukkan password"
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

export default Admin;