import React, { Component } from 'react'
import Card from '../component/Card'
import Navbar from '../component/Navbar'
import axios from 'axios'
import { withRouter } from './../withRouter';
import CartBar from '../component/CartBar';
class Catalog extends Component {


    constructor(props) {

        super(props)
        this.state = {
            catalog: [],
            category: [],
            isModalOpen: false,
            token: "",
            userName: "",
            id_category: 0,
            id_class: 0,
            name_class: "",
            image_class: "",
            description_class: "",
            price: 0,
            name: "",
            category_id: "",
            search: ""
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

    findClass = (event) => {
        let url = "http://localhost:8000/class/find/" + this.state.id_category;
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

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []
        let recentClass = []
        // cek eksistensi dari data cart pada localStorage
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }

        if (localStorage.getItem("class") !== null) {
            recentClass = JSON.parse(localStorage.getItem("class"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
            console.log(recentClass)
        }

        
        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.id_class === selectedItem.id_class)
        let existItemClass = recentClass.find(item => item.id_class === selectedItem.id_class)
        if (existItemClass) {
            // jika item yang dipilih ada pada keranjang belanja
            window.alert("You have had this class")
        
        } else if(existItem){
            window.alert("You have choose this class")
        }else{
            
                // masukkan item yg dipilih ke dalam cart
                tempCart.push(selectedItem)
                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
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
                    </div>

                    <div className="row">
                        {this.state.catalog.map((item, index) => (
                            <Card
                                key={index}
                                judul={item.name_class}
                                description={item.description_class}
                                // penerbit={item.penerbit}
                                harga={item.price}
                                cover={"http://localhost:8000/image/class/" + item.image_class}
                                onCart={() => this.addToCart(item)}
                            // onCart={() => this.addToCart(item)}
                            />
                        ))}
                    </div>
                </div>
                <CartBar/>
            </div>

        )
    }
}

export default withRouter(Catalog)