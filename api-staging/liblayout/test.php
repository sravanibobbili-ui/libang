<?php
/**
 * This file allows us to read machines from the mysql db
 * 
 */
date_default_timezone_set('America/Chicago');
require "../access/access.php";
include "ical.php";

$param=$_GET["param"];
$first_day_of_week = date('Ymd', strtotime('monday this week', time()))."T000000";
$last_day_of_week = date('Ymd', strtotime('sunday this week', time()))."T000000";
$schedule = [];
// $schedule[0]['title'] = 'unset';
//echo $first_day_of_week."<br/>".$last_day_of_week."<br/>";
function get_content($URL){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch,CURLOPT_USERAGENT,"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13");
    curl_setopt($ch, CURLOPT_URL, $URL);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

$getCal = get_content("https://outlook.office365.com/owa/calendar/68df7b71f953495bba2af5dcb30fc939@tamucc.edu/558bdc30b0a24dc6885fd7f064379ae83884673116367385842/calendar.ics");
// $getCal2 = stream_get_contents(fopen('https://outlook.office365.com/owa/calendar/68df7b71f953495bba2af5dcb30fc939@tamucc.edu/558bdc30b0a24dc6885fd7f064379ae83884673116367385842/calendar.ics', "rb"));
// $handle = @file_get_contents("https://outlook.office365.com/owa/calendar/68df7b71f953495bba2af5dcb30fc939@tamucc.edu/558bdc30b0a24dc6885fd7f064379ae83884673116367385842/calendar.ics", "r");
// $handle = @file_get_contents("calendar.ics", "r");

// var_dump($getCal);
// $error = error_get_last();
// var_dump($error);
// echo "error: " . $error['message'] . "\n";

$data= explode("BEGIN:VEVENT", $handle);

unset($data[0]);
$j=0;

$data=array_values($data);
foreach ($data as $key => $value) {
    $events[$key]=explode("\n", $value);
}

// get two weeks worth of schedule by getting the first day of the week and then adding 13 days to it.
$day = date('w');
$two_weeks_start = date('Y-m-d', strtotime('-' . $day . ' days'));
$two_weeks_close = date('Y-m-d', strtotime('+' . (6 - $day) . ' days'));

$iCal = new iCal($getCal);
$events = $iCal->eventsByDateBetween($two_weeks_start, $two_weeks_close);
// $events = $iCal->eventsByDate();
$i = 0;

foreach ($events as $date => $events) {

    foreach ($events as $event) {
        // strip $event->location() of all spaces
        $location = str_replace(' ', '', $event->location());
        
        if ($location === $param) {
            
            $schedule[$i]['title'] = $event->title();

            $schedule[$i]['location'] = $location;

            $schedule[$i]['startdate'] = $event->dateStart();
            $schedule[$i]['enddate'] = $event->dateEnd();

            $schedule[$i]['startdateonly'] = strtok($event->dateStart(), " ");
            $schedule[$i]['enddateonly'] = strtok($event->dateEnd(), " ");

            $schedule[$i]['starttime'] = date("g:i", strtotime($event->dateStart()));
            $schedule[$i]['endtime'] = date("g:i A", strtotime($event->dateEnd()));

            $schedule[$i]['dayOfWeek'] = date("l", strtotime($event->dateStart()));
            $schedule[$i]['startdateformatted'] = date('F d, Y', strtotime($event->dateStart()));
            $schedule[$i]['freeUntil'] = date('g:i A, l', strtotime($event->dateStart()));

            // $day = date('w', $event->dateStart());
            // $schedule[$i]['weekStart'] = date('m-d-Y', strtotime('-'.$day.' days'));
            // $schedule[$i]['weekClose'] = date('m-d-Y', strtotime('+'.(6-$day).' days'));

            $i++;
        }

        // echo '*Title: ' . $event->title() . "<br>";

        // echo '*Description: ' . substr($event->description(), 0, 55) . "<br>";
        // echo "<br>";
    }
}

// foreach ($events as $key => $value) {
//     $i = 0;
        
//     foreach ($value as $subkey => $subvalue) {
//         //echo $subvalue."<br/>";
        
//         $subValueArr=explode(":", $subvalue);
//         //if(!empty($subValueArr[0]))
//         //		echo $subValueArr[0]."@".$subValueArr[1]."<br/>";
        
