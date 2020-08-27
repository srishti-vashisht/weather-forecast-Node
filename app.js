const express = require("express");
/*https module for get request to external server*/ 
const https = require("https");                          /*No need to install https through npm as https is native node module, which is already bundled with Node project*/

const bodyParser = require("body-parser");   
const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

    /*rendering the HTML file when our root directory(Home page) is called*/
    res.sendFile(__dirname +"/index.html");
     
    
})

/*catch the post request using app.post() ,made on our server through website or client*/
app.post("/",function(req,res){

     console.log()
        
     const query = req.body.cityName;                               /*using body-parser package ,tapping into request body to get the required details,here cityName that user entered*/
     const apiKey = "95a306308382136de82813f289e152f1";
     const unit = "metric";
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

     https.get(url,function(response){
          
          response.on("data",function(data){

               const weatherData = JSON.parse(data);               
               const temp = weatherData.main.temp;      
               const weatherDescription = weatherData.weather[0].description;      
               const icon = weatherData.weather[0].icon;                               

                 const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";     
                 res.write("<p>The description is as follows "+ weatherDescription +"<p>");
                 res.write("<h1>The temperature in "+query+" is "+temp +"degree celsius</h1>");
                 res.write("<img src = "+imageUrl+">");          
                 res.send();
                 
          })

    }); 


})                                          





app.listen(3000,function(){
    console.log("Server started on port 3000");
})