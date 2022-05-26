import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios'
import { withRouter } from './../withRouter';


class Payment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transaction: [], // untuk menyimpan list cart
            user: "",
            id_user: 0,
            id_transaksi: 0,
            nomor_transaksi: null,
            class: [],
            verification: 0
        }

        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.user = localStorage.getItem('name')
            this.state.id_user = localStorage.getItem('id')
        } else {
            window.location = '/signin'
        }
        this.state.id_transaksi = this.props.params.id_transaksi
        this.state.verification = localStorage.getItem("verification")
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleUpload = (e) => {
        e.preventDefault()
        let data = {
            nomor_transaksi: this.state.nomor_transaksi
        }
        let url = `http://localhost:8000/transaksi/bayar/${this.state.id_transaksi}`
        let url1 = "http://localhost:8000/transaksi/myclass/" + this.state.id_user
        if(data.nomor_transaksi === this.state.verification){
            axios.put(url, data)
            .then(response => {
                axios.get(url1)
                    .then(res => {
                        this.setState({
                            class: res.data.data
                        })
                        localStorage.setItem("class", JSON.stringify(this.state.class))
                    })
                    .catch(error => {
                        console.log(error)
                    })
                window.alert(response.data.message)
                localStorage.removeItem("verification")
                window.location = '/success'
            })
            .catch(error => {
                console.log(error);
            });
        }else{
            window.alert("Your token verification is not valid")
        }
        

    }



    render() {
        return (
            <div>
                <Navbar />
                <div className="contain"><br /><br /><br /><br />


                    <div className="card mx-auto d-block" id="card-proof">
                        <div className="card-body">
                            <h1>Shoez</h1>

                            <h4 className='fs-2 fw-bold text-center'>Proof Of Transaction</h4>
                            <h5 className='fs-6 fw-light text-center mb-5'>Upload your proof of transaction here</h5>
                            <form onSubmit={(e) => this.handleUpload(e)} className='ms-5 me-5'>
                                <label htmlFor="" className='mb-2'>Transaction Number</label>
                                <input type="text" className='form-control' onChange={this.handleChange} value={this.state.nomor_transaksi} placeholder='Input your transaction number' name="nomor_transaksi" /><br />
                                <input type="submit" className='btn btn-dark w-100' id="dark" value="Pay" />
                            </form>
                        </div>
                    </div>



                </div>
            </div>
        )
    }
}

export default withRouter(Payment)