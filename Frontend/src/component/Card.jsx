
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
                            <h6 className="fs-6 fw-lighter">
                                 {this.props.description}
                            </h6>
                            <a href={this.props.link} id="link" className="mb-3">{this.props.link}</a><br />
                            {/* <h6 className="fs-6 fw-lighter">
                                {this.props.penerbit}
                            </h6> */}
                            

                            {/* button untuk mengedit */}
                            <button className="btn btn-sm btn-dark m-1 mt-3" 
                                onClick={this.props.onEdit} data-toggle="modal" data-target="#modal" id="danger">
                               <i className="fa fa-pencil"></i>
                            </button>

                            {/* button untuk menghapus */}
                            <button className="btn btn-sm btn-danger m-1 mt-3" id="danger"
                                onClick={this.props.onDrop}><i className="fa fa-trash"></i>
                            </button>

                            {/* <button className="btn btn-sm btn-dark m-1" id="blue"
                                onClick={this.props.onCart}>
                                Add to cart
                            </button> */}

                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
export default Card;


