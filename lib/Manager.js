// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

// Using extends here because the Manager class shares name, id and email with the Employee class

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // super calls the parent's constructor method and gets access to the parent's properties and methods. 
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    // Getters
    getOfficeNumber() {
        return this.officeNumber;
    }

    // Gets roll
    getRoll() {
        return "Manager";
    }
}

module.exports = Manager;
