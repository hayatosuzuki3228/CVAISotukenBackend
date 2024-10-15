import { hashSync, compareSync } from "bcrypt";
import { pepper } from "./KeyVault";

const saltRounds = 5;

export async function encryption(password: string): Promise<string> {
    const pepperedPassword = password + pepper;

    // ハッシュ化
    let passwordHash = await hashSync(pepperedPassword, saltRounds);

    return passwordHash;
};

export async function authentication(password: string, passwordHash: string): Promise<boolean> {
    return await compareSync(password + pepper, passwordHash);
}