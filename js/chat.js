var ws = new WebSocket("ws://47.106.142.49:8183/chat/websocket");
// 监听服务端连接状态
ws.onopen = function() {
	console.log("connect success!")
}
// 监听服务端给我回调的消息
ws.onmessage = function(d) {

	//判断是否json字符串
	if (isJsonStr(d.data)) {
		var obj = JSON.parse(d.data);
		if (obj.type == '163music') {
			var ul = document.getElementById("chatUl");
			ul.innerHTML = ul.innerHTML + "<li role='bot' class='music'><p>" + obj.songName + "</p><img src='" + obj.songPic +
				"'/><a target='_blank' href='" + obj.url + "'>点击播放</a></li>";
		}
	} else {
		var ul = document.getElementById("chatUl");
		ul.innerHTML = ul.innerHTML + "<li role='bot'>" + d.data + "</li>";
	}
	toBottom();
}

var input = document.getElementById("sendInput");
input.onkeydown = function(event) {
	if (event.keyCode == 13) {
		// 向服务端发信息
		sendMessage();
	}
}

var sendBtn = document.getElementById("sendBtn");
sendBtn.onclick = function() {
	// 向服务端发信息
	sendMessage();
}

function sendMessage() {
	// 获取输入框的值
	var sendInput = document.getElementById("sendInput");
	if (sendInput.value.trim() == '') {
		alert("请输入内容");
		sendInput.value = "";
		return;
	}
	// 生成li代码到ul下
	var ul = document.getElementById("chatUl");
	ul.innerHTML = ul.innerHTML + "<li role='me'>" + sendInput.value + "</li>";
	// 将内容 发送给服务端
	ws.send(sendInput.value);
	// 把输入框内容清空
	sendInput.value = "";
	//让滚动条自动滚到最底部
	toBottom();
}

function toBottom() {
	//让滚动条自动滚到最底部
	var h = document.body.scrollHeight; // DOM编程
	window.scrollTo(0, h); // BOM编程
}

function isJsonStr(s) {
	try {
		if (typeof s == 'string') {
			var obj = JSON.parse(s);
			if (typeof obj == 'object') {
				return true;
			}
			return false;
		}
		return false;
	} catch (err) {
		return false;
	}

}
