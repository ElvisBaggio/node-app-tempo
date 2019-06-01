const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value    

    msg1.textContent = 'Carregando..'
    msg2.textContent = ''
    msg3.textContent = ''

    fetch('/tempo?address='+ location).then((response) => {
        response.json().then((data)=>{
        if(data.error){
            msg1.textContent = data.error            
        } else {
            msg1.textContent = data.location
            msg2.textContent = data.forecastData.msg 
            msg3.textContent = 'Velocidade do vento: '+ data.forecastData.windSpeed + ' | Pressão Atmostérica :' + data.forecastData.pressure + ' | Umidade do ar: '+ data.forecastData.humidity

        }        
    })
})
})