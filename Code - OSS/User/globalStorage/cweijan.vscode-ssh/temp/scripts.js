/*!
    * Start Bootstrap - SB Admin v7.0.4 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener('click', event => {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    });
  }

});


$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: "/dashboard/database/api.php"
  }).done(data => {
    let puerto = $.parseJSON(data);
    let i = 0;
    puerto.map(data => {
      $("#puertos").append(`<option value="${data['puertos']}">${data['puertos']} </option>`)
    })
  });
  



  
  
});

$('#puertos').change(function () {
  $(".dataTable-wrapper").remove();
  $('#Servicios').remove();
  $("canvas").remove();
  $("table").remove();
  $("#nueva").append("<table class='table'></table>");
  let table = new simpleDatatables.DataTable(".table");
  $('#area').append('<center><select name="Servicios" id="Servicios" style="height:26px"><option value="nulo">Servicios</option></select></center><div id="areas"><canvas id="myAreaChart" width="100%" style="height=40"></canvas></div>')
  $('#barras').append('<canvas id="myBarChart" width="100%" style="height:50"></canvas>');
  $('#200cod').remove();
  $('#500cod').remove();
  $('#masuti').remove();
  $('#mayor').remove();
  $('#tiempomas').remove();
  $("p").remove();
  $("#add_descarga").remove();
  




  let api = $('#puertos').val();
  console.log(api);
  var today2 = new Date();
  let mes2 = today2.getMonth() + 1;
  mes2 = mes2.toString()
  let dia2 = (today2.getDate()-1).toString();
  if (dia2.length === 1) {dia2 = "0" + dia2}
  if (mes2.length === 1) {
    mes2 = "0" + mes2;
  } else {mes2 = mes2.toString()}
  var date1 = today2.getFullYear().toString() + mes2 + "01";
  var date2 = today2.getFullYear().toString() + mes2 + dia2;
  console.log(date1, date2);
  const fecha1 = `${today2.getFullYear().toString()}-${mes2}-${dia2}`;
  $('#descargar').append(`<div id="add_descarga"><label for="start">Inicio:</label>
  <input type="date" id="inicio" name="trip-start"
          value="${fecha1}"
          min="2000-01-01" max="${fecha1}">
          <label for="start">Ultimo dia:</label>
  <input type="date" id="final" name="trip-start"
          value="${fecha1}"
          min="2000-01-01" max="${fecha1}">
  <button class="csv btn btn-primary" id ="antiguos"  >Descargar</button>
  </div>`)
  
  $('#antiguos').click(()=>{
    $.ajax({
      method:"GET",
      url:`/dashboard/database/mes.php?api=${api}&fecha1=${$('#inicio').val()+" 00:00"}&fecha2=${$('#final').val()+" 23:59"}`
    }).done(datos => {
      const dato = $.parseJSON(datos);
      console.log(dato);
      function ConvertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }
    function download(filename, text) {
      var downloadfile = document.createElement('a');
      downloadfile.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      downloadfile.setAttribute('download', filename);
    
      downloadfile.style.display = 'none';
      document.body.appendChild(downloadfile);
    
      downloadfile.click();
    
      document.body.removeChild(downloadfile);
    }
    
    // Here you can Start file download.
    if($('#inicio').val()>$('#final').val()){
      alert("Revisa las fechas");
    }else{
    download(`${$('#inicio').val()}_${$('#final').val()}.csv`,ConvertToCSV(dato));
    }
    
    })
  });
  $.ajax({
    method: "GET",
    url: `/dashboard/database/mes.php?api=${api}&fecha1=${date1}&fecha2=${date2}`
  }).done(dato =>{
    
    let datos = $.parseJSON(dato);
    console.log(datos);
    //VARIABLES

    //SUCCESSS
    let cuantos = 0;
    //ERROR
    let errores = 0;
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
    //mayor tiempo
    let tiempo=[];
    
    for (let i = 0; i<datos.length;i++){
      //SUCESSSS
      if(datos[i]['estado']==="200"){
        //console.log(datos[i]['estado']);
        cuantos+=1;
      }
      //ERROR
      if(datos[i]['estado']==="500"){
        errores+=1;
      }
      //Repetidos
      if(datos[i]['enlace'].split("/").length>3){
        let servicio = datos[i]['enlace'].split('/')[3].split('?')[0];
        
        servicios.push(servicio);
      if (!servicios_padre.includes(servicio) && servicio!=undefined ) {
        servicios_padre.push(servicio);
      }
    }
    //MAYOR TIEMPO

    tiempo.push(datos[i]['tiempo_respuesta']);
    
    // //GRAFICO AREA
    // if (servicios_padre.includes(datos[i]['enlace'].split('/')[3].split('?')[0]) && datos[i]['enlace'].split('/')[3].split('?')[0]!=undefined) {
    //   let servicio = datos[i]['enlace'].split('/')[3].split('?')[0];
      
    //   //console.log(servicio);
      
    //     if(datos[i]['estado']==="500" || datos[i]['estado'] === "404" || datos[i]['estado']==="400"){
    //       servicio_veces.push(datos[i]['estado']);
    //       srv.push(datos[i]['fecha']);
        
    //   }
    // }
    // if(datos[i]['estado']==="500" || datos[i]['estado'] === "404" || datos[i]['estado']==="400"){
  

    // }
    }
    
    //SUCESSSS
    if(cuantos>0){
      $('#cod_200').append(`<div id="200cod" ><h3>Estado </h3><strong>200</strong><br><h4>Mes actual</h4><strong>${cuantos}</strong></div>`);
    }else{
      $('#cod_200').append(`<div id="200cod" ><p>No hay datos.</p></div>`);
    }
    //ERROR
    if(errores>0){
      $('#cod_500').append(`<div id="500cod" ><h3>Estado </h3><strong>500</strong><br><h4>Mes actual</h4><strong>${errores}</strong></div>`);
    }else{
      $('#cod_500').append(`<div id="500cod" ><p>No hay datos.</p></div>`);
    }
    //MAS UTILIZADO
    for (let i = 0; i < servicios_padre.length; i++) {
      repetidos.push(getOccurrence(servicios, servicios_padre[i]));
      }
      const max = Math.max(...repetidos);
  const index = repetidos.indexOf(max);
    if(repetidos.length>1){
      $("#mas_utilizado").append(`<div id="masuti" ><h3>Servicio mas utilizado</h3> <strong>${servicios_padre[index]}</strong>
      <h4>Cantidad de veces</h4><strong> ${repetidos[index]}</strong></div>`);
    
      }else{
        $('#mas_utilizado').append(`<div id="masuti" ><p>No hay datos.</p></div>`);
      }
      console.log(tiempo);
      const max2 = Math.max(...tiempo);
      
  const index2 = tiempo.indexOf(max2.toString()); 
  console.log(index2);  
      if(index2!=-1){
        $('#tiempo').append(`<div id="tiempomas"><h3>Servicio mas lento</h3><strong>${servicios[index2]}</strong><h3>Duracion</h3><strong>${max2}</strong></div>`)
      }else{
        $('#tiempo').append(`<div id="tiempomas" ><p>No hay datos.</p></div>`);
      }

  });

  

 
  function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
  }
  
  // $.ajax({
  //   method: "GET",
  //   url: `/database/data.php?num=${tipo}&fecha1=${fecha1}&hora1=${hora1}&fecha2=${fecha2}&hora2=${hora2}`,
  // }).done(data => {console.log(data); crearTabla(data)});
  
  
    
  
  
  $.ajax({
    method: "GET",
    url: `/dashboard/database/data.php?api=${api}&fecha=${date2}`
  }).done(data => {
    let result = $.parseJSON(data);
    let servicios = [];
    let servicios_padre = [];
    
    console.log(result);
    if (result.length > 0) {
      table.destroy();
       table = new simpleDatatables.DataTable(".table", {

        data: {
          headings: Object.keys(result[0]),
          data: result.map(item => Object.values(item))
        },
      })
   
      //CHART
      
      
      let servicio_veces = [];
        let srv = [];
        let repetidos = [];
      //$("#puertos").append(`<option value="${data['puertos']}">${data['puertos']} </option>`)
      
      
      //console.log(index, servicios_padre[index], repetidos[index]);
      //console.log(servicios);
      
      
    //   console.log(dat);
    // let datos = $.parseJSON(dato);
    // let datos_grafico = [];
    // let label_grafico = [];
    // for (let i = 0; i < datos.length; i++) {
    //   datos_grafico.push(datos[i]['log_origen']);
    //   label_grafico.push(datos[i]['suma']);
    // }
    // console.log(datos_grafico);
    // console.log(label_grafico);

    

      
    }
  })
});


function crearTabla(data) {
  var result = $.parseJSON(data);
  let tabla = $("#datatableSimple").DataTable({
    scrollCollapse: true,
    searching: false,
    destroy: true,
    retrieve: true,
    searchPanes: {
      viewTotal: true
    },
    dom: 'Plfrtip',
  });
  let metodos = [];
  tabla.clear();
  $.each(result, function (key, value) {

    tabla.row
      .add([
        value["log_origen"],
        value["fecha"],
        value["metodo"],
        value["enlace"],
        value["estado"],
        value["tiempo_respuesta"],
        value["IP_cliente"],
        value["largo_peticion"],
      ])
      .draw();
  });
}
