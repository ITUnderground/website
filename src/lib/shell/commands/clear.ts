import type { AccessObject } from "../cli";

/**
 * Clears the console
 * @param param0 {AccessObject} Command
 */
function clear({ cli }: AccessObject) {
    cli.log = [];
}
clear.description = "Clears the console"

export default clear