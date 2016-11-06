/**
 * Created by Administrator on 2016/11/6.
 */

//ȫ�ֱ�����
var kongxi = 150;
window.onload=function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var background = {
        positionX : 0,
        positionY : 0,
        width     : 288,
        height    : 512,
        bgImage   : (function(){var a = new Image() ; a.src = "img/bg_night.png";return a;}()),//�ڴ�������ʱ ,  ���Զ�ִ���Ե��ú��� ,  �ӵ��ú�������֮��Ϊ���Ƿ���һ�ű���ͼƬ
        draw      : function(){
            var _this = this;//
            // this.bgImage.onload = function(){
            //��Ϊ��onload�¼���thisָ��onloadǰ��Ķ���,������onloadǰ��this.bgImageͼƬ,����this���������� , ������onload����Ҫ ��background����һ����ȥʹ��
            context.drawImage(this.bgImage,_this.positionX,_this.positionY,_this.width,_this.height);
            // }
        }
    }
//�ϰ���
    var obstruction = {
        positionX : 288,
        positionY : Math.floor(Math.random()*229-228),
        createImg : (function(){   //createImg ��һ������
            var imgs = [];
            var images = ["img/pipe_down.png","img/pipe_up.png"];
            for(var i=0; i< images.length; i++){
                var a = new Image();
                a.src = images[i];
                imgs.push(a);
            }
            return imgs;
        })(),
        draw     : function(){
            this.positionX -= 2;
            context.drawImage(this.createImg[0],this.positionX,this.positionY,52 , 320);
            context.drawImage(this.createImg[1],this.positionX,this.positionY+320 + kongxi,52 , 320);
            if(this.positionX <= -52){
                this.positionX = 288;
                this.positionY = Math.floor(Math.random()*229-228);
            }
        }
    }

//������
    var bird = {
        positionX : 80,
        positionY : 200,
        width     : 48,
        height    : 48,
        images    : ["img/bird0_0.png","img/bird0_1.png","img/bird0_2.png"],
        index     : 0,//��ǰ�ǵڼ���ͼƬ
        wing      : setInterval(function(){
            bird.index ++;
        },200),
        currentImg   : function(){
            var a = new Image() ;
            a.src = this.images[this.index%3];
            return a;
        },
        draw      : function(){
            var _this = this;//
            this.bgImage = this.currentImg();
            // this.bgImage.onload = function(){
            //��Ϊ��onload�¼���thisָ��onloadǰ��Ķ���,������onloadǰ��this.bgImageͼƬ,����this���������� , ������onload����Ҫ ��background����һ����ȥʹ��
            _this.positionY += 5
            context.drawImage(this.bgImage,_this.positionX,_this.positionY,_this.width,_this.height);
            // }
        },
        clearTime : function (){
            clearInterval(this.wing)
        }
    }

//������
    function drawAll(){

        context.clearRect(0,0,288,512);
        background.draw();
        bird.draw();
        obstruction.draw();
    }

    document.onkeydown = function(e){
        e = e || window.event;
        var keycode = e.keyCode || e.which;
        if(keycode == 32){ //�����ǵ���ո�ʱ�Ĳ���

            bird.positionY -= 80;
        }
    }

    function judge(){
        //�ж�С��ײ���컨��û��
        if(bird.positionY <= 0){
            clearInterval(timer)
            bird.clearTime();
        }
        //�ж�С��ײ���˵ذ�
        if(bird.positionY >= 512-48){
            clearInterval(timer)
            bird.clearTime();
        }
        //�ж��Ƿ���ײ������ˮ��
        if(bird.positionX + bird.width >= obstruction.positionX && bird.positionX <= obstruction.positionX + 52 && bird.positionY <= obstruction.positionY + 320){

            clearInterval(timer)
            bird.clearTime();
        }
        //�ж���ˮ��
        if(bird.positionX + bird.width >= obstruction.positionX && bird.positionX <= obstruction.positionX + 52 && bird.positionY + bird.height >= obstruction.positionY + 320 + kongxi){

            clearInterval(timer)
            bird.clearTime();
        }
    }

//����������
    var timer = setInterval(function(){
        drawAll();
        judge()
    },30)

}
