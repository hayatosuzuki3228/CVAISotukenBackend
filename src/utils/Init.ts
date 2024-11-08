import { prisma } from "../server"

export async function init(): Promise<void> {
    // session情報のクリア
    await prisma.session.deleteMany({})
};