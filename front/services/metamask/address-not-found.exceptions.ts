export class AddressNotFoundException extends Error {
    constructor() {
        super('Address not found.')
    }
}
