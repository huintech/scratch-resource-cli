#!/usr/bin/env node

/**
 * @fileoverview
 * Fetch the latest release note and upload it to.digital ocean spaces.
 */
import fetch from 'node-fetch';
import {S3, PutObjectCommand} from '@aws-sdk/client-s3';
// import {Buffer} from 'buffer';

const FILE_PATH = 'resource/latestReleaseNotes.txt';
const REPO = 'openblockcc/external-resources-v2';

const s3Client = new S3({
    endpoint: 'https://sgp1.digitaloceanspaces.com',
    region: 'us-east-1', // this SDK requires the region to be us-east-1, an AWS region name
    credentials: {
        accessKeyId: process.env.DO_KEY_ID,
        secretAccessKey: process.env.DO_SECRET_KEY
    }
});

const bucketParams = content => ({
    Bucket: 'openblock',
    Key: FILE_PATH,
    Body: Buffer.from(content, 'utf8'),
    ACL: 'public-read'
});

const getLatest = () => {
    const url = `https://api.github.com/repos/${REPO}/releases/latest`;

    return fetch(url)
        .then(res => res.json());
};

getLatest().then(data => {
    try {
        console.log(`Upload release note to ${bucketParams.Bucket}/${bucketParams.Key}`);
        s3Client.send(new PutObjectCommand(bucketParams(data.body))).then(() => {
            console.log(
                `Successfully uploaded object: ${
                    bucketParams(data.body).Bucket
                }/${
                    bucketParams(data.body).Key}`
            );
        });
    } catch (err) {
        console.log('Error', err);
    }
});
