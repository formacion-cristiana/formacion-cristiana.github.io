// info-panel.js
document.addEventListener("DOMContentLoaded", function () {
    // 1. Inyectar el HTML y CSS del #info-panel si no existe en la página
    let panel = document.getElementById('info-panel');
    if (!panel) {
        const style = document.createElement('style');
        style.textContent = `
            #info-panel {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 360px;
                max-width: calc(100vw - 40px);
                background: #ffffff;
                border: 1px solid #cbd5e1;
                border-left: 5px solid #6366f1;
                border-radius: 8px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                padding: 16px;
                display: none;
                z-index: 1000;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                font-size: 0.85rem;
                text-align: left;
            }
            #info-panel h3 {
                font-size: 0.98rem;
                color: #0f172a;
                margin: 0 0 8px 0;
                padding-right: 65px;
            }
            #info-panel p {
                color: #475569;
                line-height: 1.45;
                margin: 0 0 4px 0;
            }
            #info-panel button {
                background: #f1f5f9;
                border: 1px solid #cbd5e1;
                border-radius: 4px;
                padding: 3px 8px;
                font-size: 0.75rem;
                cursor: pointer;
                color: #334155;
                position: absolute;
                top: 14px;
                right: 14px;
            }
            #info-panel button:hover {
                background: #e2e8f0;
            }
            @media print {
                #info-panel {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        panel = document.createElement('div');
        panel.id = 'info-panel';
        panel.innerHTML = `
            <button type="button" id="info-panel-close">✕ Cerrar</button>
            <h3 id="panel-title">Información del Elemento</h3>
            <p id="panel-desc">Haz clic en cualquier elemento para ver su descripción detallada aquí.</p>
        `;
        document.body.appendChild(panel);
    }

    const panelTitle = document.getElementById('panel-title');
    const panelDesc = document.getElementById('panel-desc');
    const closeBtn = document.getElementById('info-panel-close') || panel.querySelector('button');

    let activeElement = null;

    window.closeInfoPanel = function () {
        panel.style.display = 'none';
        activeElement = null;
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.closeInfoPanel();
        });
    }

    // 2. Seleccionar elementos interactivos tanto del árbol (.node, .title-node, .mid-link) como de la línea del tiempo (.block)
    const interactiveElements = document.querySelectorAll('.node, .title-node, .mid-link, .block');

    interactiveElements.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
            e.stopPropagation();

            // Toggle: cerrar si se vuelve a hacer clic en el mismo elemento
            if (activeElement === el && panel.style.display === 'block') {
                window.closeInfoPanel();
                return;
            }

            activeElement = el;

            const customTitle = el.getAttribute('data-title');
            const mainTextElem = el.querySelector('.main-text');
            const subTextElems = el.querySelectorAll('.sub-text');
            const columnTitleElem = el.closest('.pair-column')?.querySelector('.title-node');

            let title = customTitle ? customTitle.trim() : (mainTextElem ? mainTextElem.innerText.trim() : '');

            if (!title && (el.classList.contains('title-node') || el.classList.contains('block'))) {
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
});

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

