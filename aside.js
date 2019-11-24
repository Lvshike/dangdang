define(["jquery"], function($){
    function aside(){
        // var showHeight =  null;
        $(function(){
            $.ajax({
                url:"data/aside.json",
                dataType: "json",
                success:function(arr){
                    // alert(arr);
                    for(var i = 0; i < arr.length; i++){
                        var newArr = arr[i].h2;
                        if(newArr.length == 0){
                                $(`<div>
                                    <dl>
                                        <dt>
                                            <span>${arr[i].h1}</span>
                                        </dt>
                                    </dl>
                                </div>`).appendTo($(".one_left_body"))
                        }else{
                            $(`<div>
                                    <dl>
                                        <dt>
                                            <span>${arr[i].h1}</span>
                                        </dt>
                                        <dd>
                                            
                                        </dd>
                                    </dl>
                                </div>`).appendTo($(".one_left_body"))
                            for(var j = 0; j < newArr.length; j++){
                                $(`
                                    <a href="#">${newArr[j]}</a>
                                `).appendTo($(`.one_left_body div:eq(${arr[i].id}) dd`))
                            }
                        }


                        if(arr[i].id != "15"){
                            var divNode = $("<div></div>");
                                divNode.appendTo($(".show"));
                            var NNArr = arr[i].arr;
                            for(var k = 0; k < NNArr.length; k++){
                                var dlNode = $(`<dl>
                                        <dt>
                                            <span>${NNArr[k].title}</span>
                                        </dt>
                                        <dd>
                
                                        </dd>
                                    </dl>`)
                                    dlNode.appendTo(divNode)
                                var contentArr = NNArr[k].content;
                                for(var n = 0; n < contentArr.length; n++){
                                    var aNode = $(`<a>${contentArr[n]}</a>`);
                                        aNode.appendTo(dlNode.find("dd"))
                                }
                            }
                            if(arr[i].img){
                                $(`<img src = ${arr[i].img}></img>`).appendTo(divNode)
                            }
                        }
                        
                    }
                    
                    $(".one_left_body dl").eq(-1).css("borderBottomColor", "#fff");
                    $(".one_left_body dt span:last").css("background", "#fff");
                    $(".show div").eq(0).attr("class", "active")
                    

                },
                error:function(msg){
                    alert(msg)
                }
            })
        
        
        // 侧边栏划入效果
        $("#aside").mouseenter(function(){
            $(".show").css("display", "block")
        }).mouseleave(function(){
            $(".show").css("display", "none")
            $(".one_left_body div").attr("class", "");
            $(".one_left_body div dl").attr("id", "");
        })

        $(".one_left_body").on("mouseenter", "div", function(){
            var index = $(this).index();

            if(index != $(".one_left_body div:last").index()){

                // 选项卡改变显示的文本框
                $(".show div").eq(index).attr("class","active").siblings().attr("class", "")
                
                // 设置选项边框
                $(this).attr("class", "active").siblings().attr("class", "");

                var index = $(this).index();
                $(".one_left_body dl").eq(index - 1).attr("id", "hah").parents("div").siblings().find("dl").attr("id", "");

                // 改变显示框的定位
                // console.log($(this).position().top)
                // console.log($(this).outerHeight())
                // console.log($(".show").outerHeight())
                var _thisTop = Math.floor($(this).position().top);
                var _thisHeight = Math.floor($(this).outerHeight());
                var showHeight = Math.floor($(".show").outerHeight());
                
                var h = _thisHeight + _thisTop - showHeight;
                if(h > 0){
                    $(".show").css("top", h + 2)
                }else{
                    $(".show").css("top", 2)
                }

                
            }
            
        })
    }) 
    }
    
    //下拉菜单 
    function menuList(){
        
        $(function(){
            $.ajax({
                url:"data/menu.json",
                dataType:"json",
                success: function(arr){
                    for(var i = 0; i < arr.length; i++){
                        var menu_divNode = $("<div></div>");
                            menu_divNode.appendTo($(".nav_list .showBox"))
                        var new_arr = arr[i].arr;
                        for(var j = 0; j < new_arr.length; j++){
                            var menu_dlNode = $(`<dl>
                                    <dt>
                                        <span>${new_arr[j].title}</span>
                                    </dt>
                                <dd>
            
                                </dd>
                            </dl>`).appendTo(menu_divNode);
                            var new_content_arr = new_arr[j].content;
                            for(var k = 0; k < new_content_arr.length; k++){
                                $(`<a>${new_content_arr[k]}</a>`).appendTo(menu_dlNode.find("dd"));
                            }
                        } 
                    }
                },
                error: function(msg){
                    alert(msg);
                }
            })
            // 划入显示菜单
            $(".nav_top_list").mouseenter(function(){
                $(".nav_list").css("display", "block");
            }).mouseleave(function(){
                $(".nav_list").css("display", "none");
                $(".showBox").css("display", "none");
                $(".nav_list li").attr("class", "")
                
            })

            // 划入显示右侧框
            $(".nav_list").mouseenter(function(){
                $(".showBox").css("display", "block")
            })

            // li选项卡
            $(".nav_list li").mouseenter(function(){
                $(this).attr("class", "active").siblings("li").attr("class", "");
                var index = $(this).index();
                $(".showBox div").eq(index).css("display", "block").siblings().css("display", "none")
            })
        })
    }
    return {
        aside:aside,
        menuList:menuList
    }
})