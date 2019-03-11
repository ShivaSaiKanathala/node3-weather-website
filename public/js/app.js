console.log('Client side js is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const location = search.value
    msg1.textContent = 'loading....'
    msg2.textContent = ''
    if(location===''){
        return msg1.textContent = 'please enter a valid location';
    }else{
        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        
            response.json().then((data)=>{
                if(data.error){
                    return msg1.textContent = data.error;
                }
               
                msg1.textContent = data.location
                msg2.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            })
        })
    }
    

})
