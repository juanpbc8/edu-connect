// Buscador simple (filtrado por título en el DOM)
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const cards = document.querySelectorAll('#resourceList .card');
  let count = 0;
  cards.forEach(c => {
    const title = c.querySelector('.card-title').textContent.toLowerCase();
    const desc = c.querySelector('p').textContent.toLowerCase();
    if (!q || title.includes(q) || desc.includes(q)) { c.parentElement.style.display = ''; count++; }
    else { c.parentElement.style.display = 'none'; }
  });
  document.getElementById('resultCount').textContent = count;
});

// Filtros (demo)
document.getElementById('applyFilters').addEventListener('click', function () {
  const type = document.getElementById('filterType').value;
  const uni = document.getElementById('filterUni').value;
  // En este mock no hay datos por universidad, solo filtramos por tipo (badge text)
  const cards = document.querySelectorAll('#resourceList .card');
  let count = 0;
  cards.forEach(c => {
    const badge = c.querySelector('.badge').textContent;
    if ((!type || badge.toLowerCase() === type.toLowerCase())) { c.parentElement.style.display = ''; count++; }
    else { c.parentElement.style.display = 'none'; }
  });
  document.getElementById('resultCount').textContent = count;
});

// Subir recurso (simulado: agrega una tarjeta nueva)
document.getElementById('submitUpload').addEventListener('click', function () {
  const title = document.getElementById('rTitle').value || 'Nuevo Recurso';
  const type = document.getElementById('rType').value || 'PDF';
  const desc = document.getElementById('rDesc').value || '';
  const container = document.getElementById('resourceList');

  const col = document.createElement('div'); col.className = 'col-md-6';
  col.innerHTML = `
    <div class="card shadow-sm card-resource">
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h6 class="card-title mb-1">${title}</h6>
            <div class="small text-muted">Ciclo X • Usuario</div>
          </div>
          <div class="text-end">
            <span class="badge bg-primary">${type}</span>
          </div>
        </div>
        <p class="mt-3 mb-2 text-truncate">${desc}</p>
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <button class="btn btn-sm btn-outline-secondary btn-save"><i class="bi bi-folder-plus"></i> Guardar</button>
          </div>
          <div class="text-muted small">0 descargas • <i class="bi bi-hand-thumbs-up"></i> 0</div>
        </div>
      </div>
    </div>
  `;
  container.prepend(col);
  // Cerrar modal
  const uploadModal = bootstrap.Modal.getInstance(document.getElementById('uploadModal'));
  uploadModal.hide();
  // Limpiar form
  document.getElementById('uploadForm').reset();
  // Actualizar contador
  const count = document.querySelectorAll('#resourceList .card:visible').length;
  document.getElementById('resultCount').textContent = document.querySelectorAll('#resourceList .card').length;
});

// Small helper to detect :visible for count (fallback)
(function () {
  const style = document.createElement('style');
  style.innerHTML = `
    @media all { .card:not([style*="display: none"]) { } }
  `; document.head.appendChild(style);
})();
