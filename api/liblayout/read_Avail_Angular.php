<?php
/**
 * This file allows us to read machines from the mysql db
 * test3
 */

date_default_timezone_set('America/Chicago');
require "../access/access.php";
$param=$_GET["param"];

// $sql="select * from db_Avail_Angular where location = '$param'";
// $sql = "SELECT * FROM db_AvailabilityMap LEFT JOIN liblayout USING (host_name) where db_AvailabilityMap.location = '$param'";
$sql = "SELECT db_AvailabilityMap.*, $liblayoutDB.x, $liblayoutDB.y FROM db_AvailabilityMap LEFT JOIN $liblayoutDB USING (host_name) where db_AvailabilityMap.location = '$param'";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;
    $ycount = 2;

    while ($row = mysqli_fetch_assoc($result)) {
        $machines[$i]['ip_address'] = $row['ip_address'];
        $machines[$i]['host_name'] = $row['host_name'];
        $machines[$i]['location'] = $row['location'];
        $machines[$i]['position'] = $row['position'];
        $machines[$i]['status'] = $row['status'];
        if ($row['x'] == null) {
            $row['x'] = 0;
            $row['y'] = $ycount;
            $ycount++;
        }
        $machines[$i]['X'] = $row['x'];
        $machines[$i]['Y'] = $row['y'];
        $i++;
    }

    // create the data object and add the machines array to it
    $devArrObj['data'] = new ArrayObject();
    $devArrObj['data'] = $machines;

    echo json_encode($devArrObj);

} else {
    // http_response_code(422);
    echo ("Error description: " . mysqli_error($con));
    if (!$liblayoutDB) {
        echo ("<br>Error: \$liblayoutDB is not set. Please check ../access/access.php");
    }
}

?>