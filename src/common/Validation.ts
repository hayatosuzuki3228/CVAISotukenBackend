export function exist(...args: string[]): void
{
    for(const arg of args )
    {
        if(arg == undefined)
        {
            throw new Error("Argment is incorrect");
        }
    }
}