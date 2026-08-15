import dotenv from 'dotenv';
import crypto from 'crypto';

import { PutObjectCommand } from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { r2 } from './_lib/r2.js';

dotenv.config({
  path: '.env.local',
});

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'image/jfif',
  'image/avif',
]);

const ALLOWED_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'heic',
  'heif',
  'jfif',
  'avif',
]);

const MAX_FILE_SIZE = 30 * 1024 * 1024;

function getExtension(fileName = '') {
  const parts = fileName.split('.');

  if (parts.length < 2) {
    return '';
  }

  return parts.at(-1).toLowerCase();
}

function sanitizeFileName(fileName = '') {
  return fileName
    .normalize('NFKD')
    .replace(/[^\w.-]/g, '_')
    .replace(/_+/g, '_');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed.',
    });
  }

  try {
    const { name, type, size } = req.body ?? {};

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof size !== 'number' ||
      !Number.isFinite(size) ||
      size <= 0
    ) {
      return res.status(400).json({
        message: 'Podaci o fotografiji nisu ispravni.',
      });
    }

    const extension = getExtension(name);

    const hasValidType = typeof type === 'string' && ALLOWED_TYPES.has(type);

    const hasValidExtension = ALLOWED_EXTENSIONS.has(extension);

    if (!hasValidType && !hasValidExtension) {
      return res.status(400).json({
        message: 'Format fotografije nije dozvoljen.',
      });
    }

    if (size > MAX_FILE_SIZE) {
      return res.status(400).json({
        message: 'Fotografija može imati maksimalno 30 MB.',
      });
    }

    if (!process.env.R2_BUCKET_NAME) {
      throw new Error('R2_BUCKET_NAME nije podešen.');
    }

    const safeName = sanitizeFileName(name);

    const fileKey = `wedding/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,

      ContentType: hasValidType ? type : 'application/octet-stream',
    });

    const uploadUrl = await getSignedUrl(r2, command, {
      expiresIn: 300,
    });

    return res.status(200).json({
      uploadUrl,
      fileKey,
      expiresIn: 300,
    });
  } catch (error) {
    console.error('R2 upload URL error:', error);

    return res.status(500).json({
      message: 'Greška prilikom pripreme uploada fotografije.',
    });
  }
}
