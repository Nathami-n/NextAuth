"use server";
import * as z from 'zod';
import { LoginSchema } from '@/schemas';

export const login = async (values:z.infer< typeof LoginSchema> ) => {
    const validFields = LoginSchema.safeParse(values);

    if(!validFields.success) {
        return {
            data: {
            error: "Invalid credentials",
            success:{
                state: false,
                response: null
            }
        }}
    };

    return {
         data: {
        error: null,
        success: {
            state: true,
            response: "Success in logging in"
        }
    }}
}