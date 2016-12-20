export class ValueError implements Error {
    name = 'ValueError'
    message = 'An error was thrown due to an invalid value.'

    constructor(message?: string) {
        this.message = message
    }
}
