// Common JS - using require instead of import 


// Creating a Web Server

const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {

    // // Dynamic loading of pages
    let filePath = path.join(__dirname, 'public', req.url === '/' ?
        'index.html' : req.url)
    // Extension of file

    // extension of file
    let extname = path.extname(filePath)

    // initial content type
    let contentType = 'text/html'

    // check ext and set content type 

    switch (extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
        case ".svg":
            contentType = "image/svg+xml"
            break;
    }
    console.log(filePath)
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                //page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {

                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(content, 'utf8')
                })
            } else {
                // some server error
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)

            }
            //  page was found 
        } else {
            // Success 
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(content, 'utf8')
        }
    })
})
// ENVIORMENT VARIABLE
// runs on either the port coming in from our host or from the local port 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
