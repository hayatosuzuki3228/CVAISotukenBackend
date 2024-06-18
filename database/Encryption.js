function encryption(password, salt) {
    const crypto = require("crypto");
    
    const saltedPassword = password + salt;

    const streching = 2;

    let hash = saltedPassword;

    for(let i = 0; i < streching; i ++) {
        hash = crypto.createHash('sha256').update(hash).digest('hex');
    }

    return hash;
}

exports.encryption = encryption;