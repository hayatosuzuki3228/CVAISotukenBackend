import { PrismaClient } from "@prisma/client";
import { pepper } from "./KeyVault";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

async function makeRoot() {
    await prisma.admin.create({
        data: {
            email: "root",
            password: await hashSync('root' + await pepper, 5),
            active: true
        }
    });
}

makeRoot();