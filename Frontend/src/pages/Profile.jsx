import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            admin: [],
            isModalOpen: false,
            token: "",
            adminName: "",
            adminId: 0,
            id_admin: 0,
            theimage: false,
            iconGender: false,
            name_admin: "",
            img_admin: "",
            address_admin: "",
            level_admin: "",
            gender_admin: "",
            age_admin: 0,
            phone_admin: "",
            email_admin: "",
            password_admin: ""
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.adminId = localStorage.getItem('id')
            // this.state.admin = localStorage.getItem('admin')
        } else {
            window.location = '/signin'
        }

        if (this.state.admin.img_admin != null) {
            this.state.theimage = true
        }

        

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAdmin = () => {
        let url = `http://localhost:8000/admin/${this.state.adminId}`;
        // mengakses api untuk mengambil data pegawai
        axios.get(url)
            .then(res => {
                // mengisikan data dari respon API ke array pegawai
                this.setState({
                     admin: res.data.data
                })
            })
            .catch(error => {
                console.log(error);
            });
            console.log(this.state.admin)

    }

    handleEdit = () => {
        this.setState({
            isModalOpen: true,
            id_admin: this.state.admin.id_admin,
            name_admin: this.state.admin.name_admin,
            img_admin: this.state.admin.img_admin,
            address_admin: this.state.admin.address_admin,
            gender_admin: this.state.admin.gender_admin,
            age_admin: this.state.admin.age_admin,
            phone_admin: this.state.admin.phone_admin,
            email_admin: this.state.admin.email_admin,
            password_admin: this.state.admin.password_admin
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
        // form.append("password", this.state.password)

        axios.put(`http://localhost:8000/admin/${this.state.adminId}`, form)
            .then(response => {
                // jika proses simpan berhasil, memanggil data yang terbaru
                this.getAdmin();
                this.handleClose()
                localStorage.setItem("name", this.state.name_admin)
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
            img_admin: e.target.files[0]
        })
    }

    handleDeleteProfile = (id) =>{
        let url = "http://localhost:8000/admin/delprof/" + id
        if (window.confirm("Are you sure to delete yout photo ptofile ?")) {
            axios.put(url)
                .then(res => {
                   this.getAdmin()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }


    componentDidMount() {
        // method yang pertama kali dipanggil pada saat load page
        this.getAdmin()
        
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

                                        {this.state.admin.img_admin ? <img src={"http://localhost:8000/image/admin/" + this.state.admin.img_admin} alt="" className='profile-img mx-auto d-block mb-2' /> : <img src="/assets/defaultprofile.jpeg" alt="" className='profile-img mx-auto d-block mb-2' />}

                                        <h4 className='display-7 fw-bold text-center'>{this.state.admin.name_admin}</h4>
                                        <h6 className='fs-6 fw-light text-center'>{this.state.admin.level_admin}</h6>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="card" id="loc-card">
                                                <span className='text-center mb-2'><i className="fa fa-map-marker" id="loc-icon"></i></span>
                                                <h5 className='display-7 fw-bold text-center'>{this.state.admin.address_admin}</h5>
                                                <h6 className='fs-6 fw-light text-center mb-4'>Address</h6>
                                            </div>

                                        </div>
                                        <div className="col">
                                            <div className="card" id="loc-card">
                                                <span className='text-center mb-2'><i className="fa fa-venus-mars" id="loc-icon"></i></span>
                                                <h5 className='display-7 fw-bold text-center'>{this.state.admin.gender_admin}</h5>
                                                <h6 className='fs-6 fw-light text-center mb-4'>Gender</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col text-center mt-4 mb-4">
                                        <input type="submit" class="btn btn-dark" value="Edit Profile" id="blue" onClick={() => this.handleEdit()} />
                                        <input type="submit" class="btn btn-dark ms-2" value="Del Photo" id="blue" onClick={() => this.handleDeleteProfile(this.state.admin.id_admin)} />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-xl-9">
                            <div className="card" id="card-profile">
                                <div className="card-body ms-3 me-3 mt-4">

                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Admin ID</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="id_admin" class="form-control" value={this.state.adminId} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="name_admin" class="form-control" value={this.state.admin.name_admin} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Phone</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="phone_admin" class="form-control" value={this.state.admin.phone_admin} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Gender</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="gender_admin" class="form-control" value={this.state.admin.gender_admin} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Address</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="address_admin" class="form-control" value={this.state.admin.address_admin} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Age</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="age_admin" class="form-control" value={this.state.admin.age_admin} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email" name="email_admin" class="form-control" value={this.state.admin.email_admin} readOnly/>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-4">
                                        <label className="col-sm-2 col-form-label fw-bold">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" name="password_admin" class="form-control" value={this.state.admin.password_admin} readOnly/>
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
                                <Form.Control type="email_admin" name="email" value={this.state.email_admin} placeholder="Masukkan gambar"
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