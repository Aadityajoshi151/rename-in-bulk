const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Root directory to browse (docker volume will be mounted at root)
const ROOT_DIR = path.join(__dirname, '../root');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function getDirectoryTree(dir, depth = 0, maxDepth = 5) {
    if (depth > maxDepth) return null;
    
    try {
        const stats = fs.statSync(dir);
        if (!stats.isDirectory()) return null;
        
        const item = {
            path: dir,
            name: path.basename(dir),
            type: 'directory',
            children: []
        };
        
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            try {
                const stats = fs.statSync(fullPath);
                if (stats.isDirectory()) {
                    const child = getDirectoryTree(fullPath, depth + 1, maxDepth);
                    if (child) item.children.push(child);
                }
            } catch (e) {
                console.error(`Error reading ${fullPath}:`, e);
            }
        }
        
        item.children.sort((a, b) => a.name.localeCompare(b.name));
        return item;
    } catch (e) {
        console.error(`Error accessing ${dir}:`, e);
        return null;
    }
}

function getLastPathComponent(dirPath, rootDir) {
    if (dirPath === rootDir) return 'Root';
    const parts = dirPath.replace(rootDir, '').split(path.sep).filter(p => p);
    return parts.length > 0 ? parts[parts.length - 1] : 'Root';
}

app.get('/', (req, res) => {
    const tree = getDirectoryTree(ROOT_DIR);
    const currentDir = req.query.dir || ROOT_DIR;
    
    try {
        const files = fs.readdirSync(currentDir)
            .map(file => {
                const fullPath = path.join(currentDir, file);
                const stats = fs.statSync(fullPath);
                return {
                    name: file,
                    path: fullPath,
                    isDirectory: stats.isDirectory(),
                    size: stats.size,
                    modified: stats.mtime
                };
            })
            .filter(file => !file.isDirectory)
            .sort((a, b) => a.name.localeCompare(b.name));
        
        res.render('index', { 
            tree, 
            files, 
            currentDir,
            parentDir: path.dirname(currentDir),
            isRoot: currentDir === ROOT_DIR,
            ROOT_DIR: ROOT_DIR,
            breadcrumbParts: currentDir.replace(ROOT_DIR, '').split(path.sep).filter(p => p),
            currentDirName: getLastPathComponent(currentDir, ROOT_DIR)
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading directory');
    }
});

const PORT = 6262;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Browsing files under: ${ROOT_DIR}`);
});