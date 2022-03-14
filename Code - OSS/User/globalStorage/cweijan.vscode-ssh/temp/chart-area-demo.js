// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
$('#puertos').change(function () {
  //TIEMPO
  let servicios = [];
  let servicios_padre = [];
  let servicio_veces = [];
  let srv = [];
  let fechas = [];
  let repetidos = [];
  function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
  }
  let api = $('#puertos').val();
  let fecha = new Date();
  
  let today1 =  new Date(fecha.setDate(fecha.getDate() -1));
  let mes1 = today1.getMonth() + 1;
  mes1 = mes1.toString()
  let dia1 = today1.getDate().toString();
  if (dia1.length === 1) {dia1 = "0" + dia1}
  if (mes1.length === 1) {
    mes1 = "0" + mes1;
  } else {mes1 = mes1.toString()}
  var date1 = today1.getFullYear().toString() + mes1 + dia1;


  
  let today = new Date(fecha.setDate(fecha.getDate() - 7));
  let mes = today.getMonth() + 1;
  mes = mes.toString()
  let dia = today.getDate().toString();
  if (dia.length === 1) {dia = "0" + dia}
  if (mes.length === 1) {
    mes = "0" + mes;
  } else {mes = mes.toString()}
  var date = today.getFullYear().toString() + mes + dia;
  console.log(date1,date);
  $.ajax({
    method: "GET",
    url: `/dashboard/database/mes.php?api=${api}&fecha1=${date}&fecha2=${date1}`
  }).done(dato =>{
    const datos = $.parseJSON(dato);
    console.log(datos);
  for (let i = 0; i<datos.length;i++){
    if(datos[i]['enlace'].split("/").length>3){
    let servicio = datos[i]['enlace'].split('/')[3].split('?')[0];
    
    servicios.push(servicio);
    if (!servicios_padre.includes(servicio) && servicio!=undefined ) {
      servicios_padre.push(servicio);
      $("#Servicios").append(`<option value="${servicio}">${servicio} </option>`)
       
    }
    servicio_veces.push(datos[i]['enlace'].split('/')[3].split('?')[0]);
      srv.push(datos[i]['estado']);
      fechas.push(datos[i]['fecha']); 
  }
  }
  console.log(srv);
    console.log( servicio_veces, fechas);
    let y = [];
    let x = [];
    $("#Servicios").val(servicios_padre[0]);
    for (let i = 0;i<servicio_veces.length;i++){
      if(servicio_veces[i]===$("#Servicios").val()){
        x.push(fechas[i]);
        y.push(srv[i]);
      }
    }
    let area = crearGrafico(x, y, date, date1);
    
    $('#Servicios').change(function(){
      area.destroy();
     y = [];
     x = [];
    for (let i = 0;i<servicio_veces.length;i++){
      if(servicio_veces[i]===$("#Servicios").val()){
        x.push(fechas[i]);
        y.push(srv[i]);
      }
    }
    console.log(x, y);
    area  = crearGrafico(x, y,date, date1);
    });
  });
  
});
function crearGrafico(srv, servicio_veces, date1, date2){
  
  var ctx = document.getElementById("myAreaChart");
      
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: srv,
        datasets: [{
          label: "Estado ",
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: servicio_veces,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false
            },
            ticks: {
              min: date1,
              max: date2,
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 600,
              maxTicksLimit: 5
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: false
        }
      }

    });
    return myLineChart;
}
