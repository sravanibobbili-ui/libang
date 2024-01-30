<?php
include("../../includes/DBConnect.php");
include("../../includes/DBName.php");

//use this
//include("../../../includes/DBConnect.php");
//include("../../../includes/DBName.php");

// get working directory of this file
$containing_dir = $_SERVER["PHP_SELF"];
$isProd = true;

// if working directory contains api-staging then we are not in Production folder
if (strpos($containing_dir, 'api-staging') !== false) {
    $isProd = false;
}

// if production then use liblayout
if ($isProd === true) {
    $liblayoutDB = "liblayout";
    $exGenDB = "ex_gen";
    $exGenReceiptsDB = "ex_gen_receipts";
} else {
    $liblayoutDB = "liblayout_staging";
    $exGenDB = "ex_gen_test";
    $exGenReceiptsDB = "ex_gen_receipts_test";
}

$con = mysqli_connect($DBhost,$DBuser,$DBpass) or die("Unable to connect to database, A3C");

@mysqli_select_db($con, "$DBlogin") or die("Unable to select database $DBlogin");

?>
