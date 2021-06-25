const principal = require("./prueba.js");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000

app.get('/reversi', function (req, res) {
    console.log("=========================================================================================================================")
    console.log(req.query)
    res.send(principal.principal(req.query.estado,req.query.turno));
});

app.listen(port, () => {
	console.log("Started in Port: ", port);
});
// "npm start"
//" Port = process.env.PORT || 3000 "