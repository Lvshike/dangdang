define(["jquery"], function($){
    // 选项卡
    function choose(node1, node2){
        $(node1).find("li").find("span").mouseenter(function(){
            $(this).attr("class", "active").parents("li").siblings().find("span").attr("class", "");
            var index = $(this).parents("li").index();
            $(node2).find("ul").eq(index).attr("class", "active").siblings().attr("class", "");
        })
        
        $(node2).find("ul").on("mouseenter", ".explore", function(){
            $(this).find(">p").attr("class", "normal").parents("li").siblings().find(">p").attr("class", "");
            $(this).find(">div").attr("class", "wahaha").parents("li").siblings().find(">div").attr("class", "")
        })
    }

    function newNode(arr, node){
        for (var i = 0; i < arr.length; i++){
            $(`<li class="explore">
                <p>
                    <span>${arr[i].id}</span>
                    <a href="">${arr[i].alt}</a>
                </p>
                <div>
                    <span>${arr[i].id}</span>
                    <article>
                        <a href="#" class="img"><img src="${arr[i].img}" alt=""></a>
                        <p class="alt"><a href="#">${arr[i].alt}</a></p>
                        <p class="author">${arr[i].author}</p>
                        <p class="price">
                            <span class="new">
                                <span class="new_sign">${arr[i].priceN[0]}</span><span class="new_num">${arr[i].priceN[1]}.</span><span class="new_tail">${arr[i].priceN[2]}</span>
                            </span>
                            <span class="old">
                                <span class="old_sign">${arr[i].priceO[0]}</span><span class="old_sign">${arr[i].priceO[1]}.</span><span class="old_sign">${arr[i].priceO[2]}</span>
                            </span>
                        </p>
                    </article>
                </div>
            </li>`).appendTo($(node))
        }
        
    }

    function choose_(node){
        $.ajax({
            url:"data/content_two.json",
            dataType: "json",
            success: function(arr){
                for(var i = 0; i < arr.length; i++){
                    var divNode = $("<div></div>")
                    var newArr = arr[i];
                    divNode.appendTo($(node).find(".left_content"))
                    // divNode.appendTo($(".content_three .left_content"))
                    for(var j = 0; j < newArr.length; j++){
                        $(`
                        <dl>
                            <dt>
                                <img src=${newArr[j].img} alt="">
                            </dt>
                            <dd>
                                <p class="hh">${newArr[j].title}</p>
                                <p class="book_logo hh">${newArr[j].logo}</p>
                                <p class="new">
                                    <span>${newArr[j].priceNew[0]}</span><span>${newArr[j].priceNew[1]}.</span><span>${newArr[j].priceNew[2]}</span>
                                </p>
                                <p class="old">
                                    <span>${newArr[j].priceOld[0]}</span><span>${newArr[j].priceOld[1]}.</span><span>${newArr[j].priceOld[2]}</span>
                                </p>
                            </dd>
                        </dl>
                        `).appendTo(divNode)
                    }
                }
            },
            error: function(){

            }
        })
        $(node).find(".left_head").find("li").mouseenter(function(){
            $(this).attr("class", "active").siblings().attr("class", "")
            var index = $(this).index();
            $(node).find(".left_content div").eq(index).css("display", "block").siblings().css("display", "none")
        });
    }
    // 
    return {
        choose: choose,
        newNode: newNode,
        choose_:choose_
    }
})