// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

// Using extends here because the Engineer class shares name, id and email with the Employee class

class Intern extends Employee {
    constructor(name, id, email, school) {
        // super calls the parent's constructor method and gets access to the parent's properties and methods. 
        super(name, id, email);
        this.school = school;
    }

    // Getters

    getSchool() {
        return this.school;
    }

    // getRoll
    getRole() {
        return 'Intern'
    }

}

module.exports = Intern;