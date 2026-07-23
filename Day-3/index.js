const http = require("http");

const url = require("url");

const server = http.createServer((req, res) => {

    const myURL = url.parse(req.url ,true)
    console.log(myURL)

    if (myURL.pathname == "/") {
        if(req.method == "GET"){
            res.end("Home Page With GET Method")
        }
    }
    else if (myURL.pathname == "/singup") {
        if(req.method == "GET"){
            res.end("This is SignUp Form")
        }
        else if(req.method == "POST"){
            res.end("Success");
        }
    }
    else if (myURL.pathname == "/contact") {
        res.end("This is Contact Page");
    }
    else{
        res.end("404 Not Found");
    }
});



server.listen(3000, () => {
    console.log('Server is Running on Port 3000..........');
})