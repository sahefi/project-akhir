import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: [],
            isModalOpen: false,
            token: "",
            userName: "",
            userId: 0,
            id_user: 0,
            theimage: false,
            iconGender: false,
            name_user: "",
            img_user: "",
            address_user: "",
            level_user: "",
            gender_user: "",
            age_user: 0,
            phone_user: "",
            email_user: "",
            password_user: ""
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.userId = localStorage.getItem('id')
            // this.state.admin = localStorage.getItem('admin')
        } else {
            window.location = '/signin'
        }

        if (this.state.user.image != null) {
            this.state.theimage = true
        }

        

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getUser = () => {
        let url = `http://localhost:8000/user/${this.state.userId}`;
        // mengakses api untuk mengambil data pegawai
        axios.get(url)
            .then(res => {
                // mengisikan data dari respon API ke array pegawai
                this.setState({
                     user: res.data.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleEdit = () => {
        this.setState({
            isModalOpen: true,
            id_user: this.state.user.id_user,
            name_user: this.state.user.name_user,
            img_user: this.state.user.img_user,
            address_user: this.state.user.address_user,
            gender_user: this.state.user.gender_user,
            age_user: this.state.user.age_user,
            phone_user: this.state.user.phone_user,
            email_user: this.state.user.email_user,
            password_user: this.state.user.password_user
        })
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
        // form.append("password", this.state.password)

        axios.put(`http://localhost:8000/user/${this.state.userId}`, form)
            .then(response => {
                // jika proses simpan berhasil, memanggil data yang terbaru
                this.getUser();
                this.handleClose()
                localStorage.setItem("name", this.state.name_user)

            })
            .catch(error => {
                console.log(error);
            });
    }



    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleFile = (e) => {
        this.setState({
            img_user: e.target.files[0]
        })
    }

    handleDeleteProfile = (id) =>{
        let url = "http://localhost:8000/user/delprof/" + id
        if (window.confirm("Are you sure to delete yout photo ptofile ?")) {
            axios.put(url)
                .then(res => {
                   this.getUser()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }


    componentDidMount() {
        // method yang pertama kali dipanggil pada saat load page
        this.getUser()
        
    }



    render() {
        return (
            <div>
                <Navbar />
                <div className="container mb-4 mt-5">

                    <div className="row mt-2">
                        <div className="col-lg-4 col-xl-3">
                            <div className="card mb-5" id="card-profile">
                                <div className="card-body">

                                    <div className="media mb-5 mt-4 ">

                                        {this.state.user.img_user ? <img src={"http://localhost:8000/image/user/" + this.state.user.img_user} alt="" className='profile-img mx-auto d-block mb-2' /> : <img src="/assets/defaultprofile.jpeg" alt="" className='profile-img mx-auto d-block mb-2' />}

                                        <h4 className='display-7 fw-bold text-center'>{this.state.user.name_user}</h4>
                                        <h6 className='fs-6 fw-light text-center'>{this.state.user.level_user}</h6>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="card" id="loc-card">
                                                <span className='text-center mb-2'><i className="fa fa-map-marker" id="loc-icon"></i></span>
                                                <h5 className='display-7 fw-bold text-center'>{this.state.user.address_user}</h5>
                                                <h6 className='fs-6 fw-light text-center mb-4'>Address</h6>
                                            </div>

                                        </div>
                                        <div className="col">
                                            <div className="card" id="loc-card">
                                                <span className='text-center mb-2'><i className="fa fa-venus-mars" id="loc-icon"></i></span>
                                                <h5 className='display-7 fw-bold text-center'>{this.state.user.gender_user}</h5>
                                                <h6 className='fs-6 fw-light text-center mb-4'>Gender</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col text-center mt-4 mb-5">
                                        <input type="submit" class="btn btn-dark" value="Edit Profile" id="blue" onClick={() => this.handleEdit()} />
                                        <input type="submit" class="btn btn-dark ms-2" value="Del Photo" id="blue" onClick={() => this.handleDeleteProfile(this.state.user.id_user)} />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-xl-9">
                            <div className="card" id="card-profile">
                                <div className="card-body ms-3 me-3 mt-4">
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="name" class="form-control" value={this.state.user.name_user} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Phone</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="phone" class="form-control" value={this.state.user.phone_user} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Gender</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="gender" class="form-control" value={this.state.user.gender_user} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Address</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="address" class="form-control" value={this.state.user.address_user} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Level</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="address" class="form-control" value={this.state.user.level_user} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Age</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="age" class="form-control" value={this.state.user.age_user} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email" name="email" class="form-control" value={this.state.user.email_user} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" name="password" class="form-control" value={this.state.user.password_user} readOnly/>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
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
                            {/* <Form.Group className="mb-2" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} placeholder="Masukkan password"
                                    onChange={this.handleChange} />
                            </Form.Group> */}
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

export default Profile;