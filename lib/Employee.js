// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        // checks that name is a string and white spaces aren't in the string
        if (typeof name !== 'string' || !name.trim().length) {
            throw new Error("'Name' cannot be a empty string");
        }

        this.name = name;
        this.id = id;
        this.email = email;
    }

    // Getters 
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return 'Employee';
    }

}

module.exports = Employee;