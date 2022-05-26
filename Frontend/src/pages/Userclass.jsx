import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

export default class Userclass extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            class: [],
            isModalOpen: false,
            token: "",
            id_user: 0,
            search: ""
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        } else {
            window.location = '/login'
        }
    }

    getUser = () => {
        let url = 'http://localhost:8000/transaksi/getUser/user'
        axios.get(url)
            .then(res => {
                this.setState({
                    user: res.data.results
                })
                console.log(this.state.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    findUser = (event) => {
        let url = "http://localhost:8000/transaksi/findUser";
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
                    this.setState({ user: response.data.results });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    detail = (id) => {
        this.setState({
            isModalOpen: true
        })
        let url = "http://localhost:8000/transaksi/myclass/" + id
        axios.get(url)
            .then(res => {
                this.setState({
                    class: res.data.data
                })
                console.log(this.state.class)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    componentDidMount() {
        this.getUser()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-light text-left">User's Class</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search Category..." id="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findUser} />
                        </div>
                    </div>


                    <table className="table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Phone Number</th>
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
                                        <td>{item.phone_user}</td>
                                        <td>{item.email_user}</td>
                                        <td>
                                            <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.detail(item.id_user)}>Detail</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br></br>



                </div>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose} aria-labelledby="example-modal-sizes-title-lg" size="lg" centered>
                    <Modal.Header closeButton id="example-modal-sizes-title-lg">
                        <Modal.Title>User's Class</Modal.Title>
                    </Modal.Header >
                    <Modal.Body>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Category</th>
                                    <th>Transaction Date</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.class.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name_class}</td>
                                            <td>{item.name}</td>
                                            <td>{this.convertTime(item.tanggal_transaksi)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" type="submit" id="blue" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
