import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import sutraMetaSchema from '../../specs/001-v1-0-yaml/contracts/sutra-meta.schema.json';
import chapterSchema from '../../specs/001-v1-0-yaml/contracts/chapter.schema.json';
import type { Sutra } from '../types/sutra';
import type { Chapter } from '../types/chapter';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateSutraMetaSchema = ajv.compile(sutraMetaSchema);
const validateChapterSchema = ajv.compile(chapterSchema);

export function validateSutraMeta(data: unknown): data is Sutra {
  const valid = validateSutraMetaSchema(data);
  if (!valid && validateSutraMetaSchema.errors) {
    console.error('Sutra metadata validation errors:', validateSutraMetaSchema.errors);
  }
  return !!valid;
}

export function validateChapter(data: unknown): data is Chapter {
  const valid = validateChapterSchema(data);
  if (!valid && validateChapterSchema.errors) {
    console.error('Chapter validation errors:', validateChapterSchema.errors);
  }
  return !!valid;
}
