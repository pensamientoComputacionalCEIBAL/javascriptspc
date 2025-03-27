
<script>
    $(document).ready(function() {
        console.log("MachForm: jQuery script cargado y ejecutado.");

        // Verificar si estamos en la página 1
        if (window.location.href.includes("page=1")) {
            console.log("MachForm: Detectada la página 1, redirigiendo a la página 2...");
            window.location.href = window.location.href.replace("page=1", "page=2");
        } else {
            console.log("MachForm: No se detectó la página 1, el script no hará nada.");
        }
    });
</script>

