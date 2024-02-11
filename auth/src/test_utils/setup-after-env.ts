// import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// let mongoMemoryServer: MongoMemoryServer;

beforeAll(
  async () =>
    await mongoose.connect(
      'mongodb+srv://jwlarbi15:dittext@cluster0.jqyx1e8.mongodb.net/test',
    ),
);

beforeEach(async () => {
  const allCollections = await mongoose.connection.db.collections();

  allCollections.forEach(async (collection) => {
    await collection.deleteMany({});
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
