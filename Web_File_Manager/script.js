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



    