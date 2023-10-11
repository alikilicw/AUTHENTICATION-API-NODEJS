const mongoose = require("mongoose")
const { getDBUrl } = require("../../core/utils/envVariables")

mongoose.connect(getDBUrl(), {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log("Successfully connected to the database.")
})
.catch((error) => {
    console.log("An error occured while connecting to database : " + error);
})