const path= require('path')
const express = require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode') 
const forecast =require('./utils/forecast')



//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

//Define path for express
const app = express()
const publicDictoryPath= path.join(__dirname,'../public')
const viewPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')


//Setup handlebars and the views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve 
app.use(express.static(publicDictoryPath))


app.get('',(req,res)=>{
  res.render('index',{
      title:'Weather',
      name:'Toby'
  })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Toby Tu'
    })
})

app.get('/weather', (req, res) => {
   
   if(!req.query.address){
      return res.send({
          error:'You must provide an address term.'
      })
   }
   geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
         if(error){
            return res.send({error})
         }
         forecast(latitude,longtitude,(error,forecastdata)=>{
            if(error){
                return console.log(error)
            }
           res.send({
               forecast:forecastdata,
               location,
               address:req.query.address
           })
            
         })
     })
        
})

app.get('/products',(req,res)=>{
 
    if(!req.query.search){
      return  res.send({error:'You must provide a search term.'})
    }
     
   // console.log(req.query)
    console.log(req.query.search)
   res.send({
       products:[]
   })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Tobito'
    })
})

app.get('/help/*',(req,res)=>{
   res.render('404',{
    title:'404 Page',
    name:'Toby',
    errorMsg:'Help article not found'
   })
})

//* equal anything not match as so far
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 page not found',
        name:'Toby',
        errorMsg:'Page not found'
    })
})



app.listen(3000,()=>{
    console.log('The server is up on port 3000')
})