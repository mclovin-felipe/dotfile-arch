// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
$("#puertos").change(function () {
  let api = $('#puertos').val();
  let fecha = new Date();
  let today = new Date(fecha.setDate(fecha.getDate() - 7));
  let mes = today.getMonth() + 1;
  mes = mes.toString()
  let dia = today.getDate().toString();
  if (dia.length === 1) {dia = "0" + dia}
  if (mes.length === 1) {
    mes = "0" + mes;
  } else {mes = mes.toString()}
  var date = today.getFullYear().toString() + mes + dia;
  
  $.ajax({

    method: "GET",
    url: `/dashboard/database/todos.php?api=${api}&fecha=${date}`
  }).done(dato => {
    let datos = $.parseJSON(dato);
    let datos_grafico = [];
    let label_grafico = [];
    for (let i = 0; i < datos.length; i++) {
      let label = datos[i]['log_origen'].split('LogAPI_');
      console.log(label);
      label = label[1].split('.')
      datos_grafico.push(label[0]);
      label_grafico.push(datos[i]['suma']);
    }
    var max = Math.max(...label_grafico);
    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: datos_grafico,
        datasets: [{
          label: "Accesos",
          backgroundColor: "rgba(2,117,216,1)",
          borderColor: "rgba(2,117,216,1)",
          data: label_grafico,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'fecha'
            },
            gridLines: {
              display: true
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: max + 20,
              maxTicksLimit: 5
            },
            gridLines: {
              display: true
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
  });
});
