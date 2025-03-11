import mongoose from "mongoose"

async function dbconnect(){
  try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("connection succes")
  }
  catch(err){
   console.log(err,"database connection error")
  }

}
export default dbconnect