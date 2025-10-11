# Feature Specification: Sutra Guide Website V1.0

**Feature Branch**: `001-v1-0-yaml`
**Created**: 2025-10-05
**Status**: Updated (reflects implemented features as of 2025-10-11)
**Input**: User description: "為佛經導讀網站建立 V1.0 的完整規格。此版本需包含的核心功能有：一、一個支援多部經典獨立呈現的核心內容架構，其中每部經典的每一章節都應作為一份獨立的 YAML 檔案進行管理，系統能讀取檔案並清晰展示經文、註釋、白話翻譯、修行啟發及插圖；二、一個能根據當前所選經典顯示章節並方便跳轉的導覽目錄；三、在各章節提供前往對應 Podcast 頁面的外部連結；四、一個提供淺色與深色模式切換的使用者體驗優化。"

---

## Clarifications

### Session 2025-10-05
- Q: How should the system organize and identify sutras? → A: Single-level structure with unique IDs (e.g., "heart-sutra", "diamond-sutra")
- Q: What should users see when first visiting the website? → A: Direct access to Diamond Sutra (V1.0 focuses on single sutra)
- Q: How many sutras will V1.0 support? → A: Primarily Diamond Sutra with 33 chapters (0-32), focusing on quality over quantity
- Q: How should the system handle corrupted YAML files? → A: Display error message, hide the chapter, allow browsing other chapters
- Q: How complete should the content error reporting mechanism be? → A: GitHub Issues link (minimal implementation, privacy-preserving)

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

---

## User Scenarios & Testing

### Primary User Story

A Buddhist practitioner visits the Sutra Guide website to study the Diamond Sutra (金剛經). They want to:
1. Access the Diamond Sutra directly from the homepage
2. Navigate through chapters using the table of contents (desktop) or hamburger menu (mobile)
3. Read chapters of the chosen sutra
4. Read the original text alongside vernacular translation, annotations, and practice insights
5. View related illustrations for better understanding
6. Listen to corresponding podcast episodes for audio learning
7. Adjust the visual theme (light/dark mode) for comfortable reading in different environments

### Acceptance Scenarios

1. **Given** a user arrives at the website homepage, **When** the page loads, **Then** they see the Diamond Sutra entry point with title and basic information

2. **Given** a user has entered the Diamond Sutra, **When** they view the table of contents (sidebar on desktop or drawer on mobile), **Then** they can see all 33 chapters (0-32) with traditional chapter names and can click to navigate to any chapter

3. **Given** a user is viewing a chapter, **When** the chapter page loads, **Then** they can see:
   - Chapter title displayed in navigation area (using traditional name)
   - Original sutra text (classical Chinese)
   - Paragraph-by-paragraph detailed explanation with master's commentary and vernacular translation
   - Annotations and commentary (collapsible, with translations visible by default)
   - Practice insights and guidance (rendered in Markdown format)
   - Related illustrations (if available)
   - Link to corresponding podcast episode with clear title (if available)
   - Previous/Next chapter navigation buttons

4. **Given** a user is reading in bright sunlight, **When** they toggle the theme switch, **Then** the website switches between light mode and dark mode, and the preference is preserved across sessions

5. **Given** a user is on chapter 3 of a sutra, **When** they click on chapter 5 in the table of contents, **Then** they are immediately taken to chapter 5 content without page reload delay

6. **Given** a user clicks on a podcast link in a chapter, **When** the link is activated, **Then** they are taken to the external podcast platform page in a new tab/window

7. **Given** a chapter has a corrupted or incomplete YAML file, **When** a user tries to view that chapter, **Then** an under-construction page is displayed showing the chapter title (if available), navigation buttons remain functional, allowing access to other chapters

8. **Given** a user is browsing on a mobile device, **When** they click the hamburger menu icon, **Then** the chapter table of contents slides out from the left as a drawer

9. **Given** a user has selected a chapter from the mobile drawer menu, **When** navigation completes, **Then** the mobile menu automatically closes

10. **Given** a user is reading a chapter with detailed commentary, **When** the page loads, **Then** commentary original text is collapsed by default while translations are visible for better reading flow

11. **Given** a user is viewing an under-construction chapter, **When** the page loads, **Then** they can still see the chapter title and use previous/next navigation buttons

12. **Given** a user finds the default text size difficult to read, **When** they access the font size control, **Then** they can select from small, medium, large, or extra-large options

13. **Given** a user has adjusted the font size to large, **When** they refresh the page or return later, **Then** the large font size preference is preserved

14. **Given** a user changes font size, **When** the change is applied, **Then** all text content (original text, translations, annotations, practice insights) updates immediately to the new size

15. **Given** a user has set a large or extra-large font size, **When** viewing the chapter navigation sidebar, **Then** the chapter list maintains a fixed medium font size (16px) to prevent text wrapping and maintain layout stability

8. **Given** a user notices a content error, **When** they access the error reporting feature, **Then** they can click a GitHub Issues link to submit their report without exposing the maintainer's email address

