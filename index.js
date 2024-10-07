const express = require("express");
const app = express();
const PORT = 8080;

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./" });
});

// Serve other pages based on the URL path
app.get("/:page", (req, res, next) => {
  const filename = `/${req.params.page}.html`;
  res.sendFile(filename, { root: "./" }, (err) => {
    if (err) {
      next(); // If file is not found, go to the next route handler
    }
  });
});

// Default route for 404.html
app.use((req, res) => {
  res.status(404).sendFile("/404.html", { root: "./" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
