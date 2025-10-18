#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Load schemas
const chapterSchemaPath = path.join(__dirname, 'specs/001-v1-0-yaml/contracts/chapter.schema.json');
const chapterSchema = JSON.parse(fs.readFileSync(chapterSchemaPath, 'utf8'));

const sutraMetaSchemaPath = path.join(__dirname, 'specs/001-v1-0-yaml/contracts/sutra-meta.schema.json');
const sutraMetaSchema = JSON.parse(fs.readFileSync(sutraMetaSchemaPath, 'utf8'));

// Compile validators
const validateChapter = ajv.compile(chapterSchema);
const validateMeta = ajv.compile(sutraMetaSchema);

console.log('🧪 Testing Samyukta Agama YAML files...\n');

// Test meta.yml
console.log('📄 Testing meta.yml');
const metaPath = path.join(__dirname, 'public/content/samyukta-agama/meta.yml');
const metaContent = yaml.load(fs.readFileSync(metaPath, 'utf8'));
const metaValid = validateMeta(metaContent);

if (metaValid) {
  console.log('✅ meta.yml is valid\n');
} else {
  console.log('❌ meta.yml validation failed:');
  console.log(JSON.stringify(validateMeta.errors, null, 2));
  console.log();
}

// Test chapter files
const chapters = ['chapter-559.yml', 'chapter-560.yml'];

chapters.forEach(filename => {
  console.log(`📄 Testing ${filename}`);
  const chapterPath = path.join(__dirname, 'public/content/samyukta-agama', filename);

  if (!fs.existsSync(chapterPath)) {
    console.log(`⚠️  File not found: ${filename}\n`);
    return;
  }

  const chapterContent = yaml.load(fs.readFileSync(chapterPath, 'utf8'));
  const chapterValid = validateChapter(chapterContent);

  if (chapterValid) {
    console.log(`✅ ${filename} is valid`);
    console.log(`   - Number: ${chapterContent.number}`);
    console.log(`   - Volume: ${chapterContent.volume} (${chapterContent.volumeTitle})`);
    console.log(`   - Title: ${chapterContent.title}`);
    console.log();
  } else {
    console.log(`❌ ${filename} validation failed:`);
    console.log(JSON.stringify(validateChapter.errors, null, 2));
    console.log();
  }
});

console.log('✨ Testing complete!');
