import type { AccessObject } from "../cli";

function cd({ command: { positional }, dir }: AccessObject) {
    const requestedPath = positional[0]
    if (!requestedPath) return dir.cwd
    
    // Get absolute path (only if path is relative)
    const cwd = requestedPath.startsWith("~") || requestedPath.startsWith("/") ? 
        [] : dir.cwd.split("/")
    const path = requestedPath.split("/")
    // Remove empty strings
    const absolute = cwd.concat(path).filter(p => p !== "")
    // Check if path exists
    const resolved = dir._locate(absolute)
    if (resolved === null || typeof resolved !== 'object') return `cd: ${requestedPath}: No such file or directory`
    // Navigate to path
    dir.cwd = absolute.join("/")
}
cd.description = "Changes current working directory"

export default cd