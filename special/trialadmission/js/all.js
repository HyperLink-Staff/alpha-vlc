$(window).on('load',function(){
	setTimeout(function(){
		$(".loading").fadeOut();
		sec01();
	},1000);

});

// 2021/12/22
var $subtitles = $('#subtitles');
var $shareCopy = $('#share-copy');
var isEnded = false;
// 字幕
var subtitles = [
	'Welcome to the trial admission of the Mage\nTraining Academy, Night Raven College.\nI am the Headmage Dire Crowley.',
	'Now, please hold your invitation up to\nthe light.'
	// 'Are you ready? Our standard admission process would see the Dark Mirror assign you to a dorm that resonates with your soul...but this is a trial admission.',
	// 'In this particular case, I shall use my own magic to assign you to the appropriate dorm. Kind of me, don\'t you think?',
	// 'As this is not an official admission ritual, please refrain from complaining should you be dissatisfied with your dorm assignment.',
	// 'Here we go.\nOne... Two... Three...',
	// 'A keyhole connecting to the gates of Night Raven College appears on your invitation.',
	// 'Now, reach into the light and take hold of the invitation. Which destination shall your soul be drawn to?'
];

var clipboard = new ClipboardJS('[data-clipboard-text]');

clipboard.on('success', function (e) {
	setTooltip(e.trigger);
});

function setTooltip(el) {
  el.classList.add('md_tooltip');
  el.addEventListener('mouseleave', clearTooltip);
  el.addEventListener('blur', clearTooltip);
}

function clearTooltip(e) {
  const el = e.currentTarget;
  el.classList.remove('md_tooltip');
  el.removeEventListener('mouseleave', clearTooltip);
  el.removeEventListener('blur', clearTooltip);
}

function nl2br(str) {
	return str.replace(/\r?\n/g, '<br>');
}

function nl2sanitize(str) {
	return str.replace(/\n/g, '')
}

function audioUpdate(e) {
	if (e.currentTarget) {
		var target = e.currentTarget;
		if (($subtitles).is(':hidden') && !isEnded) {
			$subtitles.show();
		}
		if (target.getAttribute('id') === 'bgm') {
			updateBgm(target.currentTime);
		}
	}
}

function updateBgm(currentTime) {
	if (currentTime > 3.5 && currentTime < 17) {
		if ($subtitles.text() !== nl2sanitize(subtitles[0])) {
			$subtitles.html(nl2br(subtitles[0]))
		}
	} else if (currentTime > 17 && currentTime < 21.5) {
		if ($subtitles.text() !== nl2sanitize(subtitles[1])) {
			$subtitles.html(nl2br(subtitles[1]))
		}
	} else if (currentTime > 21.5) {
		isEnded = true;
		audioEnded();
	}
}

function audioEnded(isFadeOut) {
	isFadeOut = isFadeOut || true;
	isFadeOut ? $subtitles.fadeOut() : $subtitles.hide();
}

var $audio = $('#bgm').get(0);
var audio_flag = false;
var skip03 = false;
$audio.volume = 1;
$('.voice-play').on('click', function (){
	if(audio_flag == false){
		$audio.addEventListener('timeupdate', audioUpdate, false);
		$audio.play();
	}
	audio_flag = true;
});
$('#sec-violet02 .skip').on('click', function (){
	voicemute();
	isEnded = true;
	audioEnded();
});
$('#sec-violet02 .skip').on('touchstart', function(event) {
	voicemute();
	isEnded = true;
	audioEnded();
});


