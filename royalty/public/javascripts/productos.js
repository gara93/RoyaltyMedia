console.log("Javascript Loaconsole.log("Javascript Loaded");



$('#insertar').bind('click', function (e) {
  $.ajax("/api/insertarCarrito"+ des,{

    "method":"GET",
    "data":{},
    "dataType":"json",
    "success":function(jsonDoc,status,jqXHR){
        console.log(jsonDoc);
        alert("Historia Ingresada!");
        console.log("exitoso");
        },
    "error":function(jqXHR,status, errorMsg){
        console.log(errorMsg);
    }
  });

});


$('#autentificar').bind('click', function (e) {
  $.ajax("/api/obtenerUsuario",{

    "method":"post",
    "data":{},
    "dataType":"json",
    "success":function(jsonDoc,status,jqXHR){
        console.log(jsonDoc);
        console.log("exitoso");
        },
    "error":function(jqXHR,status, errorMsg){
        console.log(errorMsg);
    }
  });

});








$("#perfil").on("pagecreate",function(e){
    var librosList = $("#librosList");
    $.ajax("/api/obtenerProductos",
            {
                "method":"GET",
                "data":{},
                "dataType":"json",
                "success":function(jsonDoc,status,jqXHR){
                    console.log(jsonDoc);
                    var htmlstr = "";
                    var total = 0;
                    for(var i = 0 ; i < jsonDoc.producto.length; i++){
                      htmlstr +=  '<h2><li>'+jsonDoc.producto[i].Descripcion+'</li></h2>'
                        for(var j=0 ; j< 2; j++){
                          var des=jsonDoc.producto[i].items[j].Descrip;
                          var precio=jsonDoc.producto[i].items[j].Precio;
                          total += jsonDoc.producto[i].items[j].Precio;

                        htmlstr +=  jsonDoc.producto[i].items[j].Descrip+'</br>';
                        htmlstr +=  'Lps.'+jsonDoc.producto[i].items[j].Precio+'</br>'
                        htmlstr +=  '<img src="/img/'+jsonDoc.producto[i].items[j].Img+'" width="15%" ></br>'
                        htmlstr +=  '<a href="/api/insertarCarrito/'+des+'/'+precio+'" id="insertar"   data-role="button" data-ajax="false" >Comprar</a></br></br>'
                      }
                    }
                      htmlstr += total;

                    librosList.html(htmlstr).listview("refresh");
                },
                "error":function(jqXHR,status, errorMsg){
                    console.log(errorMsg);
                }

            }
        );
});






$("#carro").on("pagecreate",function(e){
    var libroscarros = $("#libroscarros");
    $.ajax("/api/obtenerCarrito",
            {
                "method":"GET",
                "data":{},
                "dataType":"json",
                "success":function(jsonDoc,status,jqXHR){
                    console.log(jsonDoc);
                    var htmlstr = "";
                    var totalCompra = 0;
                    for(var i = 0 ; i < jsonDoc.usuario.length; i++){
                      htmlstr +=  '<h2><li>'+jsonDoc.usuario[i].Usuario+'</li></h2>'
                        for(var j=0 ; j< jsonDoc.usuario[i].Carrito.length; j++){
                        totalCompra += JSON.parse(jsonDoc.usuario[i].Carrito[j].Precio);
                        htmlstr +=  'Producto. =  '+jsonDoc.usuario[i].Carrito[j].Producto+'</br>';

                        htmlstr +=  'Precio. =  '+ jsonDoc.usuario[i].Carrito[j].Precio+'</br>';
                        }
                    }

                    htmlstr += 'Total a pagar. =  '+totalCompra+'</br>';
                    htmlstr +=  '<a href="" id="facturar"   data-role="button" data-ajax="false" >Facturar</a></br></br>'

                    libroscarros.html(htmlstr).listview("refresh");
                },
                "error":function(jqXHR,status, errorMsg){
                    console.log(errorMsg);
                }

            }
        );
});
