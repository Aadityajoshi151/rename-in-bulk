document.addEventListener('DOMContentLoaded', () => {
    // Tree expansion logic
    document.querySelectorAll('.tree-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const parent = this.parentElement;
            const children = parent.nextElementSibling;
            
            if (children.classList.contains('expanded')) {
                children.classList.remove('expanded');
                this.textContent = '+';
            } else {
                children.classList.add('expanded');
                this.textContent = '-';
            }
        });
    });

    // Navigation
    document.querySelectorAll('.tree-item-name').forEach(item => {
        item.addEventListener('click', function() {
            const path = this.parentElement.dataset.path;
            window.location.href = `/?dir=${encodeURIComponent(path)}`;
        });
    });

    // Toggle hidden files/folders
    const showHiddenToggle = document.getElementById('showHiddenToggle');
    if (showHiddenToggle) {
        showHiddenToggle.addEventListener('change', function(e) {
            const showHidden = e.target.checked;
            const displayStyle = showHidden ? 'flex' : 'none';
            
            document.querySelectorAll('#tree-container .hidden-item').forEach(item => {
                item.style.display = displayStyle;
            });

            // Also toggle files in main view
            document.querySelectorAll('#fileList .hidden-item').forEach(item => {
                item.style.display = showHidden ? 'table-row' : 'none';
            });
        });

        // Initialize hidden state
        showHiddenToggle.dispatchEvent(new Event('change'));
    }

    // Auto-expand tree to current directory
    const currentPath = document.querySelector('.tree-item[data-path="<%= currentDir %>"]');
    let element = currentPath;
    
    while (element) {
        const children = element.nextElementSibling;
        if (children && children.classList.contains('tree-children')) {
            children.classList.add('expanded');
            const toggle = element.querySelector('.tree-toggle');
            if (toggle) toggle.textContent = '-';
        }
        element = element.parentElement.closest('.tree-item');
    }
});