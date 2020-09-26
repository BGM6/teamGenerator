// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

// Using extends here because the Engineer class shares name, id and email with the Employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        // super calls the parent's constructor method and gets access to the parent's properties and methods. 
        super(name, id, email);
        this.github = github;
    }

    // Getters
    getGithub() {
        return this.github;
    }

    // Gets roll
    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;