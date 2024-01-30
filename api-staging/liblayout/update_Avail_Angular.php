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
    $host_name = mysqli_real_escape_string($con, trim($request->host_name));
    $X = mysqli_real_escape_string($con, trim($request->x));
    $Y = mysqli_real_escape_string($con, trim($request->y));
}

$sql = "SELECT * FROM '$liblayoutDB' WHERE host_name = '$host_name'";
$hostNameFound = false;
$hostNameUpdated = false;

if (mysqli_query($con, $sql)) {
    $hostNameFound = true;
    http_response_code(201);
} else {
    http_response_code(422);
}

if ($hostNameFound) {
    $sql = "UPDATE $liblayoutDB SET X = '$X', Y = '$Y' WHERE host_name = '$host_name'";
    if (mysqli_query($con, $sql)) {
        http_response_code(201);
        $hostNameUpdated = true;
    } else {
        http_response_code(422);
    }
} else {
    $strippedHostName = strtok($host_name, '-');
    // echo $strippedHostName;
    $sql = "UPDATE $liblayoutDB SET host_name = '$host_name', X = '$X', Y = '$Y' WHERE host_name LIKE '$strippedHostName%'";

    if (mysqli_query($con, $sql)) {
        http_response_code(201);
        $hostNameUpdated = true;
    } else {
        http_response_code(422);
    }
}

// if (!$hostNameUpdated) {
//     $sql = "INSERT INTO liblayout (host_name,x,y) VALUES($host_name,$X,$Y)";
//     if (mysqli_query($con, $sql)) {
//         http_response_code(201);
//     } else {
//         http_response_code(422);
//     }
// }

// $sql="UPDATE db_Avail_Angular SET X=".$X.",Y=".$Y." WHERE host_name = '$host_name'";

// if (mysqli_query($con, $sql)) {
//     http_response_code(201);
// } else {
//     http_response_code(422);
// }

?>