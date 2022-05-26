import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Navbar from '../component/Navbar'
import axios from 'axios'
import { Link, NavLink } from 'react-router-dom'

export default class Category extends Component {
    constructor() {
        super()
        this.state = {
            category: [],
            isModalOpen: false,
            token: "",
            name: "",
            image: "",
            description: "",
            id_category: 0,
            action: "",
            search: ""
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/siginin'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getCategory = () => {
        let url = "http://localhost:8000/course/"
        axios.get(url)
            .then(res => {
                this.setState({
                    category: res.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            name: item.name,
            description: item.description,
            image: item.image,
            id_category: item.id_category,
            action: "update"
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name: "",
            description: "",
            image: null,
            action: "insert"
        })
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()

        form.append("name", this.state.name)
        form.append("image", this.state.image)
        form.append("description", this.state.description)

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8000/course/"
            axios.post(url, form)
                .then(res => {
                    this.getCategory()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8000/course/" + this.state.id_category
            axios.put(url, form)
                .then(res => {
                    this.getCategory()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    findCategory = (event) => {
        let url = "http://localhost:8000/course/find";
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
                    this.setState({ category: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }


    handleDrop = (id) => {
        let url = "http://localhost:8000/course/" + id
        if (window.confirm("Are you sure to delete this data ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getCategory()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    // handleDetail = (id) => {
    //     this.props.history.push(`/category/${id}`)
    // }


    componentDidMount() {
        this.getCategory()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">Kategori</h1>

                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Cari..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findCategory} />

                        </div>
                        <div className="col-3 mt-5">
                            <button onClick={() => this.handleAdd()} className="btn btn-dark" id="btn-dark">Tambah Data</button>
                        </div>
                    </div>
                    <div className="row ">
                        {this.state.category.map((item, index) => {
                            return (
                                <div className="col-md-3 mb-4 py-1 my-1" id="p" key={index}>
                                    <div className="card h-100 text-left rounded" id="card-category">
                                        <img src={"http://localhost:8000/image/course/" + item.image} className="card-img-top" alt={item.name} id="pic-category" />
                                        <div className="card-body">
                                            <h5 className="card-title mb-1 fs-5 fw-bold">{item.name}</h5>
                                            <p className="card-text lead fw-light fs-6" id="desc-category">{item.description}</p>
                                            <button className="btn btn-sm btn-dark m-1" onClick={() => this.handleEdit(item)} id="gray"><i className="fa fa-pencil" ></i></button>
                                            <button className="btn btn-sm btn-danger m-1" onClick={() => this.handleDrop(item.id_category)} id="danger"><i className="fa fa-trash" ></i></button>
                                            <NavLink className="btn btn-sm btn-dark m-1" id="dark" to={`/category/${item.id_category}`}>Go</NavLink>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Category</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>ClassName</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Input classname"
                                    value={this.state.name} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="address">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" placeholder="Input description"
                                    value={this.state.description} onChange={this.handleChange} as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" name="image" placeholder="Input image"
                                    onChange={this.handleFile} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" type="submit" id="red">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}
