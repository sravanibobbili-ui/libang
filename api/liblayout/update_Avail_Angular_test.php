<?php
/**
 * This file allows us to read machines from the mysql db
 * 
 */

date_default_timezone_set('America/Chicago');
require "../access/access.php";

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);

    // get the data into $request and store it in all the variables.
    $host_name = mysqli_real_escape_string($con,trim($request->host_name));
    $X = mysqli_real_escape_string($con,trim($request->x));
    $Y = mysqli_real_escape_string($con,trim($request->y));
}
$sql="update db_Avail_Angular set X=".$X.",Y=".$Y." where host_name = '$host_name'";
$data[0]['hn'] = $host_name;
$devArrObj['data'] = new ArrayObject();
    $devArrObj['data'] = $data;

    echo json_encode($devArrObj);
if (mysql_query($sql)) {
    http_response_code(201);
} else {
    http_response_code(422);
}

?>