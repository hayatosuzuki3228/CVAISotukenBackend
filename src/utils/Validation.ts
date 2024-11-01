export function exist(...args: any[]): void
{
    if (args.includes(undefined)) throw new Error("引数が正しくありません");
}
