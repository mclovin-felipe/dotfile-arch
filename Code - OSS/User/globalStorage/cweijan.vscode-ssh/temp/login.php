<?php
   include("config.php");
   session_start();
      if($_SERVER["REQUEST_METHOD"] == "POST") {
      $sql = "SELECT id FROM admin WHERE username = '".$_POST['username']."' and password = '".$_POST['password']."'";
      $result = $conn->query($sql);
      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);

      $count = mysqli_num_rows($result);
	  $error = "";
      if($count == 1) {
         $_SESSION['login_user'] = $_POST['username'];

         header("location: ./routes/index.php");
      }else {
         
		 $error = '<div class="p-3 mb-2 bg-danger text-white">Revisa tus credenciales</div>';

      }
      }
?>
<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Dashboard FALP - Login</title>
        <link href="./routes/css/styles.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    </head>
    <body class="" style="background-color:#004A91;">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                        <form action= "" method="POST">
                                            <div class="form-floating mb-3">
                                                <input class="form-control" style="height: 45px;" id="text" name="username" type="text" placeholder="name@example.com" />
                                                <label for="inputEmail">Usuario</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input class="form-control" style="height: 45px;"name = "password" id="inputPassword" type="password" placeholder="Password" />
                                                <label for="inputPassword">Pass</label>
                                            </div>
					<center>
					<input class= "btn" type = "submit" value = "Ingresar"/><br />
                    <?php echo $error ?>
					</center>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </main>
                
            </div>
            <div id="layoutAuthentication_footer">
			<?php include("./routes/footer.php") ?>
            </div>
  
</div>
            
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="./routes/js/scripts.js"></script>
    </body>
</html>
