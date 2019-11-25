<?php 
	header('content-type:text/html;charset="utf-8"');
	$respont = array("code" => 0, "message" => "");
	$username = $_POST["username"];
	$password = $_POST["password"];

	if(!$username){
		$respont["code"] = 1;
		$respont["message"] = "用户名不能为空";
		echo json_encode($respont);
		exit;
	}
	if(!$password){
		$respont["code"] = 2;
		$respont["message"] = "密码不能为空";
		echo json_encode($respont);
		exit;
	}
	$link = mysql_connect("localhost","root","123456");
	if(!$link){
		$respont["code"] = 3;
		$respont["message"] = "数据库连接失败";
		echo json_encode($respont);
		exit;
	}
	mysql_set_charset("utf8");
	mysql_select_db("qd1904");
	$str = md5(md5($password)."qingdao");
	$sql = "select * from users where usename='{$username}' and password='{$str}'";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	if(!$row){
		$respont["code"] = 4;
		$respont["message"] = "登录失败";
		echo json_encode($respont);
		exit;
	}else{
		$respont["message"] = "登录成功";
		echo json_encode($respont);
	}
	mysql_close($link);
 ?>