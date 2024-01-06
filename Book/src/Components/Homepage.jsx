import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { appcontext } from '../Usecontext/ParentContext';
import kalvium from '../assets/kalvium.webp'
import moon from '../assets/moon.png'
import question_mark from '../assets/question-mark.png'
import sun from '../assets/sun.png'

function Homepage() {
    // taking light and islight value from appcontext
    const{light,islight}=useContext(appcontext)
    // storing api data
    const[apiData,isApiData]=useState([])
    const[error,setError]=useState("")
    const[value,setValue]=useState("")
    // storing api data in a container
    var Data=apiData
    // targeting searchbox value
    const change=(e)=>{
      setValue(e.target.value)
  }
  // fetching api Data
    useEffect(()=>{
        axios
        .get("https://reactnd-books-api.udacity.com/books",{headers: { 'Authorization': 'whatever-you-want' }})
        .then((res)=>isApiData(res.data.books))
        .catch((error)=>{
            setError(error.message)
        })
    },[])
    // storing value in local storage
    const data=localStorage.getItem('val')
    // changing day mode and night mode
    const handleImage=()=>{
      islight(!light)
    }
  return (
    <div className='mainly'>
      {/* checking if light is true or false and giving the condition */}
      {light?
      <div className='main1'>
      <div className='navbar'>
        <div className='logo-div'>
          <img src={kalvium} className='kalvium-logo' alt="Kalvium Logo" />
          <h3 className='Kalvium-text'>Livebooks</h3>
        </div>
        <div className='Search-container'>
          {/* if user is not registered than he will not be able to search anything */}
          {!data ? <input type="text" value={value} onChange={change} placeholder='Search Books' className='search-input' disabled/>: 
          <input type="text" value={value} onChange={change} placeholder='Search Books' className='search-input' />
          }
        </div>
          <div className='register-collection'>
            {/* using Link property to Link the registerForm */}
              <Link to={"/sign"} style={{textDecoration:"none"}}>
                  <div className='class-register'>
                  <h3 className='Register-text'>Register</h3>
                </div>
              </Link>
              <div>
              <img className='question-mark-png' src={question_mark} alt="" />
              </div>
          </div>
          {/* changing the image day and night */}
        {light?
        <div onClick={handleImage} className='moon-div'>
              <img className='moon' src={moon} alt="" />  
        </div>
        :
        <div onClick={handleImage} className='sun-div'>
              <img className='sun' src={sun} alt="" />  
        </div>
      }
      </div>
      <hr />
      {/* if error in Api then it will show error */}
      {error && <h1 className='error'>{error}</h1>}
      {/* if user not registered then he will see this text */}
      {!data &&
          <div className='lock'>
            <h3>🔒Please register to get access to our Livebook 🔒</h3>
          </div>
      }
        <div className= {data? 'Book-collection': 'Book-collection blur'}>
          {/* filtering the search of user and the api data */}
        {value.length>0?
          Data.filter(item=>{
            const setValue=value.toLowerCase()
            const title=item.title.toLowerCase()
            return setValue && title.startsWith(setValue) && setValue!=title
          })
          .map((item)=>(
            <div className={data?'book-class1 book-class2':'book-class-no-effect'}>
              <div>
                  <img className='book-image' src={item.imageLinks.smallThumbnail} alt="" />
                  <h4 className='book-title'>{item.title}</h4>
              </div>
              <div className='rating'>
                  <h5>⭐{item.averageRating?item.averageRating:"3"}</h5>
                  <span>Free</span>
              </div>
              <div>
                  <p className='author-name'>By-{item.authors}</p>
              </div>
            </div>
          ))
          :
          apiData.map((post)=>{
            const{title,authors,imageLinks,averageRating}=post
            return (
              <div className={data?'book-class2':'book-class-no-effect'}>
                        <img className='book-image' src={imageLinks.smallThumbnail} alt="" />
                        <h4 className='book-title'>{title}</h4>
                      <div className='rating'>
                          <h5>⭐{averageRating?averageRating:"3"}</h5>
                          <span>Free</span>
                      </div>
                      <div>
                          <p className='author-name'>By-{authors}</p>
                      </div>
                </div>
              )
            })
          }
        </div>
    </div>
    :
    <div className='main'>
    <div className='navbar'>
      <div className='logo-div'>
        <img src={kalvium} className='kalvium-logo' alt="Kalvium Logo" />
        <h3 className='Kalvium-text'>Livebooks</h3>
      </div>
      <div className='Search-container'>
        {!data? <input type="text" value={value} onChange={change} placeholder='Search Books' className='search-input1' disabled />:
        <input type="text" value={value} onChange={change} placeholder='Search Books' className='search-input1' />
        }
      </div>
      <div className='register-collection'>
          <Link to={"/sign"} style={{textDecoration:"none"}}>
            <div className='class-register1'>
              <h3 className='Register-text'>Register</h3>
            </div>
          </Link>
          <div>
          <img className='question-mark-png ques' src={question_mark} alt="" />
          </div>
      </div>
      {light?
      <div onClick={handleImage} className='moon-div'>
            <img className='moon' src={moon} alt="" />  
      </div>
      :
      <div onClick={handleImage} className='sun-div'>
            <img className='sun' src={sun} alt="" />  
      </div>
    }
    </div>
    <hr />
    {error && <h1 className='error errorwhite'>{error}</h1>}
    {!data &&
          <div className='lock lock1'>
            <h3>🔒Please register to get access to our Livebook 🔒</h3>
          </div>
      }
    <div className={data? 'Book-collection': 'Book-collection blur'}>
    {value.length>0?
      Data.filter(item=>{
        const setValue=value.toLowerCase()
        const title=item.title.toLowerCase()
        return setValue && title.startsWith(setValue) && setValue!=title
      })
      .map((item)=>(
        <div className={data?'book-class1':'book-class-no-effect'}>
          <div>
              <img className='book-image' src={item.imageLinks.smallThumbnail} alt="" />
              <h4 className='book-title'>{item.title}</h4>
          </div>
          <div className='rating'>
              <h5>⭐{item.averageRating?item.averageRating:"3"}</h5>
              <span>Free</span>
          </div>
          <div>
              <p className='author-name'>By-{item.authors}</p>
          </div>
        </div>
      ))
      :
      apiData.map((post)=>{
        const{title,authors,imageLinks,averageRating}=post
        return (
          <div className={data?'book-class':'book-class-no-effect'}>
                    <img className='book-image' src={imageLinks.smallThumbnail} alt="" />
                    <h4 className='book-title'>{title}</h4>
                  <div className='rating'>
                      <h5>⭐{averageRating?averageRating:"3"}</h5>
                      <span>Free</span>
                  </div>
                  <div>
                      <p className='author-name'>By-{authors}</p>
                  </div>
              </div>
          )
        })
      }
    </div>
  </div>
    }
  </div>
  );
}
export default Homepage;