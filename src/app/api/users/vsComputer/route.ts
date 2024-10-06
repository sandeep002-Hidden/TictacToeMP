import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    let res;
    const arr = reqBody.arr
    // if (tempArr.length === 0) {
    //     res = NextResponse.json({ Message: "May Be its a draw" })
    // }
    // else {
    // console.log(arr)
    calculateWinner(arr)
    const randomItem = calculateWinner(arr)
    res = NextResponse.json({ message: "success true", index: randomItem })
    // }
    return res;
}
function calculateWinner(squares: Array<string | null>): Number | null {
    console.log(squares)
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    let count = 0;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
            count++;
        }
    }
    if (count == 8) {
        return randomIndexGen(squares)
    }
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] === squares[b]) {
            if(squares[c]==null){
                return c
            }
            else{
                randomIndexGen(squares)
            }
        }
        else if (squares[b] === squares[c]) {
            if(squares[a]==null){
                return a
            }
            else{
                randomIndexGen(squares)
            }
        }
        else{
            if(squares[b]==null){
                return b
            }
            else{
                randomIndexGen(squares)
            }
        }
    }
    const isBoardFull = squares.every((square) => square !== null);
    if (isBoardFull) {
        return null
    }
    return null;
}
function randomIndexGen(arr: Array<string | null>): Number | null {
    const tempArr = []
    for (const index in arr) {
        if (arr[index] === null) {
            tempArr.push(index)
        }
    }
    const randomIndex = Math.floor(Math.random() * tempArr.length);
    const randomItem = tempArr[randomIndex];
    return randomIndex
}