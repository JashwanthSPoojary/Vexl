import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Logger } from "../core/logger";
import path from "path";
import fs from "fs-extra";
import mime from "mime-types";

export class UploadService {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      endpoint: process.env.DIGITALOCEAN_SPACES_URL!.trim(),
      region:'blr1',
      credentials: {
        accessKeyId: process.env.DIGITALOCEAN_SPACES_ACCESS_ID!.trim(),
        secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET_KEY!.trim(),
      },
      forcePathStyle: false,
    });
  }
  async deploy(project_id: string, logger: Logger) {
    const build_dir = path.join(
      process.env.PROJECTS_DIR || "/projects",
      project_id,
      "dist"
    );
    try {
      const files = await this.getFiles(build_dir);
      await Promise.all(files.map(file => 
        this.uploadFile(build_dir, file, project_id, logger)
      ));
      logger.log('Deployment completed');
    } catch (error) {
      logger.error(`Spaces upload failed: ${error}`);
      throw error;
    }
  }
  private async getFiles(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = (await Promise.all(
      entries.map((entry) => {
        const full_path = path.join(dir, entry.name);
        return entry.isDirectory() ? this.getFiles(full_path) : full_path;
      })
    )) as string[];
    return files.flat();
  }
  private async uploadFile(
    base_dir: string,
    file_path: string,
    project_id: string,
    logger: Logger
  ) {
    const relativePath = path.relative(base_dir, file_path);
    const key = `__outputs/${project_id}/${relativePath.replace(/\\/g, "/")}`;
    logger.log(`Uploading: ${key}`);
    const data = new PutObjectCommand({
      Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET_NAME!.trim(),
      Key: key,
      Body: fs.createReadStream(file_path),
      ContentType: mime.lookup(file_path) || 'application/octet-stream',
      ACL: "public-read",
    });
    await this.s3.send(data);
  }
}
