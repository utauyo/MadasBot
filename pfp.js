require('dotenv').config();
let pfp
if(process.env.PRODUCTION) {
    pfp === process.env.TESTING_PFP
    module.exports = pfp;
} else {
    pfp === process.env.PRODUCTION_PFP
    module.exports = pfp;
}