### Edge Cases

- What happens when a chapter YAML file is missing or corrupted? → Display under-construction page, preserve basic data (like title) if possible, allow browsing other chapters
- What happens when a chapter has no podcast link available? → Clearly indicate podcast is not available
- What happens when a chapter has no illustrations? → Display text content only
- How does the system handle very long chapters (performance)? → Must still meet 500ms chapter navigation target
- What happens when a user accesses a non-existent sutra or chapter? → Display graceful error message
- How does the system handle different screen sizes (mobile, tablet, desktop)? → Responsive design with hamburger menu on mobile (<768px), sidebar on desktop (≥768px)
- What happens if the user's browser doesn't support theme preference storage? → Default to light mode, allow session-only switching
- How does the mobile menu behave at different screen sizes? → Drawer menu shows below 768px, persistent sidebar shows at 768px and above
- Does the system support swipe gesture navigation? → No, to avoid conflicts with browser native forward/back gestures
- How are commentary sections displayed? → Original text collapsed by default, translations visible by default for better reading flow
- What font sizes are available? → Small (14px), Medium (18px, default), Large (22px), Extra-Large (26px)
- What happens if browser doesn't support localStorage for font size? → Default to medium size, allow session-only changes
- How does font size affect mobile vs desktop layout? → Font size scales proportionally across all screen sizes while maintaining responsive layout
- Can users set different font sizes for different content types? → No, font size applies globally to all text content for consistency
- Why use larger font size range (14-26px) instead of original (14-20px)? → Increased range provides more noticeable differences between levels for better accessibility, especially for elderly users or those with vision impairments
- Why keep chapter navigation at fixed 16px? → Prevents text wrapping and maintains consistent sidebar layout when users select larger font sizes for main content

## Requirements

### Functional Requirements

#### Content Architecture
- **FR-001**: System MUST support multiple independent sutras (each identified by unique ID like "diamond-sutra"), with Diamond Sutra (金剛經) as the primary content in V1.0, containing 33 chapters (numbered 0-32, where 0 is the preface)
- **FR-002**: System MUST store each chapter of each sutra as a separate YAML file using single-level naming convention: `{sutra-id}/chapter-{number}.yml` where {number} can be 0 for preface/序
- **FR-003**: System MUST parse and display content from YAML files including: original text, annotations, vernacular translation, practice insights, illustrations, detailed explanations (paragraph-by-paragraph commentary with translations via `detailedExplanation` array), and podcast titles (via `podcastTitle` field)
- **FR-004**: System MUST display source attribution for each sutra and translation as required by the constitution (Principle I: Content Sanctity and Accuracy)
- **FR-005**: System MUST validate YAML content structure against a defined schema before displaying content

#### Navigation & Table of Contents
- **FR-006**: Homepage MUST display the Diamond Sutra entry point with title and basic metadata
- **FR-007**: System MUST display a table of contents showing all chapters for the currently selected sutra
- **FR-008**: Users MUST be able to click on any chapter in the table of contents to navigate directly to that chapter
- **FR-009**: System MUST display the current chapter title in the navigation area (prioritizing traditional chapter names like "大乘正宗分第三") and indicate the current active chapter in the table of contents
- **FR-010**: System MUST allow users to return to the sutra list from any chapter view
- **FR-011**: Navigation between chapters MUST be smooth and not require full page reloads

#### Podcast Integration
- **FR-012**: System MUST display a podcast link for each chapter when available, using the `podcastTitle` field as the display title (if provided) to give clear context about the episode content
- **FR-013**: Podcast links MUST open in a new browser tab/window to avoid disrupting the user's reading session
- **FR-014**: System MUST clearly indicate when a podcast episode is not available for a chapter
- **FR-015**: Podcast links MUST include clear labels indicating they lead to external content

#### Theme & User Experience
- **FR-016**: System MUST provide a light mode theme option
- **FR-017**: System MUST provide a dark mode theme option
- **FR-018**: Users MUST be able to toggle between light and dark modes via a visible control
- **FR-019**: System MUST persist the user's theme preference across browser sessions (with graceful fallback to light mode if browser storage unavailable)
- **FR-020**: System MUST apply appropriate contrast ratios in both themes to meet WCAG 2.1 Level AA standards (Principle V: Accessibility First)
- **FR-044**: System MUST provide font size adjustment controls with at least 3 size options (small, medium, large)
- **FR-045**: Users MUST be able to adjust font size via a visible control (e.g., dropdown menu or buttons)
- **FR-046**: System MUST persist the user's font size preference across browser sessions using localStorage
- **FR-047**: Font size changes MUST apply to all text content (sutra text, translations, annotations, practice insights)
- **FR-048**: Default font size MUST be medium (18px base) for optimal readability

