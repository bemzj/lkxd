//游戏初始化
LInit(1000/40,"game",750,1202,main);
//游戏入口主函数
function main(){
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;//设置全屏变量
    LGlobal.screen(LStage.FULL_SCREEN);//设置全面适应
    LGlobal.webAudio = false;//播放音乐
    backLayer = new LSprite();//创建背景层
    addChild(backLayer);//添加背景层到游戏环境中
    musicLayer = new LSprite();//创建音乐层
    addChild(musicLayer);//添加背景层到游戏环境中
    LLoadManage.load(loadImg,'',loadImging);
}
var lween;
var  cRule = 1;
//预加载页面
function loadImging(result){
	LLoadManage.load(gameImg,loadProgress,startGame); 
	var t=1000;
	$('.emailLoad').animate({'right':"35%",'opacity':0.5},t,function(){
			$(this).css({'right':'-15%','opacity':1});
	});	
	lween = setInterval(function(){
		$('.emailLoad').animate({'right':"35%",'opacity':0.5},t,function(){
			$(this).css({'right':'-15%','opacity':1});
		})
	},t);
}
//加载函数
function loadProgress(pre){
	console.log(pre);
	$('#load p').html(parseInt(pre)+'%');
	if(parseInt(pre)==100)
	{
		clearInterval(lween);
		$('#load').fadeOut(500);
		$('.swiper-container').animate({'opacity':'1'},500);
	}
	
}
//游戏开始
function startGame(result){
	imgList=result;
	
	first();
}
//第一场
function first(){
	//背景层
	var firstLayer = new LSprite();
	backLayer.addChild(firstLayer);
	//背景
	var back = rBitmap(imgList['back3']);
	firstLayer.addChild(back);
	//打开
	var open = new btn(539,615,imgList['open']);
	firstLayer.addChild(open);
	open.bigAndSmall(2,2,1,0.1,0,true);
	open.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		open.removeEventListener(LMouseEvent.MOUSE_DOWN,);
		LTweenLite.remove(open.tweenBas);
		swiper.lockSwipes();
		$('#press')[0].play();
		LTweenLite.to(firstLayer,0.8,{alpha:0,onComplete:function(){
			firstLayer.remove();
		}});
		//如果存在就是合理的
		var person = true;
		if(person == true)
		{
			second();	
		}else{
			sendMail();
		}
		
	});
	//提示
	var text1 = rBitmap(imgList['text1']);
	text1.x = 520;
	text1.y = 690;
	firstLayer.addChild(text1);

}
//第二场
function second(){
	//背景层
	var secondLayer = new LSprite();
	backLayer.addChild(secondLayer);
	//背景
	var second = rBitmap(imgList['second']);
	secondLayer.addChild(second);
	//信封
	var email = rBitmap(imgList['email']);// 254+108.9 362.9  378+76.95 454.95
	email.scaleX = 0.1;
	email.scaleY = 0.1;
	email.x = 600;
	email.y = 200;
	email.alpha = 0;
	email.rotateCenter =true;
	
	secondLayer.addChild(email);
	
	//text2	
	//微信名
	var names = "某某某";
	var text2 = new setText(0,865,30,names+"给你读了一封信",'#1d1c22');
	text2.x = rCenterWidth(text2);
	text2.alpha = 0;
	secondLayer.addChild(text2);
	//打来
	var opens = new btn(0,0,imgList['opens']);
	opens.x = rCenterWidth(opens);
	opens.y = 1023;
	secondLayer.addChild(opens);
	opens.alpha = 0;
	
	var head;
	var loader = new LLoader();
	var maskObj;
    loader.addEventListener(LEvent.COMPLETE, function(event){
        wechatHead=event.target;
        //头像
		head = new LBitmap(new LBitmapData(wechatHead));		
		head.scaleX = 161/head.getWidth();
		head.scaleY = 161/head.getHeight();
		head.x = rCenterWidth(head);
		head.y = 597;
		maskObj = new LSprite();
	    maskObj.graphics.drawArc(8, "white", [head.x+80.5,597+80.5, 80, 0,Math.PI*2]);
	    head.mask = maskObj;
	    maskObj.alpha = 0;
		head.alpha = 0;		
		secondLayer.addChild(head);
		
    });
    loader.load('img/head.jpg', "bitmapData");
	secondLayer.alpha = 0;
	LTweenLite.to(secondLayer,1.0,{alpha:1,onComplete:function(){
		LTweenLite.to(email,1.5,{scaleX:1,scaleY:1,x:254,y:378,rotate:-720,alpha:1});
		LTweenLite.to(head,1,{alpha:1});
		LTweenLite.to(text2,1,{alpha:1,y:805});
		LTweenLite.to(opens,1,{alpha:1});
	}});
	
	opens.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		LTweenLite.to(secondLayer,1.0,{alpha:0});
			$('#game').fadeOut(500);
			elseSound();
	})
}
//如果有个给你发语音的话就执行下面函数
function elseSound(){
	$('#rReads').fadeIn(500);
	var redTween0 = 0;
	var zengliang0 = 0.5;
	var time0 = 15;
	var k10 = zengliang0;
	var k20 = zengliang0;
	var red10 = 52;
	var red20 = 14;
	//录音播放完成
	$('.videoBox').addClass('animated tada');
	document.getElementById("sound").onended = function() {
		clearInterval(redTween0);
		$('.paused').hide();
		$('.playing').show();
	}
	//播放
	$('.playing').on('touchstart', function() {
		$(this).hide();
		$('.paused').show();
		$('#sound')[0].play();
		redTween0 = setInterval(function() {
			if(red10 == 52) {
				k10 = -zengliang0;
			} else if(red10 == 14) {
				k10 = zengliang0;
			}
			if(red20 == 52) {
				k20 = -zengliang0;
			} else if(red20 == 14) {
				k20 = zengliang0;
			}
			red10 += k10;
			red20 += k20;
			$('#r11').css('left', red10 + '%');
			$('#r22').css('left', red20 + '%');
		}, time0);
	});
	//播放
	$('.paused').on('touchstart', function() {
		$(this).hide();
		$('.playing').show();
		clearInterval(redTween0);
		$('#sound')[0].pause();
	});
	//寄一封
	$('.mail').on('touchstart', function() {
		$('#rReads').fadeOut(500);
		sendMail();
	});
	//查看更多
	$('.lookm').on('touchstart', function() {
		$('#content').fadeIn(500);
		$('.pmBox p').css('opacity', 0);
		$('#content .n').html($('#rReads .names').html());
		$('#content .c').html($('#rReads .content').html());
		$('#content .l').html($('#rReads .little').html());
		$('#content .d').html($('#rReads .date').html());
		$('#rReads').fadeOut(500, function() {
			var pTime = 800;
			$('.hBox').addClass('animated swing');
			$('.returnBtn input').addClass('animated tada');
			setTimeout(function() {
				$('.pmBox p').eq(0).stop().animate({
					'opacity': 1
				}, pTime, function() {
					$('.pmBox p').eq(1).stop().animate({
						'opacity': 1
					}, pTime, function() {
						$('.pmBox p').eq(2).stop().animate({
							'opacity': 1
						}, pTime);
						$('.pmBox p').eq(3).stop().animate({
							'opacity': 1
						}, pTime, function() {
							$('.emailred').show().addClass('animated slideInLeft');
							$('.returnBtn input').on('touchstart', function() {
								if(cRule==1)
								{
									$('#content').fadeOut(500);
									$('#rReads').fadeIn(500);
								}else{
									$('#content').fadeOut(500);
									$('#rRead').fadeIn(500);
									$('#rBox').fadeIn(500);
								}
								
							});
							
						})
					})
				});
			}, 1000);
		});
	});
}
//寄一封信
function sendMail(){
		$('#input').fadeIn(1000);
		var redTween=0;//12% 38%
		var zengliang = 0.5;
		var time = 20;
		var k1 = zengliang;
		var k2 = zengliang;
		var red1 = 38;
		var red2 = 12;
		//老哥这里是录音内容
		
		//录音
		$("#input").contents().find('#play').on('click',function(){
			$(this).hide();
			$(this).next('#pPause').show();
			$(this).nextAll('#try').show();
			$(this).nextAll('#tPause').show();
			clearInterval(redTween);
			redTween = setInterval(function() {
				if(red1 == 38) {
					k1 = -zengliang;
				} else if(red1 == 12) {
					k1 = zengliang;
				}
				if(red2 == 38) {
					k2 = -zengliang;
				} else if(red2 == 12) {
					k2 = zengliang;
				}
				red1 += k1;
				red2 += k2;
				$("#input").contents().find('#red1').css('left', red1 + '%');
				$("#input").contents().find('#red2').css('left', red2 + '%');
			}, time);	
		});
		//停止录音
		$("#input").contents().find('#pPause').on('click',function(){
			$(this).hide();
			$(this).prev('#play').show();
			clearInterval(redTween);
		});
		//试听
		$("#input").contents().find('#try').on('click',function(){
			$(this).hide();
			$(this).next('#tPause').show();
			$(this).prevAll('#pPause').hide();
			$(this).prevAll('#play').show();
			clearInterval(redTween);
			redTween = setInterval(function() {
				if(red1 == 38) {
					k1 = -zengliang;
				} else if(red1 == 12) {
					k1 = zengliang;
				}
				if(red2 == 38) {
					k2 = -zengliang;
				} else if(red2 == 12) {
					k2 = zengliang;
				}
				red1 += k1;
				red2 += k2;
				$("#input").contents().find('#red1').css('left', red1 + '%');
				$("#input").contents().find('#red2').css('left', red2 + '%');
			}, time);
		});
		//停止试听
		$("#input").contents().find('#tPause').on('click',function(){
			$(this).hide();
			$(this).prev('#try').show();
			clearInterval(redTween);
		});
		$("#input").contents().find('.videoBox').addClass('animated tada')
		
		//预览
		$("#input").contents().find('.readMore input').on('click',function(){
			clearInterval(redTween);
			$('#rBox').fadeIn(1000);
			$('#input').fadeOut(1000);
			$('#rRead').fadeIn(1000);
			var timeday;
			var tday = new Date();
			timeday = tday.toLocaleDateString();
			
			//获取微信名
			var wxname = "微信";
			//设置查看更多页面
			$('#content .n').html($("#input").contents().find('#name').val());
			$('#content .c').html($("#input").contents().find('#textarea').val());
			$('#content .l').html(wxname);
			$('#content .d').html(timeday);
			//预览的页面
			$('#rRead .names').html($("#input").contents().find('#name').val());
			var str = $("#input").contents().find('#textarea').val(); 
			if($("#input").contents().find('#textarea').val().length>=40);
			{
				str = str.substr(0,40)+'...';
			}
			$('#rRead .content').html(str);
			$('#rRead .little').html(wxname);
			$('#rRead .date').html(timeday);
			var redTween0=0;
			var zengliang0 = 0.5; 
			var time0 = 15; 
			var k10 = zengliang0; 
			var k20 = zengliang0; 
			var red10 = 52; 
			var red20 = 14;
			//播放
			$('#playing').on('touchstart',function(){
				$(this).hide();
				$('#paused').show();
				redTween0 = setInterval(function() {
					if(red10 == 52) {
						k10 = -zengliang0;
					} else if(red10 == 14) {
						k10 = zengliang0;
					}
					if(red20 == 52) {
						k20 = -zengliang0;
					} else if(red20 == 14) {
						k20 = zengliang0;
					}
					red10 += k10;
					red20 += k20;
					$('#r1').css('left', red10 + '%');
					$('#r2').css('left', red20 + '%');
				}, time0);
			});
			//停止
			$('#paused').on('touchstart',function(){
				$(this).hide();
				$('#playing').show();
				clearInterval(redTween0);
			});
			//重录
			$('.reload').on('touchstart',function(){
				$('#input').fadeIn(500);
				$('#rRead').fadeOut(500);
			});
			//装进信封寄出
			$('.sends').on('touchstart',function(){
				$('#rRead').addClass('rTransform');
				$('.bottom').show().animate({'bottom':'1.5rem'},1800);
				$('.up').show().animate({'bottom':'1.5rem'},1800);
				$('.mengceng').show().animate({'bottom':'0rem'},1800);
				setTimeout(function(){
					$('#rRead').addClass('rTransform1');
					setTimeout(function(){
						$('.bottom').fadeOut(500);
						$('.closeEmail').fadeIn(500,function(){
	//						var h = -$(this).height()/2;
							$(this).css({'bottom':'28.43%'});
							setTimeout(function(){
								$('#rBox').fadeOut(1000);
								$('#game').fadeIn(1000);
								last();
							},1000);
	//						$(this).css({'bottom':'28.43%','margin-bottom':h+'px'});
						});
						$('#rRead').fadeOut(400,function(){
							$('.mengceng').hide();
						});
						$('.up').fadeOut(500);
						
					},2000);
				},2000);
			});
			//查看更多
			$('#lookm').on('touchstart',function(){
				cRule=2;
				$('#content').fadeIn(500);
				$('.pmBox p').css('opacity',0);
				
				$('#rRead').fadeOut(500,function(){
					var pTime = 800;
					$('.hBox').addClass('animated swing');
					$('.returnBtn input').addClass('animated tada');
					setTimeout(function(){
						$('.pmBox p').eq(0).stop().animate({'opacity':1},pTime,function(){
							$('.pmBox p').eq(1).stop().animate({'opacity':1},pTime,function(){
								$('.pmBox p').eq(2).stop().animate({'opacity':1},pTime);
								$('.pmBox p').eq(3).stop().animate({'opacity':1},pTime,function(){
									$('.emailred').show().addClass('animated slideInLeft');
								})
							})
						});
					},1000);	
				});
			});
		});
}
//最后一个页面
function last(){
	var lastLayer = new LSprite();
	backLayer.addChild(lastLayer);
	//背景
	var back = rBitmap(imgList['last']);
	lastLayer.addChild(back);
	//二维码
	var erCode;
	var loader = new LLoader();
	var er;
    loader.addEventListener(LEvent.COMPLETE, function(event){
        erCode=event.target;
        //头像
		er = new LBitmap(new LBitmapData(erCode));
		er.x = 592;
		er.y = 1046;	
		lastLayer.addChild(er);
		
    });
    loader.load('img/er.png', "bitmapData");
}

