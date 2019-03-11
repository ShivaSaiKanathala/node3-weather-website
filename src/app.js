const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

console.log(__dirname)
// console.log(__filename)
//console.log(path.join(__dirname, '../public'))

//express is a function
const app = express()

//define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

//to set handle bars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))


app.get('',(req, res)=>{
    res.render('index',{
      title:'weather App',
      name:'Shiva Sai'  
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        about:'About Page',
        title:'about me',
        name:'Shiva Sai'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Help message',
        title:'Help me',
        name:'Shiva Sai'
    })
})

app.get('/weather',(req,res)=>{
    
    const location = req.query.address
    //console.log(req.query.address)
    geocode(location,(error,{latitude, longitude, location}={})=>{
        // if(!req.query.address){
        //     return res.send({
        //         error:'Please enter valid address for query'
        //     }) 
        // }

        if(error){
            return res.send({
                error:'Please enter valid address'
            })
        }
        
        // forecast(data.latitude, data.longitude, (error, forecastData) => {
        forecast(latitude, longitude, (error, forecastData) => {    
        if(error){
            return res.send({
                error:'Please enter address'
            })
        }
        
        res.send({
            location,
            forecast:forecastData,
            address:req.query.address
        })
            // console.log(data.location)
            // console.log(location)
            // console.log(forecastData)
        })
        // }
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shiva Sai',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shiva Sai',
        errorMessage:'Page Not found'
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})
