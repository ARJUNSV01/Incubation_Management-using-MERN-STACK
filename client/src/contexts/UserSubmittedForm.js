import React, { createContext } from "react";

export const UserSubmittedFormContext = createContext(null)

function SubmitFormContext({children}){
    return(
        <UserSubmittedFormContext.Provider >
            {children}
        </UserSubmittedFormContext.Provider>
    )
}
export default SubmitFormContext;