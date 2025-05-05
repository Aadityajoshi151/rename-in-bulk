import { toggleModule, resetFileNames, resetSelectedFileNames, splitFileName } from './common.js';

export function _06_initFolderNameModule() {
    const _06_folderNameCheckbox = document.getElementById('06_folderNameModuleCheckbox');
    const _06_folderNameMode = document.getElementById('06_folderNameMode'); // Dropdown for prefix/suffix
    const _06_separator = document.getElementById('06_separator'); // Input for separator
    const fileList = document.querySelectorAll('#fileList .file-item'); // Select all file rows
    const module_elements = [_06_folderNameMode, _06_separator];

    // Initialize disabled state
    toggleModule(false, _06_folderNameCheckbox.closest('.rename-module'), module_elements);

    if (_06_folderNameCheckbox) {
        _06_folderNameCheckbox.addEventListener('change', function () {
            toggleModule(this.checked, _06_folderNameCheckbox.closest('.rename-module'), module_elements);
            if (!this.checked) {
                resetFileNames(fileList); // Reset all file names when the module is disabled
                _06_folderNameMode.value = 'Prefix'; // Reset dropdown to default
                _06_separator.value = ''; // Reset separator input
            } else {
                applyFolderNameOperation(); // Apply changes to all selected files when the module is enabled
            }
        });
    }

    for (let i = 0; i < module_elements.length; i++) {
        const control = module_elements[i];
        if (control) {
            control.addEventListener('input', function () {
                if (_06_folderNameCheckbox.checked) {
                    applyFolderNameOperation(); // Apply changes when inputs are modified
                }
            });
        }
    }

    for (let i = 0; i < fileList.length; i++) {
        const fileRow = fileList[i];
        const checkbox = fileRow.querySelector('.file-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', function () {
                if (_06_folderNameCheckbox.checked) {
                    if (checkbox.checked) {
                        applyFolderNameOperation(); // Apply changes to newly selected files
                    } else {
                        resetSelectedFileNames([fileRow]); // Reset only this file row
                    }
                }
            });
        }
    }

    function applyFolderNameOperation() {
        const folderName = getCurrentFolderNameFromURL(); // Dynamically fetch the current folder name
        const mode = _06_folderNameMode.value || 'Prefix'; // Get prefix/suffix mode
        const separator = _06_separator.value || ''; // Get separator value

        for (let i = 0; i < fileList.length; i++) {
            const fileRow = fileList[i];
            const checkbox = fileRow.querySelector('.file-checkbox');
            const originalNameElement = fileRow.querySelector('.file-name');
            const newNameElement = fileRow.querySelector('.new-file-name');

            if (checkbox && checkbox.checked && originalNameElement && newNameElement) {
                const originalName = originalNameElement.textContent;

                // Split the file name into namePart and extensionPart
                const { namePart, extensionPart } = splitFileName(originalName);

                let newName = namePart;

                // Add folder name as prefix or suffix
                if (mode === 'Prefix') {
                    newName = folderName + separator + newName;
                } else if (mode === 'Suffix') {
                    newName = newName + separator + folderName;
                }

                // Combine the modified namePart with the original extensionPart
                newNameElement.textContent = newName + extensionPart;
                newNameElement.style.color = 'green'; // Highlight the new name in green
            }
        }
    }

    function getCurrentFolderNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search); // Parse the query string
        const dirPath = urlParams.get('dir'); // Get the value of the 'dir' parameter

        if (dirPath) {
            const decodedPath = decodeURIComponent(dirPath); // Decode the URL-encoded path
            const pathParts = decodedPath.split('/'); // Split the path into parts
            return pathParts[pathParts.length - 1] || ''; // Return the last part as the folder name
        }

        return ''; // Return an empty string if 'dir' is not present
    }

    return {
        getFolderNameMode: function () {
            return _06_folderNameMode ? _06_folderNameMode.value : 'Prefix';
        },
        getSeparator: function () {
            return _06_separator ? _06_separator.value : '';
        },
        isFolderNameEnabled: function () {
            return _06_folderNameCheckbox ? _06_folderNameCheckbox.checked : false;
        },
    };
}