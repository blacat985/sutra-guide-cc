# Quickstart Manual Testing Guide: Sutra Guide Website V1.0

**Date**: 2025-10-05
**Purpose**: Manual validation checklist for V1.0 acceptance
**Prerequisites**: Completed implementation, all automated tests passing

## Setup

Before starting manual tests:

1. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Expected: Server runs on `http://localhost:5173` (or specified port)

2. **Prepare Test Data**:
   - Verify at least 1 sample sutra exists in `public/content/`
   - Verify at least 2 chapters exist for that sutra
   - Verify sample YAML files are valid

3. **Browser Setup**:
   - Use Chrome/Edge (latest), Firefox (latest), or Safari 14+
   - Open DevTools (F12)
   - Install axe DevTools extension

---

## Test Scenario 1: Homepage Sutra List (FR-006)

**User Story**: "Given a user arrives at the website homepage, When the page loads, Then they see a list of 1-3 available sutras with titles and basic information"

### Steps:
1. Navigate to `http://localhost:5173/`
2. Wait for page to load (should be < 2s on 3G simulation)

### Expected Results:
- [ ] Homepage loads successfully
- [ ] Sutra list is visible
- [ ] Each sutra card displays:
  - [ ] Chinese title
  - [ ] English title (if available)
  - [ ] Tradition (e.g., "Mahayana")
  - [ ] Brief description
  - [ ] "View Sutra" or similar action button
- [ ] 1-3 sutras are displayed (per V1.0 scope)
- [ ] No console errors

### Performance:
- [ ] Initial load time < 2s (throttle to Slow 3G in DevTools)
- [ ] Lighthouse score > 90 for Performance

---

## Test Scenario 2: Sutra Selection & TOC Display (FR-007, FR-008)

**User Story**: "Given a user has selected a specific sutra, When they view the table of contents, Then they can see all chapters with clear titles"

### Steps:
1. From homepage, click on a sutra card
2. Observe the sutra page that loads

### Expected Results:
- [ ] URL changes to `/{sutra-id}` (e.g., `/heart-sutra`)
- [ ] Page displays Table of Contents (TOC) on left/sidebar
- [ ] TOC shows:
  - [ ] Sutra title at top
  - [ ] List of all chapters with titles
  - [ ] Chapter 1 is highlighted/active by default
- [ ] First chapter content displays on right/main area
- [ ] Source attribution visible (translator, source)
- [ ] Navigation < 500ms (from homepage click to page interactive)

### Accessibility:
- [ ] Keyboard Tab key can focus TOC items
- [ ] Enter key activates focused chapter link
- [ ] Current chapter has `aria-current="page"` or visual indicator

---

## Test Scenario 3: Chapter Content Display (FR-003)

**User Story**: "Given a user is viewing a chapter, When the chapter page loads, Then they can see all content fields"

### Steps:
1. On sutra page, ensure Chapter 1 is displayed
2. Scroll through the chapter content
3. Verify all content sections present

### Expected Results:
- [ ] **Original Text** section displays classical Chinese
  - [ ] Multi-paragraph format preserved
  - [ ] Readable font size (minimum 16px)
- [ ] **Translation** section displays vernacular Chinese
  - [ ] Multi-paragraph format preserved
  - [ ] Clear visual separation from original text
- [ ] **Annotations** section displays (if available)
  - [ ] Each annotation shows paragraph reference
  - [ ] Annotation text visible
  - [ ] Source citation present
- [ ] **Practice Insights** section displays (if available)
  - [ ] Multi-paragraph format preserved
- [ ] **Illustrations** display (if available)
  - [ ] Images load correctly
  - [ ] Alt text present (check in DevTools)
  - [ ] Captions visible below images
- [ ] **Podcast Link** displays (if available)
  - [ ] Link labeled clearly (e.g., "收聽 Podcast 📻")
  - [ ] Indicates external link (icon or text)
- [ ] **Podcast Transcript** displays (if available)
  - [ ] Transcript text visible below podcast link
  - [ ] Multi-paragraph format preserved
  - [ ] Clearly separated from other content sections

