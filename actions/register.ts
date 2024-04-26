"use server";
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import {client} from '@/utils/db';

export const register = async (values:z.infer< typeof RegisterSchema> ) => {
    const validFields = RegisterSchema.safeParse(values);

    if(!validFields.success) {
        return {
            data: {
            error: "Invalid credentials",
            success:{
                state: false,
                response: undefined,
                data: null
            }
        }}
    };

    const {
        email,
        password,
        name
    } = validFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await client.user.findUnique({
        where: {
            email
        }
    });

    if(existingUser) {
        return {
            data: {
                error: undefined,
                success:{
                    state: false,
                    response: "User already exists",
                    data: null
                }
            }
        }
    };

    await client.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return {
         data: {
        error: undefined,
        success: {
            state: true,
            response: "Success in logging in",
            data: null
        }
    }}
}