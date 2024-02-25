import { useAuth } from "../../hooks/auth"

import { Container } from './styles'

import Polygon from "../../assets/menu/Polygon.svg"

export const Brand = () => {
   const { user } = useAuth()

   return (
      <Container className="brand">
         {}
         {user?.isAdmin ? 
            <>
               <div className="brand-wrapper">
                  <div>
                     <img className="logo-img" src={Polygon} alt="logo do restaurante, um polígono azul" />
                     <h1 className="logo-h1">food explorer</h1>
                  </div>

                  <span>admin</span>
               </div>
            </>
         :
            <>
               <img className="logo-img" src={Polygon} alt="logo do restaurante, um polígono azul" />
               <h1 className="logo-h1">food explorer</h1>
            </>
         }
      </Container>
   )
}