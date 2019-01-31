<?php
require 'connect.php';

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
	
  if(trim($request->unique_id) == '')
  {
    return;
  }
    
  $uid   = mysqli_real_escape_string($con, trim($request->unique_id));

  $sql = "SELECT * FROM `students` WHERE `unique_id` ='{$uid}' LIMIT 1";

  $result = mysqli_query($con,$sql);
  $row = mysqli_fetch_assoc($result);
  
  $json = json_encode($row);
  echo $json;
}
exit;