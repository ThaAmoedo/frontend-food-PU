

import { useAuth } from "../../hooks/auth"
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive"
import { Container } from "./styles"
import MenuIcon from "../../assets/menu/Menu.svg"
import SignOut from "../../assets/menu/SignOut.svg"
import { FiSearch } from "react-icons/fi"
import { Brand } from "../Brand"
import { Input } from "../Input"
import { ButtonImg } from "../ButtonImg" 

const HeaderAdmin = ({ setSearch }) => {
   const navigate = useNavigate()
   // const com nome diferente da que esta em HeaderUser, pois estava interferindo na renderização
   const isMobile = useMediaQuery({ maxWidth: 1023 })

   const { signOut } = useAuth()

   function handleMenuClick() {
      navigate("/menu")
   }

   async function handleSignOut() {
      signOut()
      navigate("/")
   }

   return (
      <Container className="header-admin">
         {isMobile ? (

         <>
            <button className="menu-button" onClick={handleMenuClick}>
               <img className="menu-icon" src={MenuIcon} />
            </button>

            <Brand />
         </>
         // Desktop
         ) : (

         <>
            <Brand />

            <Input 
               icon={FiSearch} 
               placeholder="Busque por pratos ou ingredientes"
               onChange={e => setSearch(e.target.value)}
            />

            <ButtonImg />

            <button type="button" onClick={handleSignOut}>
               <img className="logout" src={SignOut} alt="ícone de signout" />
            </button>

         </>

         )}
      </Container>
   )
}

export { HeaderAdmin } 