$(document).ready(function() {
	//ボタンの光
	$('.flashing')
		.velocity({opacity:['1', '0.4']
		}, { easing: 'easeInOut' , duration:1000 , loop: true});


   	//音声再生
    var flag0 = false;
	$('.voice-play').on('touchstart click', function(event) {
	  	if(flag0 == false){
		    var video5 = document.getElementById('movie05');
			video5.muted = false;
			var video4 = document.getElementById('movie04');
			video4.muted = false;
		}
	});
   	var flag = false;
	$('.to-sec02.on').bind('touchstart click', function(event) {
	  	if(flag == false){
		    sec02();
	    	setTimeout(function(){
				var sec02cardtop = $('#sec-violet02 .sec-violet02-contents-card').offset();
				$('.sec-violet03-contents-card').css('top', sec02cardtop.top);
			},2250);
	    	setTimeout(function(){
				sec02_2nd();
			},2200);
			setTimeout(function(){
				if(skip03 != true){
					sec03();
				}
			},22500);
			flag = true;
		}
	});
	$('.to-sec02.off').bind('touchstart click', function (event) {
		window.location.href = "http://disneytwistedwonderland.com/";
	});


    //2画面目、スキップ処理
    var flag2 = false;
	$('#sec-violet02 .skip a').on('touchstart click', function(event) {
	  if(flag2 == false){
	    $("#sec-violet02").hide();
    	$("#sec-violet03").show();
    	//スキップフラグ
    	$("#sec-violet03").addClass('displaynone');
    	skip03 = true;
    	setTimeout(function(){
    		sec03();
    	},100);
	  }
	});

    //3画面目、カードタップ
    var flag3 = false;
    var flag3_sc = false;

    var ua = navigator.userAgent;
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
		$('.sec-violet03-contents-card-img').on('touchstart', function(event) {
		  if (flag3 == false) {
		    sec04();
		    flag3 = true;
		  }
		});
	}else{
		$('.sec-violet03-contents-card-img').on('touchstart click', function(event) {
		  if(flag3 == false){
		    sec04();
		    flag3 = true;
		  }
		});
	}
	$('.sec-violet03-contents-card-img').scroll(function() {
	//$(window).scroll(function() {
	    if (flag3_sc == false) {
		    sec04();
		    flag3_sc = true;
		}
	});


	//4画面目、スキップ処理
    var flag4 = false;
	$('#sec-violet04 .skip a').on('touchstart click', function(event) {
	  if(flag4 == false){
	    $("#sec-violet04").hide();
    	$("#sec-violet05").css('display','flex');
    	setTimeout(function(){
    		sec05();
    		$('.sec-violet04-contents-movie video').remove();
    	},100);
    	flag4 = true;
	  }
	});

	//5画面目、スキップ処理
	var flag5 = false;
	$('#sec-violet05 .skip a').on('touchstart click', function (event) {
		if (flag5 == false) {
			$("#sec-violet05").hide();
			$("#sec-violet06").show();
			setTimeout(function () {
				sec06();
				$('.sec-violet05-contents-movie video').remove();
			}, 100);
			flag5 = true;
		}
	});
});


function voicemute(){
	$audio.pause();
	$audio.currentTime = 0;
}


function sec01(){
	$('#sec-violet01 .ttl')
		.delay(800)
		.velocity({opacity: [1, 0], top: ['0', '56']
		}, { easing: 'easeInOut' , duration:1000 });
	$('#sec-violet01 .logo')
		.delay(1000)
		.velocity({opacity: [1, 0], top: ['0', '56']
		}, { easing: 'easeInOut' , duration:1000 });
	$('#sec-violet01 .txt')
		.delay(1200)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:1400 });
	$('#sec-violet01 .btn-area-01')
		.delay(1400)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:1400 });
}

function sec02(){
	$('#sec-violet01 .btn-area-01')
		.delay(0)
		.velocity({opacity: [0, 1]
		}, { easing: 'easeInOut' , duration:500 });
	$('#sec-violet01 .txt')
		.delay(300)
		.velocity({opacity: [0, 1]
		}, { easing: 'easeInOut' , duration:500 });
	$('#sec-violet01 .logo')
		.delay(600)
		.velocity({opacity: [0, 1]
		}, { easing: 'easeInOut' , duration:500 });
	$('#sec-violet01')
		.delay(800)
		.velocity({opacity: [0, 1]
		}, { easing: 'easeInOut' , duration:500 });

	setTimeout(function(){
		$("#sec-violet01").hide();
		$("#sec-violet02").css('display','flex');
	},2200);
	$('#sec-violet02 .skip')
		.delay(2250)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:1400 });
}
function sec02_2nd(){
	$('.sec-violet02-chara')
		.delay(0)
		.velocity({opacity: [0.8, 0]
		}, { easing: 'easeInOut' , duration:2000 });
	$('.sec-violet02-chara')
		.delay(10000)
		.velocity({opacity: [0, 0.7]
		}, { easing: 'easeInOut' , duration:4000 });
	$('#sec-violet02 .sec-violet02-contents-card')
		.delay(14000)
		.velocity({ opacity: [1, 0] }, { duration: 6000, easing: "easeInOut"});
	$('#sec-violet02 .skip')
		.delay(14000)
		.velocity({ opacity: [0, 1] }, { duration: 4000, easing: "easeInOut" });
	setTimeout(function(){
		$("#sec-violet02").hide();
	    $("#sec-violet03").show();
	},20000);
}

