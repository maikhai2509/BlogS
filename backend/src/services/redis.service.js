import client1 from '../config/database/redis.js'

async function setPromise(key, value){
    try {
        return new Promise((isOkay, isError) => {
            client1.set(key, value, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);
            })
        })
    }
    catch(err){

    }
}

async function getPromise(key){
    try {
        return new Promise((isOkay, isError) => {
            client1.get(key, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);
            })
        })
    }
    catch(err){

    }
}

export default {
    setPromise,
    getPromise
}
