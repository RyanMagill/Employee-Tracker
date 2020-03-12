// Dependencies
var express = require("express");

// Sets up the Express App
let app = express();
let PORT = process.env.PORT || 3010;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

require("./routes/apiRoutes")(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});