<?php
require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);
	
  if ((int)$request->data->id < 1 || trim($request->data->name) == '' || (int)$request->data->marks < 1) {
    return http_response_code(400);
  }

  $id    = mysqli_real_escape_string($con, (int)$request->data->id);
  $name = mysqli_real_escape_string($con, trim($request->data->name));
  $marks = mysqli_real_escape_string($con, (int)$request->data->marks);

  $sql = "UPDATE `students` SET `name`='$name',`marks`='$marks' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}
