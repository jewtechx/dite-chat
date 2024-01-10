import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongoMemoryServer:MongoMemoryServer

beforeAll(async() => {
    mongoMemoryServer = new MongoMemoryServer()

    const mongouri = await mongoMemoryServer.getUri()

    await mongoose.connect(mongouri)

})

beforeEach(async() => {
    const allCollections = await mongoose.connection.db.collections()

    for(let collection of allCollections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongoMemoryServer.stop()
    await mongoose.connection.close()
})