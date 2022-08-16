const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./model/blogs')
const app = express()
app.set('view engine', 'ejs')

const dbURL= 'mongodb+srv://melih:melih@cluster0.hnx2xy2.mongodb.net/myDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => { 
  console.log("Working")
  res.render('index', { 
    text: 'Use this directions to make some operations [/all , /create , /single , /update , /delete ] ---> http://localhost:3000/all'})
})

app.post('/create', (req, res) => { 
  
  const blog = new Blog({ 
      name: "MELIH",
      lastname: "ERCAN"
  })
  blog.save()
    .then((result) => {
      console.log("Successfully created!")
      res.send('CREATED! ---------------------'+'</br>'+result)
    })
    .catch((err)=> {
      console.log("Creation failed!")
      console.log(err)
    })
})

app.get('/all', (req, res) => { 
  Blog.find()                 
      .then((result) => {
        console.log("Showing all the data!") 
        res.send('ALL THE DATA IS HERE ---------------------' +'</br>'+ result)
      })
      .catch((err) => {
        console.log("Cannot show all data!")
        console.log(err)
      })
})

app.get('/single', (req,res)=>{
  Blog.findById('62f49367424790335c16e0de')
    .then((result)=>{
      console.log("Showing single data!") 
      res.send('SINGLE RESULT ---------------------' +'</br>'+result)
    })
    .catch((err)=> {
      console.log(err)
    })
})

app.put('/update', (req,res)=>{
  Blog.findByIdAndUpdate('62f49367424790335c16e0de',{$set:{name:'SEMIH'}}, function(err,doc) {
    if (err) { throw err; }
    else { console.log('Successfully updated!'); }
})
  Blog.findByIdAndUpdate('62f49367424790335c16e0de',{$set:{lastname:'BOYRAZ'}}, function(err,doc) {
  if (err) { throw err; }
  else { console.log('Successfully updated!'); }
})

Blog.findById('62f49367424790335c16e0de')
.then((result) => { 
  console.log('Update successfull! '+result)
  res.send('Update successfull! '+result)
})
.catch((err) => {
    console.log('Data does not exist!',err)
})
})

app.delete('/delete', (req, res) => {
  Blog.findByIdAndDelete('62f49367424790335c16e0de',function(err,doc) {
      if (err) {throw err; }
      else { console.log('Deleted successfully! '); }
  })
  
  Blog.findById('62f49367424790335c16e0de')
  .then((result) => { 
      res.send('Delete successfull! -------> '+result)
  })
  .catch((err) => {
      console.log('Data does not exist!',err)
  })
})

app.listen(3000)