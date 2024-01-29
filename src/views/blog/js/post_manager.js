//xử lý tag
const Tags = [];

function addYourTag() {
    console.log("add tag ...");
    const data = document.getElementById("tags").value
    if (data != "") {
        Tags.push(data)
        console.log(Tags)
            //lấy thẻ bao của các thẻ span ứng với tag
        const lisTags = document.getElementById("listTag")
            //tạo thẻ span mới
        const spanTag = document.createElement('span')
        spanTag.className = "badge text-bg-secondary my-tag"
        spanTag.textContent = document.getElementById("tags").value //gán giá trị tag bằng thẻ mới nhập vào
        lisTags.appendChild(spanTag) //thêm vào cha
        document.getElementById("tags").value = null
    }
    //gán giá trị cuối cùng của mảng tag vào input để chuẩn bị submit form
    document.getElementById("tagsData").value = Tags
    console.log(document.getElementById("tagsData").value)
}

function resetYourTag() {
    console.log("reset ...")
    const listTags = document.getElementById("listTag");
    //- console.log(listTags)
    if (listTags.lastChild != null) {
        Tags.pop()
        listTags.removeChild(listTags.lastChild)
    }
    console.log(Tags)
    document.getElementById("tagsData").value = Tags
    console.log(document.getElementById("tagsData").value)
}

function handleKeyPress(event) {
    // Kiểm tra nếu phím được nhấn là "Enter"
    if (event.key === "Enter") {
        // Thực hiện xử lý tại đây
        console.log("Enter key pressed");
        addYourTag()
            // Ngăn chặn hành động mặc định của phím "Enter" trong form
        event.preventDefault();
    }
}

//xử lý submit create_post
// document.getElementById("createPostAction").addEventListener("submit", function(event) {
//     // Ngăn chặn gửi form để bạn có thể xem giá trị đã được đặt trước khi gửi
//     vent.preventDefault();
// })

document.getElementById("createPostAction").addEventListener("submit", function(event) {
    // Ngăn chặn gửi form để bạn có thể xem giá trị đã được đặt trước khi gửi
    vent.preventDefault();
})

//xử lý Ckeditor
document.addEventListener('DOMContentLoaded', function() {
    ClassicEditor
        .create(document.querySelector('#content'), {
            // Các tùy chọn của CKEditor
        })
        .catch(error => {
            console.error(error);
        });
});

// Xử lý xoá bài đăng
function confirmAndDelete(postId, postTitle) {
    var result = confirm(`Bạn có chắc chắn muốn xoá post: "${postTitle}"? Thao tác này sẽ không thể khôi phục.`);
    if (result) {
        fetch(`/post/delete/${postId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Delete successful:", data);
                // Xử lý sau khi xóa thành công (nếu cần)
                //- alert("Đã xoá thành công!");
                window.location.href = `/post/manager`;
            })
            .catch(error => {
                console.error('Error:', error);
                // Xử lý lỗi (nếu cần)
            });
    }
}

// xử lý tính năng chỉnh sửa bài đăng
function editPost(postId) {
    fetch(`/post/detail/${postId}`, {
            method: 'get',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("data:", data);
            // Xử lý sau khi xóa thành công (nếu cần)
            //- alert("Đã xoá thành công!");
        })
        .catch(error => {
            console.error('Error:', error);
            // Xử lý lỗi (nếu cần)
        });
}