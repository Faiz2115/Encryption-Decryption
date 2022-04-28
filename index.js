const express = require("express");
const bodyParser = require("body-parser");
var CryptoJS = require("crypto-js");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/index.html");
});

app.post("/",(req,res)=>
{
    var word = req.body.word;
    var key = req.body.key;
    var decrykey = req.body.decrykey;
    var ciphertext = CryptoJS.AES.encrypt(word,key).toString();   // Encryption
    var bytes  = CryptoJS.AES.decrypt(ciphertext, key);            // CipherText
    var originalText = bytes.toString(CryptoJS.enc.Utf8);           // Decryption

    if (key === decrykey)
    {
        res.send("<body style='background-color : antiquewhite; text-align : center;'><h1 style='color: green; background-color: aliceblue;font-size: 4rem; padding:100px' >Password Matched ! <h1> <h2 style='font-size:2rem; '>The Original Text Was : " + "<h2 style='text-decoration:underline; font-size:3rem; color:blue;'>" + word + "</h2>" + " .</h2> <h3 style='font-size:2.2rem; color:red; display:inline;'> The Cipher Text Generated Was : " + "<h1 style='text-decoration:underline; display:inline; font-size:1.7rem;'>" + ciphertext + "</h1>"+ " </h3> <h3 style='font-size:2rem;'>The Key U Entered Was = " +  key + " . </h3></body>");
    }
    else{
       res.send("<body style='background-color : antiquewhite; text-align : center;'><h1 style='color: red; background-color: aliceblue;font-size: 4rem; padding:100px'>Sorry Key Mis-Matched </h1> <h1>Please Try Again ! </h1>  <h1 style=' color: green; font-size: 3rem;'>The Key is : " + key + "</h1>  <h1 style='color: red; font-size: 2.5rem;'> But U Typed : " + decrykey + "</h1> <h1 style='margin-top:10rem;'> <--- Please Go Back </h1></body>" )
    }

})



app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000.");
});





