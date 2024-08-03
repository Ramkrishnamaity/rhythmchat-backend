import { FileUploadResponce, VideoUploadResponce } from "../types/Responses/User/Upload"
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"



const s3Client = new S3Client({
    region: process.env.DIGITALOCEAN_SPACES_REGION,
    credentials: {
        accessKeyId: process.env.DIGITALOCEAN_ACCESS_KEY ?? "",
        secretAccessKey: process.env.DIGITALOCEAN_SECRET_KEY ?? "",
    },
    endpoint: process.env.DIGITALOCEAN_SPACES_ENDPOINT ?? "",
})

async function pushOnBucket(file: Express.Multer.File, directory: string) {
    try {

        const command = new PutObjectCommand({
            Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET_NAME,
            Key: directory,
            Body: file.buffer,
            ACL: "public-read",
        })

        await s3Client.send(command)
        

    } catch (error) {
        console.error("Error On upload: ", error)
        throw error
    }
}

async function pullFromBucket(directory: string) {
    try {

        const command = new DeleteObjectCommand({
            Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET_NAME,
            Key: directory
        })

        const res = await s3Client.send(command)
        console.log(res, 'res')

    } catch (error) {
        console.error("Error On upload: ", error)
        throw error
    }
}

async function fileUpload(file: Express.Multer.File, _id: string): Promise<FileUploadResponce> {
    try {
        const type = file.mimetype.split('/')
        const fileName = `${Date.now()}.${type[1]}`
        const directory = `${_id}/${type[0]}/${fileName}`

        await pushOnBucket(file, directory)
        
        const url = `${process.env.DIGITALOCEAN_SPACES_URL}/${directory}`
        
        return {
            url
        }
    } catch (error) {
        throw error
    }
}

async function videoUpload(file: Express.Multer.File, _id: string): Promise<VideoUploadResponce> {
    return {
        thumbnail: '',
        url: ''
    }
}

async function storyUpload(file: Express.Multer.File, _id: string): Promise<VideoUploadResponce> {
    return {
        thumbnail: '',
        url: ''
    }
}



const BucketUpload = {
    fileUpload,
    storyUpload,
    videoUpload,
    pullFromBucket
}

export default BucketUpload