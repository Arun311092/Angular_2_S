<?php

require 'connect.php';
    
$students = [];
$sql = "SELECT id, name, marks FROM students ORDER BY marks DESC";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $students[$cr]['id']    = $row['id'];
    $students[$cr]['name'] = $row['name'];
    $students[$cr]['marks'] = $row['marks'];
    $cr++;
  }
    
  echo json_encode(['data'=>$students]);
}
else
{
  http_response_code(404);
}
