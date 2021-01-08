<?php
require('./model/_connect.php');

$id = $_REQUEST['id'];
$type = $_REQUEST['type'];

$sql = "SELECT * FROM `shops` WHERE `product_id`='$id'";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($res);
$num = $row['product_num'];
if($type=='add'){	
	$num = $num+1;
	$sql = "UPDATE `shops` SET `product_num`='$num' WHERE `product_id`='$id'";
}else if($type=='cut'){
	$num = $num-1;
	if($num>0){
		$sql = "UPDATE `shops` SET `product_num`='$num' WHERE `product_id`='$id'";
	}
}

$result = mysqli_query($conn,$sql);
if($result){
	echo json_encode(array("code"=>1));
}else{
	echo json_encode(array("code"=>0));
}
?>