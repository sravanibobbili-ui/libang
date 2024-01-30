<?php
/**
 * This file allows us to read machines from the mysql db
 * 
 */

date_default_timezone_set('America/Chicago');
require "../access/access.php";
$param=$_GET["param"];
$sql="select * from db_AvailabilityMap where location = '$param'";

if ($result = mysqli_query($con, $sql))  {
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $machines[$i]['ip_address'] = $row['ip_address'];
        $machines[$i]['host_name'] = $row['host_name'];
        $machines[$i]['location'] = $row['location'];
        $machines[$i]['position'] = $row['position'];
        $machines[$i]['status'] = $row['status'];
        $i++;
    }

    // create the data object and add the machines array to it
    $devArrObj['data'] = new ArrayObject();
    $devArrObj['data'] = $machines;

    echo json_encode($devArrObj);

} else {
    http_response_code(404);
}

?>
