const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    // Deconstruct request url
    const baseURL = "http://" + req.headers.host + "/";
    const q = new URL(req.url, baseURL);

    // Get filename or index if empty
    const filename =
      q.pathname === "/" ? "./index.html" : "." + q.pathname + ".html";

    // Read the requested file
    fs.readFile(filename, function (err, data) {
      if (err) {
        // If the requested file is not found, serve 404.html
        fs.readFile("./404.html", function (error404, data404) {
          if (error404) {
            // If 404.html is also not found, return a simple hardcoded error
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data404);
          return res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
