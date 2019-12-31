console.log('the javascript file is loaded successfully')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    message1.textContent='Loading!!'
    message2.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
          response.json().then((s)=>{
              if(s.error){
                message1.textContent=s.error
              }
              else{  
                message1.textContent=s.data
                message2.textContent=s.address 
                console.log(location+' tested')
              }
          })
})
   // console.log(location+'tested')
})