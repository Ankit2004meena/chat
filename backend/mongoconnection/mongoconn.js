import mongoose from 'mongoose'


const mongoconn = async() => {
  try{
   await mongoose.connect(process.env.MONGO_URI);
   console.log("Our connection with mongodb is successfull ,yeah!!");
  }
  catch(error){
    console.log("error in connecting mongoDb",error.message)
  }
}

export default mongoconn;
