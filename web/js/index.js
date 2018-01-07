//顶部效果
{
    let flag = true;
    $(".course,.voice,.teacher,.we").click(function () {
        if (flag) {
            $(this).css({height: 85, background: "#ff986a"});
            $(this).find(".top-sec-nav").show();
            $(this).find(".top-sec-nav li").each(function (index) {
                $(this).css({
                    opacity: 0,
                    transform: "rotateX(90deg)",
                    animation: "slideDown .3s ease-in " + index * 0.2 + "s forwards"
                })
            })
        } else {
            let s=$(this);
             s.find(".top-sec-nav li").each(function (index) {
                $(this).css({
                    opacity: 1,
                    transform: "rotate(0)",
                    animation: "slideUp .3s ease-in " + (0.4 - index * 0.2) + "s forwards"
                });
                setTimeout(function () {
                    s.css({height: 80, background: ""});
                    $(".corouse .top-sec-nav").hide();
                }, 400)
            })
        }
        flag = !flag;
    })
}
//banner效果
{
    $(".banner-next").click(function () {
        $(".banner-box").css("rotateY", "-=60");
    });
    $(".banner-prev").click(function () {
        $(".banner-box").css("rotateY", "+=60");
    })
}
//内容遮罩的效果
{
    let startx = 0, starty = 0;
    let n = 0;
    $(".content-thumb").data("hover", false);
    $(".content-thumb").data("dir", "");
    $(".content-thumb").mousemove(function (e) {
        let [ox, oy] = [e.offsetX, e.offsetY];
        let dir = Math.abs(ox - startx) > Math.abs(oy - starty) ? "hon" : "ver";
        if (dir === "hon") {
            if (ox > startx) {
                $(".content-thumb").data("dir", "right");
            } else {
                $(".content-thumb").data("dir", "left");
            }
        } else {
            if (oy > starty) {
                $(".content-thumb").data("dir", "bottom");
            } else {
                $(".content-thumb").data("dir", "top");
            }
        }
        let index = $(this).index(".content-thumb");
        if (!$(this).data("hover")) {
            n++;
            if (n === 3) {
                $(this).data("hover", true);
                if (dir === "hon") {
                    if (ox > startx) {
                        $(".mask").eq(index).addClass("leftIn");
                    } else {
                        $(".mask").eq(index).addClass("rightIn");
                    }
                } else {
                    if (oy > starty) {
                        $(".mask").eq(index).addClass("topIn");
                    } else {
                        $(".mask").eq(index).addClass("bottomIn");
                    }
                }
                n = 0;
            }
        }
        startx = ox;
        starty = oy;
    });
    $(".content-thumb").mouseleave(function(){
        var index=$(this).index(".content-thumb");
        $(this).data("hover",false);
        switch($(this).data("dir")){
            case "left":$(".mask").eq(index).addClass("leftOut");break;
            case "right":$(".mask").eq(index).addClass("rightOut");break;
            case "top":$(".mask").eq(index).addClass("topOut");break;
            case "bottom":$(".mask").eq(index).addClass("bottomOut");break;
        }
    });
    $(".mask").on("animationend",function(){
         if(!$(this).parent().parent().data("hover")){
             $(this).attr("class","mask");
         }
    })
}