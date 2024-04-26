import {client} from "@/utils/db";

export const getUserByEmail = async (email: string) => {
    try{
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        });
        return user;
    } catch(e) {
        return null;
    }
}
export const getUserById = async (id: string) => {
    try{
        const user = await client.user.findUnique({
            where: {
                id
            }
        });
        return user;
    } catch(e) {
        return null;
    }
}