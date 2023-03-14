import express from 'express'

const app = express();
app.use("/", function (request, response) {
    response.redirect("https://metanit.com")
});

app.listen(3000);