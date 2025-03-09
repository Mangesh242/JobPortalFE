export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;

    constructor(id: number, firstName: string, lastName: string, email: string, phoneNumber: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}