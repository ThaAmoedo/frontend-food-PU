import { useState } from "react"
import { api } from "../../services/api"

import { Container, Form } from "./styles"

import { HeaderAdmin } from "../../components/HeaderAdmin"
import { ButtonReturn } from "../../components/ButtonReturn"
import { Input } from "../../components/Input"
import { InputLabel } from "../../components/InputLabel"
import { CustomSelect } from "../../components/CustomSelect"
import { IngredientsItem } from "../../components/IngredientsItem"
import { Textarea } from "../../components/Textarea"
import { Button } from "../../components/Button"
import { Footer } from "../../components/Footer"

import { BiUpload } from "react-icons/bi";

import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { toast } from 'react-toastify';

export const NewDish = () => {
   const navigate = useNavigate()
   const isDesktop = useMediaQuery({ minWidth: 1536 })

   const [image, setImage] = useState(null)
   const [name, setName] = useState("")
   const [selectedCategory, setSelectedCategory] = useState('escolha')
   const [tags, setTags] = useState([])
   const [newTag, setNewTag] = useState("")
   const [price, setPrice] = useState("")
   const [description, setDescription] = useState("")

   const handleNavigate = () => {
      navigate(-1)
   }

   const handleCategoryChange = category => {
      setSelectedCategory(category.value)
   }

   function handleAddTag() {
      if(newTag.length > 0) {
         setTags(prevState => [...prevState, newTag])
         setNewTag("")
      } else {
         return
      }
   }

   function handleRemoveTag(deleted) {
      setTags(prevState => prevState.filter(tag => tag !== deleted))
   }

    
   const handlePriceChange = e => {
      let inputPrice = e.target.value.replace(/[^0-9,]/g, '')


     
      const commaIndex = inputPrice.indexOf(",")

      if(commaIndex !== -1) {
         inputPrice = 
            inputPrice.slice(0, commaIndex + 1) + 
            inputPrice.slice(commaIndex + 1).replace(/,/g, '')
      }
      
    
      const newPrice = inputPrice.length > 0 ? `R$${inputPrice}` : ''
      setPrice(newPrice)
   }   

   async function handleNewDish() {
      const formData = new FormData()

      if(!name || !tags || !price || !description) {
         toast.error("Por favor, preencha todos os campos!", {
            position: 'top-center',
            theme: "dark",
            autoClose: 1000
         })
         return
      }

      formData.append("image", image)
      formData.append('name', name)
      formData.append('category', selectedCategory)
      formData.append('ingredients', tags)
      formData.append('price', price)
      formData.append('description', description)

      api.post("/dishes", formData).then(() => {
         toast.success("Prato criado com sucesso!", {
            autoClose: 2000
         })
         navigate("/")
      }).catch(error => {
         if(error.response) {
            toast.error(error.response.data.message, {autoClose: 1000})
         } else {
            toast.error("Erro ao cadastrar o prato", {autoClose: 1000})
         }
      }) 
   }
   
   return (
      <Container>
         <HeaderAdmin />

         <ButtonReturn 
            title="Adicionar prato" 
            onClick={handleNavigate}
         />

         <Form>
           <div className="wrapper-inputs-one">
               <div className="wrapper-img-input">
                  <label htmlFor="img-input">
                     <span>Imagem do prato</span>
                     <Input 
                        id="img-input" 
                        type="file" 
                        icon={BiUpload}
                        text="Selecione imagem"
                        onChange={e => setImage(e.target.files[0])}
                     />
                  </label>
               </div>

               <InputLabel 
                  title="Nome" 
                  className="input-value"
                  placeholder="Ex: Salada Ceasar"
                  onChange={e => setName(e.target.value)}
               />

               <CustomSelect 
                  onChange={handleCategoryChange}
               />
            </div> 

           <div className="wrapper-inputs-two">
            {isDesktop ?
               <div className="wrapper-ingredientsAndInputLabel">
                  <div className="ingredients">
                     <span>Ingredientes</span>
                     <div className="tags">
                        {
                           tags.map((tag, index) => (
                              <IngredientsItem 
                                 className="ingredients-item"
                                 isNew={false}
                                 key={String(index)}
                                 value={tag}
                                 onClick={() => handleRemoveTag(tag)}
                              />
                           ))
                        }
   
                        <IngredientsItem 
                           isNew={true}
                           placeholder="Adicionar"
                           value={newTag}
                           onChange={e => setNewTag(e.target.value)}
                           onClick={handleAddTag}
                        />
   
                     </div>
                  </div>
   
                  <InputLabel 
                     title="Preço" 
                     placeholder="R$00,00"
                     onChange={handlePriceChange}
                     value={price}
                  />
               </div>
            :
               <>
                  <div className="ingredients">
                  <span>Ingredientes</span>
                  <div className="tags">
                     {
                        tags.map((tag, index) => (
                           <IngredientsItem 
                              className="ingredients-item"
                              isNew={false}
                              key={String(index)}
                              value={tag}
                              onClick={() => handleRemoveTag(tag)}
                           />
                        ))
                     }

                     <IngredientsItem 
                        isNew={true}
                        placeholder="Adicionar"
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                        onClick={handleAddTag}
                     />

                  </div>
                  </div>

                  <InputLabel 
                     title="Preço" 
                     placeholder="R$00,00"
                     onChange={handlePriceChange}
                     value={price}
                  />
               </>
            }

               <Textarea
                  placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                  onChange={e => setDescription(e.target.value)}
               />

               <Button
                  className="btn-form" 
                  title="Salvar alterações"
                  onClick={handleNewDish}
               />
           </div>
         </Form>

         <Footer />
      </Container>
   )
}