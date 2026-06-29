document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial Mock Virtual File System Layout Storage Object Array
    let fileSystemData = [
        { id: "101", name: "Documents", type: "folder", parentId: "root" },
        { id: "102", name: "Photography Portfolio", type: "folder", parentId: "root" },
        { id: "103", name: "resume_final.pdf", type: "file", parentId: "root" },
        { id: "201", name: "Invoices", type: "folder", parentId: "101" },
        { id: "202", name: "project_brief.txt", type: "file", parentId: "101" },
        { id: "301", name: "hero-bg.jpg", type: "file", parentId: "102" }
    ];

    // 2. Active Application State Trackers
    let currentFolderId = "root";

    // 3. Grab operational DOM interaction layouts references
    const fileGrid = document.getElementById('file-grid');
    const breadcrumbTrail = document.getElementById('breadcrumb-trail');
    const newFolderBtn = document.getElementById('new-folder-btn');
    const uploadFileBtn = document.getElementById('upload-file-btn');
    const hiddenFileInput = document.getElementById('hidden-file-input');



     // 4. Core Render Loop: Draws Items filter matching the parent directory context
    function renderDirectoryContents() {
        // Clear old structural elements out
        fileGrid.innerHTML = '';

        // Filter out array targets that belong to the active directory context boundary
        const activeItems = fileSystemData.filter(item => item.parentId === currentFolderId);

        if (activeItems.length === 0) {
            fileGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding-top: 40px;">This folder is completely empty.</p>`;
            return;
        }



          // Iterate through items list array mapping visual element outputs
        activeItems.forEach(item => {
            const cardEl = document.createElement('div');
            cardEl.className = 'grid-card';
            cardEl.setAttribute('data-id', item.id);

            // Assign structural icons based on categorical variations
            const displayIcon = (item.type === 'folder') ? '📁' : '📄';

            cardEl.innerHTML = `
                <button class="delete-card-btn" title="Delete item">&times;</button>
                <div class="item-graphic-icon">${displayIcon}</div>
                <div class="item-title-label">${item.name}</div>
            `;

            // Setup Navigation behavior constraints inside click loops
            cardEl.addEventListener('click', (e) => {
                // Prevent trigger overlaps if users intend to hit delete
                if (e.target.classList.contains('delete-card-btn')) return;

                if (item.type === 'folder') {
                    currentFolderId = item.id;
                    renderDirectoryContents();
                    updateBreadcrumbUI();
                } else {
                    alert(`Opening file: "${item.name}" (Preview Engine integration placeholder)`);
                }
            });


            