import type { AccessObject } from "../../cli"
/**
 * Echoes a list of arguments to the console
 * @param Command object containing arguments
 * @returns string of arguments joined by spaces
 */
function echo({ command: { raw } }: AccessObject): string {
	return raw.split(" ").slice(1).join(" ")
}
echo.description = "Echoes a list of arguments to the console"

export default echo