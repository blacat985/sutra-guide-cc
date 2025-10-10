# sutra-guide-cc Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-10-06

## Active Technologies
- JavaScript ES2022+ / TypeScript 5.x + React 18, Chakra UI 2.x, React Router 6, js-yaml (YAML parser), Vite (build tool) (001-v1-0-yaml)

## Project Structure
```
src/
tests/
```

## Commands
npm test [ONLY COMMANDS FOR ACTIVE TECHNOLOGIES][ONLY COMMANDS FOR ACTIVE TECHNOLOGIES] npm run lint

## Code Style
JavaScript ES2022+ / TypeScript 5.x: Follow standard conventions

## Recent Changes
- 001-v1-0-yaml: Added JavaScript ES2022+ / TypeScript 5.x + React 18, Chakra UI 2.x, React Router 6, js-yaml (YAML parser), Vite (build tool)

<!-- MANUAL ADDITIONS START -->

## Specification-First Development

### IMPORTANT: Always Update Specifications Before Implementation

**Before making ANY code changes or adding new features, ALWAYS ask yourself:**

1. **Does this change affect the specification?**
   - New features → Update `specs/001-v1-0-yaml/spec.md`
   - New data fields → Update `specs/001-v1-0-yaml/data-model.md`
   - New schema properties → Update `specs/001-v1-0-yaml/contracts/*.schema.json`
   - New testing scenarios → Update `specs/001-v1-0-yaml/quickstart.md`

2. **Which specification documents need updating?**
   - **spec.md**: Functional requirements (FR-xxx), user scenarios, acceptance criteria
   - **data-model.md**: Entity definitions, field descriptions, validation rules
   - **chapter.schema.json / sutra-meta.schema.json**: JSON Schema validation
   - **quickstart.md**: Manual testing scenarios and checklists
   - **plan.md**: Technical design decisions (if architectural changes)
   - **tasks.md**: Implementation task breakdown (for new features)

3. **Update specifications FIRST, then implement:**
   ```
   ✅ CORRECT WORKFLOW:
   1. Update spec.md with new FR-xxx requirements
   2. Update data-model.md with new fields/entities
   3. Update schema files for validation
   4. Update quickstart.md with test scenarios
   5. THEN implement the code changes
   6. Run tests and verify
   7. Commit specs + code together

   ❌ WRONG WORKFLOW:
   1. Implement code changes directly
   2. Forget to update specs
   3. Specs become outdated and misleading
   ```

4. **When in doubt, ask the user:**
   - "This change will affect [spec.md/data-model.md]. Should I update the specification first?"
   - "I need to add [new field/feature]. Shall I update the spec documents before implementing?"

### Why This Matters
- **Single source of truth**: Specs document what the system SHOULD do
- **Team alignment**: Other developers rely on specs to understand requirements
- **Future maintenance**: Outdated specs lead to confusion and technical debt
- **Quality assurance**: Test scenarios in quickstart.md must match actual features
- **Compliance**: Constitutional requirements in spec must be enforced in code

### Checklist Before ANY Implementation
- [ ] Have I reviewed the relevant spec documents?
- [ ] Do my changes require spec updates?
- [ ] Have I updated spec.md with new/modified FRs?
- [ ] Have I updated data-model.md with new fields/entities?
- [ ] Have I updated schema files if data structure changes?
- [ ] Have I added test scenarios to quickstart.md?
- [ ] Are specs and code changes committed together?

---

## Development Best Practices

### Library Version Management
- **ALWAYS** use the context7 tool to query the latest library versions and documentation before writing code
- Verify compatibility between library versions
- Check for breaking changes in latest releases
- Consult official documentation for current best practices
- Example workflow:
  1. Before implementing a feature with React Router, query: `context7 resolve-library-id "react-router"`
  2. Then query: `context7 get-library-docs` with the returned library ID
  3. Review the latest API patterns before writing code

### Why This Matters
- Libraries evolve rapidly (breaking changes, deprecated APIs, new features)
- Using outdated patterns can introduce technical debt
- Latest documentation ensures optimal performance and best practices
- Reduces debugging time from version incompatibilities

## Implementation Tools

### Code Writing
- **Use Serena MCP** for semantic code editing and file operations
- Serena provides symbol-level tools for precise editing (find_symbol, replace_symbol_body, etc.)
- Read code intelligently - use overview tools and symbolic tools to read only necessary code
- Leverage memory files for codebase knowledge

### Testing & Debugging
- **Use Playwright MCP** for E2E testing and browser debugging
- Playwright provides browser automation tools:
  - `browser_navigate`: Navigate to URLs
  - `browser_snapshot`: Capture accessibility snapshots (better than screenshots)
  - `browser_click`, `browser_type`: Interact with elements
  - `browser_take_screenshot`: Visual debugging when needed
  - `browser_console_messages`: Check for errors
- Use Playwright for manual testing scenarios from quickstart.md
- Debug UI issues with browser inspection tools

### Development Workflow
1. **Before writing code**: Query context7 for latest library documentation
2. **During implementation**: Use Serena for precise code editing
3. **For testing**: Use Playwright MCP to automate browser testing
4. **For debugging**: Use Playwright to inspect live application state

## GitHub Deployment Verification

### Local Verification Before Push (IMPORTANT)
**ALWAYS run local verification before pushing to avoid GitHub Actions failures:**

```bash
./verify.sh
```

This script will:
1. Run `npm run build` - TypeScript type checking + production build
2. Run `npm run lint` - Code style checking
3. Display build artifact sizes

**Why this matters:**
- Local dev (`npm run dev`) uses lenient error handling - shows warnings only
- GitHub Actions runs production build (`npm run build`) with strict TypeScript compilation
- Errors that don't break local dev will fail GitHub Actions deployment
- Common issues: duplicate JSX attributes, unused variables/interfaces, type errors

**Full documentation:** See [LOCAL_VERIFICATION.md](LOCAL_VERIFICATION.md)

### Verifying GitHub Pages Deployment
After pushing to main branch, verify deployment success:

1. **Check GitHub Actions Status**:
   ```bash
   gh run list --limit 5
   gh run view <run-id>  # Get details of specific run
   ```

2. **Verify Deployment with Browser MCP** (Recommended):
   ```bash
   # Navigate to deployed site
   browser_navigate https://blacat985.github.io/sutra-guide-cc/

   # Capture accessibility snapshot (better than screenshots)
   browser_snapshot

   # Click through to verify pages
   browser_click <element-ref>

   # Take screenshot if needed
   browser_screenshot
   ```

3. **Verify Deployment with Playwright MCP** (Alternative):
   ```bash
   # Similar workflow using Playwright tools
   # Use browser_navigate, browser_snapshot, browser_click, browser_take_screenshot
   ```

4. **Common Verification Steps**:
   - Check home page loads correctly
   - Verify all navigation links work
   - Test dynamic routes (e.g., /heart-sutra, /heart-sutra/1)
   - Confirm YAML content loads from correct paths
   - Verify no console errors (use browser_console_messages)
   - Check all chapters display properly

5. **Troubleshooting Failed Deployments**:
   - Review GitHub Actions logs: `gh run view --log-failed`
   - Check for 404 errors on assets (verify BASE_URL configuration)
   - Ensure router basename matches Vite base config
   - Verify all content files are in public/ directory

<!-- MANUAL ADDITIONS END -->