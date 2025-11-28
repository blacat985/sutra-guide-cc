import { test, expect } from '@playwright/test';

/**
 * Safari Compatibility Tests
 *
 * 这些测试模拟旧版 Safari (iOS 11-13) 的行为，验证应用在不支持
 * ES2018+ 正则表达式特性（lookbehind/lookahead）的浏览器中是否能正常工作。
 *
 * 测试流程：
 * 1. 注入补丁模拟旧版 Safari 限制
 * 2. 访问页面并检查是否有错误
 * 3. 验证核心功能是否正常工作
 */

test.describe('Safari Compatibility - Regex Features', () => {
  test.beforeEach(async ({ page }) => {
    // 注入补丁，模拟旧版 Safari 不支持的正则表达式特性
    await page.addInitScript(() => {
      const OriginalRegExp = RegExp;

      // @ts-expect-error - 重写 RegExp 构造函数
      window.RegExp = function (pattern: string | RegExp, flags?: string) {
        const patternStr = typeof pattern === 'string' ? pattern : pattern.source;

        // 检测 ES2018 正则表达式特性：
        // - Lookbehind: (?<!...) 或 (?<=...)
        // - Lookahead: (?!...) 或 (?=...)
        if (patternStr.includes('(?<!') || patternStr.includes('(?<=') ||
          patternStr.includes('(?!') || patternStr.includes('(?=')) {
          throw new SyntaxError('Invalid regular expression: invalid group specifier name');
        }

        return new OriginalRegExp(pattern, flags);
      };

      // 保留原型链
      // @ts-expect-error - 保留原型链
      window.RegExp.prototype = OriginalRegExp.prototype;
    });
  });

  test('应该在不支持 lookbehind/lookahead 的浏览器中正常加载首页', async ({ page }) => {
    // 监听控制台错误和页面错误
    const consoleErrors: string[] = [];
    const pageErrors: Error[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      // Ignore errors from external scripts (e.g. Google Drive embed)
      if (error.stack && (
        error.stack.includes('gstatic.com') ||
        error.stack.includes('google.com') ||
        error.stack.includes('youtube.com')
      )) {
        return;
      }
      pageErrors.push(error);
    });

    // 访问首页
    await page.goto('/');

    // 等待页面加载完成
    await page.waitForLoadState('networkidle');

    // 检查是否有正则表达式相关错误
    const hasRegexError = pageErrors.some(error =>
      error.message.includes('Invalid regular expression') ||
      error.message.includes('invalid group specifier name')
    ) || consoleErrors.some(msg =>
      msg.includes('Invalid regular expression') ||
      msg.includes('invalid group specifier name')
    );

    // 预期：不应该有正则表达式错误
    if (hasRegexError) {
      console.log('发现正则表达式错误：', pageErrors, consoleErrors);
    }
    expect(hasRegexError).toBe(false);

    // 检查页面是否正常显示标题
    await expect(page.locator('text=Sutra Guide')).toBeVisible({ timeout: 5000 });

    // 检查是否显示应用错误页面
    const hasErrorMessage = await page.locator('text=Unexpected Application Error').isVisible().catch(() => false);
    expect(hasErrorMessage).toBe(false);

    // 检查是否显示经文列表
    await expect(page.locator('h2', { hasText: '金剛經' })).toBeVisible();
    await expect(page.locator('h2', { hasText: '雜阿含經' })).toBeVisible();
    await expect(page.locator('h2', { hasText: '般若波羅蜜多心經' })).toBeVisible();
  });

  test('应该能够打开章节并正常显示内容（测试 normalizeMarkdown）', async ({ page }) => {
    const pageErrors: Error[] = [];
    const consoleErrors: string[] = [];

    page.on('pageerror', error => {
      // Ignore errors from external scripts (e.g. Google Drive embed)
      if (error.stack && (
        error.stack.includes('gstatic.com') ||
        error.stack.includes('google.com') ||
        error.stack.includes('youtube.com')
      )) {
        return;
      }
      pageErrors.push(error);
    });
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 点击雜阿含經
    await page.click('text=雜阿含經');
    await page.waitForLoadState('networkidle');

    // 点击第一章（576經）
    await page.click('text=/第\\s*576\\s*經/');
    await page.waitForLoadState('networkidle');

    // 检查是否有错误
    if (pageErrors.length > 0 || consoleErrors.length > 0) {
      console.log('页面错误：', pageErrors);
      console.log('控制台错误：', consoleErrors);
    }
    expect(pageErrors.length).toBe(0);

    // 检查章节内容是否正常显示
    await expect(page.locator('text=Original Text')).toBeVisible();

    // 检查是否显示错误页面
    const hasErrorMessage = await page.locator('text=Unexpected Application Error').isVisible().catch(() => false);
    expect(hasErrorMessage).toBe(false);
  });

  test('应该能够展开 Podcast 文字稿（测试 normalizeMarkdown 和 extractTeaching）', async ({ page }) => {
    const pageErrors: Error[] = [];

    page.on('pageerror', error => {
      // Ignore errors from external scripts (e.g. Google Drive embed)
      if (error.stack && (
        error.stack.includes('gstatic.com') ||
        error.stack.includes('google.com') ||
        error.stack.includes('youtube.com')
      )) {
        return;
      }
      pageErrors.push(error);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 导航到雜阿含經第576經
    await page.click('text=雜阿含經');
    await page.waitForLoadState('networkidle');
    await page.click('text=/第\\s*576\\s*經/');
    await page.waitForLoadState('networkidle');

    // 检查是否有 Podcast 文字稿按钮
    const transcriptButton = page.locator('button:has-text("文字稿")');

    if (await transcriptButton.isVisible()) {
      // 展开文字稿
      await transcriptButton.click();
      await page.waitForTimeout(500); // 等待动画完成

      // 检查文字稿内容是否显示
      // normalizeMarkdown 函数会处理文字稿的换行符
      const transcriptContent = page.locator('text=/主持人|弘源法師|經文|對談/').first();
      await expect(transcriptContent).toBeVisible();

      // 检查是否有"法師開示"按钮
      const teachingButton = page.locator('button:has-text("法師開示")');

      if (await teachingButton.isVisible()) {
        // 展开弘源法師開示
        await teachingButton.click();
        await page.waitForTimeout(500);

        // 验证 extractTeaching 函数是否正常工作
        // 应该能看到弘源法師的开示内容
        const teachingContent = page.locator('text=/弘源法師/').first();
        await expect(teachingContent).toBeVisible();
      }
    }

    // 确认没有错误
    expect(pageErrors.length).toBe(0);
  });

  test('应该正确处理 markdown 段落间距', async ({ page }) => {
    await page.goto('/samyukta-agama/576');
    await page.waitForLoadState('networkidle');

    // 展开 Podcast 文字稿
    const transcriptButton = page.locator('button:has-text("文字稿")');

    if (await transcriptButton.isVisible()) {
      await transcriptButton.click();
      await page.waitForTimeout(500);

      // 检查段落标签是否正确渲染
      // normalizeMarkdown 应该将单换行转为双换行，产生正确的 <p> 标签
      const paragraphs = page.locator('p');
      const paragraphCount = await paragraphs.count();

      // 应该有多个段落（如果 normalizeMarkdown 正常工作）
      expect(paragraphCount).toBeGreaterThan(1);
    }
  });
});

test.describe('Safari Compatibility - Page Navigation', () => {
  test('应该能够在章节间导航而不出错', async ({ page }) => {
    const pageErrors: Error[] = [];
    page.on('pageerror', error => {
      // Ignore errors from external scripts (e.g. Google Drive embed)
      if (error.stack && (
        error.stack.includes('gstatic.com') ||
        error.stack.includes('google.com') ||
        error.stack.includes('youtube.com')
      )) {
        return;
      }
      pageErrors.push(error);
    });

    await page.goto('/heart-sutra/1');
    await page.waitForLoadState('networkidle');

    // 点击"下一章"
    await page.click('button:has-text("下一章")');
    await page.waitForLoadState('networkidle');

    // 检查是否正常导航
    await expect(page.locator('text=Original Text')).toBeVisible();

    // 点击"上一章"
    await page.click('button:has-text("上一章")');
    await page.waitForLoadState('networkidle');

    expect(pageErrors.length).toBe(0);
  });
});
