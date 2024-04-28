import React, { useState,useContext } from 'react'
import {  signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup    } from 'firebase/auth';
import { FirebaseContext } from '../store/FirebaseContext';
import * as y from 'yup'
import {auth} from '../firebase/Config'
import { useNavigate ,Link} from 'react-router-dom';
import { collection,addDoc,} from 'firebase/firestore';


import './signin.css'

function SignIn() {
    const provider = new GoogleAuthProvider();
    const navigate=useNavigate()
    const {db}=useContext(FirebaseContext)

const [formData,setFormData]=useState({
    email:"",
    password:""
});

const [errors,setErrors]=useState({});


const validationSchema=y.object({
    email: y.string()
    .required("Email is Required")
    .email("Invalid email format"),
    password: y.string().min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .required("Please enter a password"),

});

const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        await validationSchema.validate(formData, {abortEarly: false});
        console.log("Form Submitted", formData);
      } catch (error) {
        const newErrors = {};
  
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
          console.log(err)
        });
  
        setErrors(newErrors);
      }
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            if(user.displayName==="admin")
            navigate("/adminhome")
            else
            navigate('/')
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert(error.message)
        });
};

const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGoogle=()=>{
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log({ credential, token, user });
            const docref=collection(db,"users")
                addDoc(docref,{id:auth.currentUser.uid,firstName:user.displayName,email:user.email})
            navigate('/')
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log({ errorCode, errorMessage, email, credential });
        });
  }


  return (
    <div>
       <section className="login-block">
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <form className="md-float-material form-material" action="#" method="POST" onSubmit={handleSubmit}>
                    <div className="auth-box card-login">
                        <div className="card-block">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3 className="text-center heading" >Sign In</h3>
                                    
                                </div>
                            </div>
                           

                            <div className="form-group form-primary">
                                <input type="text" className="form-control" name="email"  placeholder="Email" id="email1" value={formData.email} onChange={handleChange}/>
                                {errors.email && <div className="error">{errors.email}</div>}
                            </div>

                            <div className="form-group form-primary">
                               <input type="password" className="form-control" name="password" placeholder="Password"  id="password" value={formData.password} onChange={handleChange}/>
                               {errors.password && <div className="error">{errors.password}</div>}
                              
                            </div>

                           


                            <div className="row">
                                <div className="col-md-12 col-12">

                                    <input type="submit" className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" name="submit" value="Signin Now"/>
                                   
                                </div>
                            </div>

                            <div className="or-container"><div className="line-separator"></div> <div className="or-label">or</div><div class="line-separator"></div></div>


                            <div class="row">
                                <div className="col-md-12 col-12">
                                  <a className="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="#" onClick={handleGoogle}><img src="https://img.icons8.com/color/16/000000/google-logo.png" className='google-image'/> Signup Using Google</a>

                                </div>
                            </div>
                            <br/>

                            <p className="text-inverse text-center">Don't have an account? <Link to="/signup" data-abc="true">Sign Up</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
    </div>
  )
}

export default SignIn