function sec03(){
    $('.sec-violet03-contents-movie video')[0].play();
	$('.sec-violet03-contents-arrow-item')
		.velocity({top:['10', '-10']
			}, { easing: 'easeInOut' , duration:1000 , loop: true});
	var sec03cardtop = $('.sec-violet03-contents-card').offset();
	//var cardh = $('.sec-violet03-contents-card').height();
	var contentsh = $('.sec-violet03-contents').height();
	var cardp =  contentsh + 100;
	$('.sec-violet03-contents-card')
		.delay(100)
		.velocity({top: [cardp, sec03cardtop.top]
		}, { easing: 'easeInOut' , duration:2000 });
	var ua = navigator.userAgent;
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
	  	$('.sec-violet03-contents-card .card-item-card img')
			.delay(100)
			.velocity({width: [120, 260]
			}, { easing: 'easeInOut' , duration:2000 });
		$('.sec-violet03-contents-card .card-item-shadow img')
			.delay(100)
			.velocity({width: [250, 580]
			}, { easing: 'easeInOut' , duration:2000 });//スマホの場合の処理
	} else {
	  	$('.sec-violet03-contents-card .card-item-card img')
			.delay(100)
			.velocity({width: [180, 360]
			}, { easing: 'easeInOut' , duration:2000 });
		$('.sec-violet03-contents-card .card-item-shadow img')
			.delay(100)
			.velocity({width: [401, 802]
			}, { easing: 'easeInOut' , duration:2000 });
	}
	$('.sec-violet03-contents-movie')
		.delay(1000)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:1400 });
	$('.sec-violet03-contents-arrow')
		.delay(1200)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:1400 });
}
function sec04(){
	var sec03cardtop = $('.sec-violet03-contents-card').offset();
	$('.sec-violet03-contents-card')
		.delay(0)
		.velocity({top: [80, sec03cardtop.top]
		}, { easing: 'easeInOut' , duration:1000 });

	var ua = navigator.userAgent;
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
	  	$('.sec-violet03-contents-card .card-item-card img')
			.delay(100)
			.velocity({width: [80, 120]
			}, { easing: 'easeInOut' , duration:1000 });
		$('.sec-violet03-contents-card .card-item-shadow img')
			.delay(100)
			.velocity({width: [120, 250]
			}, { easing: 'easeInOut' , duration:1000 });//スマホの場合の処理
	} else {
	  	$('.sec-violet03-contents-card .card-item-card img')
			.delay(100)
			.velocity({width: [100, 180]
			}, { easing: 'easeInOut' , duration:1000 });
		$('.sec-violet03-contents-card .card-item-shadow img')
			.delay(100)
			.velocity({width: [230, 401]
			}, { easing: 'easeInOut' , duration:1000 });
	}
	$('#sec-violet03')
		.delay(500)
		.velocity({opacity: [0, 1]
		}, { easing: 'easeInOut' , duration:1000 });
	$('.sec-violet04-contents-movie')
		.delay(1500)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:1400 });
	$('.sec-violet04-contents .skip')
		.delay(1700)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:1400 });
	setTimeout(function(){
		//$("#jquery_jplayer").jPlayer("stop");
		$("#sec-violet03").hide();
		$("#sec-violet03").addClass('displaynonetrue');
	    $("#sec-violet04").css('display','flex');
	    $('.sec-violet04-contents-movie video')[0].play();
	},1500);
	//動画終了後の処理
	var video = $(".sec-violet04-contents-movie video")[0];
	video.addEventListener("ended", function() {
		$('#sec-violet04')
			.delay(0)
			.velocity({opacity: [0, 1]
			}, { easing: 'easeInOut' , duration:1000 });
		setTimeout(function(){
			$("#sec-violet04").hide();
			var ua = navigator.userAgent;
			if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    			$("#sec-violet05").css('display','block');
    		}else{
    			$("#sec-violet05").css('display','flex');
    		}
    		sec05();
		},1000);
	});
}
function sec05(){
	//ランダム抽選数字0〜6
	var random = Math.floor( Math.random() * 7);
	//var random = 0;
	//動画
	$('.sec-violet05-contents-movie video').attr('src','./movie/chara' + random + '.mp4?ver1');
	//ogp画像
	$('.ogp img').attr('src','./img/ogp/ogp' + random + '.png');

	// シェア関連
	var shareData = {
		0: {
			text: 'You are part of...Diasomnia Dorm #twsten #twistedwonderland',
			url: 'https://disneytwistedwonderland.com/special/trialadmission/diasomnia.html'
		},
		1: {
			text: 'You are part of...Heartslabyul Dorm #twsten #twistedwonderland',
			url: 'https://disneytwistedwonderland.com/special/trialadmission/heartslabyul.html'
		},
		2: {
			text: 'You are part of...Ignihyde Dorm #twsten #twistedwonderland',
			url: 'https://disneytwistedwonderland.com/special/trialadmission/ignihyde.html'
		},
		3: {
			text: 'You are part of...Octavinelle Dorm #twsten #twistedwonderland',
			url: 'https://disneytwistedwonderland.com/special/trialadmission/octavinelle.html'
		},
		4: {
			text: 'You are part of...Pomefiore Dorm #twsten #twistedwonderland',
			url: 'https://disneytwistedwonderland.com/special/trialadmission/pomefiore.html'
		},
		5: {
			text: 'You are part of...Savanaclaw Dorm #twsten #twistedwonderland',
			url: 'https://disneytwistedwonderland.com/special/trialadmission/savanaclaw.html'
		},
		6: {
			text: 'You are part of...Scarabia Dorm #twsten #twistedwonderland',
			url: 'https://disneytwistedwonderland.com/special/trialadmission/scarabia.html'
		},
	}[random];

	if (shareData) {
		$("#ogp-text").text(shareData.text);
		$("#ogp-url").text(shareData.url);
		$shareCopy.attr('data-clipboard-text', shareData.text + ' ' + shareData.url);
	}

	$('.sec-violet05-contents-card')
		.delay(500)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:2000 });
	$('.btn-area-05')
		.delay(1000)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:2000 });


	var flag5 = false;
	$('.btn-area-05 img').on('touchstart click', function(event) {
	  if (flag5 == false) {
	    $('.btn-area-05-item').fadeOut();
    	$('.sec-violet05-contents-card')
			.delay(500)
			.velocity({opacity: [0, 1],scale: [10, 1],top:['800px',0]
			}, { easing: 'easeInOut' , duration:3000 });
		$('.sec-violet05-contents-movie')
			.delay(3000)
			.velocity({opacity: [1, 0]
			}, { easing: 'easeInOut' , duration:1000 });
		setTimeout(function(){
		    $('.sec-violet05-contents-movie video')[0].play();
		},3000);
		var video = $(".sec-violet05-contents-movie video")[0];
		video.addEventListener("ended", function() {
			$('#sec-violet05')
				.delay(0)
				.velocity({opacity: [0, 1]
				}, { easing: 'easeInOut' , duration:2000 });
			setTimeout(function(){
				$("#sec-violet05").hide();
	    		$('#sec-violet06').show();
	    		sec06();
			},2000);
		});
		flag5 = true;
	  }
	});
}
function sec06(){
	$('#sec-violet06 .logo')
		.delay(200)
		.velocity({opacity: [1, 0], top: ['0', '56']
		}, { easing: 'easeInOut' , duration:1000 });
	$('#sec-violet06 .ogp')
		.delay(600)
		.velocity({opacity: [1, 0], top: ['0', '56']
		}, { easing: 'easeInOut' , duration:1000 });
	$('#sec-violet06 .txt')
		.delay(800)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:1400 });
	$('#sec-violet06 .sns-share')
		.delay(1000)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:1400 });
	$('#sec-violet06 .btn-area-06')
		.delay(1200)
		.velocity({opacity: [1, 0]
		}, { easing: 'easeInOut' , duration:1400 });
}