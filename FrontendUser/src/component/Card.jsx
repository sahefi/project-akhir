
import React from "react"

class Card extends React.Component {
    render() {
        return (
            <div className="col-lg-6 col-sm-12 p-2" key={this.props.key}>
                <div className="card" id="card">
                    <div className="card-body row" id="crd">
                        {/* menampilkan Gambar / cover */}
                        <div className="col-5 mt-3">
                            <img src={this.props.cover} className="img"
                                id="buku" />
                        </div>

                        {/* menampilkan deskripsi */}
                        <div className="col-7 mt-3" id="text">
                            <h4 className="judul fs-3">
                                {this.props.judul}
                            </h4>
                            <h6 className="price fs-6 fw-normal">
                                Rp {this.props.harga},00
                            </h6>
                            <h6 className="fs-6 fw-lighter mb-3">
                                 {this.props.description}
                            </h6>
                            {/* <h6 className="fs-6 fw-lighter">
                                {this.props.penerbit}
                            </h6> */}
                            

                            

                            <button className="btn btn-sm btn-dark m-1" id="dark"
                                onClick={this.props.onCart}>
                                Buy Shoes
                            </button>

                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
export default Card;


