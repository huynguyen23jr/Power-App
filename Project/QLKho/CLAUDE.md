# QLKho - Hướng dẫn Claude Code

## 1. Tổng quan dự án

- Tên ứng dụng: QLKho.
- Nền tảng: Microsoft Power Apps Canvas App.
- Ngôn ngữ công thức: Power Fx.
- Phạm vi làm việc: Thư mục `QLKho/`.
- Nghiệp vụ: Quản lý kho. Các chức năng cụ thể phải được xác định từ source code thực tế.

## 2. Quy tắc bắt buộc

- Luôn đọc source code liên quan trước khi đề xuất hoặc chỉnh sửa.
- Chỉ làm việc trong `QLKho/` trừ khi người dùng yêu cầu khác.
- Không tự ý sửa code trong `VHSX/`.
- Không thay đổi logic nghiệp vụ khi chưa được yêu cầu.
- Không tự tạo tên control, collection, biến, datasource hoặc cột dữ liệu.
- Giữ nguyên cấu trúc YAML và cú pháp Power Fx hiện tại.
- Luôn trả lời và giải thích bằng tiếng Việt.
- Giữ nguyên tên hàm, thuộc tính và cú pháp kỹ thuật bằng tiếng Anh.

## 3. Quy tắc phát triển Power Fx

- Ưu tiên công thức đơn giản, dễ đọc và dễ bảo trì.
- Kiểm tra delegation khi sử dụng `Filter()`, `LookUp()`, `Search()` và `Sort()`.
- Kiểm tra validation và xử lý lỗi khi sử dụng `Patch()`, `SubmitForm()` hoặc `Remove()`.
- Hạn chế truy vấn dữ liệu không cần thiết.
- Không sử dụng `ClearCollect()` để thay thế truy vấn delegable nếu có nguy cơ thiếu dữ liệu.
- Không thay đổi cấu trúc dữ liệu nếu chưa được phê duyệt.
- Bảo đảm không làm mất dữ liệu hoặc gây cập nhật trùng.

## 4. Quy trình chỉnh sửa code

1. Xác định file, màn hình và control liên quan.
2. Đọc công thức hiện tại.
3. Kiểm tra các dependency.
4. Giải thích nguyên nhân của vấn đề.
5. Thực hiện thay đổi nhỏ nhất cần thiết.
6. Kiểm tra các công thức liên quan.
7. Tóm tắt những file đã thay đổi.
8. Hướng dẫn người dùng kiểm thử.

## 5. Review và tối ưu hiệu năng

Ưu tiên kiểm tra:

- App.OnStart và Screen.OnVisible.
- Gallery.Items và các công thức trong gallery.
- Các truy vấn dữ liệu lặp lại.
- Delegation và xử lý dữ liệu lớn.
- Hoạt động Patch, Refresh và ClearCollect.
- Thời gian tải màn hình và phản hồi thao tác.

Không đánh đổi tính chính xác của dữ liệu để cải thiện tốc độ.

## 6. Sử dụng Agent và Skill

Khi phù hợp, sử dụng:

- `powerapps-canvas`: Phát triển Canvas App.
- `powerapps-testing`: Phân tích và tạo test case.
- `powerapps-performance-review`: Đánh giá hiệu năng.
- `canvas-code-reviewer`: Review code.
- `canvas-performance-auditor`: Phân tích hiệu năng.
- `canvas-qa-reviewer`: Kiểm tra chất lượng.

Chỉ sử dụng các Agent/Skill thực sự cần thiết. Không bắt buộc chạy tất cả cho thay đổi nhỏ.

## 7. Định dạng kết quả

Luôn trình bày:

1. Tóm tắt vấn đề.
2. File, màn hình và control liên quan.
3. Nguyên nhân và giải pháp.
4. Code Power Fx trước/sau nếu có thay đổi.
5. Rủi ro hoặc ảnh hưởng đến logic.
6. Hướng dẫn kiểm thử.

Không khẳng định đã kiểm thử thành công nếu chưa thực thi test.

## 8. An toàn

- Không tự ý xóa dữ liệu.
- Không thay đổi kết nối datasource nếu chưa được yêu cầu.
- Không tự ý đổi tên control, biến hoặc collection.
- Không chỉnh sửa các file ngoài phạm vi nhiệm vụ.
- Khi chỉ được yêu cầu review, tuyệt đối không chỉnh sửa source code.