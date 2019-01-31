<?php
require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{

  $request = json_decode($postdata);

  if(trim($request->data->name) === '' || (int)$request->data->marks < 1)
  {
    return http_response_code(400);
  }
	
	//Sanitize
	
  $name = mysqli_real_escape_string($con, trim($request->data->name));
  $marks = mysqli_real_escape_string($con, (int)$request->data->marks);
    

  $sql = "INSERT INTO `students`(`id`,`name`,`marks`) VALUES (null,'{$name}','{$marks}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $students = [
      'name' => $name,
      'marks' => $marks,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$students]);
  }
  else
  {
    http_response_code(422);
  }
}
