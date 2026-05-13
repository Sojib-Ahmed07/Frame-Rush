import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    const {username,email, password} = await request.json()
  
    if(!username || !email || !password){
      return NextResponse.json(
        {error: "email and password required"},
        {status: 400}
      )
    }
    
    await connectToDB()

    const existingUser = await User.findOne({email})

    if(existingUser){
      return NextResponse.json(
        {error: "user already exist"},
        {status: 400}
      )
    }

    await User.create({
      username,
      email,
      password
    })

    return NextResponse.json(
        {message: "user registered successfully"},
        {status: 200}
      )
    
  } catch (error) {
    console.log(error)
    return NextResponse.json(
        {error: "error while registering user"},
        {status: 500}
      )
  }

}



















