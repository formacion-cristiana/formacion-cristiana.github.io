// Seleccionar tanto los nodos como los títulos (title-node) y conectores (mid-link)
const interactiveElements = document.querySelectorAll('.node, .title-node, .mid-link');
const panel = document.getElementById('info-panel');
const panelTitle = document.getElementById('panel-title');
const panelDesc = document.getElementById('panel-desc');

// Variable para llevar el registro del elemento actualmente activo
let activeElement = null;

interactiveElements.forEach(el => {
    el.addEventListener('click', (e) => {
        e.stopPropagation();

        // Si el usuario vuelve a hacer clic en el mismo elemento que ya abrió el panel, lo cerramos (toggle)
        if (activeElement === el && panel.style.display === 'block') {
            closeInfoPanel();
            return;
        }

        // Si es un elemento nuevo, lo marcamos como activo
        activeElement = el;

        const customTitle = el.getAttribute('data-title');
        const mainTextElem = el.querySelector('.main-text');
        const subTextElems = el.querySelectorAll('.sub-text');
        const columnTitleElem = el.closest('.pair-column')?.querySelector('.title-node');
        
        let title = customTitle ? customTitle.trim() : (mainTextElem ? mainTextElem.innerText.trim() : '');
        
        if (!title && el.classList.contains('title-node')) {
            title = el.innerText.trim();
        }
        if (!title && columnTitleElem && columnTitleElem.innerText.trim()) {
            title = columnTitleElem.innerText.trim();
        }
        if (!title && subTextElems.length > 0) {
            title = subTextElems[0].innerText.trim();
        }
        if (!title) {
            title = "Información Histórica/Bíblica";
        }

        const infoText = el.getAttribute('data-info') || "No hay información adicional registrada para este elemento.";

        panelTitle.innerText = title;
        panelDesc.innerText = infoText;
        panel.style.display = 'block';
    });
});

function closeInfoPanel() {
    panel.style.display = 'none';
    activeElement = null; // Limpiamos el elemento activo al cerrar
}


// svg-defs.js
document.addEventListener("DOMContentLoaded", function() {
    const svgContainer = document.createElement("div");
    svgContainer.style.position = "absolute";
    svgContainer.style.width = "0";
    svgContainer.style.height = "0";
    svgContainer.setAttribute("aria-hidden", "true");
    
    svgContainer.innerHTML = `
        <svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
            <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b"/>
                </marker>
            </defs>
        </svg>
    `;
    
    document.body.prepend(svgContainer);
});

