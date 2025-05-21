"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const mime_types_1 = __importDefault(require("mime-types"));
class UploadService {
    s3;
    constructor() {
        this.s3 = new client_s3_1.S3Client({
            endpoint: process.env.DIGITALOCEAN_SPACES_URL,
            region: process.env.DIGITALOCEAN_SPACES_REGION,
            credentials: {
                accessKeyId: process.env.DIGITALOCEAN_SPACES_ACCESS_ID,
                secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET_KEY,
            },
            forcePathStyle: false,
        });
    }
    async deploy(project_id, logger) {
        const build_dir = path_1.default.join(process.env.PROJECTS_DIR || "/projects", project_id, "dist");
        try {
            const files = await this.getFiles(build_dir);
            await Promise.all(files.map(file => this.uploadFile(build_dir, file, project_id, logger)));
            logger.log('Deployment completed');
        }
        catch (error) {
            logger.error(`Spaces upload failed: ${error}`);
            throw error;
        }
    }
    async getFiles(dir) {
        const entries = await fs_extra_1.default.readdir(dir, { withFileTypes: true });
        const files = (await Promise.all(entries.map((entry) => {
            const full_path = path_1.default.join(dir, entry.name);
            return entry.isDirectory() ? this.getFiles(full_path) : full_path;
        })));
        return files.flat();
    }
    async uploadFile(base_dir, file_path, project_id, logger) {
        const relativePath = path_1.default.relative(base_dir, file_path);
        const key = `__outputs/${project_id}/${relativePath.replace(/\\/g, "/")}`;
        logger.log(`Uploading: ${key}`);
        const data = new client_s3_1.PutObjectCommand({
            Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET_NAME,
            Key: key,
            Body: fs_extra_1.default.createReadStream(file_path),
            ContentType: mime_types_1.default.lookup(file_path) || 'application/octet-stream',
            ACL: "public-read",
        });
        await this.s3.send(data);
    }
}
exports.UploadService = UploadService;
