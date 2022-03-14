
<?php 
include("config.php");


$result = $conn->query("SELECT * FROM API_".$_GET['api']." WHERE log_origen = 'LogAPI_".$_GET["fecha"].".log'");
// $result = $conn->query("SELECT * FROM API_".$_GET['api']." WHERE fecha BETWEEN '".$_GET['fecha1']."' AND '".$_GET['fecha2']."'");



$data = array();
 while($row = $result->fetch_assoc()){
  $row_data = array(
   'log_origen' => $row['log_origen'],
   'fecha' => $row['fecha'],
    'metodo' => $row['metodo'],
    'enlace' => $row['enlace'],
    'estado' => $row['estado'],
    'tiempo_respuesta' => $row['tiempo_respuesta'],
    'IP_cliente' => $row['IP_cliente'],
    'largo_peticion' => $row['largo_peticion']
   );
  array_push($data, $row_data);
 }
//$fecha = strtotime($fecha) + strtotime("1 days");
 echo json_encode($data);
?>
