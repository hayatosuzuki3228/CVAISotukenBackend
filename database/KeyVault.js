const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Build the URL to reach your key vault
const vaultName = "nkc-labo24-aix23-kv"; //Key Vaultのリソース名
const url = `https://${vaultName}.vault.azure.net`;


// Lastly, create our keys client and connect to the service
const credential = new DefaultAzureCredential();

const secretName = "database-password"; //シークレットの名前

async function main() {
    const secretClient = new SecretClient(url, credential); //シークレット取得のためのclient
    const secretResult = await secretClient.getSecret(secretName); //シークレットの取得結果
    return secretResult;
}

main();

exports.keyvault = main();

// インストールするもの
//npm install @azure/keyvault-secrets
//npm install @azure/identity