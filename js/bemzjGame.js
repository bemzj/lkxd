//变大变小
function bigAndSmall(tween,x,y,time,scales,delayTime,loops){
	/*
	 * tween为变化的对象
	 * x为位置的位置，2为居中的位置
	 * y为位置的位置，2为居中的位置
	 * time为变化的时间
	 * scales为变化的倍数
	 * delayTime为延迟的时间
	 * loops为是否循环
	 */
	var bigBeforeX = tween.x;
	var bigBeforeY = tween.y;
	var bigAfterX = tween.x-tween.getWidth()*scales/x;
	var bigAfterY = tween.y-tween.getHeight()*scales/y;
	return LTweenLite.to(tween,time/2,{loop:loops,delay:delayTime,x:bigAfterX,y:bigAfterY,scaleX:(1+scales),scaleY:(1+scales)}).to(tween,time/2,{x:bigBeforeX,y:bigBeforeY,scaleX:1,scaleY:1});
}

//闪闪发光
function bling(target,time,alphaB,alphaA,loops){
	/*
	 * target为目标
	 * time为时间
	 * alphaB为淡出度
	 * alphaA为淡出度
	 * loops为是否重复
	 */
	return LTweenLite.to(target,time,{alpha:alphaB,loop:loops}).to(target,time,{alpha:alphaA});
}
//返回图片
function rBitmap(name){
	 return new LBitmap(new LBitmapData(name));
}
//返回按钮
function rButton(name){
	 return new LButton(new LBitmap(new LBitmapData(name)));
}
//空函数
function setNull(){}
/////////////////////////////////音乐按钮类-换行/////////////////////////////////
function musicBtn(x,y,sx,sy,name,nameo,musicId){
	/*
	 * x为音乐按钮横坐标位置
	 * y为音乐按钮纵坐标位置
	 * sx为音乐按钮横向放大或缩小倍数
	 * sy为音乐按钮纵向放大或缩小倍数
	 * name为音乐图片名称
	 * musicId为video音乐
	 */
	base(this,LSprite,[]);
	var self = this;
	self.x=x;
	self.y=y;
	self.open=true;
	var musicImg = new LBitmap(new LBitmapData(name));
	musicImg.scaleX = sx;
	musicImg.scaleY = sy;
	self.musicplay = LTweenLite.to(musicImg,1.0,{rotate:360,loop:true,onComplete:function(){
		musicImg.rotate = 0;
	}});
	self.addChild(musicImg);
	var musicImgo = new LBitmap(new LBitmapData(nameo));
	musicImgo.scaleX = sx;
	musicImgo.scaleY = sy;
	self.musicplayo = LTweenLite.to(musicImgo,1.0,{rotate:360,loop:true,onComplete:function(){
		musicImgo.rotate = 0;
	}});
	self.addChild(musicImgo);
	musicImgo.alpha = 0;
	self.graphics.drawRect(0,'#000000',[0,0,musicImg.getWidth(),musicImg.getHeight()],false,'#ff0000');
	self.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		if(self.open == true){
			document.getElementById(musicId).pause();
			self.open = false;
			self.musicplay.pause();	
			self.musicplayo.pause();
			musicImg.alpha = 0;
			musicImgo.alpha = 1;
		}else {
			document.getElementById(musicId).play();
			self.open = true;
			self.musicplay.resume();
			self.musicplayo.resume();
			musicImg.alpha = 1;
			musicImgo.alpha = 0;
		}
	});
}
/////////////////////////////////图片类-换行/////////////////////////////////
function bmp(x,y,name){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;
	self.y = y;
	self.name = name;
	self.bitmap = new LBitmap(new LBitmapData(name));
	self.addChild(self.bitmap);
}
bmp.prototype.bling=function(time,alphaB,alphaA,loops){
	/*
	 * time为时间
	 * alphaB为淡出度
	 * alphaA为淡出度
	 * loops为是否重复
	 */
	var self = this;
	self.tweenB = LTweenLite.to(self,time,{alpha:alphaB,loop:loops}).to(self,time,{alpha:alphaA});
}
bmp.prototype.bigAndSmall=function(x,y,time,scales,delayTime,loops){
	/*
	 * x为位置的位置，2为居中的位置
	 * y为位置的位置，2为居中的位置
	 * time为变化的时间
	 * scales为变化的倍数
	 * delayTime为延迟的时间
	 * loops为是否循环
	 */
	var self = this;
	var bigBeforeX = self.x;
	var bigBeforeY = self.y;
	var bigAfterX = self.x-self.getWidth()*scales/x;
	var bigAfterY = self.y-self.getHeight()*scales/y;
	self.tweenBas = LTweenLite.to(self,time/2,{loop:loops,delay:delayTime,x:bigAfterX,y:bigAfterY,scaleX:(1+scales),scaleY:(1+scales)}).to(self,time/2,{x:bigBeforeX,y:bigBeforeY,scaleX:1,scaleY:1});
}
/////////////////////////////////按钮类-换行/////////////////////////////////
function btn(x,y,name){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;
	self.y = y;
	self.name = name;
	self.bitmap = new LButton(new LBitmap( new LBitmapData(name)));
	self.addChild(self.bitmap);
}
btn.prototype.bling=function(time,alphaB,alphaA,loops){
	/*
	 * time为时间
	 * alphaB为淡出度
	 * alphaA为淡出度
	 * loops为是否重复
	 */
	var self = this;
	self.tweenB = LTweenLite.to(self,time,{alpha:alphaB,loop:loops}).to(self,time,{alpha:alphaA});
}
btn.prototype.bigAndSmall=function(x,y,time,scales,delayTime,loops){
	/*
	 * x为位置的位置，2为居中的位置
	 * y为位置的位置，2为居中的位置
	 * time为变化的时间
	 * scales为变化的倍数
	 * delayTime为延迟的时间
	 * loops为是否循环
	 */
	var self = this;
	var bigBeforeX = self.x;
	var bigBeforeY = self.y;
	var bigAfterX = self.x-self.getWidth()*scales/x;
	var bigAfterY = self.y-self.getHeight()*scales/y;
	self.tweenBas = LTweenLite.to(self,time/2,{loop:loops,delay:delayTime,x:bigAfterX,y:bigAfterY,scaleX:(1+scales),scaleY:(1+scales)}).to(self,time/2,{x:bigBeforeX,y:bigBeforeY,scaleX:1,scaleY:1});
}
/////////////////////////////////位置返回/////////////////////////////////
//返回位置横坐标
function rCenterWidth(target){
	return (LGlobal.width-target.getWidth())/2;
}
//返回位置纵坐标
function rCenterHeight(target){
	return (LGlobal.height-target.getHeight())/2;
}
/////////////////////////////////文字类-换行/////////////////////////////////
function setWrapText(x,y,size,text,color,weight,width,wrap,height,speed)
{
	/*
	 * x为文字的横坐标
	 * y为文字的纵坐标
	 * size为文字大小
	 * text为文字内容
	 * color为颜色
	 * weight为颜色是否加粗
	 * width为宽度
	 * wrap为是否支持换行
	 * height为行高
	 */
	base(this,LSprite,[]);
	var self = this;
	self.word = new LTextField();
	self.word.text = text;
	self.word.color = color;
	self.word.size = size;
	self.word.setWordWrap(wrap,height);
	self.word.width = width;
	self.word.speed = speed;
	self.x = x;
	self.y = y;
	if(weight==true)
	{
		self.word.weight ="bolder";
	}
	self.addChild(self.word);	
}
setWrapText.prototype.play = function(){
	var self = this;
	self.word.wind();
}
/////////////////////////////////文字类-不换行/////////////////////////////////
function setText(x,y,size,text,color,weight)
{
	/*
	 * x为文字的横坐标
	 * y为文字的纵坐标
	 * size为文字大小
	 * text为文字内容
	 * color为颜色
	 * weight为颜色是否加粗
	 */
	base(this,LSprite,[]);
	var word = new LTextField();
	word.text = text;
	word.color = color;
	word.size = size;
	var self = this;
	self.x = x;
	self.y = y;
	if(weight==true)
	{
		word.weight ="bolder";
	}
	self.addChild(word);
}