const crypto = require("crypto");
const pepper = require("../database/KeyVault.js").pepper;

function encryption(password, salt) {
    
    
    const saltedPassword = password + salt + pepper;

    const streching = 2;

    let hash = saltedPassword;

    for(let i = 0; i < streching; i ++) {
        hash = crypto.createHash('sha256').update(hash).digest('hex');
    }

    return hash;
}

exports.encryption = encryption;