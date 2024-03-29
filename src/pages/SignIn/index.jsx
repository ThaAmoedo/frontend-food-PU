import { useState } from 'react'
import { useAuth } from '../../hooks/auth'

import { Container, Head, Form } from './styles'

import { useNavigate } from 'react-router-dom'

import { Brand } from '../../components/Brand' 
import { InputLabel } from '../../components/InputLabel' 
import { Button } from '../../components/Button' 

export function SignIn() {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   
   const { signIn } = useAuth()
   
   function handleSignIn() {
      signIn({ email, password })
   }
   
   const navigate = useNavigate()

   return (
      <Container>
         <Head>
            <Brand />
         </Head>

         <Form>
            <span>Faça login</span>
            <InputLabel 
               htmlFor="1" id="1" title="Email" 
               type="text" placeholder="Ex: maria@exemplo.com"
               onChange={e => setEmail(e.target.value)} 
            />
            
            <InputLabel 
               htmlFor="2" id="2" title="Senha" 
               type="password" placeholder="No mínimo 6 caracteres" 
               onChange={e => setPassword(e.target.value)}
            />

            <Button 
               title="Entrar"
               onClick={handleSignIn}
            />

            <a onClick={() => navigate("/register")}>Criar uma conta</a>
         </Form>
      </Container>
   )
}