#### Performance & Accessibility
- **FR-021**: Initial page load MUST complete within 2 seconds on a standard 3G connection (Principle II: Pure and Undisturbed Experience)
- **FR-022**: Chapter navigation MUST complete within 500 milliseconds
- **FR-023**: All interactive elements (navigation, theme toggle, font size control, links) MUST be keyboard-accessible
- **FR-024**: System MUST provide appropriate ARIA labels and alt text for all non-text content
- **FR-025**: System MUST NOT include any advertising, pop-ups, or auto-playing media (Principle II: Pure and Undisturbed Experience)

#### Error Handling
- **FR-026**: System MUST display a clear, graceful error message when a requested sutra or chapter is not found
- **FR-027**: When a chapter YAML file is corrupted or validation fails, system MUST display an under-construction page, preserve basic data (like chapter title) if available, and allow continued browsing of other chapters with functional navigation buttons
- **FR-028**: System MUST NOT crash when encountering missing or malformed YAML files
- **FR-029**: System MUST provide a GitHub Issues link allowing users to report content errors or missing information without exposing maintainer's email address

#### Mobile Navigation
- **FR-030**: System MUST provide a collapsible table of contents menu on mobile devices (screen width < 768px)
- **FR-031**: Mobile menu MUST be accessible via a hamburger icon button positioned alongside chapter navigation controls
- **FR-032**: Mobile menu MUST automatically close after user navigates to a chapter
- **FR-033**: Mobile menu MUST be closable by clicking the overlay, clicking the close button, or pressing ESC key
- **FR-034**: Chapter navigation buttons (previous/next) MUST be integrated with the hamburger menu button on mobile devices

#### Chapter Navigation Enhancement
- **FR-035**: System MUST provide previous/next chapter navigation buttons on all chapter pages, including under-construction pages
- **FR-036**: Chapter navigation MUST remain functional even when chapter content is unavailable or under construction
- **FR-037**: System MUST display traditional Diamond Sutra chapter names (e.g., "大乘正宗分第三") instead of generic numbering in navigation areas when available

#### Content Format Enhancement
- **FR-038**: System MUST support paragraph-by-paragraph detailed explanation format via `detailedExplanation` array containing original text, master's commentary, and vernacular translation for each paragraph
- **FR-039**: System MUST support `podcastTitle` field to display clearer podcast episode titles separate from generic chapter titles
- **FR-040**: System MUST render practice insights (`practiceInsights`) and commentary translations in Markdown format to support rich text formatting
- **FR-041**: System MUST collapse commentary original text by default while keeping translations visible to improve reading flow and reduce cognitive load

#### Visual Consistency
- **FR-042**: All chapter content sections (original text, commentary, practice insights, etc.) MUST use unified 1px border styling for visual consistency
- **FR-043**: Dark mode MUST ensure all text blocks, especially commentary sections, have sufficient contrast ratios to meet readability standards

### Key Entities

- **Sutra**: A complete Buddhist scripture collection containing:
  - Unique identifier (e.g., "diamond-sutra")
  - Title (Chinese and English)
  - Tradition/lineage
  - Translator attribution
  - Source documentation (e.g., CBETA reference)
  - Total number of chapters (e.g., 32 for Diamond Sutra, with chapter 0 as preface)
  - Description

- **Chapter**: A single chapter/section of a sutra containing:
  - Schema version
  - Sutra ID reference
  - Chapter number (can be 0 for preface) and title
  - Original text (classical Chinese)
  - Optional vernacular translation (modern Chinese) - when using simple format
  - Optional detailed explanation array (`detailedExplanation`) containing paragraph-by-paragraph:
    - Original text segment
    - Master's commentary (e.g., 六祖慧能註解)
    - Vernacular translation of the commentary
  - Annotations and commentary with sources (alternative format)
  - Practice insights and guidance (supports Markdown formatting)
  - Optional illustrations with descriptions
  - Optional podcast episode URL
  - Optional podcast title (`podcastTitle`) for clearer display
  - Optional source attribution (if differs from sutra-level attribution)

- **Theme Preference**: User's selected visual theme (light or dark mode), stored persistently in browser local storage

- **Navigation State**: Current sutra selection and current chapter position, enabling proper table of contents highlighting

---

## Review & Acceptance Checklist

### Content Quality
- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness
- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Scope is clearly bounded (Diamond Sutra with 33 chapters, mobile-responsive navigation)
- [x] Dependencies and assumptions identified

### Constitutional Alignment
- [x] Content Sanctity and Accuracy: FR-004 ensures source attribution
- [x] Pure and Undisturbed Experience: FR-021, FR-025 enforce performance and clean UX
- [x] Technological Consistency: (Implementation phase will enforce React + Chakra UI)
- [x] Structured and Scalable Content: FR-002, FR-005 enforce YAML structure and validation
- [x] Accessibility First: FR-020, FR-023, FR-024 enforce WCAG compliance

---

## Execution Status

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities clarified (5 questions answered)
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed

---

**Ready for Planning Phase** - This specification is complete and ready for the `/plan` command to generate the technical implementation plan.
