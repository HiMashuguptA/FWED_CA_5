import React, { createContext, useState } from 'react'
export const appcontext=createContext()
function ParentContext({children}) {
    const[light,islight]=useState(true)
    const[blur,isblur]=useState(false)
    // using create context to provide value in all the components
  return <appcontext.Provider value={{light,islight,blur,isblur}}>
    {children}
  </appcontext.Provider>
}

export default ParentContext