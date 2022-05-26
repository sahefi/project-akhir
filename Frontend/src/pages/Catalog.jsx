import React, { Component } from 'react'
import Card from '../component/Card'
import $, { get } from 'jquery'
import Navbar from '../component/Navbar'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'
import { withRouter } from './../withRouter';

class Catalog extends Component {


    constructor(props) {

        super(props)
        this.state = {
            catalog: [],
            category: [],
            isModalOpen: false,
            token: "",
            adminName: "",
            id_category: 0,
            id_class: 0,
            name_class: "",
            image_class: "",
            description_class: "",
            price: 0,
            name: "",
            category_id: "",
            search: "",
            link_class: ""
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/signin'
        }
        // setelah menambahkan file withRouter
        // kita bisa menggunakan this.props di class component
        // lalu variable yang kita difeine di withRouter.js
        // lalu ke variabel yang kita define di router
        this.state.id_category = this.props.params.id
        console.log(this.state.id_category);
    }



    // 127.0.0.1:8000/class/2
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            name_class: item.name_class,
            description_class: item.description_class,
            image_class: item.image_class,
            name: item.name,
            id_category: item.id_category,
            price: item.price,
            id_class: item.id_class,
            link_class: item.link_class,
            action: "update"
        })
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name_class: "",
            description_class: "",
            image_class: null,
            price: 0,
            link_class: "",
            action: "insert"
        })
    }

    handleFile = (e) => {
        this.setState({
            image_class: e.target.files[0]
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

        form.append("name_class", this.state.name_class)
        form.append("image_class", this.state.image_class)
        form.append("description_class", this.state.description_class)
        form.append("price", this.state.price)
        form.append("id_category", this.state.id_category)
        form.append("id_class", this.state.id_class)
        form.append("link_class", this.state.link_class)

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8000/class/"
            axios.post(url, form)
                .then(res => {
                    this.getClass()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            url = "http://localhost:8000/class/" + this.state.id_class
            axios.put(url, form)
                .then(res => {
                    this.getClass()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err)
                })
        }
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

    getClass = () => {
        let url = `http://localhost:8000/class/${this.state.id_category}`;
        // mengakses api untuk mengambil data pegawai
        axios.get(url)
            .then(res => {
                // mengisikan data dari respon API ke array pegawai
                this.setState({
                    catalog: res.data.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDrop = (id) => {
        let url = "http://localhost:8000/class/" + id
        if (window.confirm("Are you sure to delete this data ?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getClass()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    findClass = (event) => {
        let url = "http://localhost:8000/class/find";
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
                    this.setState({ catalog: response.data.result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        // method yang pertama kali dipanggil pada saat load page
        this.getClass()
        this.getCategory()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h4 className="display-6 fw-light">
                        Hello,
                    </h4>
                    

                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Cari..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findClass} />

                        </div>
                        <div className="col-3 mt-5">
                            <button onClick={() => this.handleAdd()} className="btn btn-dark" id="btn-danger">Add Data</button>
                        </div>
                    </div>

                    <div className="row">
                        {this.state.catalog.map((item, index) => (
                            <Card
                                key={index}
                                judul={item.name_class}
                                description={item.description_class}
                                // penerbit={item.penerbit}
                                harga={item.price}
                                link={item.link_class}
                                cover={"http://localhost:8000/image/class/" + item.image_class}
                                onEdit={() => this.handleEdit(item)}
                                onDrop={() => this.handleDrop(item.id_class)}
                            // onCart={() => this.addToCart(item)}
                            />
                        ))}
                    </div>
                </div>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Class</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>ClassName</Form.Label>
                                <Form.Control type="text" name="name_class" placeholder="Input classname"
                                    value={this.state.name_class} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="name">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" name="price" placeholder="Input classname"
                                    value={this.state.price} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="address">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description_class" placeholder="Input description"
                                    value={this.state.description_class} onChange={this.handleChange} as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="gender">
                                <Form.Label>Category</Form.Label>
                                <Form.Select type="text" name="id_category" onChange={this.handleChange} >
                                    <option value={this.state.id_category}>{this.state.name}</option>
                                    {this.state.category.map((item, index) => {
                                        return (

                                            <option value={item.id_category}>{item.name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" name="image_class" placeholder="Input image"
                                    onChange={this.handleFile} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" type="submit" id="dark">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

            </div>

        )
    }
}

export default withRouter(Catalog)