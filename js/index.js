define(["createNode", "choose", "aside", "jquery", "jquery-cookie"], function(createNode, choose, aside, $){
    function index(){
        $(function(){
            $.ajax({
                url: "data/data.json",
                dataType: "json",
                success: function(obj){
                    // 新书上架；
                    var arrf = obj.first;
                    var arrs = obj.second;
                    var arrt = obj.third;
                    var arrfour = obj.four;
                    createNode.createNode(arrf, ".product_first")
                    createNode.createNode(arrs, ".product_second")
                    createNode.createNode(arrt, ".product_third")
                    createNode.createNode(arrfour, ".product_four")
                    createNode.createNode(arrf, ".product_five")
                    createNode.createNode(arrfour, ".product_six")
                    
                    //新书预售
                    var arrFive = obj.five;
                    var arrSix = obj.six;
                    var arrSeven = obj.seven;
                    createNode.createNode(arrSeven , ".lunbotu_1");
                    createNode.createNode(arrFive , ".lunbotu_2");
                    createNode.createNode(arrSix , ".lunbotu_3");
                    createNode.createNode(arrSeven , ".lunbotu_4");
                    createNode.createNode(arrFive , ".lunbotu_5");
                    
                    //新书热卖榜 
                    var arrEight = obj.eight;
                    var arrNine = obj.nine;
                    var arrTen = obj.ten;
                    var arrEleven = obj.eleven;
                    var arrTwelve = obj.twelve;
                    choose.newNode(arrEight,".list_box #first, .content_two .two_list_box #first, .content_three .two_list_box #first")
                    choose.newNode(arrNine,".list_box #second, .content_two .two_list_box #second, .content_three .two_list_box #second")
                    choose.newNode(arrTen,".list_box #third, .content_two .two_list_box #third, .content_three .two_list_box #third")
                    choose.newNode(arrEleven,".list_box #four, .content_two .two_list_box #four, .content_three .two_list_box #four")
                    choose.newNode(arrTwelve,".list_box #five, .content_two .two_list_box #five, .content_three .two_list_box #five")
                    $("#first, #second, #third, #four, #five").find(".explore:eq(0)").find(">p").attr("class", "normal")
                    $("#first, #second, #third, #four, #five").find(".explore:eq(0)").find("div").attr("class", "wahaha")
                },
                error: function(msg){
                    alert(msg)
                }
            })
            // 新书上架
            createNode.product_banner({
                label: ".one_center_bottom li", 
                node: ".one_product_list",
                stance: -750,
                prev: ".one_center_prev",
                next: ".one_center_next",
                className: "productBanner"
            })

            // 新书预售
            createNode.product_banner({
                label: ".middle_content_banner_bottom li", 
                node: ".lunbotu_box",
                stance: -238,
                prev: ".middle_content_banner_left",
                next: ".middle_content_banner_right",
                className: "bottom_label"
            })
            
            // banner;
            createNode.banner();
            // 新书热卖榜 选项卡
            choose.choose(".content_list", ".list_box");
            // 图书畅销榜
            choose.choose(".content_two .two_content_list", ".content_two .two_list_box");
            // 图书畅销榜
            choose.choose(".content_three .two_content_list", ".content_three .two_list_box");
            // 侧边栏
            aside.aside();
            // 下拉菜单；
            aside.menuList();
            // 独家特供
            choose.choose_(".content_two");
            // 独家特供
            choose.choose_(".content_three");
             // 确认登录
             var str = localStorage.getItem("username");
                if(str){
                    $(".sign_red").html(str).click(function(){
                        $(".ww, .change").css("display", "inline-block")
                        if(!$(".sign_red").find(".ww").size()){
                            $("<span class='ww'>退出</span>  <span class='change'>修改密码</span>").appendTo($(".sign_red"));
                        }
                        
                        return false
                    }).mouseleave(function(){
                        $(".ww, .change").css("display", "none")
                    }).on("click", ".ww", function(ev){
                        localStorage.removeItem("username")
                        location.assign("html/login.html");
                        ev.stopPropagation()
                    })
                    // 修改密码；
                    $(".sign_red").on("click", '.change', function(){
                        location.assign("html/change.html")
                        // 
                    })

                    $(".hua").html("欢迎光临当当，尊敬的用户：")
                    $(".ndy").html("")
                }

                // 购物车商品数量
                var newStr = localStorage.getItem(str)
                if(newStr){
                    $("#goods_num").html(newStr)
                }
        })
       
    }
    return {
        index: index,
    }
})