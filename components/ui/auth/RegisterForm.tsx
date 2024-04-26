'use client';

import { CardWrapper } from "./CardWrapper";
import { useState, useTransition } from "react";
import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string|undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {

        startTransition(async ()=>{
             const data = await register(values);
             if(!data.data.success.state) {
                setError(data.data.error);
             } else {
                setSuccess(data.data.success.response);
             }
        });
    }

    return (
       <CardWrapper 
       headerLabel="Sign Up"
       backButtonLabel="Already have an account?"
       backButtonHref="/auth/login"
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
                name="name" 
                render={({field})=> (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input 
                            disabled={isPending}
                            {...field}
                            placeholder="john doe"
                            type="text"
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
                 Create an account
                </Button>
            </form>
        </Form>
       </CardWrapper>
    )
}