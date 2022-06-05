require('dotenv/config')
const app = require('./app')
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');



// connect mongoose
mongoose.connect(process.env.MONGODB_LOCAL_URI)
.then(() => console.log("Connected!"))
.catch((error) => console.log(`Connect failure:: ${error}`))


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})