//         if ($subValueArr[0]=="SUMMARY") {
//             $TITLE = trim($subValueArr[1]);

//             if (strpos($subValueArr[1], "Closed")!== false) {
//                 $subValueArr=explode(":", $value[$i+1]);
//                 $START = $subValueArr[1];
//                 $subValueArr=explode(":", $value[$i+2]);
//                 $END=$subValueArr[1];

//                 $sttime = " ";
//                 $entime = " ";
                
//                 if (strpos($START, "T")!== false) {
//                     $sttime = $START[9].$START[10].$START[11].$START[12];
//                     $entime = $END[9].$END[10].$END[11].$END[12];
//                 }
                
//                 $START = $START[0].$START[1].$START[2].$START[3].$START[4].$START[5].$START[6].$START[7];
//                 $END = $END[0].$END[1].$END[2].$END[3].$END[4].$END[5].$END[6].$END[7];
                
//                 if ($END>$last_day_of_week) {
//                     $END = $last_day_of_week;
                    
//                     if ($START < $first_day_of_week) {
//                         $START = $first_day_of_week;
//                     }
//                 }
                
//                 if ($START < $first_day_of_week && $first_day_of_week < $END) {
//                     $START = $first_day_of_week;
//                 }

                
//                 //echo $START."  ".$END."<br>";
                
//                 $STARTDATE=array(substr($START, 0, 4),substr($START, 4, 2),substr($START, 6, 2),"closed",$sttime);
//                 $ENDDATE=array(substr($END, 0, 4),substr($END, 4, 2),substr($END, 6, 2),"closed",$entime);
                
//                 $subValueArr=explode(":", $value[$i+9]);
//                 $LOCATION=str_replace(" ", "", strtoupper($subValueArr[1]));
                
//                 break;
//             }
//         }
//         if ($subValueArr[0]=="DTSTART;TZID=Central Standard Time") {
//             $START=$subValueArr[1];
//             $STARTDATE=array(substr($START, 0, 4),substr($START, 4, 2),substr($START, 6, 2),substr($START, 9, 2),substr($START, 11, 2));
//         }
//         if ($subValueArr[0]=="DTEND;TZID=Central Standard Time") {
//             $END=$subValueArr[1];
//             $ENDDATE=array(substr($END, 0, 4),substr($END, 4, 2),substr($END, 6, 2),substr($END, 9, 2),substr($END, 11, 2));
//         }
//         if ($subValueArr[0]=="LOCATION") {
//             $LOCATION=str_replace(" ", "", strtoupper($subValueArr[1]));
//         }

//         $i = $i+1;
//     }

//     if ($START>=$first_day_of_week && $END<=$last_day_of_week) {
//         $s = implode("#", $STARTDATE);
//         $e = implode("#", $ENDDATE);
//         //echo $LOCATION."  ".$s."  ".$e."<br/>";
//         $temp[]=rtrim($LOCATION)."#".implode("#", $STARTDATE)."#".implode("#", $ENDDATE);
//         if (rtrim($LOCATION) == $param) {
//             $date = $STARTDATE[0]."-".$STARTDATE[1]."-".$STARTDATE[2];
//             $start_12_hour_format  = date("g:i A", strtotime($STARTDATE[3].":".$STARTDATE[4]));
//             $end_12_hour_format  = date("g:i A", strtotime($ENDDATE[3].":".$ENDDATE[4]));
//             $schedule[$j]['location'] = rtrim($LOCATION);
//             $schedule[$j]['startdate'] = $STARTDATE;
//             $schedule[$j]['startdateonly'] = $date;
//             $schedule[$j]['starttime'] = $start_12_hour_format;
//             $schedule[$j]['month'] = date("F", strtotime($date));
//             $schedule[$j]['dayOfWeek'] = date("l", strtotime($date));
//             $schedule[$j]['endtime'] = $end_12_hour_format;
//             $schedule[$j]['enddate'] = $ENDDATE;
//             $schedule[$j]['enddateonly'] = $ENDDATE[0]."-".$ENDDATE[1]."-".$ENDDATE[2];
//             $schedule[$j]['title'] = $TITLE;
//             $j++;
//         }
//     }
// }

$eventsJsonObj['data'] = new ArrayObject();
$eventsJsonObj['data'] = $schedule;

echo json_encode($eventsJsonObj);

?>