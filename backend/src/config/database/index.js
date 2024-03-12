// => connect to db local
// ${process.env.MONGODB_SERVER}://${process.env.MONGODB_HOST}:${process.env.MONGODN_PORT}/${process.env.MONGODDB_COLLECTION}

import mongoose from "mongoose"
async function connect() {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_SERVER}://${process.env.MONGODB_HOST}:${process.env.MONGODN_PORT}/${process.env.MONGODDB_COLLECTION}`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log(`Connected to database successs`) 
    } catch (err) {
        console.log(`Error ${err.message}`)
    }
}
export default {
    connect
}
