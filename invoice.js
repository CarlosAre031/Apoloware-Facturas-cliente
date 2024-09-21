function generatePDF() {
    const element = document.getElementById('invoice');
    const opt = {
        margin: 10,
        filename: 'factura_APOLO.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            letterRendering: true,
            useCORS: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'letter', 
            orientation: 'portrait'
        },
        pagebreak: { mode: 'avoid-all' }
    };

    // Crear una copia del elemento para modificarlo sin afectar la visualización original
    const elementCopy = element.cloneNode(true);
    document.body.appendChild(elementCopy);

    // Ajustar el estilo de la copia para que se ajuste al tamaño carta
    elementCopy.style.width = '215.9mm';
    elementCopy.style.height = '279.4mm';
    elementCopy.style.padding = '10mm';
    elementCopy.style.boxSizing = 'border-box';
    elementCopy.style.fontSize = '10px';  // Reducir el tamaño de fuente si es necesario

    // Función para ajustar el contenido si es demasiado largo
    function adjustContent() {
        const currentHeight = elementCopy.offsetHeight;
        const maxHeight = 900 - 0; // 279.4mm (altura carta) - 20mm (margen total)
        if (currentHeight > maxHeight) {
            const scale = maxHeight / currentHeight;
            elementCopy.style.transform = `scale(${scale})`;
            elementCopy.style.transformOrigin = 'top left';
        }
    }

    // Ajustar el contenido
    adjustContent();

    // Generar el PDF
    html2pdf().from(elementCopy).set(opt).save().then(() => {
        // Eliminar la copia después de generar el PDF
        document.body.removeChild(elementCopy);
    });
}

// Agregar el botón para generar PDF si no existe en el HTML
if (!document.querySelector('.pdf-button')) {
    const pdfButton = document.createElement('button');
    pdfButton.className = 'pdf-button';
    pdfButton.textContent = 'Generar PDF';
    pdfButton.onclick = generatePDF;
    document.body.appendChild(pdfButton);
}
