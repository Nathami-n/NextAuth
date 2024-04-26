import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "password is required"
    }),
});


export const RegisterSchema = z.object({
    name: z.string({
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(5, {
        message: "password must be at least 6 characters long"
    })
})