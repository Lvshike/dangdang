<?php 
	header('content-type:text/html;charset="utf-8"');
	$username = $_POST["username"];
	$password = $_POST["password"];
	$repassword = $_POST["repassword"];
	$date = $_POST["date"];
	$respont = array("code" => 0,"message" => "");
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
	if(!$repassword){
		$respont["code"] = 3;
		$respont["message"] = "确认密码不能为空";
		echo json_encode($respont);
		exit;
	}
	if($password != $repassword){
		$respont["code"] = 4;
		$respont["message"] = "两次密码不一致";
		echo json_encode($respont);
		exit;
	}
	$link = mysql_connect("localhost","root","123456");
	if(!$link){
		$respont["code"] = 5;
		$respont["message"] = "数据库连接失败";
		echo json_encode($respont);
		exit;
	}
	mysql_set_charset("utf8");
	mysql_select_db("qd1904");
	$sql1 = "select * from users where usename='{$username}'";
	$res = mysql_query($sql1);
	$row = mysql_fetch_assoc($res);
	if($row){
		$respont["code"] = 6;
		$respont["message"] = "用户已存在";
		echo json_encode($respont);
		exit;
	}else{
		$str = md5(md5($password).'qingdao');
		$sql = "insert into users(usename,password,data) values('{$username}','{$str}',{$date})";
		$res = mysql_query($sql);
		if(!$res){
			$respont["code"] = 6;
			$respont["message"] = "数据导入失败";
			echo json_encode($respont);
			exit;
		}else{
			$respont["message"] = "注册成功";
			echo json_encode($respont);
		}
	}
	mysql_close($link);
 ?>