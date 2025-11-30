document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('editableTable');
    const addRowBtn = document.getElementById('addRowBtn');
    const sidebar = document.getElementById('sidebar');

    if (!table || !addRowBtn || !sidebar) {
        console.error("Required element not found!");
        return;
    }

    // --- Image Loading for Sidebar ---
    const imageUrls = ['images/image1.png', 'images/image2.png']; // Assumes you have these images
    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.draggable = true;

        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', url);
        });
        sidebar.appendChild(img);
    });

    const tableBody = table.querySelector('tbody');

    if (!tableBody) {
        console.error("Table body not found!");
        return;
    }

    // --- Drag and Drop Functionality ---
    tableBody.addEventListener('dragover', (e) => {
        e.preventDefault(); // Allow drop
    });

    tableBody.addEventListener('drop', (e) => {
        e.preventDefault();
        const target = e.target;
        if (target && target.tagName === 'TD') {
            const imageUrl = e.dataTransfer.getData('text/plain');
            if (imageUrl) {
                target.innerHTML = ''; // Clear the cell
                const img = document.createElement('img');
                img.src = imageUrl;
                target.appendChild(img);
            }
        }
    });

    // Function to make cell editable
    const makeCellEditable = (cell) => {
        const originalContent = cell.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalContent;

        cell.textContent = '';
        cell.appendChild(input);
        input.focus();

        const saveContent = () => {
            cell.textContent = input.value;
            input.remove();
        };

        input.addEventListener('blur', saveContent);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveContent();
            } else if (e.key === 'Escape') {
                cell.textContent = originalContent;
                input.remove();
            }
        });
    };

    // Event listener for clicks on table cells
    tableBody.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.tagName === 'TD') {
            // Check if the cell is not already being edited
            if (!target.querySelector('input')) {
                makeCellEditable(target);
            }
        }
    });

    // Event listener for the "Add Row" button
    addRowBtn.addEventListener('click', () => {
        const newRow = tableBody.insertRow();
        const columnCount = table.querySelector('thead tr').childElementCount;

        for (let i = 0; i < columnCount; i++) {
            const newCell = newRow.insertCell();
            newCell.textContent = 'New Data'; // Default text
        }
    });
});
