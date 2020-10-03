const express=require("express");

const https=require("https");

const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

	res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){

	const query=req.body.cityName;

	const api="60d4dea5fdb70a5b23b8ddd292beb03b";

	const unit="metric";

	const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ api +"&units="+unit;
	
	https.get(url,function(response){
		console.log(response.statusCode);

		response.on("data",function(data){
			const weatherData=JSON.parse(data);
			const temp=weatherData.main.temp;
			const weatherDescription=weatherData.weather[0].description;
			const icon=weatherData.weather[0].icon
			const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
			console.log(weatherDescription);
			console.log(temp);
			res.write("<img src="+imageUrl+">");
			res.write("the temperature in"+ query+"is"+temp+"degree celcius");
			res.send();
		});
	});
});

app.listen(3000,function(){
	console.log("server running");
});

	