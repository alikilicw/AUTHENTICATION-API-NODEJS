const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log("Successfully connected to the database.")
})
.catch((error) => {
    console.log("An error occured while connecting to database : " + error);
})