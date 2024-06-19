
import { useContext,useState } from "react"


export function Ticketno({children}){
    const [updata,setupData]=useState(state.ev.noftickets)
    return(
        <AuthContext.Provider value={{updata,setupData}}>
                {children}
        </AuthContext.Provider>
    )
}