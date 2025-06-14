import mongoose from "mongoose";

async function connectToDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
  } catch (error) {
    console.error(error);
  }
}

export default connectToDB;
