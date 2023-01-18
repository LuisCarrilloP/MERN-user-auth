const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")

//utils
const AppError = require("./utils/appError")

//controllers
const globalErrorController = require("./controllers/globalErrorController")

const app = express()

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

dotenv.config({ path: "./config.env" })

const DB = process.env.DATABASE_URI.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
mongoose.connect(DB).then(() => {
   console.log("Database connected! ✅")
})

app.use(express.json())

if(process.env.NODE_ENV === "development"){
   app.use(morgan("dev"))
}

const port = process.env.PORT || 3000

//Routes for pug templates
app.get("/", (req, res) => {
   res.render("emailTemplate", {
      text: "Forgot password? Submit a new password and confirm password by clicking the button below",
      user: "Luis",
      url: "#"
   })
})

//Routes
const userRoutes = require("./routes/userRoutes")

app.use(`/api/v1/users`, userRoutes)

//handle unhandled routes
app.all("*", (req, res, next) => {

   // const err = new Error(`Can't find the route ${req.originalUrl}`)
   // err.statusCode = 404
   // err.status = "fail"

   // next(err)//*jump automatically to the G.E.H.

   next(new AppError(`Can't find the route ${req.originalUrl}`, 404))
})

//global error handler
app.use(globalErrorController)


app.get("/", (req, res) => {
   res.status(200).json({ message: "Server says hello! 👋🏻"})
})

app.listen(port, () => {
   console.log(`App is running at ${port} 🔥🔥🔥`)
})
