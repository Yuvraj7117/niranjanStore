import { createContext, useState } from "react";
import axios from 'axios';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const user = { firstname: "", lastname: "", status: 401, statusText: "Authorized" }
    const [loginUser, setLoginUser] = useState(user)

    const loginApi = async (data) => {
     
        const { email, password } = data
        try {
            await axios.post("http://localhost:5000/api/login", {
                email, password
            }).then((res) => {
                setLoginUser(res.data.user)
            })
        } catch (err) {
            const error = err.response
            setLoginUser(error)
           
        }
    }

    return (
        <UserContext.Provider value={{ loginApi, loginUser }}>
            {children}

        </UserContext.Provider>
    )

}
