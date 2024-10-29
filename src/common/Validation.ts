export function exist(...args: string[]): void
{
    for(const arg in args ) {
        if(arg == undefined)
        {
            throw new Error("引数が正しくありません");
        }
    }
}