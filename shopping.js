
// 确认登录
$(function(){
   
    var str = localStorage.getItem("username");
    var goods = localStorage.getItem("username");
    showNum()
    if(str){
        $(".sign_red").html(str).click(function(){
            $(".ww").css("display", "inline-block")
            if(!$(".sign_red").find(".ww").size()){
                $("<span class='ww'>退出<span>").appendTo($(".sign_red"));
            }
            
            return false
        }).mouseleave(function(){
            $(".ww").css("display", "none")
        }).on("click", "span", function(ev){
            localStorage.removeItem("username")
            location.assign("html/login.html");
            ev.stopPropagation()
        })
        
        $(".hua").html("欢迎光临当当，尊敬的用户：")
        $(".ndy").html("")
    }

    $(".cart").click(function(){
        return false
    })

    $(".expend li").click(function(){
        var index = $(this).index();
        $(".img_box a img").eq(index).css("display", "block").siblings("img").css("display", "none");
        $(".big img").eq(index).css("display", "block").siblings("img").css("display", "none")
    })

    $(".img_box a").mouseenter(function(){
        $(".choose").css("display", "block")
        $(".big").css("display", "block")
    }).mousemove(function(ev){
        var l = ev.pageX - $(this).offset().left - 64;
        var h = ev.pageY - $(this).offset().top - 64;
        if(l < 0){
            l = 0;
        }
        if(l > 192){
            l = 192;
        }
        if(h < 0){
            h = 0;
        }
        if(h > 192){
            h = 192;
        }
        $(".choose").css({
            left:l,
            top:h  
        })
        $(".big img").css({
            left:-l * 2.5,
            top:-h * 2.5  
        })
    }).mouseleave(function(){
        $(".choose").css("display", "none")
        $(".big").css("display", "none")
    })
    
    $(".add").click(function(){
        var num = $(".txt").val();
            num++;
            $(".txt").val(num)
            $(".reduce").css("background", "#ccc")

    })
    $(".reduce").click(function(){
        var num = $(".txt").val();
            if(num > 1){
                num--;
                $(".txt").val(num)
            }else{
                this.style.background = "#f2f2f2"
            }
    })

    // 加入购物车；
    $(".cart").click(function(){
        var tenp = $(".txt").val();
            tenp = parseInt(tenp);
        if($.cookie(goods)){
            var newStr = $.cookie(goods);
            var newArr = JSON.parse(newStr);
            var ish = true;
            for(var i = 0; i < newArr.length; i++){
                if(newArr[i].id == "0"){
                    newArr[i].num += tenp;
                    ish = false;
                }
            }
            if(ish){
                var obj = {id: "0", num: tenp}
                    newArr.push(obj);    
            }
            var nnstr = JSON.stringify(newArr);
                $.cookie(goods, nnstr, {
                    expires:4,
                    raw:true
                })
        }else{
            var arr = [{id: "0", num: tenp}]
            var str = JSON.stringify(arr);
            $.cookie(goods, str, {
                expires:4,
                raw:true
            })
        }

        showNum()
    })

    function showNum(){
        console.log($.cookie(goods))
        if($.cookie(goods)){
            var newStr = $.cookie(goods);
            var newArr = JSON.parse(newStr);
            var sum = 0
            for(var i = 0; i < newArr.length; i++){
                sum += parseInt(newArr[i].num)
            }
            localStorage.setItem(goods, sum)
            $("#goods_num").html(sum)
        }else{
            localStorage.setItem(goods, "0")
        }
    }

    $(".buy").click(function(){
        location.assign("shopping_cart.html")
    })
    // $(".goto").click(function(){
    //     $(this).css({
    //         backgroundColor:"#ff67a9",
            
    //     })
    // })

})