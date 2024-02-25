import { createContext, useContext, useState, useEffect } from "react"

import { api } from "../services/api"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
   const [data, setData] = useState({})
   async function signIn({ email, password }) {
      try {
         const response = await api.post("/sessions", { email, password })

         //backend
         const { user, token } = response.data
         localStorage.setItem("@rocketfood:user", JSON.stringify(user))
         localStorage.setItem("@rocketfood:token", token)
         api.defaults.headers.common['Authorization'] = `Bearer ${token}`

         //armazenando as informações
         setData({ user, token })

      } catch(error) {
         if(error.response) {
            alert(error.response.data.message)
         } else {
            alert("Não foi possível entrar!")
         }
      }
   }

   async function signOut() {
      localStorage.removeItem("@rocketfood:user")
      localStorage.removeItem("@rocketfood:token")

      setData({})
   }

   useEffect(() => {
      const token = localStorage.getItem("@rocketfood:token")
      const user = localStorage.getItem("@rocketfood:user")

      if(user && token) {
         api.defaults.headers.common['Authorization'] = `Bearer ${token}`

         setData({
            token,
            user: JSON.parse(user)
         })
      }

   }, [])

   return (
      <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
         {children}
      </AuthContext.Provider>
   )
}

function useAuth() {
   const context = useContext(AuthContext)

   return context
}

export { AuthProvider, useAuth }

