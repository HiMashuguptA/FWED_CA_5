import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Homepage from '../Components/Homepage'
import Form from '../Components/Form'
function Linking() {
  return (
    <div>
        <Routes>
          {/* redirects to Home Page */}
            <Route path='/' element={<Homepage/>}/>
            {/* redirects to Sign-up page */}
            <Route path='/sign' element={<Form/>}/>
        </Routes>
    </div>
  )
}

export default Linking