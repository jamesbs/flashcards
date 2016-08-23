export class ValueError implements Error {
    name: string = "ValueError"
    message: string = "An error was thrown due to an invalid value."

    constructor(message?: string) {
        this.message = message
    }
}
