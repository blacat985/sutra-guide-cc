import { describe, it, expect } from 'vitest';
import { loadYaml } from '../../../src/services/yamlParser';

describe('YAML Parser Service', () => {
  it('should load valid YAML content correctly', async () => {
    const yamlContent = `
schemaVersion: "1.0"
id: test-sutra
title: Test Sutra
chapters: 1
`;
    const result = await loadYaml(yamlContent);
    expect(result).toEqual({
      schemaVersion: '1.0',
      id: 'test-sutra',
      title: 'Test Sutra',
      chapters: 1,
    });
  });

  it('should throw error for invalid YAML syntax', async () => {
    const invalidYaml = `
id: test-sutra
title: [unclosed bracket
`;
    await expect(loadYaml(invalidYaml)).rejects.toThrow();
  });

  it('should throw error for empty content', async () => {
    const emptyYaml = '';
    await expect(loadYaml(emptyYaml)).rejects.toThrow();
  });

  it('should reject malicious YAML content (security test)', async () => {
    // Test for potential code injection attempts
    const maliciousYaml = `
id: test
title: !!js/function >
  function() { return 'malicious'; }
`;
    // js-yaml safe mode should reject !!js/function tags
    await expect(loadYaml(maliciousYaml)).rejects.toThrow();
  });

  it('should handle multi-line strings correctly', async () => {
    const yamlWithMultiline = `
schemaVersion: "1.0"
sutraId: heart-sutra
number: 1
title: Test Chapter
originalText: |
  Line 1

  Line 2
translation: Line 1 translation
`;
    const result = await loadYaml(yamlWithMultiline) as any;
    expect(result.originalText).toContain('Line 1');
    expect(result.originalText).toContain('Line 2');
  });
});
