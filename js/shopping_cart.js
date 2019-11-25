$(function(){
    var str = localStorage.getItem("username");
    var goods = localStorage.getItem("username");
    
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

    $(".big_box").html("")
    goods_list();
    totalM()
        
    $.ajax({
        url:"../data/cart.json",
        success:function(arr){
            for(var i = 0; i < arr.length; i++){
                var node =  $(`
                        <li class="box">
                        <ul>
                            

                        </ul>
                    </li>
                `).appendTo($(".product_list"))
                var newArr = arr[i];
                for(var j = 0; j < newArr.length; j++){
                    $(`
                    <li class="hrn">
                        <span class="add_goods"  id=${newArr[j].id}>加入购物车</span>
                        <img src=${newArr[j].img} alt="">
                        <p class="wrap">${newArr[j].title}</p>
                        <p>
                            ¥ ${newArr[j].price}
                        </p>  
                    </li>
                    `).appendTo(node.find("ul"))
                }

            }
        },
        error: function(msg){
            alert(msg)
        }
    })

// 点击加入购物车
    $(".product_list").on("click", ".add_goods", function(){
        // $(this).click(function(){
        //     return false;
        // })
        if($.cookie(goods) == null){
            var arr = [{
                id:this.id,
                num:1
            }];
            var str = JSON.stringify(arr);
            $.cookie(goods, str, {
                expires:4,
                raw:true
            }) 
        }else{
            var str  = $.cookie(goods);
            var arr = JSON.parse(str);
            var ifhas = true;
            for(var i = 0; i < arr.length; i++){
                if(this.id == arr[i].id){
                    arr[i].num++;
                    ifhas = false;
                }
            }
            if(ifhas){
                var obj = {id: this.id,num: "1"}
                    arr.push(obj);
            }
            var newStr = JSON.stringify(arr);
                $.cookie(goods, newStr, {
                        expires:4,
                        raw:true
                })
        }
        $(".big_box").html("")
        goods_list();
        showNum()
        totalM()
        return false;
    })

    function showNum(){
        if($.cookie(goods)){
            var newStr = $.cookie(goods);
            var newArr = JSON.parse(newStr);
            var sum = 0
            for(var i = 0; i < newArr.length; i++){
                sum += parseInt(newArr[i].num)
            }
                localStorage.setItem(goods, sum)
        }else{
            localStorage.setItem(goods, "0")
        }
    }

    function totalM(){
        var obj = $(".c1 a");
        var money = 0;
        var sum = 0;
        for(var i in obj){
            if (obj[i].className == "true"){
                var m = $(obj[i]).parents(".com").find(".money").html();
                var n = $(obj[i]).parents(".com").find(".txt").val();
                money += parseFloat(m);
                sum += parseInt(n);
            }
        }
        money = money.toFixed(2);
        $(".s2").html("￥" + money)
        
        $(".num").html(sum)
    }
// 显示购物车列表
function goods_list(){
    if($.cookie(goods)){
        $.ajax({
            url:"../data/cart.json",
            success:function(arr){
                var str = $.cookie(goods);
                var newArr = JSON.parse(str);
                var nnArr = [];
                for(var k = 0; k < newArr.length; k++){
                        for(var j = 0; j < arr[0].length; j++){
                            if(arr[0][j].id == newArr[k].id){
                                arr[0][j].num = newArr[k].num;
                                nnArr.push(arr[0][j]);
                            }
                        }
                    
                }
                for(var v = 0; v < nnArr.length; v++){

                    var total = nnArr[v].price * nnArr[v].num;
                        total = total.toFixed(2);
                    $(`
                        <ul class="com" id=${nnArr[v].id}>
                        <li class="c1">
                            <a href="" class="false"></a>
                        </li>
                        <li class="c2">
                            <img src=${nnArr[v].img} alt="">
                        </li>
                        <li class="c3">
                            ${nnArr[v].title}
                        </li>
                        <li class="c4">
                            <span>¥ </span><span class="qian">${nnArr[v].price}</span>
                        </li>
                        <li class="c5">
                            <div>
                                <span class="reduce">-</span>
                                <input type="text" class="txt" value = ${nnArr[v].num}>
                                <span class="add">+</span>
                            </div>
                        </li>
                        <li class="c6">
                            <span>¥</span>
                            <span class="money">${total}</span>
                        </li>
                        <li class="c7">
                            <a>移入收藏</a>
                            <a class="del">删除</a>
                        </li>
                        <i></i>
                    </ul> 
                    `).appendTo($(".big_box"))
                }

                $(".com:last i").remove()   
                $("a").not(".sign_red, .index").click(function(){
                    return false
                })

                // // 总价
                // // totalM()
                // function totalM(){
                //     var obj = $(".c1 a");
                //     var money = 0;
                //     var sum = 0;
                //     for(var i in obj){
                //         if (obj[i].className == "true"){
                //             var m = $(obj[i]).parents(".com").find(".money").html();
                //             var n = $(obj[i]).parents(".com").find(".txt").val();
                //             money += parseFloat(m);
                //             sum += parseInt(n);
                //         }
                //     }
                //     money = money.toFixed(2);
                //     $(".s2").html("￥" + money)
                //     $(".num").html(sum)
                // }


                $(".c1 a").click(function(){                   
                    if(this.className == "false"){
                        $(this).css("background", "#ff2832 url(../images/icon_sprite.png) no-repeat -65px -1px")
                        this.className = "true";
                        totalM();
                    }else{
                        $(this).css("background", "#fff");
                        this.className = "false";
                        totalM();
                    }
                })


                // $(".f1 a").click(function(){
                //     if(this.className == "false"){
                //         $(this).css("background", "#ff2832 url(../images/icon_sprite.png) no-repeat -65px -1px")
                //         $(".c1 a").css("background", "#ff2832 url(../images/icon_sprite.png) no-repeat -65px -1px")
                //         $(".c1 a").attr("class", "true")
                //         this.className = "true";
                //         totalM()

                //     }else{
                //         $(this).css("background", "#fff");
                //         this.className = "false";
                //     }
                // })


                // $("#a1").click(function(){
                //     if(this.className == "false"){
                //         $(this).css("background", "#ff2832 url(../images/icon_sprite.png) no-repeat -65px -1px")
                //         $(".c1 a").css("background", "#ff2832 url(../images/icon_sprite.png) no-repeat -65px -1px")
                //         $(".c1 a").attr("class", "true")
                //         this.className = "true";
                //     }else{
                //         $(this).css("background", "#fff");
                //         this.className = "false";
                //     }
                // })

                // 删除键
                $(".del").click(function(){
                    if(confirm("客官不要啊！！！")){
                        var str = $.cookie(goods);
                        var newArr = JSON.parse(str);
                        for(var i = 0; i < newArr.length; i++){
                            if($(this).parents(".com").attr("id") == newArr[i].id){
                               newArr.splice(i, 1);
                            }
                        }
                        $(this).parents(".com").remove();
                        if(newArr.length){
                            var newStr = JSON.stringify(newArr);
                            $.cookie(goods, newStr, {
                                expires: 4,
                                raw:true
                            })
                        }else{
                            $.cookie(goods, null)
                        }
                    }
                    if($.cookie(goods)){
                        var nnewStr = $.cookie(goods);
                        var nnewArr = JSON.parse(nnewStr);
                        var sum = 0
                        for(var i = 0; i < nnewArr.length; i++){
                            sum += parseInt(nnewArr[i].num)
                        }
                            localStorage.setItem("num", sum)
                    }else{
                        localStorage.setItem("num", 0)
                    }
                    totalM()
                    showNum()
                })

            },
            error: function(msg){
                alert(msg)
            }
        })
   }
}
// // 总价
//                 // totalM()
//                 function totalM(){
//                     var obj = $(".c1 a");
//                     var money = 0;
//                     var sum = 0;
//                     for(var i in obj){
//                         if (obj[i].className == "true"){
//                             var m = $(obj[i]).parents(".com").find(".money").html();
//                             var n = $(obj[i]).parents(".com").find(".txt").val();
//                             money += parseFloat(m);
//                             sum += parseInt(n);
//                         }
//                     }
//                     money = money.toFixed(2);
//                     $(".s2").html("￥" + money)
//                     $(".num").html(sum)
//                 }



    // 点击全选 top
        $(".f1 a").click(function(){
            if(this.className == "false"){
                $(this).css("background", "#ff2832 url(../images/icon_sprite.png) no-repeat -65px -1px")
                $(".c1 a").css("background", "#ff2832 url(../images/icon_sprite.png) no-repeat -65px -1px")
                $(".c1 a").attr("class", "true")
                this.className = "true";
                totalM()

            }else{
                $(this).css("background", "#fff");
                this.className = "false";
            }
        })

    // 点击全选 bottom，
        $("#a1").click(function(){
            if(this.className == "false"){
                $(this).css("background", "#ff2832 url(../images/icon_sprite.png) no-repeat -65px -1px")
                $(".c1 a").css("background", "#ff2832 url(../images/icon_sprite.png) no-repeat -65px -1px")
                $(".c1 a").attr("class", "true")
                this.className = "true";
            }else{
                $(this).css("background", "#fff");
                this.className = "false";
            }
        })
    
    $(".fg").on("mouseenter", ".hrn", function(){
        $(this).find(".add_goods").css("display", "block")
    })

    $(".fg").on("mouseleave", ".hrn", function(){
        $(this).find(".add_goods").css("display", "none")
    })

    // 推荐商品
    product_banner({
        label: ".nday li",
        node: ".product_list",
        stance:-958,
        prev:".kk .l1",
        next:".kk .l2",
        className:"active"

    })


    // lunbotu
    function product_banner({label, node, stance, prev, next, className}){
        var _this = 1;
        $(label).mouseover(function(){
            $(this).attr("class", className).siblings().attr("class", '')
            _this = $(this).html();
            $(node).stop(true, true).animate({
                left:stance * _this
            },1000)
        })

        // 点击上一页
        $(prev).click(function(){
            _this--;
            if(_this == 0){
                $(label).eq($(label).size() - 1).attr("class", className).siblings().attr("class", '')
                $(node).stop(true, true).animate({
                    left:stance * _this
                }, 500, function(){
                    $(node).css({
                        left:stance * $(label).size()
                    })
                })
                _this = $(label).size();
            }else{
                $(label).eq(_this - 1).attr("class", className).siblings().attr("class", '')
                $(node).stop(true, true).animate({
                    left:stance * _this
                }, 500)
            }              
        })
        
        // 点击下一页
        $(next).click(function(){
            _this++;
            if(_this == $(label).size() + 1){
                $(label).eq(0).attr("class", className).siblings().attr("class", '')
                $(node).stop(true, true).animate({
                    left:stance * _this
                }, 500, function(){
                    $(node).css({
                        left:stance
                    })
                })
                _this = 1;
            }else{
                $(label).eq(_this - 1).attr("class", className).siblings().attr("class", '')
                $(node).stop(true, true).animate({
                    left:stance * _this
                },500)
            }
      
        })
    }   



    // 加
    $(".big_box").on("click", ".add", function(){
        $(".reduce").css("background", "#e6dada")

        var str = $.cookie(goods);
        var newArr = JSON.parse(str);
        for(var i = 0; i < newArr.length; i++){
            if($(this).parents(".com").attr("id") == newArr[i].id){
                newArr[i].num++;
            }
        }
        var newStr = JSON.stringify(newArr);
        $.cookie(goods, newStr, {
            expires: 4,
            raw:true
        })

        var temp = $(this).siblings(".txt").val();
            temp++;
            $(this).siblings(".txt").val(temp)
            
            var m = parseInt(temp) * parseFloat($(this).parents(".com").find
           (".qian").html())
           m = m.toFixed(2);
           $(this).parents(".com").find(".money").html(m)
            
            totalM()
            showNum();
    })

    // 减
    $(".big_box").on("click", ".reduce", function(){
        var temp = $(this).siblings(".txt").val();
                temp--;
                
                var str = $.cookie(goods);
                var newArr = JSON.parse(str);
                if(temp == 0){
                    if(confirm("你是认真的吗？")){
                        for(var i = 0; i < newArr.length; i++){
                            if($(this).parents(".com").attr("id") == newArr[i].id){
                               newArr.splice(i, 1);
                            }
                        }
                        $(this).parents(".com").remove();
                    }else{
                        temp = 1;
                    }

                }else{
                    for(var i = 0; i < newArr.length; i++){
                        if($(this).parents(".com").attr("id") == newArr[i].id){
                            newArr[i].num--;
                        }
                    }
                }
                if(newArr.length){
                    var newStr = JSON.stringify(newArr);
                    $.cookie(goods, newStr, {
                        expires: 4,
                        raw:true
                    })
                }else{
                    $.cookie(goods, null)
                }
                
            $(this).siblings(".txt").val(temp)
            
            var m = parseInt(temp) * parseFloat($(this).parents(".com").find
            (".qian").html())
                 m = m.toFixed(2);
                 $(this).parents(".com").find(".money").html(m)
            showNum();
            totalM()
    })

})

