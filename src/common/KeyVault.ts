const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Build the URL to reach your key vault
const vaultName = "nkc-labo24-aix23-kv"; //Key Vaultのリソース名
const url = `https://${vaultName}.vault.azure.net`;

let credential: any = null;


// Lastly, create our keys client and connect to the service
if( process.platform !== "win32" ) credential = new DefaultAzureCredential();

async function getPepper() {
    if (credential) {
        const secretClient = new SecretClient(url, credential); //シークレット取得のためのclient
        const secretResult = await secretClient.getSecret("pepper"); //シークレットの取得結果
        return secretResult.value;
    }
    return null
}

export const pepper = getPepper();