/////////////////////////////////////////////////非游戏区///////////////////////////////////////////////
$(function(){
	//音乐按钮
	var rn = 0;
	var rv = 5;
	var rTweens;
	rTweens = setInterval(function(){
		rn += rv;
		$('#music').css('transform','rotate('+rn+'deg)');
		if(rn==360)
		{
			rn = 0;
		}
	},20);
	$('#music').bind('touchstart',function(){
		if($(this).attr('isOpen')=="true")
		{
			$(this).attr('isOpen',"false");
			$(this).find('img').eq(0).css('opacity',0);
			$(this).find('img').eq(1).css('opacity',1);
			$('#bg')[0].pause();
			clearInterval(rTweens);
		}else{
			$(this).attr('isOpen',"true");
			$(this).find('img').eq(0).css('opacity',1);
			$(this).find('img').eq(1).css('opacity',0);
			$('#bg')[0].play();
			rTweens = setInterval(function(){
				rn += rv;
				$('#music').css('transform','rotate('+rn+'deg)');
				if(rn==360)
				{
					rn = 0;
				}
			},20);
		}
	})
	var downTween;
	var openTween;
	var time = 1000;
	var time2 = 900;
	//上下滑
	swiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		initialSlide :0,
		onInit: function(swiper){
			$('.text1 p').eq(0).stop().animate({
				'opacity': '1'
			}, time, function() {
				$('.text1 p').eq(1).stop().animate({
					'opacity': '1'
				}, time, function() {
					$('.text1 p').eq(2).stop().animate({
						'opacity': '1'
					}, time, function() {
						$('.text1 p').eq(3).stop().animate({
							'opacity': '1'
						}, time, function() {
			
						});
					});
				});
			});
			//			指示
			$('.down').animate({'bottom':'5%','opacity':0},600,function(){
				$(this).css({'bottom':'9%','opacity':1});
			});
			downTween = setInterval(function(){
				$('.down').animate({'bottom':'3%','opacity':0},600,function(){
					$(this).css({'bottom':'7%','opacity':1});
				});
			},600);
			$('.down img').on('touchstart',function(){
				swiper.slideNext();
			});
			var opent = false;
			openTween = setInterval(function(){
				if(opent == false)
				{
					opent = true;
					$('.p3 img').css({'width':'9.8%','margin-top':'-1%','margin-right':'-1%'});
				}else{
					opent = false;
					$('.p3 img').css({'width':'9.8%','margin-top':'0%','margin-right':'0%'});
				}
				
			},1000)
		},
		onSlideChangeEnd: function(swiper){
		    if(swiper.activeIndex==0){
		    	$('.text1 p').eq(0).stop().animate({'opacity':'1'},time,function(){
					$('.text1 p').eq(1).stop().animate({'opacity':'1'},time,function(){
						$('.text1 p').eq(2).stop().animate({'opacity':'1'},time,function(){
							$('.text1 p').eq(3).stop().animate({'opacity':'1'},time,function(){
					
							});
						});
					});
				});	
				for(var i=0; i<7; i++)
				{
					$('.text2 p').eq(i).stop().css('opacity','0');
				}
				
		    }else if(swiper.activeIndex==1){
		    	$('.text2 p').eq(0).stop().animate({'opacity':'1'},time2,function(){
					$('.text2 p').eq(1).stop().animate({'opacity':'1'},time2,function(){
						$('.text2 p').eq(2).stop().animate({'opacity':'1'},time2,function(){
							$('.text2 p').eq(3).stop().animate({'opacity':'1'},time2,function(){
								$('.text2 p').eq(4).stop().animate({'opacity':'1'},time2,function(){
									$('.text2 p').eq(5).stop().animate({'opacity':'1'},time2,function(){
										$('.text2 p').eq(6).stop().animate({'opacity':'1'},time2,function(){
					
										});
									});
								});
							});
						});
					});
				});	
				for(var i=0; i<4; i++)
				{
					$('.text1 p').eq(i).stop().css('opacity','0');
				}
		    }else{
		    	for(var i=0; i<4; i++)
				{
					$('.text1 p').eq(i).stop().css('opacity','0');
				}
				for(var j=0; j<7; j++)
				{
					$('.text2 p').eq(j).stop().css('opacity','0');
				}
				
		    }
		}
	});
});
