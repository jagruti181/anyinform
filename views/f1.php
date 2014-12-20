<html>
<head>

    <link rel="stylesheet" type="text/css" href="../lib/css/main.css" />
    <style>
        body{
        background: white;
         }
    </style>
</head>
<body style="background:rgba(246, 248, 250, 1);">

<form method="POST" enctype="multipart/form-data">
<?php
$path="../../foranyinformation/uploads/C4.mp4";
if(isset($_POST['reg']))
{
$fname=$_FILES['a']['name'];
$fsize=$_FILES['a']['size'];
$ftype=$_FILES['a']['type'];
$ext=explode('.',$fname);
$ftmp=$_FILES['a']['tmp_name'];
$randno=rand();
$storage_path="../../foranyinformation/uploads/".$_GET['id'].$randno.".".$ext[1];
if(move_uploaded_file($ftmp,$storage_path))
{
//echo "file uploaded";
    $path=$storage_path;
}
}
?>

       <?php
echo "<img src=".$path." height='200px' width='200px' style='display:none;'>"
    ?>

<br><input type="file" name="a"/>
<p>
    <input type="submit" class="btn btn-info" name="reg" value="Save Video"/></p>
</form>

</body>
</html>
