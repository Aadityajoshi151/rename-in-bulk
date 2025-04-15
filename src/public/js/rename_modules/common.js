export function splitFileName(fileName) {
    const lastDotIndex = fileName.lastIndexOf('.');
    const namePart = lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
    const extensionPart = lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
    return { namePart, extensionPart };
}

export function toggleModule(enabled, module, dropdown) {
    if (dropdown) {
        dropdown.disabled = !enabled;
    }

    if (module) {
        const controls = module.querySelectorAll('.rename-control');
        for (let i = 0; i < controls.length; i++) {
            controls[i].style.opacity = enabled ? 1 : 0.6;
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