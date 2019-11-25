require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "index":"index",
        "createNode": "createNode",
        "choose":"choose",
        "aside": "aside"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }
})

require(["index"], function(index){
    index.index();
})