import { hashSync, compareSync } from "bcrypt";
import { pepper } from "./KeyVault";

const saltRounds = 5;

export async function encryption(password: string): Promise<string> {
    // パスワードが8~14文字で英数混合である判別
    if(!((/^(?=.*[a-zA-Z])(?=.*[0-9/-])[a-zA-Z0-9.?/-]{8,24}$/).test( password ))){
        throw new Error("設定されたパスワードは不正です")
    }

    const pepperedPassword = password + await pepper;

    // ハッシュ化
    let passwordHash = await hashSync(pepperedPassword, saltRounds);

    return passwordHash;
};

export async function authentication(password: string, passwordHash: string): Promise<boolean> {
    return await compareSync(password + pepper, passwordHash);
}