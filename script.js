document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');
    const resultsSection = document.getElementById('resultsSection');
    const metadataOutput = document.getElementById('metadataOutput');

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            resultsSection.classList.remove('hidden');
            metadataOutput.textContent = "Analizando metadatos...";

            // Llama a la función de análisis
            analyzeFile(file);
        } else {
            fileNameDisplay.textContent = "Ningún archivo seleccionado";
            resultsSection.classList.add('hidden');
        }
    });

    function analyzeFile(file) {
        // Lee los metadatos con la librería EXIF.js
        EXIF.getData(file, function() {
            const allMetaData = EXIF.pretty(this);
            if (allMetaData) {
                // Si se encontraron metadatos, los muestra
                metadataOutput.textContent = allMetaData;
            } else {
                // Si no se encontraron, muestra un mensaje
                metadataOutput.textContent = "No se encontraron metadatos EXIF en este archivo.";
            }

            // También puedes intentar leer los datos del archivo directamente como un ArrayBuffer
            // para una inspección más profunda (binario, hex, etc.)
            const reader = new FileReader();
            reader.onload = function(e) {
                // Puedes agregar lógica para mostrar el contenido binario o hex aquí
                // Por ejemplo:
                // const arrayBuffer = e.target.result;
                // const uint8Array = new Uint8Array(arrayBuffer);
                // console.log(uint8Array); 
            };
            reader.readAsArrayBuffer(file);
        });
    }
});