const express=require('express')
const path=require('path')
// path is a in build library module
const hbs=require('hbs')
//handlebars is used to fetch the file without the file extenction
const geocode=require('./util/geocode')
const forecast=require('./util/forecast')


const application=express()
const port=process.env.PORT || 3000


application.use(express.static(path.join(__dirname,'../public')))
// above code call the all the file in public folder 

 application.set('view engine','hbs')
 application.set('views',path.join(__dirname,'../template/views'))
//the above code is handlebars which is used for render the file without the Extension 
//hbs.registerPartials(path.join(__dirname,'../template/partial')
hbs.registerPartials(path.join(__dirname,'../template/partials'))

application.get('',(req,res)=>
{
    res.render('index',{
        'title':'You can get the weather details in this site!!!',
        'name':'prakash'
    })
})


application.get('/help',(req,res)=>
{
    res.render('help',{
        'title':'help page',
        'name':'prakash',
        'age':'age'
    })
})


application.get('/about',(req,res)=>
{
    res.render('about',{
        'name':'Prakash',
        'title':'The application is created by Prakash '
    })
})

application.get('/weather',(req,res)=>{
    if(!req.query.address||req.query.address==='/')
    {
        return res.send({
            error:'The address is must be given'
        })
    }
    geocode(req.query.address,(error,data={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(data.longitude,data.latitude,(error,data)=>
        {
           if(error)
           {
              res.send({error})
           }
           res.send({ 
               'data':data,
               'address':req.query.address 
            })
           
        })
         
    })
})

application.get('/product',(req,res)=>
{
    if(!req.query.search)
    {
        return res.send({
            error: 'you must given the search term'
        })
        // if the return statement is given, then another error statement is not displyed
    }
    console.log(req.query.search)
    res.send({
        'Product':[]
    })
})


 
application.get('/help/*',(req,res)=>{
    res.render('404',{
        'errormgs':'This arcticle is not found'
    })
})

application.get('*',(req,res)=>
{
    res.render('404',{
        'errormgs': 'The page is not found'
    })
})



application.listen(port,()=>
{
    console.log('server '+port+' is ready')
})