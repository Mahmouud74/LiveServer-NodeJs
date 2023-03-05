const http = require("http");
const fs = require("fs");
// let writer = fs.createWriteStream("./public/clients.json");
// let reader = fs.createReadStream("./public/clients.json")
var homeHtml = fs.readFileSync("./public/home.html").toString();
var welcomeHtml = fs.readFileSync("./public/welcome.html").toString();
var styleCSS = fs.readFileSync("./public/css/bootstrap.min.css").toString();
var indexJs = fs.readFileSync("./public/scripts/index.js").toString();
var styleJs = fs.readFileSync("./public/scripts/bootstrap.min.js").toString();
var JsonFile = fs.readFileSync("./public/clients.json").toString();
let client ={};
const port = http.createServer((req,res)=>{
    if(req.method=="GET"){
        switch (req.url) {
            case"/":
            case "/home.html":
            case "/public/home.html":
                res.setHeader('Content-Type','text/html');
                res.write(homeHtml);
                break;
            case "/welcome.html":
            case "/public/welcome.html":
                res.setHeader('Content-Type','text/html');
                res.write(welcomeHtml);
                break;
            case "/bootstrap.min.css":
            case "/public/css/bootstrap.min.css":
            case "/css/bootstrap.min.css":
                res.write(styleCSS);
                break;
            case "/bootstrap.min.js":
            case "/public/scripts/bootstrap.min.js":
            case "/scripts/bootstrap.min.js":
                res.write(styleJs);
                break;
            case "/index.js":
            case "/public/scripts/index.js":
            case "/scripts/index.js":
                res.write(indexJs);
                break;
            case "/clients.json":
            case "/public/clients.json":
                res.write(JsonFile);
                break;
            default:
                break;
        }
        res.end()
    }
    if(req.method=="POST"){
        req.on("data",function(data){ //Async
            clientData = data.toString().split("&");
            //console.log(clientData);
            for (let i = 0; i < clientData.length; i++) {
                const removePlus=clientData[i].split("=")[1].split("+").join(" ");
                client[clientData[i].split("=")[0]]=removePlus;
            }
            fs.readFile('./public/clients.json', (err, data) => {
                if (err) throw err;
                 myData = JSON.parse(data);
               
                myData.push(client)
                data = JSON.stringify(myData)
                fs.writeFile('./public/clients.json', data, (err) => {
                    if (err) throw err;
                    console.log('Data written to file');
                });
            });
            console.log(client);
        })
        req.on("end",()=>{
            res.setHeader("content-type","text/html");
            // userName
            welcomeHtml = welcomeHtml.replace("{clientName}",client.name)
            welcomeHtml = welcomeHtml.replace("{MobilePhone}",client.mobile)
            welcomeHtml = welcomeHtml.replace("{Email}",client.email)
            welcomeHtml = welcomeHtml.replace("{Address}",client.address)

            res.write(welcomeHtml);
            res.end();
            welcomeHtml = welcomeHtml.replace(client.name,"{clientName}")
            welcomeHtml = welcomeHtml.replace(client.mobile,"{MobilePhone}")
            welcomeHtml = welcomeHtml.replace(client.email,"{Email}")
            welcomeHtml = welcomeHtml.replace(client.address,"{Address}");
        })

        
    }
})
port.listen(3000,()=>{
    console.log("http://localhost:3000");
})