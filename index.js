// Require express, body-parser, and axios
const axios = require("axios")
const express = require("express")
const bodyParser = require("body-parser")

require('dotenv').config()

const apiKey = process.env.API_KEY;
// Initialize express and define a port
const app = express()
const PORT = 3333
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())

app.post("/hook", (req, res) => {
    // console.log(req.body);
    // console.log(req.body.event.pulseId);
    res.status(200).send(req.body);
    const createSubItem = axios({
        url: 'https://api.monday.com/v2',
        method: 'post',
        headers: {
            'Authorization': apiKey
        },
        data: {
            query: `
                mutation {
                    create_subitem (parent_item_id: ${req.body.event.pulseId}, item_name: "Review") {
                        id
                        board {
                            id
                        }
                    }
                } 
            `
        }
    }).then((result) => {
        console.log(result.data)
    });
});

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

