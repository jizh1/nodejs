function toggleUploadForm() {
  var uploadForm = document.getElementById("upload-form");
  if (uploadForm.style.display === "none") {
    uploadForm.style.display = "block";
  } else {
    uploadForm.style.display = "none";
  }
}

const form = document.getElementById("form");
const gridItems = document.querySelectorAll(".grid-item");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const file = this.elements.img.files[0];
  const reader = new FileReader();

  reader.onloadend = function() {
    const img = document.createElement("img");
    img.src = reader.result;
    const gridItem = Array.from(gridItems).find(item => !item.innerHTML);
    gridItem.appendChild(img);
    toggleUploadForm();
  }

  reader.readAsDataURL(file);
});


document.addEventListener('DOMContentLoaded', init)
function init(){
const profileForm = document.getElementById('profile-form');
const avatarPreview = document.getElementById('avatar-preview');
/*
profileForm.addEventListener('submit', async event => {
  event.preventDefault();

  // 获取表单数据
  const formData = new FormData(profileForm);

  // 发送请求保存表单数据和头像到服务器
  try {
    const response = await fetch('/profile', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    console.log(22)

    // 显示成功提示信息
    alert(result.message);

    // 更新头像预览
    avatarPreview.src = result.avatarUrl;
  } catch (error) {
    console.error(error);
    alert('wrong');
  }
});

}
*/
function updatePreview(event) {
  avatarPreview.src = window.URL.createObjectURL(file);
  const file = event.target.files[0];
  const preview = document.getElementById('image-preview');
  preview.src = window.URL.createObjectURL(file);
}
function chooseFile() {
  //document.getElementById('file-input').click();
}

// 提交表单事件处理函数
/*
function save() {
  const preview = document.getElementById('image-preview');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = preview.naturalWidth;
  canvas.height = preview.naturalHeight;

  ctx.drawImage(preview, 0, 0);

  const dataURL = canvas.toDataURL();

  // 获取表单数据
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    Mobiltelefon: document.getElementById('Mobiltelefon').value,
    adress: document.getElementById('adress').value,
    password: document.getElementById('password').value,
  };

  // 保存头像数据和表单数据到本地存储
  localStorage.setItem('avatar', dataURL);
  Object.keys(formData).forEach(key => {
    localStorage.setItem(key, formData[key]);
  });

  // 显示成功提示信息
  alert('!!！');

  // 手动更新页面
  if (localStorage.getItem('avatar')) {
    document.getElementById('image-preview').src = localStorage.getItem('avatar');
  }



}
*/document.getElementById('avatar').addEventListener('click', () => {
  document.getElementById('avatar-input').click();
});}
