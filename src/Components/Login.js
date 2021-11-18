import React from 'react'
// import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Axios from 'axios'

// SweetAlert2
import Swal from 'sweetalert2'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Custom CSS
import '../Components/Login.css'

/* image */
import bgImage from '../Assets/Images/BG_Login.png'
import imgKiri from '../Assets/Images/Logo_KB_Big.png';
import imgAstrid from '../Assets/Images/astrid2.jpg'

// Feather-Icon
const User = require('react-feather/dist/icons/user').default;
const Key = require('react-feather/dist/icons/key').default;


class Login extends React.Component {
  state = {
    Config: {
      url: 'http://localhost:7070/auth',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },      
      data: null
    }
  }

  componentDidMount = () => {

  }

  componentDidUpdate = async(prevState, prevProps) => {
    if ( prevProps.config !== this.state.Config ) {
      const datax = await Axios(this.state.Config).then(response => response).catch(error => null)
      if( datax !== null ) {
          let timerInterval
          let statusLogin = { status: true }                 
          Swal.fire({
            title: 'Success!',
            text: 'Redirecting to Homepage',
            icon: 'success',
            confirmButtonText: 'Cool',
            confirmButtonColor: 'orange',
            html: 'Will be redirected in <b></b> milliseconds.',
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                  console.log('I was closed by the timer')
              }

              this.setCookie('udatxu', JSON.stringify(datax), 1)
              this.setCookie('udatxu-stat', JSON.stringify(statusLogin), 1)
              if( statusLogin.status ) {
                  window.location.href = '/homepage'                
              }
            })
      } else {
          Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Okay',
            confirmButtonColor: 'orange',            
          })          
      }
    }
  };

  render() { 
    return(
        <div className="container-fluid">
          <div className="row login-page" id="login-page">
            <div className="wrapper-kiri col-md-6" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <img src={imgKiri} alt="LogoKiri" width="500px" height="500px" />
            </div>
            <div className="wrapper-kanan col-md-6" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <div className="wrapper-login" id="login" style={{ backgroundColor: 'white'}}>
                <div className="wrapper-image">
                  <img src={imgAstrid} alt="LogoLogin" style={{ width: '300px', height: '300px' }} />
                </div>
                <div className="wrapper-form mx-5" id="wrapper-form">
                  <div className="input-group mb-3" style={{ alignItems: "center" }}>
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <User />
                      </span>
                    </div>
                    <input type="text" id="username" name="username" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <div className="input-group mb-3" style={{ alignItems: "center" }}>
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon2">
                        <Key />
                      </span>
                    </div>
                    <input type="password" id="password" name="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                  </div>        
                  <div className="input-group mb-3" style={{ alignItems: "center" }}>
                    <button type="button" id="btnLogin" className="btn-warning form-control" onClick={this.clickSubmit}>
                      LOGIN
                    </button>        
                  </div>
                  <div className="input-group mb-3" style={{ alignItems: "center" }}>
                    <Link to="/forgot" className="mx-auto" style={{ "margin": "0" }}>Forgot Password ?</Link>
                    {/* <a className="mx-auto" href="/forgot" style={{ "margin": "0" }}>Forgot Password ?</a>       */}
                  </div>  
                </div> 
              </div>                 
            </div>
          </div>
        </div>  
    )
  }

  clickSubmit = () => {
    this.setState({ 
      ...this.state,
      Config: {
        ...this.state.Config,
        data: JSON.stringify({ 
          username: document.querySelector('#username').value, 
          password: document.querySelector('#password').value 
        })
      }
     })
  }

  setCookie = (name,value,days) => {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }  
}

export default Login