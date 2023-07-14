/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require("./data");
const http = require("http");
const url = require("url");
const cors = require("cors"); // import cors module
const hostname = "localhost";
const port = 3035;

// Create an instance of cors
const corsOptions = {
  origin: "http://localhost:3030", // Allow only http://localhost:3030 to access the API
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
const corsMiddleware = cors(corsOptions);

http
  .createServer(function (req, res) {
    corsMiddleware(req, res, () => {
      // Use cors middleware here
      const reqUrl = url.parse(req.url, true);

      // Check if the URL pathname matches our search endpoint
      if (reqUrl.pathname === "/search") {
        // Get the query parameter for search
        const searchText = reqUrl.query.q;

        // Filter the data based on the searchText
        const searchData = data.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(searchData));
      } else if (reqUrl.pathname === "/test") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Hello World!" }));
      } else {
        res.write("Response goes in here..."); // Write out the default response
        res.end(); //end the response
      }
    });
  })
  .listen(port);

console.log(`[Server running on ${hostname}:${port}]`);
