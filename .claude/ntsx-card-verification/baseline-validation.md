# Baseline Validation

Date: 2026-10-31
Workspace: D:/Developer/PowerApp/QLKho/canvas
Snapshot: D:/Developer/PowerApp/QLKho/.claude/ntsx-card-verification/baseline
Source files: 44 .pa.yaml; all copied before planning documents or app edits.

## Full-App Compile

Result: FAILED before any assistant-authored app YAML change.
Files validated: 44
Errors: 4

- Components/DialogAlert.pa.yaml(5,7): Custom input property of kind 'Event' requires a non-empty 'Default' formula.
- Components/DialogAlert.pa.yaml(11,7): Custom input property of kind 'Event' requires a non-empty 'Default' formula.
- Components/DialogAlertReject.pa.yaml(10,7): Custom input property of kind 'Event' requires a non-empty 'Default' formula.
- Components/DialogAlertReject.pa.yaml(16,7): Custom input property of kind 'Event' requires a non-empty 'Default' formula.

Inspection confirmed Default: = in those four existing Event declarations. No App-level diagnostic. Components are frozen and outside approved scope; do not fix, omit, or alter them to hide validation failure. Full-app compile success and coauthoring application cannot be claimed from this result.

## Scoped Baseline Compile Probe

A one-screen-only baseline directory was tested to determine whether the pre-existing component serialization blocker could be avoided without changing app files. It is not a valid replacement full-app test:
- Target screen alone: four missing Canvas Component errors (Header, NavSiderBar twice, DialogProccessing).
- Target plus its three exact unchanged component definitions: 123 binding diagnostics because other app state/screens are absent (e.g. colNavigationItems, varUserInPlant, scrNhapTuSanXuatForm). No files were changed to suppress these diagnostics.
- Conclusion: do not use an incomplete workspace to claim the app compiles or to apply changes. Preserve the complete 44-file workspace and report the four baseline component declaration blockers. This probe did not validate runtime or apply a changed screen.

## Tooling Boundary

- Python unavailable (Windows Store alias). No Python used.
- Node v24.16.0; .NET SDK 10.0.401 available.
- No yaml/js-yaml Node package installed. verify-cards.cjs is an explicit indentation/literal-scalar reader for the known Canvas export subset; it is NOT a replacement full YAML parser or the plugin acceptance validator. Official compile remains authority.
- apply_patch is neither an exposed tool nor an executable (`command -v apply_patch` empty). Available dedicated Write/Edit are used where permitted; no denied patch call is retried or invented.
- Plugin acceptance validator scripts/validate-canvas-acceptance.cs absent under the exact immutable plugin root. Required validator gate NOT RUN / unavailable, not PASS.
- Plugin source revision unavailable: installation is not a Git repository.
- Runtime interaction/evaluation NOT RUN; no browser tool or screenshot. No live deletion.

## Static Font Estimate

Windows System.Drawing Segoe UI 14px regular measured Xem chi tiết at 74px and Xóa at 24px. With provisional 20px icon, 8px icon gap and 16px horizontal padding, required widths estimate 118px and 68px. The 120px conservative narrow button budget is close; this is a desktop font estimate only, NOT proof of ModernButton DOM/icon sizing or rendered phone fit. Runtime verification remains required.
