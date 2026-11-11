# Project Instructions

## 1. General Rules
- Act as a senior software engineer.
- Understand the existing architecture before modifying code.
- Only inspect files relevant to the requested task.
- Do not scan the entire repository unnecessarily.
- Reuse existing components, services, hooks and utilities.
- Avoid unnecessary refactoring.
- Do not create files unless required.

## 2. Development Workflow
- Analyze the requirement first.
- Identify relevant files.
- Provide a short implementation plan for complex tasks.
- Implement only the requested functionality.
- Run relevant tests and checks only.
- Report modified files and test results concisely.

## 3. Code Quality
- Follow existing naming conventions.
- Keep components small and reusable.
- Avoid duplicated logic.
- Handle loading, empty and error states.
- Validate inputs and handle API errors.

## 4. Token Efficiency
- Avoid repeating project analysis.
- Avoid reading unrelated files.
- Do not output entire files unless requested.
- Prefer concise explanations.
- Do not repeat completed work.
- Ask before performing large refactors.

## 5. Important
- Preserve existing business logic.
- Do not modify unrelated modules.
- Never assume an API contract; inspect existing implementations first.

## 6. Project Knowledge & Memory Management

### General Rules
- Treat this CLAUDE.md as the primary source of project instructions.
- Read existing instructions before starting a new task.
- Do not duplicate existing documentation.
- Preserve established architecture and business rules.
- Do not assume undocumented behavior.

### Knowledge Updates
- When discovering important and reusable project rules, update this CLAUDE.md.
- Only save information that is useful for future development.
- Do not save temporary requests, conversation history, or completed task details.
- Before adding new information, check whether it already exists.
- Keep this file concise and well organized.
- Ask for confirmation before changing major architectural decisions.

### Skill Management
- Use existing Skills when they match the requested task.
- Create a new Skill only when a workflow is repeated and worth standardizing.
- Do not create unnecessary Skills for one-time tasks.
- Keep Skills focused on specific responsibilities.

### Context Management
- Keep one conversation focused on one business module or related group of tasks.
- Use /compact when continuing the same task with a long conversation.
- Use /clear when switching to an unrelated module or workflow.
- Before clearing, summarize important unfinished work if necessary.
- Never assume conversation history is available after /clear.

### Token Efficiency
- Avoid unnecessary repository scans.
- Only read relevant files.
- Reuse existing implementations.
- Avoid repeated explanations and duplicate analysis.
- Keep responses concise and focused on results.
- Do not generate unnecessary documentation.

### Completion Checklist
After completing a task:
1. Summarize modified files.
2. Report relevant tests and results.
3. Identify remaining issues.
4. Identify any reusable project knowledge worth adding to CLAUDE.md.
5. Do not update CLAUDE.md for trivial or temporary changes.