### Accessibility:
- [ ] Run axe DevTools scan → 0 violations
- [ ] All images have `alt` attributes
- [ ] Heading hierarchy is semantic (h1 → h2 → h3)
- [ ] Color contrast meets 4.5:1 for normal text

---

## Test Scenario 4: Chapter Navigation (FR-008, FR-011)

**User Story**: "Given a user is on chapter 3, When they click on chapter 5 in the TOC, Then they are immediately taken to chapter 5 content without page reload delay"

### Steps:
1. On sutra page, click Chapter 2 in TOC
2. Observe navigation behavior
3. Click Chapter 1 in TOC
4. Observe navigation behavior

### Expected Results:
- [ ] URL changes to `/{sutra-id}/{chapter-num}` (e.g., `/heart-sutra/2`)
- [ ] Chapter content updates < 500ms
- [ ] NO full page reload (SPA behavior)
- [ ] TOC highlights active chapter
- [ ] Scroll position resets to top of content
- [ ] Browser back button works (returns to Chapter 1)
- [ ] Browser forward button works (goes to Chapter 2)

### Performance:
- [ ] Chapter switch time < 500ms (measured in DevTools Performance tab)
- [ ] No layout shift (CLS < 0.1)

---

## Test Scenario 5: Theme Toggle & Persistence (FR-016-FR-019)

**User Story**: "Given a user is reading, When they toggle the theme switch, Then the website switches between light/dark mode and preference is preserved"

### Steps:
1. Locate theme toggle button (usually in header)
2. Verify current theme (light mode default)
3. Click theme toggle
4. Observe theme change
5. Refresh page (F5)
6. Observe theme persistence

### Expected Results:
- [ ] Theme toggle button is visible
- [ ] Clicking toggle switches to dark mode
  - [ ] Background changes to dark color
  - [ ] Text changes to light color
  - [ ] Contrast ratio remains ≥ 4.5:1
- [ ] Clicking toggle again switches back to light mode
- [ ] **After refresh**: Theme persists (remains dark if was dark)
- [ ] **In new tab**: Open `/{sutra-id}` → theme persists
- [ ] **Clear localStorage**: Theme falls back to light mode gracefully

### Accessibility:
- [ ] Theme toggle has `aria-label="Toggle theme"` or similar
- [ ] Theme toggle is keyboard accessible (Tab + Enter)
- [ ] Focus indicator visible on theme toggle button

---

## Test Scenario 6: External Podcast Link (FR-012-FR-013)

**User Story**: "Given a user clicks on a podcast link, When the link is activated, Then they are taken to the external platform in a new tab"

### Steps:
1. Navigate to a chapter with `podcastUrl` defined
2. Locate podcast link in chapter content
3. Click podcast link

### Expected Results:
- [ ] Link opens in NEW tab/window (not same tab)
- [ ] User's current reading session is NOT disrupted
- [ ] Link has `target="_blank"` and `rel="noopener noreferrer"`
- [ ] Link is clearly labeled as external (icon or text)
- [ ] If no podcast URL: Message "Podcast episode not available" or link hidden
- [ ] If transcript available: Transcript displays below podcast link
- [ ] Transcript is readable and properly formatted

### Accessibility:
- [ ] Link has accessible name (not just icon)
- [ ] Screen reader announces "opens in new window"

---

## Test Scenario 7: Corrupted YAML Error Handling (FR-027-FR-028)

**User Story**: "Given a chapter has a corrupted YAML file, When a user tries to view that chapter, Then an error message is displayed"

### Steps:
1. **Prepare**: Manually corrupt a chapter YAML file:
   - Open `public/content/{sutra-id}/chapter-2.yml`
   - Add invalid YAML (e.g., remove a closing bracket, add `{` without `}`)
   - Save file
2. Navigate to that chapter via TOC
3. Observe error handling

### Expected Results:
- [ ] **Error message displays** (not crash):
  - [ ] "Error loading chapter" or similar
  - [ ] User-friendly message (not technical stack trace)
- [ ] **Chapter content is hidden** (not partially rendered)
- [ ] **TOC remains functional** (can click other chapters)
- [ ] **Navigation to other chapters works** (can browse Chapter 1)
- [ ] **Console shows error** (for debugging) but no crash
- [ ] **ErrorBoundary** catches error gracefully

