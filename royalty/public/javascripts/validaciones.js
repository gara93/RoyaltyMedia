
$(document).ready(function () {
    var correoreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $(".boton").click(function (){
        $(".error").remove();
        if( $(".nombre").val() == "" ){
            $(".nombre").focus().after("<span class='error'>Ingrese su nombre</span>");
            return false;
        }else if( $(".apellido").val() == ""){
            $(".apellido").focus().after("<span class='error'>Ingrese su apellido</span>");
            return false;
        }else if( $(".correo").val() == "" || !correoreg.test($(".correo").val()) ){
            $(".correo").focus().after("<span class='error'>Ingrese un email correcto</span>");
            return false;
        }else if( $(".usuario").val() == ""){
            $(".usuario").focus().after("<span class='error'>Ingrese su usuario</span>");
            return false;
        }else if( $(".contra").val() == "" ){
            $(".contra").focus().after("<span class='error'>Ingrese su contrase;a</span>");
            return false;
        }
    });
    $(".nombre, .apellido, .usuario, .contra").keyup(function(){
        if( $(this).val() != "" ){
            $(".error").fadeOut();
            return false;
        }
    });
    $(".correo").keyup(function(){
        if( $(this).val() != "" && emailreg.test($(this).val())){
            $(".error").fadeOut();
            return false;
        }
    });
});
