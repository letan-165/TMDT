import * as bcrypt from 'bcrypt';
const saltRounds = 10;
import { ConfigService } from '@nestjs/config';
export const hashPassword = async (password: string) => {
    try{
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword = async (password: string, hashPassword: string) => {
    try{
        return await bcrypt.compare(password, hashPassword);
    } catch (error) {
        console.log(error);
    }
}

