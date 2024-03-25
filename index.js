import express from "express";
import bodyParser from "body-parser";
import axios from "axios"
import path from "path"

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async(req, res) => {
    try {


        const response = await axios.get(`https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita`);
        res.render("index.ejs", { data: "" });
    } catch (error) {
        console.error("Faled to make request:", error.message);
        res.render("index.ejs", { error: error.message, });
    }

});

app.post("/", async(req, res) => {
    try {

        const cockName = req.body.type;


        const response = await axios.get(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${cockName}`);
        // const dataCocktail = JSON.stringfy(response)
        const result = response.data
        console.log(result["drinks"]);
        res.render("index.ejs", {
            data: result["drinks"][0]

        });


    } catch (error) {
        console.error("Faled to make request:", error.message);
        res.render("index.ejs", { error: error.message, });
    }

});


// app.get("/submit", async(req, res) => {
//     try {
//         const result = await axios.get("https://thecocktaildb.com/api/json/v1/1/search.php?i=vodka");

//         res.render("index.ejs", {
//                 // content: JSON.stringify(result.data) 
//                 content: result.data.strIngredient,
//             }
//             // reciept: firstletter.data.strDescription,
//             // picture: firstletter.data.strDrinkThumb,
//         );
//     } catch (error) {
//         console.log(error.result.data);
//         res.status(500);
//     }
// });
// app.get("/get-secret", async(req, res) => {

//     try {
//         const result = await axios.get("https://thecocktaildb.com/api/json/v1/1/search.php?i=vodka", config);
//         res.render("index.ejs", {
//             // name: result.data.strIngredient,
//             // content: JSON.stringify(result.data)
//         });
//     } catch (error) {
//         res.render("index.ejs", { content: JSON.stringify(error.result.data) });
//     }
// });
// app.get("/noAuth", async(req, res) => {
//     try {
//         const result = await axios.get(API_URL + "/random");
//         res.render("index.ejs", { content: JSON.stringify(result.data) });
//     } catch (error) {
//         res.status(404).send("Error:", error.message);
//     }
// });





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});