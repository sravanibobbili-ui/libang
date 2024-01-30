<?php
date_default_timezone_set('America/Chicago');
//$first_day_of_week = date('Ymd', strtotime('Last Monday', time()))."T000000";
//$last_day_of_week = date('Ymd', strtotime('Next Saturday', time()))."T000000";
$first_day_of_week = date('Ymd', strtotime('monday this week', time()))."T000000";
$last_day_of_week = date('Ymd', strtotime('sunday this week', time()))."T000000";

//echo $first_day_of_week."<br/>".$last_day_of_week."<br/>";

$handle = @file_get_contents("http://outlook.office365.com/owa/calendar/68df7b71f953495bba2af5dcb30fc939@tamucc.edu/558bdc30b0a24dc6885fd7f064379ae83884673116367385842/calendar.ics", "r");
$data= explode("UID:", $handle);

unset($data[0]);
$j=0;
$data=array_values($data);
foreach ($data as $key => $value) {
    $events[$key]=explode("\n", $value);
}
foreach ($events as $key => $value) {
    $i = 0;
        
    foreach ($value as $subkey => $subvalue) {
        //echo $subvalue."<br/>";
        
        $subValueArr=explode(":", $subvalue);
        //if(!empty($subValueArr[0]))
        //		echo $subValueArr[0]."@".$subValueArr[1]."<br/>";
        
        if ($subValueArr[0]=="SUMMARY") {
            if (strpos($subValueArr[1], "Closed")!== false) {
                $subValueArr=explode(":", $value[$i+1]);
                $START = $subValueArr[1];
                $subValueArr=explode(":", $value[$i+2]);
                $END=$subValueArr[1];

                $sttime = " ";
                $entime = " ";
                
                if (strpos($START, "T")!== false) {
                    $sttime = $START[9].$START[10].$START[11].$START[12];
                    $entime = $END[9].$END[10].$END[11].$END[12];
                }
                
                $START = $START[0].$START[1].$START[2].$START[3].$START[4].$START[5].$START[6].$START[7];
                $END = $END[0].$END[1].$END[2].$END[3].$END[4].$END[5].$END[6].$END[7];
                
                if ($END>$last_day_of_week) {
                    $END = $last_day_of_week;
                    
                    if ($START < $first_day_of_week) {
                        $START = $first_day_of_week;
                    }
                }
                
                if ($START < $first_day_of_week && $first_day_of_week < $END) {
                    $START = $first_day_of_week;
                }

                
                //echo $START."  ".$END."<br>";
                
                $STARTDATE=array(substr($START, 0, 4),substr($START, 4, 2),substr($START, 6, 2),"closed",$sttime);
                $ENDDATE=array(substr($END, 0, 4),substr($END, 4, 2),substr($END, 6, 2),"closed",$entime);
                
                $subValueArr=explode(":", $value[$i+9]);
                $LOCATION=str_replace(" ", "", strtoupper($subValueArr[1]));
                
                break;
            }
        }
        if ($subValueArr[0]=="DTSTART;TZID=Central Standard Time") {
            $START=$subValueArr[1];
            $STARTDATE=array(substr($START, 0, 4),substr($START, 4, 2),substr($START, 6, 2),substr($START, 9, 2),substr($START, 11, 2));
        }
        if ($subValueArr[0]=="DTEND;TZID=Central Standard Time") {
            $END=$subValueArr[1];
            $ENDDATE=array(substr($END, 0, 4),substr($END, 4, 2),substr($END, 6, 2),substr($END, 9, 2),substr($END, 11, 2));
        }
        if ($subValueArr[0]=="LOCATION") {
            $LOCATION=str_replace(" ", "", strtoupper($subValueArr[1]));
        }

        $i = $i+1;
    }
    if ($START>=$first_day_of_week && $END<=$last_day_of_week) {
        $s = implode("#", $STARTDATE);
        $e = implode("#", $ENDDATE);
        //echo $LOCATION."  ".$s."  ".$e."<br/>";
        $temp[]=rtrim($LOCATION)."#".implode("#", $STARTDATE)."#".implode("#", $ENDDATE);
        $schedule[$j]['location'] = $LOCATION;
        $schedule[$j]['startdate'] = $STARTDATE;
        $schedule[$j]['enddate'] = $ENDDATE;
        $j++;
    }
}
$devArrObj['data'] = new ArrayObject();
    $devArrObj['data'] = $schedule;

    echo json_encode($devArrObj);
header("Location:schedule.php?param=$schedule");
  exit();