### Cleanup:
- [ ] Restore chapter-2.yml to valid YAML

---

## Test Scenario 8: Error Reporting Link (FR-029)

**User Story**: "Given a user notices a content error, When they access the error reporting feature, Then they can click a mailto/form link"

### Steps:
1. Navigate to any chapter
2. Look for error reporting link (usually in footer or near content)
3. Click error reporting link

### Expected Results:
- [ ] Error reporting link is visible
- [ ] Link is labeled clearly (e.g., "回報內容錯誤", "Report Error")
- [ ] **Option A (mailto)**: Clicking opens email client with pre-filled subject/body
- [ ] **Option B (external form)**: Clicking opens external form in new tab
- [ ] Link does NOT require authentication (public reporting)

---

## Test Scenario 9: Keyboard Navigation (FR-023)

**User Story**: "All interactive elements must be keyboard-accessible"

### Steps:
1. Navigate to homepage
2. Press Tab repeatedly
3. Navigate to sutra page
4. Press Tab repeatedly

### Expected Results:
- [ ] Tab key cycles through all interactive elements:
  - [ ] Sutra cards (homepage)
  - [ ] Theme toggle button
  - [ ] TOC chapter links
  - [ ] Podcast links
  - [ ] Error reporting link
- [ ] Focus indicator is clearly visible (outline or highlight)
- [ ] Enter key activates focused element
- [ ] Shift+Tab goes backward
- [ ] Focus does NOT get trapped (can escape from modal/sidebar)

---

## Test Scenario 10: Responsive Design (Implicit Requirement)

**User Story**: "System handles different screen sizes"

### Steps:
1. Resize browser window to mobile size (375px width)
2. Resize to tablet size (768px width)
3. Resize to desktop size (1920px width)

### Expected Results:
- [ ] **Mobile (375px)**:
  - [ ] TOC accessible via hamburger menu icon (positioned next to prev/next chapter buttons)
  - [ ] Clicking hamburger icon opens drawer menu from left side
  - [ ] Drawer menu displays full chapter list with traditional names
  - [ ] Clicking a chapter in drawer navigates to that chapter and auto-closes drawer
  - [ ] Drawer can be closed by clicking overlay, close button, or pressing ESC
  - [ ] Chapter content is readable (no horizontal scroll)
  - [ ] Touch targets are ≥ 44x44px
  - [ ] Previous/Next navigation buttons remain functional
- [ ] **Tablet (768px)**:
  - [ ] TOC may be in sidebar or collapsible
  - [ ] Layout adapts gracefully
- [ ] **Desktop (1920px)**:
  - [ ] TOC is visible sidebar
  - [ ] Content max-width constrains readability (not full screen width)
  - [ ] No excessive whitespace

---

## Test Scenario 11: Under-Construction Pages with Navigation (FR-027, FR-035-FR-037)

**User Story**: "Given a chapter is under construction, When user views it, Then navigation remains functional and chapter title is displayed"

### Steps:
1. Navigate to an under-construction chapter (e.g., chapter 7+)
2. Observe the under-construction message display
3. Test previous/next chapter navigation buttons
4. On mobile, test hamburger menu button

### Expected Results:
- [ ] Under-construction message displayed with appropriate styling
- [ ] Chapter title displayed in navigation area (if available in YAML)
- [ ] Previous chapter button functional (if applicable)
- [ ] Next chapter button functional (if applicable)
- [ ] Hamburger menu button visible and functional on mobile
- [ ] Can navigate to other chapters from under-construction page
- [ ] No crash or blank page when YAML validation fails

---

## Test Scenario 12: Detailed Explanation Format (FR-038, FR-040-FR-041)

**User Story**: "Given a chapter uses detailedExplanation format, When user views it, Then paragraph-by-paragraph content is displayed correctly"

### Steps:
1. Navigate to Diamond Sutra Chapter 0 (preface)
2. Observe content structure with original text and translations
3. Check for collapsible commentary sections
4. Verify Markdown rendering in translations

