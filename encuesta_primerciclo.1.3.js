
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    console.log("equis de");
    $(document).ready(function() {
        console.log("MachForm: jQuery script cargado y ejecutado.");  

        // Verificar si estamos en la página 1
        let url = window.location.href;
        if (url.includes("page=1")) {
            console.log("MachForm: Detectada la página 1, redirigiendo a la página 2...");
            let nuevaUrl = url.replace("page=1", "page=2");
            window.location.href = nuevaUrl;
        } else {
            console.log("MachForm: No se detectó la página 1, el script no hará nada.");
        }
    });
</script>

