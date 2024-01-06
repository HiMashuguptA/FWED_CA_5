import React, { useContext, useState } from 'react'
import {useForm} from 'react-hook-form'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import "../form.css"
import { appcontext } from '../Usecontext/ParentContext';
import { Link, useNavigate } from 'react-router-dom';
import back_btn_img from '../assets/back-button.png'
function Form() {
  // using react-form to make the form
    const{register,handleSubmit,formState:{errors,isSubmitSuccessful}}=useForm()
    // storing the value of password
    const[password,setPassword]=useState("")
    const [repeatPassword, setRepeatPassword] = useState('');
    // checking the conditions of form 
    const[done,isdone]=useState(false)
    const[check,isCheccked]=useState(false)
    // using useNavigate to navigate if form submitted successfully
    const navigate=useNavigate()
    // importing blur values from appcontext
    const{blur,isblur}=useContext(appcontext)
    // checking is form submitted is successful
    const FormSubmit=(data)=>{
      if(done){
        toast("Submited Successfully")
        isblur(true)
        localStorage.setItem('val', JSON.stringify(!blur))
        navigate('/')
      }
  }
  // checking the form conditions
    const handleClickDone = () => {
      if(errors.firstName && (errors.firstName.type==='minLength' || errors.firstName.type==='maxLength'|| errors.firstName)){
        toast("Your Name should be between 4-10 Char")
      }else if(errors.lastName && (errors.lastName.type==='minLength' || errors.lastName.type==='maxLength'|| errors.lastName)){
        toast("Your Last Name requires min 4 char")
      }
      else if(errors.password && (errors.password.type==='minLength' || errors.password ) && password.length<10){
        toast("Please Enter Password more than 10 char")
      } else if (password !== repeatPassword) {
        toast.error("Passwords don't match");
      }
      else if(!check){
        toast.error("pick accept terms and conditions")
      }
      else if(password==repeatPassword && check){
        isdone(true)
      }
    };
    const handleCheckBox=(e)=>{
      isCheccked(e.target.checked)
    }
    // targeting the value of password
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
    // targeting the value of repeatPassword
    const handleRepeatPasswordChange = (e) => {
      setRepeatPassword(e.target.value);
    };
    return (
      <section className='section'>
        {/* if click on back button then it will redirect to the home page */}
        <Link to={'/'}>
          <div className='backbtn'>
            <img className='back-img' src={back_btn_img} alt="" />
          </div>
        </Link>
            <div className="form-container">
          <ToastContainer />
            <fieldset>
                <legend>Sign-up</legend>
                <form onSubmit={handleSubmit(FormSubmit)}>
                    {isSubmitSuccessful&& done &&<div className="success">
                    <p>Sign-Up Successful</p>
                    </div>}
                    <h2>Create Account</h2>
                <label> First Name </label>
                <input type="text" name="firstName" {...register("firstName",{
                    required:"Fill First Name",
                    minLength:{value:3,message: "Minimum 3 Charcter Required"},
                    maxLength:{value:30,message:"Minimum 30 Character Required"}
                })}/>
                <p className="err">{errors.firstName?.message}</p>
                <label> Last Name </label>
                <input type="text" name="lastName" {...register("lastName",{
                    required:"Enter Last Name",
                    minLength:{value:4,message: "Minimum 4 Charcter Required"}
                })}/>
                <p className="err">{errors.lastName?.message}</p>
                <label>Email</label>
                <input type="email" name="email" {...register("email",{required:"Enter Email"})}/>
                <p className="err">{errors.email?.message}</p>
                <label> Enter Password </label>
                <input type="password" name="password" {...register("password",{required:"Enter Password",
                minLength:{value:10,message:"Minimum 10 Char Required"},
                // checking to met the password condition for atLeast 1 special char.
                pattern:{
                  value: /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])/,
                  message:"use atleast 1 special character"
                }
                })}
                onChange={handlePasswordChange}
                value={password}
                />
                <p className="err">{errors.password?.message}</p>
                <label> Repeat Your Password </label>
                <input type="password" name='repeatPassword' {...register("repeatPassword",{required:"Repeat Password"
                })}
                onChange={handleRepeatPasswordChange}
                value={repeatPassword}
                />
                <p className="err">{errors.repeatPassword?.message}</p>
                <div style={{display:"flex"}}>
                  <input checked={check} onChange={handleCheckBox} type="checkbox" />
                  <span> I agree all statement in <span></span><span style={{textDecoration:"underline",cursor:"pointer"}}> terms </span> and <span style={{textDecoration:"underline",cursor:"pointer"}}>conditions </span> </span>
                </div>
                <input onClick={handleClickDone} className="button" type="submit" value={"Sign Up"}  />
                </form>
            </fieldset>
            </div>
        </section>
      );
}

export default Form