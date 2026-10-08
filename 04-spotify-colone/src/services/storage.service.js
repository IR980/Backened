const ImageKit = require("@imagekit/nodejs")

const imageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

})

async function uploadFile(file){
    const result = await imageKitClient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "backend/music"
    })
    return result;
}

module.exports = {uploadFile};