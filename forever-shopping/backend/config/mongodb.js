import mongoose  from "mongoose";   


const connectDB = async () => {

    mongoose.connection.on('connected',()=>{
        console.log('MongoDB Connected')
    })
    let base = process.env.MONGODB_URL || '';
    if (base.endsWith('/')) {
        base = base.slice(0, -1);
    }
    const hasDb = /mongodb(\+srv)?:\/\/[^/]+\/[^/?]+/i.test(base);
    const uri = hasDb ? base : `${base}/e-commerce`;
    await mongoose.connect(uri)

}

export default connectDB;
