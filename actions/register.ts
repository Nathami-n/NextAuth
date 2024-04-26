"use server";
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

export const register = async (values:z.infer< typeof RegisterSchema> ) => {
    const validFields = RegisterSchema.safeParse(values);

    if(!validFields.success) {
        return {
            data: {
            error: "Invalid credentials",
            success:{
                state: false,
                response: undefined
            }
        }}
    };

    return {
         data: {
        error: undefined,
        success: {
            state: true,
            response: "Success in logging in"
        }
    }}
}