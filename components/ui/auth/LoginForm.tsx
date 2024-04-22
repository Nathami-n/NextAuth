import { CardWrapper } from "./CardWrapper";
import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { LoginSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,

} from '@/components/ui/form';

export const LoginForm = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    return (
       <CardWrapper 
       headerLabel="Welcome Back"
       backButtonLabel="Don't have an account?"
       backButtonHref="/auth/register"
       showSocial
       >
        Login form
       </CardWrapper>
    )
}