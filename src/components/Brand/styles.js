import styled from 'styled-components'

export const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
gap: .8rem;

width: 100%;
justify-content: center;

   .brand-wrapper {
   display: flex;
   gap: .8rem;

      >div {
         display: flex;
         justify-content: center;
         align-items: center;
         gap: .8rem;
      }
   }

   .logo-img {
      width: 2rem;
      height: 2rem;
   }
   .logo-h1 {
      font-family: 'Roboto', sans-serif;
      font-size: 1.7rem;
   }
      
   span {
      display: inline-flex;
      align-items: center;
      color: ${({ theme }) => theme.COLORS.LIGHT_BLUE};
      font-size: 8px;
   }

@media(min-width: 360px) {
gap: 1.5rem;

   div {
      img {
         /* width: 3rem;
         height: 3rem; */
      }
   
      h1 {
         /* font-size: 2rem; */
      }
   }
}

@media(min-width: 540px) {
gap: 1.7rem;
}

@media(min-width: 768px) {
gap: 1.3rem;

   .logo-img {
      width: 2.7rem;
      height: 2.7rem;
   }
   .logo-h1 {
      font-size: 2.3rem;
   }

   span {
      font-size: 12px;
   }
}

@media(min-width: 1024px) {
max-width: 200px;
   
   .brand-wrapper {
      flex-direction: column;
      gap: 0;
      
      >div {
         
         /* justify-content: center; */
         /* gap: 1rem; */
      
         img {
            /* width: 5rem; */
            /* height: 5rem; */
         }
      
         h1 {
            /* font-size: 3.9rem; */
         }
      }

      span {
         justify-content: flex-end;
      }
   }
}

@media(min-width: 1400px) {
max-width: 300px;
justify-content: left;

   .logo-img {
      width: 3rem;
      height: 3rem;
   }
   .logo-h1 {
      font-size: 2.7rem;
   }
}
`