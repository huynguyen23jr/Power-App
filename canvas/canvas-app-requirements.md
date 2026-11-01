# Canvas App Original Request Contract

Contract version: 1
Target device: Responsive

## Original Request

Hãy chỉnh sửa giao diện tại màn hình **scrNhapTuSanXuat**.

**Yêu cầu:**
- CHỈ chỉnh sửa phần View hiển thị dữ liệu (danh sách/thẻ thông tin).
- Thiết kế lại layout hiển thị dữ liệu theo cấu trúc ảnh mẫu đính kèm.
- Mỗi bản ghi được hiển thị dưới dạng thẻ (Card), thông tin sắp xếp rõ ràng.
- Phía dưới mỗi thẻ bố trí 2 nút hành động nằm ngang:
  - **Xem chi tiết:** Bên trái, nền xanh lá, chữ trắng, có icon con mắt.
  - **Xóa:** Bên phải, nền trắng, viền xám, có icon thùng rác.
- Hai nút có kích thước cân đối, căn thẳng hàng và responsive trên điện thoại.
- Giữ nguyên các trường dữ liệu hiện đang hiển thị tại màn hình `scrNhapTuSanXuat`, không tự ý thêm hoặc bỏ trường.

**RÀNG BUỘC BẮT BUỘC:**
- CHỈ chỉnh sửa UI/Layout của phần View dữ liệu tại `scrNhapTuSanXuat`.
- GIỮ NGUYÊN 100% logic nghiệp vụ hiện tại.
- KHÔNG thay đổi công thức Power Fx, Items, OnSelect, OnVisible, OnChange hoặc các xử lý sự kiện hiện có.
- KHÔNG thay đổi DataSource, Filter, Search, Sort, Patch, Remove, Collect hoặc các biến.
- KHÔNG thay đổi chức năng của nút Xem chi tiết và Xóa.
- KHÔNG ảnh hưởng đến các thành phần khác trên màn hình hay các màn hình khác.
- KHÔNG viết lại hoặc tối ưu logic khi chưa được yêu cầu.

**Mục tiêu cuối cùng:**
Chỉ thay đổi cách trình bày dữ liệu của `scrNhapTuSanXuat` sao cho giống ảnh mẫu, đặc biệt là cấu trúc Card có 2 nút hành động ở phía dưới. Toàn bộ dữ liệu, công thức, sự kiện và chức năng phải hoạt động chính xác như trước khi chỉnh sửa.

## Approved Clarifications and Scope

The approved implementation plan is C:/Users/huyng/.claude/plans/nifty-tinkering-leaf.md. No reference image was actually received; implement textual requirements, not claimed image fidelity.

Only canvas/scrNhapTuSanXuat.pa.yaml, subtree con_ListNhapTuSanXuat, may change. All other app files and all text outside the subtree are frozen. App Changes: None. Editor State Changes: None. Layout-only formulas may change. Preserve verbatim scalar contents of gallery Items, all existing On* properties, six data-value Text formulas, total-row Text, both Delete Visible predicates, both device-group Visible predicates. The erroneous phone date prefix is deliberately unchanged. Preserve all six values and all four action controls inside the same gallery template and native ThisItem context. No additional data sources, state, receipts, event handlers, Refresh, Reset or business fixes. No real deletion and no app Save/Publish.

Retain original Delete eligibility; two actions are present only when Delete is eligible. Static traces establish formula preservation, NOT live operation or rendering. External delete success cannot be proved without running it, and must not be run. Missing acceptance-validator script and absent runtime evaluator remain explicit limitations, not fabricated PASS. Existing root-level overlays and filter layout are outside scope; do not restructure them to meet generic root-containment or mutation-receipt guidance.

Approved design: existing AutoLayout card, white/gray 1px border, 8px corners, 12px padding; gallery gutters 8px; six caption/value wrappers; captions desktop-only; body wraps at local usable width 560/900px into 1/2/3 columns; variable-height gallery, no WrapCount, exactly one direct card; value AutoHeight/Wrap and body row-max height budgets; two unchanged device action groups at bottom, 48px buttons, 8px gap, equal halves when Delete visible, optional 420px desktop footer cap. View Primary green RGBA(45,128,40,1), white text, Eye/IconBefore. Delete Outline gray border/text over white footer, Delete/IconBefore. Remove only empty decorative table header, action caption and divider after replacing layout references.

## Capability Inventory

