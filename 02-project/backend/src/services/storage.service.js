const {ImageKit} = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    // urlEndpoint: "https://ik.imagekit.io/your_imagekit_id"
});

async function uploadFile(buffer){
    try {
        const result = await imagekit.files.upload({
            file: buffer.toString("base64"),
            fileName: "image.jpg",
        });
        return result;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}

module.exports = uploadFile;