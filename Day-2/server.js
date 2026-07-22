const http = require('http');

const url = require('url');



const server = http.createServer((req,res)=>{
    const myURL  = url.parse(req.url, true);

    // console.log(myURL);

    if(myURL.pathname == '/home'){
        res.end("Home Page")
    }
    else if(myURL.pathname == '/contact'){
        res.end("Contact Page")
    }
    else if(myURL.pathname == '/about'){
        res.end("About Page")
    }
    else{
        res.end("404 Not Found")
    }
});

server.listen(3000,()=>{
    console.log("Server is Running on Port 3000........")
})