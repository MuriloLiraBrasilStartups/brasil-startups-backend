import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { env } from '../../config/env'
import { AppError } from '../../shared/errors/app-error'

export class DocumentStorage {
  async upload(key: string, content: Buffer, contentType = 'application/pdf') {
    if (this.hasS3Config()) {
      await this.uploadToS3(key, content, contentType)

      return {
        storageKey: key,
        fileUrl: `${env.S3_PUBLIC_URL?.replace(/\/$/, '')}/${key}`,
      }
    }

    const outputDir = path.resolve('public', path.dirname(key))
    const outputPath = path.resolve('public', key)

    await mkdir(outputDir, { recursive: true })
    await writeFile(outputPath, content)

    return {
      storageKey: key,
      fileUrl: `${env.PUBLIC_API_URL.replace(/\/$/, '')}/${key}`,
    }
  }

  private hasS3Config() {
    return Boolean(
      env.S3_BUCKET &&
      env.S3_REGION &&
      env.S3_ACCESS_KEY_ID &&
      env.S3_SECRET_ACCESS_KEY &&
      env.S3_PUBLIC_URL,
    )
  }

  private async uploadToS3(key: string, content: Buffer, contentType: string) {
    try {
      const importer = Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<any>
      const { PutObjectCommand, S3Client } = await importer('@aws-sdk/client-s3')
      const client = new S3Client({
        region: env.S3_REGION,
        endpoint: env.S3_ENDPOINT,
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY_ID,
          secretAccessKey: env.S3_SECRET_ACCESS_KEY,
        },
      })

      await client.send(new PutObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: key,
        Body: content,
        ContentType: contentType,
      }))
    } catch (error) {
      throw new AppError(error instanceof Error ? error.message : 'Document storage upload failed', 502)
    }
  }
}
