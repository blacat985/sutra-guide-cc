<!--
SYNC IMPACT REPORT
==================
Version Change: [Initial Version] → 1.0.0
Rationale: Initial constitution ratification with 5 core principles for Sutra Guide project

Modified Principles: N/A (initial creation)
Added Sections:
  - Core Principles (5 principles)
  - Technical Standards
  - Development Workflow
  - Governance

Removed Sections: N/A

Templates Status:
  ✅ .specify/templates/plan-template.md - Reviewed, constitution check alignment confirmed
  ✅ .specify/templates/spec-template.md - Reviewed, no changes needed
  ✅ .specify/templates/tasks-template.md - Reviewed, no changes needed
  ⚠ README.md - Does not exist, will be created by user when needed

Follow-up TODOs: None
-->

# Sutra Guide Constitution

## Core Principles

### I. Content Sanctity and Accuracy

All sutra texts, translations, annotations, and inspirational content MUST be treated with the highest standards of rigor and reverence. Content sources MUST be verifiable and documented. Any interpretation MUST cite its source or explicitly state its perspective to avoid personal speculation.

**Rationale**: The integrity of Buddhist teachings is paramount. Users rely on accurate, sourced content for spiritual practice and study. This principle supersedes all technical and design considerations.

**Non-negotiable rules**:
- Every sutra text MUST include source attribution
- Translations MUST identify translator and tradition
- Commentaries MUST cite lineage or scholarly source
- Personal interpretations MUST be explicitly labeled as such
- NO content may be added without verifiable source documentation

### II. Pure and Undisturbed Experience

The user interface (UI) and user experience (UX) MUST maintain simplicity, purity, and focused attention. The platform MUST NOT include any intrusive advertising, unrelated pop-up windows, or distracting animations that scatter the user's reading attention. Performance MUST be optimized to ensure rapid and smooth page loading.

**Rationale**: Buddhist practice requires sustained attention and mental clarity. A cluttered or slow interface disrupts meditation, study, and contemplation.

**Non-negotiable rules**:
- NO third-party advertising or tracking scripts
- NO modal dialogs except for critical user actions
- NO auto-playing media or animations
- Page load time MUST be under 2 seconds on standard connections
- Interactive elements MUST not interfere with reading flow

### III. Technological Consistency

Frontend development MUST follow the defined technology stack: React with Chakra UI. All new features or components MUST be implemented based on this framework. Design style MUST strictly follow Design Tokens defined in `constitution.yml`, and component implementation MUST be specified through `specify.yml`.

**Rationale**: Consistent technology choices enable maintainability, reduce cognitive load for contributors, and ensure design coherence across the platform.

**Non-negotiable rules**:
- ALL UI components MUST use Chakra UI
- Custom components MUST extend Chakra UI primitives
- Design tokens from `constitution.yml` MUST NOT be overridden inline
- Component specifications in `specify.yml` MUST be followed for all implementations
- NO alternative UI frameworks or component libraries may be introduced

### IV. Structured and Scalable Content

All sutra content files MUST be stored in structured YAML format. File structure MUST remain consistent to facilitate frontend parsing and future batch expansion and maintenance of content.

**Rationale**: Structured content enables programmatic validation, version control, multi-format output, and community contributions while maintaining quality standards.

**Non-negotiable rules**:
- ALL sutra content MUST be stored as YAML files
- YAML schema MUST be versioned and validated on commit
- File naming conventions MUST follow pattern: `{tradition}/{collection}/{sutra-id}.yml`
- Content structure MUST include: metadata, source text, translation(s), optional commentary
- Schema changes MUST be backward-compatible or include migration tooling

### V. Accessibility First

Website design and development MUST comply with WCAG (Web Content Accessibility Guidelines) standards to ensure that users with visual, auditory, or mobility impairments can access all content without barriers. This includes but is not limited to: sufficient color contrast ratios, keyboard operability, and screen reader support.

**Rationale**: The dharma should be accessible to all beings regardless of physical ability. Digital accessibility is both a moral imperative and often a legal requirement.

**Non-negotiable rules**:
- ALL pages MUST meet WCAG 2.1 Level AA standards minimum
- Color contrast ratios MUST meet 4.5:1 for normal text, 3:1 for large text
- ALL interactive elements MUST be keyboard-navigable
- ALL images MUST have descriptive alt text or aria-labels
- Screen reader testing MUST be part of acceptance criteria for UI changes

## Technical Standards

### Code Quality Requirements

- ALL commits MUST pass linting and formatting checks
- ALL new components MUST include unit tests
- ALL accessibility features MUST be verified with automated and manual testing
- NO console errors or warnings in production builds
- Code reviews MUST verify constitution compliance

### Performance Standards

- Initial page load MUST be under 2 seconds (3G connection)
- Time to Interactive (TTI) MUST be under 3.5 seconds
- Largest Contentful Paint (LCP) MUST be under 2.5 seconds
- Core Web Vitals MUST all be in "Good" range
- Bundle size increases require explicit justification

### Content Validation

- YAML content MUST be validated against schema on commit
- Source attributions MUST be verified before merge
- Translation quality MUST be reviewed by qualified reviewers
- Content changes MUST include reviewer approval in commit message

## Development Workflow

### Planning Phase

1. ALL features MUST begin with a feature specification in `/specs/`
2. Specifications MUST verify constitutional compliance before technical planning
3. Design decisions MUST reference applicable principles
4. Implementation plans MUST include accessibility and performance considerations

### Implementation Phase

1. Tests MUST be written before implementation (TDD)
2. Components MUST be developed against Design Token specifications
3. Accessibility testing MUST occur during development, not after
4. Performance budgets MUST be monitored on every build

### Review Phase

1. Pull requests MUST include constitutional compliance checklist
2. Accessibility audits MUST be run and results attached
3. Content changes MUST be reviewed by subject matter experts
4. Performance impacts MUST be measured and documented

## Governance

### Amendment Process

This constitution may be amended through the following process:
1. Proposed changes MUST be documented with rationale
2. Impact analysis MUST identify affected code, content, and workflows
3. Review period MUST allow stakeholder feedback (minimum 7 days)
4. Approval requires consensus among project maintainers
5. Migration plan MUST be created for breaking changes

### Versioning Policy

Constitution versions follow semantic versioning:
- **MAJOR**: Principle removal or incompatible changes to governance
- **MINOR**: New principles added or significant expansions
- **PATCH**: Clarifications, wording improvements, non-semantic changes

### Compliance Review

- Constitutional compliance MUST be verified at each PR review
- Quarterly audits MUST assess codebase alignment with principles
- Violations MUST be documented in issue tracker with remediation plan
- Repeat violations require architectural review and refactoring

### Living Document

This constitution is a living document that evolves with the project. All amendments MUST maintain the spirit of serving the dharma through technology while upholding the highest standards of accuracy, accessibility, and user experience.

**Version**: 1.0.0 | **Ratified**: 2025-10-05 | **Last Amended**: 2025-10-05
