function imgList(state, length) {
	var imgs = $("#imgList");
	var video = $("#video")
	if (state == 0) {
		for (var i = 0; i < length; i++) {
			imgs.append("<li><img src='img/2.png' /></li>");
		}
	} else {
		video.append("	<video class='video' src=''></video><a href=''><img class='button' src=''/></a>")
	}
	$("#imgList>li img").addClass("imglist");
}

$(function() {
	var descOne = $(".content").text();
	if (descOne.length > 0) {
		descOne = descOne;
	} else {
		descOne = "挥杆伴侣——让高尔夫运动变得如此简单";
	}
	var imgurlOne;
	if ($("#imgList").length > 0) {
		imgurlOne = $(".imglist").first().attr("src");

	} else {
		imgurlOne = $(".videoTwo").attr("poster");
	}

	var shareInfo = {
		title: '',
		desc: descOne,
		imgurl: imgurlOne,
		link: window.location.href
	};

	$.getJSON("http://123.56.130.82/hgbl-wechat/weixin/share", {
			'url': window.location.href.split('#')[0]
		},
		function(data) {
			wx.config({
				debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId, // 必填，公众号的唯一标识
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.nonceStr, // 必填，生成签名的随机串
				signature: data.signature, // 必填，签名，见附录1
				jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage'
					] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});

			wx.ready(function() {
				//分享到朋友圈
				wx.onMenuShareTimeline({

					title: shareInfo.title, // 分享标题
					link: shareInfo.link, // 分享链接
					imgUrl: shareInfo.imgurl, // 分享图标
					success: function() {
						// 用户确认分享后执行的回调函数
						alert("分享成功！");
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
						alert("分享失败！");

					}
				});

				//分享给朋友

				wx.onMenuShareAppMessage({
					title: shareInfo.title, // 分享标题
					desc: shareInfo.desc, // 分享描述
					link: shareInfo.link, // 分享链接
					imgUrl: shareInfo.imgUrl, // 分享图标
					//				type: '', // 分享类型,music、video或link，不填默认为link
					//				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户确认分享后执行的回调函数
						alert("分享成功！");
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
						alert("分享失败！");
					}
				});

			});

			// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		});



});