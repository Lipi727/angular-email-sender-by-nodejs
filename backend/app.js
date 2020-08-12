const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

/*  
    If you get error "Error: self signed certificate in certificate chain", so for avoiding this I am giving alternative way.
    You can use:
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
*/


const app = express();
app.use(cors({origin: "*"}));
app.use(bodyParser.json());

var api = express.Router();
api.get("/", (req, res) => {
    res.send(
        "<h1 style='text-align:center'>Welcome to My Repo</h1>"
    );
});

api.post("/sendmail", (req, res)=>{
    console.log("request came");
    let user = req.body;
    sendmail(user, info => {
        console.log("The mail has been send");
        res.send(info);
        res.sendStatus(200);
    }).catch((err)=>console.log(err));
    
});

async function sendmail(user, callback){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: '', //email Id
            pass:'',  // password
        },
    });

    let info = await transporter.sendMail({
        from: '<example@example.com',
        to: user.email,
        subject:"Welcome to My Repository",
        html: `<h1>Hi ${user.name}</h1><br>
          <h4>Thank you for joining us</h4>`
    });
}
app.use('/api', api);

app.listen(3000,()=>{
    console.log("The server started on port 4400...!!")
});