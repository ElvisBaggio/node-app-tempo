
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define os caminhos da aplicação
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Configura o Handlebars (hbs) engine e dir de views
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Configura diretório estático
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) =>{
    res.render('index',{
        title:'Tempo',
        name: 'elvis'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title:'Sobre mim',
        name: 'Elvis'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title:'Ajuda',
        helptext:'Texto de ajuda',
        name: 'Elvis'
    })
})

//app.com/weather
app.get('/tempo', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error:'O endereço é obrigatório'
        })
    }    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})                        
        }         
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})                        
            } 
            res.send({
                forecastData,
                location
            })                        
        })  
    })         
       
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'Erro 404',
        erroMsg: 'Artigo de ajuda não encontrado',
        name:'Elvis'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Erro 404',
        erroMsg: 'Página não encontrada',
        name:'Elvis'
    })
})



app.listen(port, () => {
    console.log('Server rodando na porta '+ port)
})