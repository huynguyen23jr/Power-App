# VHSX - Hướng dẫn Claude Code

## 1. Tổng quan dự án

- Tên ứng dụng: VHSX.
- Nền tảng: Microsoft Power Apps Canvas App.
- Ngôn ngữ công thức: Power Fx.
- Phạm vi làm việc: Thư mục `VHSX/`.
- Nghiệp vụ: Phải xác định từ source code hiện có, không tự suy đoán chức năng.

## 2. Quy tắc bắt buộc

- Luôn phân tích cấu trúc ứng dụng trước khi sửa code.
- Chỉ làm việc trong `VHSX/` trừ khi được yêu cầu khác.
- Không tự ý chỉnh sửa `QLKho/`.
- Không thay đổi nghiệp vụ và luồng xử lý hiện tại khi chưa có yêu cầu.
- Giữ nguyên cú pháp Power Fx và cấu trúc source code.
- Không tự tạo tên screen, control, biến, collection hoặc datasource.
- Không tự ý thay đổi công thức liên quan đến nhiều màn hình.
- Luôn giải thích bằng tiếng Việt.

## 3. Phân tích Canvas App

Khi xử lý một tính năng:

1. Xác định màn hình liên quan.
2. Kiểm tra các control và thuộc tính.
3. Đọc công thức Power Fx.
4. Phân tích biến toàn cục, biến context và collection.
5. Kiểm tra datasource và dependency.
6. Xác định ảnh hưởng đến các màn hình khác.

Không chỉ đọc một công thức riêng lẻ nếu logic phụ thuộc vào nhiều control.

## 4. Quy tắc tối ưu Power Fx

- Hạn chế công thức trùng lặp.
- Kiểm tra các truy vấn `LookUp()` và `Filter()` thường xuyên.
- Sử dụng `With()` khi giúp công thức rõ ràng và tránh tính toán lặp.
- Cân nhắc delegation trước khi tối ưu.
- Tránh nạp dữ liệu không cần thiết vào collection.
- Không tự ý chuyển xử lý dữ liệu từ server sang client.
- Bảo đảm các hoạt động ghi dữ liệu có xử lý lỗi phù hợp.

## 5. Trải nghiệm người dùng

Khi review giao diện, đánh giá:

- Thời gian tải màn hình.
- Trạng thái loading.
- Tốc độ phản hồi khi nhấn nút.
- Thông báo lỗi và thành công.
- Validation dữ liệu nhập.
- Ngăn chặn thao tác gửi dữ liệu trùng lặp.
- Trạng thái hiển thị của gallery và form.
- Khả năng sử dụng trên thiết bị mục tiêu, nếu được xác định.

Chỉ đề xuất thay đổi UI khi có lợi ích rõ ràng.

## 6. Kiểm thử

Khi được yêu cầu test:

- Đọc logic thực tế để tạo test case.
- Kiểm tra trường hợp hợp lệ và không hợp lệ.
- Kiểm tra giá trị Blank và dữ liệu thiếu.
- Kiểm tra các nhánh điều kiện If/Switch.
- Kiểm tra lỗi khi truy vấn hoặc ghi dữ liệu.
- Xác định các thao tác có nguy cơ cập nhật trùng.
- Kiểm tra ảnh hưởng khi chuyển màn hình.

Phân biệt rõ:
- Lỗi xác nhận từ code.
- Lỗi nghi ngờ cần kiểm chứng.
- Test đã chạy.
- Test chưa chạy.

## 7. Sử dụng Agent và Skill

Có thể sử dụng:

- `powerapps-canvas` để phát triển và sửa lỗi.
- `powerapps-testing` để phân tích test case.
- `powerapps-performance-review` để tối ưu hiệu năng.
- `canvas-code-reviewer` để kiểm tra kiến trúc.
- `canvas-performance-auditor` để phát hiện điểm nghẽn.
- `canvas-qa-reviewer` để review logic và validation.

Ưu tiên giao nhiệm vụ review độc lập cho Subagent khi cần.

## 8. Quy trình thay đổi

1. Đọc source code liên quan.
2. Xác định logic và dependency.
3. Đề xuất giải pháp phù hợp.
4. Chỉnh sửa khi người dùng yêu cầu.
5. Kiểm tra ảnh hưởng sau chỉnh sửa.
6. Tóm tắt file đã thay đổi.
7. Hướng dẫn kiểm thử trên Canvas App.

## 9. Định dạng phản hồi

- Tóm tắt.
- Vấn đề phát hiện.
- Nguyên nhân.
- Giải pháp đề xuất.
- Code trước/sau.
- Rủi ro.
- Cách kiểm thử.

Không báo kết quả performance hoặc test là thành công nếu chưa có bằng chứng thực tế.

## 10. An toàn

- Không tự ý sửa ứng dụng khác.
- Không xóa dữ liệu hoặc cấu hình datasource.
- Không thay đổi nghiệp vụ ngoài yêu cầu.
- Không thực hiện thao tác phá hủy dữ liệu.
- Khi chỉ được yêu cầu review, giữ nguyên toàn bộ source code.