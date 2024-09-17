import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    RoomName: {
      type: String,
      required: [true, "Provide the FirstName"],
      unique:[true,"Room with this name already exists"]
    },
    roomPassword: {
      type: String,
      required: [true, "Password must required"],
    },
    player1:{
      type:String,
      default:"",
      required:[true, "Admin requires"],
    },
    player2:{
      type:String,
      default:""
    },
    isOpen:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true },
);

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);

export default Room;