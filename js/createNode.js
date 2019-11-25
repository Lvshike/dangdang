define(["jquery"], function($){

    // 创建节点
    function createNode(arr, node){
        for(var i = 0; i < arr.length; i++){
            $(function(){
                $(`<li>
                    <a href="html/shopping.html" class="img"><img src="${arr[i].img}" alt=""></a>
                    <p class="alt"><a href="html/shopping.html">${arr[i].alt}</a></p>
                    <p class="author">${arr[i].author}</p>
                    <p class="price">
                        <span class="new">
                            <span class="new_sign">${arr[i].priceN[0]}</span><span class="new_num">${arr[i].priceN[1]}.</span><span class="new_tail">${arr[i].priceN[2]}</span>
                        </span>
                        <span class="old">
                            <span class="old_sign">${arr[i].priceO[0]}</span><span class="old_sign">${arr[i].priceO[1]}.</span><span class="old_sign">${arr[i].priceO[2]}</span>
                        </span>
                    </p>
                </li>`).appendTo($(node))
            })
        }
    }
    

    // product banner
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
        }).mouseover(function(){
            $(this).css("background", "url(./images/book_fanye_btn.png) 0 -49px no-repeat")
        }).mouseout(function(){
            $(this).css("background", "url(./images/book_fanye_btn.png) 0 0 no-repeat")
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
      
        }).mouseover(function(){
            $(this).css("background", "url(./images/book_fanye_btn.png) -26px -49px no-repeat")
        }).mouseout(function(){
            $(this).css("background", "url(./images/book_fanye_btn.png) -26px 0 no-repeat")
        })
    }   



    //banner;
    var num = 0;
    var timer = null;
    function banner(){

        // 点击下标切图
        $(".banner_box li").click(function(){
            $(this).attr("class", "active").siblings().attr("class", "")
            var _this = $(this).text();
            num = _this - 1;
            $(".one_banner_pic").css({
                left:-750 * (_this - 1)
            })
        })
        
        //l轮播图 
        timer = setInterval(function(){
            if(num == 10){
                num = 0;
            }
            $(".banner_box li").eq(num).attr("class", "active").siblings().attr("class", "")
            $(".one_banner_pic").css({
                left:-750 * num++
            })

        },2000)
        
        //划入暂停；划出继续 
        $(".one_banner_pic, .one_banner_label").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                if(num == 10){
                    num = 0;
                }
                $(".banner_box li").eq(num).attr("class", "active").siblings().attr("class", "")
                $(".one_banner_pic").css({
                    left:-750 * num++
                })
    
            },2000)
        })

    } 


    return {
        createNode: createNode,
        product_banner: product_banner,
        banner: banner
    }
})