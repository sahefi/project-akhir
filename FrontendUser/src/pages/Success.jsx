import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import { NavLink } from 'react-router-dom'

export default class Success extends Component {
    constructor (){
        super()
        this.state = {
          token: "",
          userName: ""
        }
        
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
            this.state.userName = localStorage.getItem('name')
          }else{
            window.location = '/signin'
          }
    }
    render() {
        return (
            <div>
                <Navbar/>
                <div className='mt-5 text-center py-4 my-5'>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEUSwGoa1Hf///8Z0XUUxW0A0m4XzXIWynESwWoVx24A0nEY0HUA0WsV1HXc9+hS25F74qhv4KK178678NPD8tjj+e134qZb3ZeN5rSm68WF5K+u7cpo350j1nxQ25BH2oyVs0bOAAACjklEQVR4nO3c2VazMBSG4QRKpdjaf3Cuw/3fpQVaRFcSNlDN2uF9Du1J+FaGTUwwBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWqVzVytjNiKTcrHP7KV9vFpbEam1d1qvYDfs1V84AWlexG/cbSncX6HWG5MdEqA8soy+sBAnUNrEb+nOGhkFvQMRu6g8p8+Fn7+RJzgrScXCW4Dq5GRlBgpPC+AiSC2HsQGglNRzKSRFYm9LEODECa2M3/HLGLIpf5bGbfimS+tgnkbp56mTQSmNKuJ6VwXXs5l/ClMqgL4UqYfqE2EpgWpzbDVLoCHO7QQIdYUyRvPP8XXvJLN82sdVD5f5B+4aKPILiT/Zv6/4p9kPMIx8Kxwiy7L87BN2DQTwUmgiOIRSuH3UPBumqUNxnrVvXnKB6ZZC+KnQRZHfO3zW/NAing88IbnbOBVLzhCArEk9zgT8C1aWiaOdgsBfo3kWQLAuCCFQvDP5loXtaSQSqFwZvBsW5Lu5FUHkjSDKD7WP21JSExd9uUQxEkGIGxePxoQ/bfgQ3RSCCBDMonpvHPmylEaSXQfV8evDDi2Qu0J6Ba23cvWbfDUWgem101kjVfmwEqmskd638LYRAXXCmuVb2vDN9CUEQgep3Jt+7cy8ESQSq3529RVL1Jp4LrO5lIfDSdApBFIHqZSG0iVK9iyNQPR2Y0N76MYSB6rAT+yFmCuwgVHvJdGi1D4XwjqIsAfVDgf+51vjfu+EMRo2zOIYzWTXO5hnOaDY4q2s4s13j7L7hDkeDuzyGO10N7vYZ7ni2uOtruPPd4u6/4RsQJ4v/FkiDb8I0Fv9toM6yvxEFAAAAAAAAAAAAAAAAAAAAAAAAAAAAYPE+APzXG9pQs2PKAAAAAElFTkSuQmCC" alt="Illus" height="440px" width="540px" className='mx-auto d-block' /><br />
                    <h2 className='fs-4 fw-bold'>Payment success</h2>
                    <NavLink className="btn btn-dark" id="blue" to="/">
                        Go to your class
                    </NavLink>
                </div>
            </div>
        )
    }
}
