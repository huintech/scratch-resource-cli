/**
 * @fileoverview
 * Upload a file to.digital ocean spaces.
 * use --filePath to specify the file path, e.g: --filePath=external-resources.zip
 */
import {S3, PutObjectCommand} from '@aws-sdk/client-s3';
import fs from 'fs';
import parseArgs from '../src/parseArgs.js';
import path from 'path';
import clc from 'cli-color';

const FILE_DIR = 'resource';

const {filePath} = parseArgs();

if (!filePath) {
    console.error(clc.red('ERR!: No file path specified'));
    process.exit(1);
}

const s3Client = new S3({
    endpoint: 'https://sgp1.digitaloceanspaces.com',
    region: 'us-east-1', // this SDK requires the region to be us-east-1, an AWS region name
    credentials: {
        accessKeyId: process.env.DO_KEY_ID,
        secretAccessKey: process.env.DO_SECRET_KEY
    }
});

const bucketParams = {
    Bucket: 'openblock',
    Key: `${FILE_DIR}/${path.basename(filePath)}`,
    Body: fs.createReadStream(filePath),
    ACL: 'public-read'
};

try {
    console.log(`Upload ${filePath} to ${bucketParams.Bucket}/${bucketParams.Key}`);
    s3Client.send(new PutObjectCommand(bucketParams)).then(() => {
        console.log(
            `Successfully uploaded object: ${
                bucketParams.Bucket
            }/${
                bucketParams.Key}`
        );
    });
} catch (err) {
    console.log('Error', err);
}
