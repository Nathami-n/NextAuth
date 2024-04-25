'use client';

import { CardWrapper } from "./CardWrapper";
import { useState, useTransition } from "react";
import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { LoginSchema } from "@/schemas";
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {FormError} from '@/components/ui/formError';
import {FormSuccess} from '@/components/ui/formSuccess';
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem

} from '@/components/ui/form';
import { login } from "@/actions/login";

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string|undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {

        startTransition(async ()=>{
             const data = await login(values);
             if(!data.data.success) {
                setError(data.data.error);
             } else {
                setSuccess(data.data.success.response);
             }
        });
    }

    return (
       <CardWrapper 
       headerLabel="Welcome Back"
       backButtonLabel="Don't have an account?"
       backButtonHref="/auth/register"
       showSocial
       >
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            >
                <div className="space-y-4">
                <FormField
                control={form.control}
                name="email" 
                render={({field})=> (
                    <FormItem>
                        <FormLabel>
                            Email
                        </FormLabel>
                        <FormControl>
                            <Input 
                            disabled={isPending}
                            {...field}
                            placeholder="john.doe@example.com"
                            type="Email"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password" 
                render={({field})=> (
                    <FormItem>
                        <FormLabel>
                            Password
                        </FormLabel>
                        <FormControl>
                            <Input 
                            disabled={isPending}
                            {...field}
                            placeholder="******"
                            type="password"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                </div>
                <FormError message={error as string}/>
                <FormSuccess message={success as string}/>
                <Button
                disabled={isPending}
                type="submit"
                className="w-full"
                >
                 Login
                </Button>
            </form>
        </Form>
       </CardWrapper>
    )
}