import { CardWrapper } from "./CardWrapper"

export const LoginForm = () => {
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