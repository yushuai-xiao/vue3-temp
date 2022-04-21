// 第一种方式：内联方式：内联方式使用较少，因为不方便管理
//    再引入样式前加上使用的loader，并且使用！分割
// import "css-loader!../css/style.css";
import "../css/style.css";
import "../css/title.less";

const divEl = document.createElement("div");
divEl.className = "title";
divEl.innerHTML = "你好啊,李银河";

document.body.appendChild(divEl);
