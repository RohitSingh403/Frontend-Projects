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


              // Connect specific target asset item removal logic
            cardEl.querySelector('.delete-card-btn').addEventListener('click', () => {
                fileSystemData = fileSystemData.filter(f => f.id !== item.id);
                renderDirectoryContents();
            });

            fileGrid.appendChild(cardEl);
        });
    }


      // 5. Breadcrumbs Path Update Routine Tracking Matrix Hierarchy
    function updateBreadcrumbUI() {
        breadcrumbTrail.innerHTML = '';
        
        // Always append baseline root pointer node
        const rootCrumb = document.createElement('span');
        rootCrumb.className = `crumb-link ${currentFolderId === 'root' ? '' : 'active'}`;
        rootCrumb.innerText = 'Root';
        rootCrumb.addEventListener('click', () => {
            currentFolderId = 'root';
            renderDirectoryContents();
            updateBreadcrumbUI();
        });
        breadcrumbTrail.appendChild(rootCrumb);

        // Trace paths upward if current node points below baseline root
        if (currentFolderId !== 'root') {
            let pathTraceArr = [];
            let checkNode = fileSystemData.find(f => f.id === currentFolderId);

            while (checkNode) {
                pathTraceArr.unshift(checkNode); // Pushes target node layout forward onto start index
                checkNode = fileSystemData.find(f => f.id === checkNode.parentId);
            }

            pathTraceArr.forEach(node => {
                // Append standard divider string text element node
                const separator = document.createElement('span');
                separator.className = 'crumb-separator';
                separator.innerText = ' / ';
                breadcrumbTrail.appendChild(separator);

                // Append the crumb link element node
                const crumb = document.createElement('span');
                crumb.className = 'crumb-link';
                crumb.innerText = node.name;
                crumb.addEventListener('click', () => {
                    currentFolderId = node.id;
                    renderDirectoryContents();
                    updateBreadcrumbUI();
                });
                breadcrumbTrail.appendChild(crumb);
            });
        }
    }

     // 6. Action Event Listeners for Adding Elements
    newFolderBtn.addEventListener('click', () => {
        const folderName = prompt('Enter a name for the new folder:', 'Untitled Folder');
        if (!folderName || folderName.trim() === '') return;

        const newFolderObj = {
            id: Date.now().toString(),
            name: folderName.trim(),
            type: 'folder',
            parentId: currentFolderId
        };

        fileSystemData.push(newFolderObj);
        renderDirectoryContents();
    });

    uploadFileBtn.addEventListener('click', () => {
        hiddenFileInput.click(); // Triggers the hidden system explorer select window
    });

    hiddenFileInput.addEventListener('change', (e) => {
        const fileTarget = e.target.files[0];
        if (!fileTarget) return;

        const newFileObj = {
            id: Date.now().toString(),
            name: fileTarget.name,
            type: 'file',
            parentId: currentFolderId
        };

        fileSystemData.push(newFileObj);
        renderDirectoryContents();
        hiddenFileInput.value = ''; // Wipe cache clean to let users upload twins
    });


      // 7. Initial Bootstrap Load Matrix Initialization Setup
    renderDirectoryContents();
    updateBreadcrumbUI();
});