const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")

const app = express()

dotenv.config({ path: "./config.env" })

app.use(express.json())

if(process.env.NODE_ENV === "development"){
   app.use(morgan("dev"))
}

const port = process.env.PORT || 3000

//Routes
const userRoutes = require("./routes/userRoutes")

app.use(`/api/v1/users`, userRoutes)

app.get("/", (req, res) => {
   res.status(200).json({ message: "Server says hello! 👋🏻"})
})

app.listen(port, () => {
   console.log(`App is running at ${port} 🔥🔥🔥`)
})
