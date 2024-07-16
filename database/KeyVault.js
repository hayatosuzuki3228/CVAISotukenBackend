/*const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Build the URL to reach your key vault
const vaultName = "nkc-labo24-aix23-kv"; //Key Vaultのリソース名
const url = `https://${vaultName}.vault.azure.net`;


// Lastly, create our keys client and connect to the service
const credential = new DefaultAzureCredential();

const secretName = "database-password"; //シークレットの名前
const pepperName = "pepper";

async function getPassword() {
    const secretClient = new SecretClient(url, credential); //シークレット取得のためのclient
    const secretResult = await secretClient.getSecret(secretName); //シークレットの取得結果
    return secretResult.value;
}

async function getPepper() {
    const secretClient = new SecretClient(url, credential); //シークレット取得のためのclient
    const secretResult = await secretClient.getSecret(pepperName); //シークレットの取得結果
    return secretResult.value;
}

const password = getPassword();
const pepper = getPepper();

exports.password = password;
exports.pepper = pepper;*/

exports.password = "user";
exports.papper = "papper";