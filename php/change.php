<?php
    header('content-type:text/html;charset="utf-8"');
    $respont = array("code" => 0, "msg" => "");

    $username = $_GET["username"];

    $old = $_GET["oldpassword"];

    $new = $_GET["newpassword"];

    $str = md5(md5($old)."qingdao");

    $newstr = md5(md5($new)."qingdao");

    $link = mysql_connect("localhost", "root", "123456");

    if($old == $new){
        $respont["code"] = "1";
        $respont["msg"] = "新密码不能和原密码一致";
        echo json_encode($respont);
    }

    if(!$link){
        $respont["code"] = "2";
        $respont["msg"] = "数据库连接失败";
        echo json_encode($respont);
    }

    mysql_set_charset("utf8");

    mysql_select_db("qd1904");

    $sql = "select * from users where usename='$username'and password='$str'";
    
    $res = mysql_query($sql);

    $row= mysql_fetch_assoc($res);

    if($row){
        $sql = "update users set password='$newstr' where usename='$username'and password='$str'";
        
        $result = mysql_query($sql);

        if($result){
            $respont["msg"] = "密码修改成功";
            echo json_encode($respont);
        }
    }else{
        $respont["code"] = "3";
        $respont["msg"] = "原密码错误";
        echo json_encode($respont);
    }
    mysql_close($link);

?>