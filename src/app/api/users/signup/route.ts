import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    await connect()

    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);
        
        // check if user already exist.
        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json(
                {
                    error: 'User already exists'
                }, {status: 400})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // save the new user in the database
        const newUser = new User ({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser);
        
        return NextResponse.json(
            {
                message: 'User created successfully',
                sucsess: true,
                savedUser
            })

    } catch (error: any) {
        return NextResponse.json(
            { 
                message: error.message 
            }, { status: 500 });
    }
}