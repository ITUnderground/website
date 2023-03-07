// Implements directory structure
type Directory = { [key: string]: Directory | File }
type File = string

class Dir {
    private _root = {
        "home": {
            "itunderground": {
                "flag.txt": "flag{this_is_a_flag}",
                "secret": {
                    "not_flag.txt": "flag{this_is_a_secret_flag}",
                },
            },
        },
    }
    private _cwd: string[]
    private _current = this._root
    constructor() {
        this._cwd = ["home", "itunderground"]
        this._navigate()
    }

    /**
     * Navigates to current working directory
     */
    _navigate() {
        this._current = this._locate(this._cwd) as typeof this._current
    }
    /**
     * Locates a directory in the file system
     * @param path Path to navigate to
     * @returns Directory at path
     */
    _locate(path: string[]): Directory | File | null {
        let current: Directory = this._root

        // Format special paths such as .., . or ~
        for (let i = 0; i < path.length; i++) {
            if (path[i] === "..") {
                path.splice(i - 1, 2)
                i -= 2
            } else if (path[i] === ".") {
                path.splice(i, 1)
                i--
            } else if (path[i] === "~") {
                path.splice(i, 1, "home", "itunderground")
                i--
            }
        }

        // Navigate to actual directory
        for (const dir of path) {
            // Ignore if empty string
            if (dir === "") continue
            // Break if this is not a directory
            if (typeof current !== "object") break
            // Return null if directory doesn't exist
            if (!(dir in current)) return null
            // Navigate to next directory
            current = current[dir as keyof typeof current] as typeof current
        }
        return current
    }

    /**
     * List files in a directory. Defaults to current directory. If a file is specified, returns that file.
     * @returns list of files in current directory
     */
    dir(path?: string): string[] {
        // Return list of files
        const splitPath = this._cwd.concat(path?.split("/") ?? [])
        const found = this._locate(splitPath)
        if (typeof found === "string") return [found]
        if (found === null) return []
        if (typeof found === "object") return Object.keys(found)
        return []
    }
    /**
     * Gets/sets absolute path to current working directory
     * @param path Path to set current working directory to
     * @returns current working directory
     */
    get cwd(): string {
        return "/" + this._cwd.join("/")
    }
    set cwd(path: string) {
        this._cwd = path.split("/")
        this._navigate()
    }

    /**
     * Get a file or directory
     * @param file File to get
     */
    get(path: string): { type: "Directory" | "File", value: Directory | File } | null {
        // Get file
        const splitPath = this._cwd.concat(path.split("/"))
        const found = this._locate(splitPath)

        // Return file
        if (typeof found === "string") return { type: "File", value: found }
        if (found === null) return null
        if (typeof found === "object") return { type: "Directory", value: found }
        return null
    }
}

export default Dir