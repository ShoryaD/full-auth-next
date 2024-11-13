import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    await connect();

    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 400 }
            );
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 400 }
            );
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
        });

        // Set the token in a cookie
        response.cookies.set('token', token, {
            httpOnly: true,
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
