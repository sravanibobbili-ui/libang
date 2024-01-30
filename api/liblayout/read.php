<?php

date_default_timezone_set('America/Chicago');
require "../access/access.php";

// get all the data from the table ex_gen
$sql="SELECT first_name, last_name, email, ext, vita_url
        from  LIB_staff_directory.staff_id";

if ($result = mysqli_query($con, $sql))  {
    $i = 0;
                                           
    while ($row = mysqli_fetch_assoc($result)) {
        $devices[$i]['first_name'] = $row['first_name'];
        $devices[$i]['last_name'] = $row['last_name'];
        $devices[$i]['email'] = $row['email'];
        $devices[$i]['ext'] = $row['ext'];
        $devices[$i]['vita_url'] = $row['vita_url'];
        $i++;
    }

    // create the data object and add the devices array to it.
    $devArrObj['data'] = new ArrayObject();
    $devArrObj['data'] = $devices;

    // encodes the ArrayObject into json.
    echo json_encode($devArrObj);

} else {
    http_response_code(404);
}

?>
