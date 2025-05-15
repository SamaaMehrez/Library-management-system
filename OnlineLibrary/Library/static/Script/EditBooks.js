document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('edit-book-cover');
    const previewContainer = document.getElementById('current-cover-preview');

    if (imageInput && previewContainer) {
        imageInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewContainer.innerHTML = `<img src="${e.target.result}" alt="معاينة الغلاف" width="100">`;
                };
                reader.readAsDataURL(file);
            } else {
                previewContainer.innerHTML = '';
            }
        });
    }

    const form = document.getElementById('edit-book-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            const bookName = document.getElementById('edit-book-name').value.trim();
            const author = document.getElementById('edit-author').value.trim();
            const description = document.getElementById('edit-description').value.trim();

            if (!bookName || !author || !description) {
                alert("يرجى ملء جميع الحقول المطلوبة.");
                event.preventDefault(); // إلغاء إرسال النموذج
            }
        });
    }
});

