const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',(req, res) => {
  res.sendFile(__dirname+"/signup.html");
});
app.post('/', (req, res) => {
 var firstname=req.body.fname;
 var lastname=req.body.lname;
 var email=req.body.email;

var data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }
  ]
};

var jsonData=JSON.stringify(data);
 var options={
  url:"https://us21.api.mailchimp.com/3.0/lists/3e060dc4d1",
  method:"POST",
  headers:{
    "Authorization":"ayush1 e0b7fc95a01e25958803d99cc39e61a4-us21"
  }, 
  // body:jsonData

 };

 request(options,(error,response,body)=>{
  if(error)
  res.sendFile(__dirname+"/failure.html");
    else{
  if(response.statusCode==200)
  res.sendFile(__dirname+"/success.html");
  else
  res.sendFile(__dirname+"/failure.html");
    }
 });
//  console.log(firstname,lastname,email); 
});
app.post('/failure',(req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  });

  // e0b7fc95a01e25958803d99cc39e61a4-us21  
  // 3e060dc4d1
                                                                                     
  // https://<dc>.api.mailchimp.com/3.0/ 