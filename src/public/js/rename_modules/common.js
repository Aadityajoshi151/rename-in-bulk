export function splitFileName(fileName) {
    const lastDotIndex = fileName.lastIndexOf('.');
    const namePart = lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
    const extensionPart = lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
    return { namePart, extensionPart };
}

export function toggleModule(enabled, module, controls = []) {
    for (let i=0; i < controls.length; i++) {
        controls[i].disabled = !enabled;
    }

    if (module) {
        const moduleControls = module.querySelectorAll('.rename-control');
        for (let i = 0; i < moduleControls.length; i++) {
            moduleControls[i].style.opacity = enabled ? '1' : '0.6';
        }
    }
}

export function resetFileNames(fileList) {
    fileList.forEach(function (fileRow) {
        const originalNameElement = fileRow.querySelector('.file-name');
        const newNameElement = fileRow.querySelector('.new-file-name');

        if (originalNameElement && newNameElement) {
            newNameElement.textContent = '--'; // Reset to default placeholder
            newNameElement.style.color = ''; // Reset color
        }
    });
}

export function resetSelectedFileNames(fileList) {
    fileList.forEach(function (fileRow) {
        const checkbox = fileRow.querySelector('.file-checkbox');
        const newNameElement = fileRow.querySelector('.new-file-name');

        if (checkbox && newNameElement) {
            if (!checkbox.checked) {
                newNameElement.textContent = '--'; // Reset to default placeholder
                newNameElement.style.color = ''; // Reset color
            }
        }
    });
}

/**
 * Resets the file names to their original state while preserving the extension.
 * @param {NodeListOf<Element>} fileList - The list of file rows.
 * @param {boolean} affectExtension - Whether the extension should be affected.
 */
export function resetFileNamesPreservingExtension(fileList, affectExtension) {
    fileList.forEach(function (fileRow) {
        const originalNameElement = fileRow.querySelector('.file-name');
        const newNameElement = fileRow.querySelector('.new-file-name');

        if (originalNameElement && newNameElement) {
            const originalName = originalNameElement.textContent;

            if (affectExtension) {
                // Reset the entire file name (including the extension)
                newNameElement.textContent = originalName;
            } else {
                // Reset only the name part and preserve the extension
                const { namePart, extensionPart } = splitFileName(originalName);
                newNameElement.textContent = namePart + extensionPart;
            }

            newNameElement.style.color = ''; // Reset color
        }
    });
}

/**
 * Processes the file name based on whether the extension should be affected.
 * @param {string} originalName - The original file name.
 * @param {boolean} affectExtension - Whether the extension should be affected.
 * @param {function} operation - A callback function to apply the operation on the name part.
 * @returns {string} - The processed file name with the extension preserved or modified.
 */
export function processFileName(originalName, affectExtension, operation) {
    const { namePart, extensionPart } = splitFileName(originalName);

    if (affectExtension) {
        // Apply the operation to the entire file name (including the extension)
        return operation(originalName);
    } else {
        // Apply the operation only to the name part and preserve the extension
        const modifiedNamePart = operation(namePart);
        return modifiedNamePart + extensionPart;
    }
}