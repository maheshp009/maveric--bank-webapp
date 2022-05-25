import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const valiedfirstname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        please Enter FirstName.
      </div>
    );
  }
};

const valiedlastName = (value) => {
  if (value.length < 3 || value.length > 10) {
    return (
      <div className="invalid-feedback d-block">
        please Enter LastName.
      </div>
    );
  }
};

const valiedphoneNumber = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The phoneNumber must be between  10 characters.
      </div>
    );
  }
};

const valiedaddress = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The address must be between  50 characters.
      </div>
    );
  }
};


// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="invalid-feedback d-block">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
 // const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangefirstName = (e) => {
    const firstName = e.target.value;
    setfirstName(firstName);
  };

  const onChangelastName = (e) => {
    const lastName = e.target.value;
    setlastName(lastName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangephoneNumber = (e) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  };

  const onChangeaddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  // const onChangePassword = (e) => {
  //   const password = e.target.value;
  //   setPassword(password);
  // };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(firstName, lastName, email, address, phoneNumber).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12" style={{textAlign: '-webkit-center', marginTop: '100px'}}>
     
        {/* <img
          src="./Assets/3.jpg"
          alt="profile-img"
          className="profile-img-card"
        /> */}

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                {/* <label htmlFor="firstName">firstName</label> */}
                <Input
                  type="text"
                  className="form-control"
                  style={{width: '40%'}}
                  name="firstName"
                  value={firstName}
                  onChange={onChangefirstName}
                  validations={[required, valiedfirstname]}
                  placeholder='FirstName'
                />
              </div>

              <div className="form-group">
                {/* <label htmlFor="lastName">lastName</label> */}
                <Input
                  type="text"
                  className="form-control"
                  style={{width: '40%'}}
                  name="lastname"
                  value={lastName}
                  onChange={onChangelastName}
                  validations={[required, valiedlastName]}
                  placeholder="LastName"
                />
              </div>

              <div className="form-group">
                {/* <label htmlFor="email">Email</label> */}
                <Input
                  type="text"
                  className="form-control"
                  style={{width: '40%'}}
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  style={{width: '40%'}}
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChangephoneNumber}
                  validations={[required, valiedphoneNumber]}
                  placeholder="PhoneNumber"
                />
              </div>  

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  style={{width: '40%'}}
                  name="address"
                  value={address}
                  onChange={onChangeaddress}
                  validations={[required, valiedaddress]}
                  placeholder="Address"
                />
              </div>          

              {/* <div className="form-group">
                 <label htmlFor="password">Password</label> 
                <Input
                  type="password"
                  className="form-control"
                  style={{width:'40%'}}
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                  placeholder="Pass"
                />
              </div> */}

              <div className="form-group" style={{width: '15%'}}>
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
   
  );
};

export default Register;
