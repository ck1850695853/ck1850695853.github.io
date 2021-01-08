<?php
require('./_connect.php');

//书写sql语句
$sql = "CREATE TABLE registers (
			product_id VARCHAR(300) NOT NULL PRIMARY KEY,
			product_name VARCHAR(30) NOT NULL,
			submission_date TIMESTAMP	
)";
$result = mysqli_query($conn,$sql);
if($result){
	echo "数据表创建成功";
}else{
	echo "数据表创建失败";
}

?>