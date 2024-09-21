import mongoose from "mongoose";

const GameSchaema = new mongoose.Schema(
  {
    player1:{
      type:String,
      default:"",
    },
    player2:{
      type:String,
      default:"",
    },
    winner:{
        type:String,
        default:""
    },
    GameOver:{
        type:Boolean,
        default:false,
    },
    moves:{
        type:Array,
        default:[]
    },
  },
  { timestamps: true },
);

const Game = mongoose.models.Game || mongoose.model("Game", GameSchaema);

export default Game;