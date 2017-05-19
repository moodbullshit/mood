/**
 * Created by Administrator on 2017/5/18.
 */
window.onload=function () {

    //参数为横竖格子数
    function saolei(numX,numY,num){
        this.numX=numX;
        this.numY=numY;
        this.num=num;
        this.screens=document.querySelector(".screens");

    }

    saolei.prototype={
        play:function(){
            this.drawScreen(this.numX,this.numY);
            this.pushMine(this.numX,this.numY,this.num);
            this.drawNum();
            this.fan();
            this.qizi();
        },
        drawScreen:function(x,y){
            var width=20*x;
            var height=20*y;
            this.screens.style.width=width+"px";
            this.screens.style.height=height+"px";
            this.screens.classList.add("bian");
            for (var i = 0; i < x; i++) {
                for (var j = 0; j < y; j++) {
                    var gezi=document.createElement("div");
                    gezi.classList.add("gezi");
                    gezi.classList.add("fugai");
                    gezi.id=i+"-"+j;
                    this.screens.appendChild(gezi);
                }
            }
        },
        pushMine:function(x,y,num){
            var mine_arr=[];
            var mx;
            var my;
            for (var i = 0; i < num; i++) {
                mx=Math.floor(Math.random()*x);
                my=Math.floor(Math.random()*y);
                for (var j = 0; j < mine_arr.length; j++) {
                    if(mx==mine_arr[j].x && my==mine_arr[j].y){
                        j=-1;
                        mx=Math.floor(Math.random()*x);
                        my=Math.floor(Math.random()*y);
                    }
                }
                var mjson={x:mx,y:my};
                mine_arr.push(mjson);
            }

            for (var i = 0; i < mine_arr.length; i++) {
                var id=mine_arr[i].x+"-"+mine_arr[i].y;
                document.getElementById(id).classList.add("lei");
                document.getElementById(id).lei=true;
            }
        },
        drawNum:function(){
            var gezi=document.querySelectorAll(".gezi");
            for (var i = 0; i < gezi.length; i++) {
                // 是否有这个类名
                if(!gezi[i].classList.contains("lei")){
                    // console.log(1);
                    gezi[i].num=this.jisuan(gezi[i]);
                    // gezi[i].innerHTML=gezi[i].num;
                }
            }
        },
        jisuan:function(obj){
            var num=0;
            var arr=obj.id.split("-");
            var idX=parseInt(arr[0]);
            var idY=parseInt(arr[1]);
            var bottom=document.getElementById(`${idX+1}-${idY}`),
                top=document.getElementById(`${idX-1}-${idY}`),
                left=document.getElementById(`${idX}-${idY-1}`),
                right=document.getElementById(`${idX}-${idY+1}`),
                leftTop=document.getElementById(`${idX-1}-${idY-1}`),
                rightTop=document.getElementById(`${idX-1}-${idY+1}`),
                rightBottom=document.getElementById(`${idX+1}-${idY+1}`),
                leftBottom=document.getElementById(`${idX+1}-${idY-1}`);
            if(top){
                if(top.lei){
                    num++;
                }
            }
            if(left){
                if(left.lei){
                    num++;
                }
            }
            if(right){
                if(right.lei){
                    num++;
                }
            }
            if(bottom){
                if(bottom.lei){
                    num++;
                }
            }
            if(leftTop){
                if(leftTop.lei){
                    num++;
                }
            }
            if(leftBottom){
                if(leftBottom.lei){
                    num++;
                }
            }
            if(rightTop){
                if(rightTop.lei){
                    num++;
                }
            }
            if(rightBottom){
                if(rightBottom.lei){
                    num++;
                }
            }

            return num;
        },
        fan:function(){
            var gezi=document.querySelectorAll(".gezi");
            var that=this;

            gezi.forEach(function(v,i){
                v.onclick=function(){
                    if(v.classList.contains("fugai")){
                        v.classList.remove("fugai");
                        if(v.num){
                            v.innerHTML=v.num;
                        }
                        if(v.num==0){
                            that.zero(v);
                        }
                        if(v.classList.contains("lei")){
                            var lei=document.querySelectorAll(".lei");
                            lei.forEach(function(value){
                                value.classList.remove("fugai");
                            })
                            setTimeout(function(){
                                alert("game over");
                                location.reload();
                            }, 100);

                        }
                    }
                    var zhe=document.querySelectorAll(".fugai");
                    var qi=document.querySelectorAll(".qizi");
                    if((zhe.length+qi.length)==that.num){

                        var lei=document.querySelectorAll(".lei");
                        lei.forEach(function(v){
                            v.classList.remove("fugai");
                            v.classList.remove("qizi");
                        })

                        setTimeout(function(){
                            alert("成功");
                            location.reload();
                        }, 100);
                    }
                }
            })
        },
        zero:function(obj){
            var arr_kong=[];
            arr_kong.push(obj);
            while(arr_kong.length){
                var arr=arr_kong[0].id.split("-");
                var idX=parseInt(arr[0]);
                var idY=parseInt(arr[1]);
                var bottom=document.getElementById(`${idX+1}-${idY}`),
                    top=document.getElementById(`${idX-1}-${idY}`),
                    left=document.getElementById(`${idX}-${idY-1}`),
                    right=document.getElementById(`${idX}-${idY+1}`),
                    leftTop=document.getElementById(`${idX-1}-${idY-1}`),
                    rightTop=document.getElementById(`${idX-1}-${idY+1}`),
                    rightBottom=document.getElementById(`${idX+1}-${idY+1}`),
                    leftBottom=document.getElementById(`${idX+1}-${idY-1}`);
                if(top&&top.classList.contains("fugai")){
                    top.classList.remove("fugai");
                    if(top.num){
                        top.innerHTML=top.num;
                    }
                    if(top.num==0){
                        arr_kong.push(top);
                    }
                }
                if(bottom&&bottom.classList.contains("fugai")){
                    bottom.classList.remove("fugai");
                    if(bottom.num){
                        bottom.innerHTML=bottom.num;
                    }
                    if(bottom.num==0){
                        arr_kong.push(bottom);
                    }
                }
                if(right&&right.classList.contains("fugai")){
                    right.classList.remove("fugai");
                    if(right.num){
                        right.innerHTML=right.num;
                    }
                    if(right.num==0){
                        arr_kong.push(right);
                    }
                }
                if(left&&left.classList.contains("fugai")){
                    left.classList.remove("fugai");
                    if(left.num){
                        left.innerHTML=left.num;
                    }
                    if(left.num==0){
                        arr_kong.push(left);
                    }
                }
                if(leftTop&&leftTop.classList.contains("fugai")){
                    leftTop.classList.remove("fugai");
                    if(leftTop.num){
                        leftTop.innerHTML=leftTop.num;
                    }
                    if(leftTop.num==0){
                        arr_kong.push(leftTop);
                    }
                }
                if(leftBottom&&leftBottom.classList.contains("fugai")){
                    leftBottom.classList.remove("fugai");
                    if(leftBottom.num){
                        leftBottom.innerHTML=leftBottom.num;
                    }
                    if(leftBottom.num==0){
                        arr_kong.push(leftBottom);
                    }
                }
                if(rightTop&&rightTop.classList.contains("fugai")){
                    rightTop.classList.remove("fugai");
                    if(rightTop.num){
                        rightTop.innerHTML=rightTop.num;
                    }
                    if(rightTop.num==0){
                        arr_kong.push(rightTop);
                    }
                }
                if(rightBottom&&rightBottom.classList.contains("fugai")){
                    rightBottom.classList.remove("fugai");
                    if(rightBottom.num){
                        rightBottom.innerHTML=rightBottom.num;
                    }
                    if(rightBottom.num==0){
                        arr_kong.push(rightBottom);
                    }
                }

                arr_kong.shift();
            }
        },
        qizi:function(){
            var fugai=document.querySelectorAll(".fugai");
            var that=this;
            this.screens.oncontextmenu=function(ev){
                ev.preventDefault();
            }
            fugai.forEach(function(v){
                v.oncontextmenu=function(ev){
                    ev.preventDefault();
                    if(this.classList.contains("fugai")){
                        this.classList.remove("fugai");
                        this.classList.add("qizi");
                    }else if(this.classList.contains("qizi")){
                        this.classList.add("fugai");
                        this.classList.remove("qizi");
                    }
                    that.success();

                }
            })
        },
        success:function(){
            var lei=document.querySelectorAll(".lei");
            var flag=true;
            lei.forEach(function(v){
                if(!v.classList.contains("qizi")){
                    flag=false;
                }
            })
            if(flag){
                alert("succeed");
            }


        }

    }

    var saolei=new saolei(20,20,20);
    saolei.play();
}