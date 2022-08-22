import React, { createContext, useState } from "react";

export const AdminContext =  createContext(null)

function AdminDetailsContext({children}){
    const[admin,setAdmin]=useState('')
    return(
        <AdminContext.Provider value={{admin,setAdmin}}>
            {children}
        </AdminContext.Provider>
    )
}
export default AdminDetailsContext