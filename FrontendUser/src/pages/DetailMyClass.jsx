import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import { withRouter } from '../withRouter'
import axios from 'axios'


class DetailMyClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      class: [], // untuk menyimpan list cart
      user: "",
      id_user: 0,
      id_class: 0,
      nomor_transaksi: null
    }

    if (localStorage.getItem('token')) {
      this.state.token = localStorage.getItem('token')
      this.state.user = localStorage.getItem('name')
      this.state.id_user = localStorage.getItem('id')
    } else {
      window.location = '/signin'
    }
    this.state.id_class = this.props.params.id_class
  }

  getClass = () => {
    let url = `http://localhost:8000/transaksi/detail/${this.state.id_class}/${this.state.id_user}`;
    // mengakses api untuk mengambil data pegawai
    axios.get(url)
      .then(res => {
        // mengisikan data dari respon API ke array pegawai
        this.setState({
          class: res.data.data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    // method yang pertama kali dipanggil pada saat load page
    this.getClass()
  }


  render() {
    return (
      <div>
        <Navbar />
        <div className="container my-4 py-4">
          <div className="row">
            <div className="col-4">
              <div className="card" id="card-detail">
                <div className="card-body">
                  <img src={"http://localhost:8000/image/class/" + this.state.class.image_class} alt={this.state.class.name_class} id="im-detail" />
                  <h3 id="text-blue" className='mt-3 fw-bolder fs-4'>{this.state.class.name_class}</h3>
                  <h4 className='fs-5 fw-light mb-3'>{this.state.class.name}</h4>
                  <h6 className='fs-6 fw-light'>{this.state.class.description_class}</h6>
                </div>
              </div>
            </div>
            <div className="col-8">
            <div className="card" id="card-detail">
              <div className="card-body">
                <h1 className='fs-4 fw-bold mb-4'>Hello, {this.state.user}</h1>
                <h1 className='fs-5 fw-bolder text-left mb-5' id="text-blue">_________ How to access your course?</h1>
                <h6 className='fs-6'><span className='text-danger fw-bold'>*</span> Join and take online classes via zoom according to the schedule that TechCo has sent to your email. With the following link : </h6>
                <a href={this.state.class.link_class}>{this.state.class.link_class}</a>
              </div>
            </div>
          </div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default withRouter(DetailMyClass)
