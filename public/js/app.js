console.log('Clinet side javascripts is loading!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    
//       response.json().then((data)=>{
//         console.log(data)
//       })
// })


const  weatherForm = document.querySelector('form')
const  search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const Location = search.value
   // console.log(Location)
   
   messageOne.textContent='Loading...'
   messageTwo.textContent=''

   fetch('http://localhost:3000/weather?address='+Location).then((response)=>{
       
       response.json().then((data)=>{
           if(data.error){
              return  messageOne.textContent=data.error
           }
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
         
          
          
           
       })
   })

})