| Requirement key | Original request clause | Capability family | Required outcome / scope | Required action(s) | Scenario(s) | Specialized contract mappings |
| --- | --- | --- | --- | --- | --- | --- |
| R01 | CHỈ chỉnh sửa phần View hiển thị dữ liệu (danh sách/thẻ thông tin). | Presentation / scope | Only con_ListNhapTuSanXuat subtree in one file | A01 | S01 | Scope=target-subtree |
| R02 | Thiết kế lại layout hiển thị dữ liệu theo cấu trúc ảnh mẫu đính kèm. | Presentation | Text-based approximation because attachment unavailable | A01 | S02 | Fidelity=text-only |
| R03 | Mỗi bản ghi được hiển thị dưới dạng thẻ (Card), thông tin sắp xếp rõ ràng. | Record list / identity | One card per existing native receipt, six fields | A01 | S03 | Fields=F01,F02,F03,F04,F05,F06 |
| R04 | Xem chi tiết: Bên trái, nền xanh lá, chữ trắng, có icon con mắt. | Existing detail navigation | Existing View buttons left in footer with required styling | A02 | S04,S05 | Identity=ThisItem.ID |
| R05 | Xóa: Bên phải, nền trắng, viền xám, có icon thùng rác. | Existing removal presentation | Existing Delete buttons right, eligibility unchanged | A03 | S06,S07,S08,S09 | Mutation=preservation-only |
| R06 | Hai nút có kích thước cân đối, căn thẳng hàng và responsive trên điện thoại. | Responsive presentation | 48px heights, equal widths, 8px gap, phone fit | A01,A02,A03 | S10,S11 | Layout=local-width |
| R07 | Giữ nguyên các trường dữ liệu hiện đang hiển thị, không tự ý thêm hoặc bỏ trường. | Record fields | Six original value controls and data Text scalars unchanged | A01 | S03,S12 | Fields=F01,F02,F03,F04,F05,F06 |
| R08 | CHỈ chỉnh sửa UI/Layout của phần View dữ liệu tại scrNhapTuSanXuat. | Presentation / scope | No changes outside allowed subtree | A01 | S01 | Scope=target-subtree |
| R09 | GIỮ NGUYÊN 100% logic nghiệp vụ hiện tại. | Regression preservation | No changed event/data/state formulas | A01,A02,A03 | S01,S04,S06,S07,S08,S09,S12 | Preservation=baseline |
| R10 | KHÔNG thay đổi công thức Power Fx, Items, OnSelect, OnVisible, OnChange hoặc các xử lý sự kiện hiện có. | Regression preservation | Only approved presentation formulas change | A01,A02,A03 | S01,S12 | Preservation=protected-scalars |
| R11 | KHÔNG thay đổi DataSource, Filter, Search, Sort, Patch, Remove, Collect hoặc các biến. | Regression preservation | Original source, search/date/category predicates and sort | A01 | S12,S13 | Source=production-receipts |
| R12 | KHÔNG thay đổi chức năng của nút Xem chi tiết và Xóa. | Existing actions | All four OnSelect and eligibility predicates unchanged | A02,A03 | S04,S05,S06,S07,S08,S09 | Preservation=event-and-gates |
| R13 | KHÔNG ảnh hưởng đến các thành phần khác trên màn hình hay các màn hình khác. | Scope | Other files and header/filter/menu/popups unchanged | A01 | S01 | Scope=target-subtree |
| R14 | KHÔNG viết lại hoặc tối ưu logic khi chưa được yêu cầu. | Scope / regression | No business refactoring, no new handlers/state/receipts | A01,A02,A03 | S01,S12 | Preservation=baseline |
| R15 | Chỉ thay đổi cách trình bày dữ liệu; Card có 2 nút phía dưới; dữ liệu/công thức/sự kiện/chức năng như trước. | Presentation / regression | Card footer plus exact invariant checks; runtime NOT RUN | A01,A02,A03 | S03,S04,S06,S07,S10,S12,S14 | Evidence=static-and-roundtrip |

## Stable Action Keys

- A01: Display/presentation of existing receipt list, including unchanged Items, fields and count; not a new data action.
- A02: Preserve existing View detail navigation, both device controls and native receipt record.
- A03: Preserve existing Delete, eligibility, confirmation/cancel/error behavior; no new mutation implementation and no runtime deletion.

## Stable Field Keys

- F01: ReceiptCode / lbl_ReceiptCode.Text, canonical human-readable identity; stable native key ThisItem.ID remains implicit and unchanged, not an added field.
- F02: ReceiptDate / lbl_ReceiptDate.Text.
- F03: StatusCode with existing workflow lookup/localization / lbl_StatusCode.Text.
- F04: Shift / lbl_Shift.Text.
- F05: ProductCategoryCode with existing VI lookup / lbl_LoaiSanPhamNhap_Row.Text.
- F06: TotalReceipt with original numeric formatting / lbl_TongNhap.Text.

## Stable Scenario Definitions

- S01: Baseline diff: only allowed subtree changes; all other 43 YAML files and outside-target bytes remain identical.
- S02: Textual visual design mapped; missing screenshot explicitly prevents exact image-match claim.
- S03: Each receipt card contains exactly all six original values, captions where originally effective, same bindings and native record context.
- S04: Eligible desktop View stores full ThisItem in varProductionReceiptDetail then navigates scrNhapTuSanXuatForm with CoverRight; same ID observed by detail source bindings.
- S05: Phone View has identical event and record identity; only the original phone group is visible.
- S06: Original eligible status and role show Delete; confirmed existing handler targets details ReceiptID=ThisItem.ID then the native parent record; static preservation only, not executed.
- S07: Cancel confirmation: no delete operations or processing-state change execute; source remains unchanged.
- S08: Ineligible role OR status: Delete hidden; View remains left/reachable and no handler is changed.
- S09: Existing IfError path still clears processing and notifies failure/success exactly as baseline; no stronger atomicity or persistence guarantee is claimed.
- S10: Gallery-local widths 320/375/390, narrower 288 ancestor-adjusted example, and desktop 1200: positive field/button widths, no horizontal card overflow; footer 48px high and 8px gap.
- S11: Body local width 559/560/899/900 and long text on phone/narrow non-phone/desktop: 1/2/3 columns, matching row-max budgets and content-driven heights.
- S12: Exact Items, all On*, six data Text, count Text, two Delete predicates and two device gates match baseline including comments/newlines.
- S13: Unchanged search StartsWith ReceiptCode, inclusive date >=, category equality, PlantCode scope, Created descending; no data-source sampling or seeding into live app.
- S14: Coauthoring round trip returns card structure and preserved bindings; compile succeeds; runtime and missing acceptance-validator are explicitly not claimed passed.
