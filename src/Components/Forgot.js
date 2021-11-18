import React from 'react'
// import { Row, Col, Button } from 'react-bootstrap';
import Axios from 'axios'

// SweetAlert2
import Swal from 'sweetalert2'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Custom CSS
import '../Components/Login.css'
// Feather-Icon
const User = require('react-feather/dist/icons/user').default;
const Key = require('react-feather/dist/icons/key').default;
// const Eye = require('react-feather/dist/icons/eye').default;
const EyeOff = require('react-feather/dist/icons/eye-off').default;

class Forgot extends React.Component {
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

  componentDidUpdate = (prevState, prevProps) => {
    if ( prevProps.config !== this.state.Config ) {
      const datax = Axios(this.state.Config).then(response => response).catch(error => null)
      if( datax !== null ) {
          let timerInterval            
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
                  window.location.href='/'
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
      <div className="row login" id="login">
        <div className="wrapper-image input-group mb-3" style={{"justifyContent": "center", "fontSize": "25px", "fontWeight": "bold", "fontStyle": "italic"}}>
          <p style={{"margin": "0"}}>Forgot Password!</p>
        </div>
        <div className="wrapper-form" id="wrapper-form">
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
              <input type="password" id="password" name="password" className="form-control" placeholder="Password Baru" aria-label="Password" aria-describedby="basic-addon2" />
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">
                  <EyeOff />
                </span>
              </div>              
            </div>
            <div className="input-group mb-3" style={{ alignItems: "center" }}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">
                  <Key />
                </span>
              </div>
              <input type="password" id="password2" name="password2" className="form-control" placeholder="Ulangi Password Baru" aria-label="password2" aria-describedby="basic-addon3" />
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">
                  <EyeOff />
                </span>
              </div>                   
            </div>                 
            <div className="input-group mb-3" style={{ alignItems: "center" }}>
              <button type="button" id="btnLogin" className="btn-warning form-control" onClick={ this.clickUpdate }>
                UPDATE
              </button> 
            </div>
            <div className="input-group mb-3" style={{ alignItems: "center" }}>
              <button type="button" id="btnLogin" className="btn-danger form-control" onClick= { this.backToHome }>
                BACK TO LOGIN PAGE
              </button>        
            </div>            
        </div> 
      </div>      
    )
  }

  backToHome = () => {
      window.location.href = '/'
  }

  clickUpdate = () => {
    if( document.querySelector('#password').value !== document.querySelector('#password2').value || document.querySelector('#password').value === '' || document.querySelector('#password2').value === '' ) {
        Swal.fire({
          title: 'Error!',
          text: 'Should Consider To Change Glasses or Recheck The Password Input',
          icon: 'error',
          confirmButtonText: 'Okay',
          confirmButtonColor: 'Orange',            
        })            
    } else {
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
  }
}

export default Forgot