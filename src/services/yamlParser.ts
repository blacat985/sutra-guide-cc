import yaml from 'js-yaml';

export async function loadYaml(content: string): Promise<unknown> {
  if (!content || content.trim() === '') {
    throw new Error('YAML content is empty');
  }

  try {
    // Use safe load to prevent code execution
    const data = yaml.load(content, { schema: yaml.JSON_SCHEMA });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`YAML parse error: ${error.message}`);
    }
    throw new Error('Unknown YAML parse error');
  }
}

export async function loadYamlFromFile(filePath: string): Promise<unknown> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
    }
    const content = await response.text();
    return loadYaml(content);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`File load error: ${error.message}`);
    }
    throw new Error('Unknown file load error');
  }
}


export async function checkChapterExists(
  sutraId: string,
  chapterNum: number
): Promise<boolean> {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}content/${sutraId}/chapter-${chapterNum}.yml`
    );
    return response.ok;
  } catch {
    return false;
  }
}
