import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoMemoryServer: MongoMemoryServer;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  const uri = mongoMemoryServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  const allCollections = await mongoose.connection.db.collections();
  for (const collection of allCollections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoMemoryServer.stop();
  await mongoose.connection.close();
});