### Expected Results:
- [ ] Original text segments displayed clearly
- [ ] Master's commentary (六祖慧能註解) displayed
- [ ] Vernacular translations rendered with Markdown formatting
- [ ] Commentary sections collapsible (original text collapsed by default)
- [ ] Translations visible by default for better reading flow
- [ ] All content sections have unified 1px borders (FR-042)
- [ ] Dark mode has sufficient contrast in all sections (FR-043)

---

## Performance Validation (FR-021-FR-022)

### Lighthouse Audit

**Steps**:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Desktop" and all categories
4. Click "Analyze page load"

**Expected Results**:
- [ ] **Performance**: ≥ 90
- [ ] **Accessibility**: ≥ 90
- [ ] **Best Practices**: ≥ 90
- [ ] **SEO**: ≥ 90

### Network Throttling

**Steps**:
1. Open DevTools → Network tab
2. Select "Slow 3G" throttling
3. Hard refresh (Ctrl+Shift+R)
4. Measure load time

**Expected Results**:
- [ ] **Time to Interactive (TTI)**: < 3.5s
- [ ] **Largest Contentful Paint (LCP)**: < 2.5s
- [ ] **First Contentful Paint (FCP)**: < 1.8s

### Bundle Size Check

**Steps**:
```bash
npm run build
ls -lh dist/assets/*.js
```

**Expected Results**:
- [ ] Main bundle < 200KB gzipped
- [ ] Vendor chunk < 150KB gzipped

---

## Accessibility Manual Testing

### Screen Reader Testing

**Steps**:
1. **Windows (NVDA)**:
   - Install NVDA (free)
   - Start NVDA (Ctrl+Alt+N)
   - Navigate site with NVDA running
2. **macOS (VoiceOver)**:
   - Enable VoiceOver (Cmd+F5)
   - Navigate site with VoiceOver

**Expected Results**:
- [ ] Page title is announced on load
- [ ] Headings are announced with level (h1, h2, h3)
- [ ] Links are announced with purpose
- [ ] Images are announced with alt text
- [ ] TOC is announced as navigation landmark
- [ ] Chapter content is in main landmark

---

## Acceptance Criteria Checklist

### Functional Requirements
- [ ] FR-001: Supports 1-3 sutras ✅
- [ ] FR-002: YAML files follow naming convention ✅
- [ ] FR-003: All content fields displayed ✅
- [ ] FR-004: Source attribution visible ✅
- [ ] FR-005: YAML validation works ✅
- [ ] FR-006: Homepage shows sutra list ✅
- [ ] FR-007: TOC shows all chapters ✅
- [ ] FR-008: Clicking chapter navigates ✅
- [ ] FR-009: Active chapter highlighted ✅
- [ ] FR-010: Can return to sutra list ✅
- [ ] FR-011: Smooth navigation (no reload) ✅
- [ ] FR-012-015: Podcast integration ✅
- [ ] FR-016-019: Theme toggle & persistence ✅
- [ ] FR-020: WCAG AA contrast ✅
- [ ] FR-021: Load < 2s (3G) ✅
- [ ] FR-022: Navigation < 500ms ✅
- [ ] FR-023: Keyboard accessible ✅
- [ ] FR-024: ARIA labels & alt text ✅
- [ ] FR-025: No ads/popups ✅
- [ ] FR-026-028: Error handling ✅
- [ ] FR-029: Error reporting link ✅

### Constitutional Compliance
- [ ] Principle I: Content Sanctity - source attribution enforced ✅
- [ ] Principle II: Pure Experience - fast, clean, no distractions ✅
- [ ] Principle III: Tech Consistency - React + Chakra UI ✅
- [ ] Principle IV: Structured Content - YAML validated ✅
- [ ] Principle V: Accessibility - WCAG AA met ✅

---

## Sign-Off

**Tested By**: _______________
**Date**: _______________
**Build Version**: _______________

**All tests passed**: ☐ Yes ☐ No

**Issues Found**: (list any failures or deviations)

_______________________________________________
_______________________________________________
_______________________________________________

**Ready for Production**: ☐ Yes ☐ No

---

**Next Steps**: If all tests pass, proceed to deployment. If issues found, create tickets and re-run quickstart after fixes.
