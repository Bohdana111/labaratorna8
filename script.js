class Employee {
    constructor(name, surname, baseSalary, experience) {
        this.name = name;
        this.surname = surname;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }
    countedSalary() {
        if (this.experience > 2 && this.experience < 5) return this.baseSalary + 200;
        if (this.experience >= 5) return this.baseSalary * 1.2 + 500;
        return this.baseSalary;
    }
}

class Developer extends Employee {
    constructor(name, surname, baseSalary, experience) {
        super(name, surname, baseSalary, experience);
    }
}

class Designer extends Employee {
    constructor(name, surname, baseSalary, experience, effCoeff) {
        super(name, surname, baseSalary, experience);
        this.effCoeff = effCoeff;
    }
    countedSalary() {
        return Math.round(super.countedSalary() * this.effCoeff);
    }
}

class Manager extends Employee {
    constructor(name, surname, baseSalary, experience, team) {
        super(name, surname, baseSalary, experience);
        this.team = team;
    }
    countedSalary() {
        let salary = super.countedSalary();
        if (this.team.length > 5 && this.team.length < 10) salary += 200;
        if (this.team.length >= 10) salary += 300
        if (this.team.filter(teammate => teammate instanceof Developer).length > this.team.length / 2) salary *= 1.1;
        return Math.round(salary);
    }
}

class Department {
    constructor(managers) {
        this.managers = managers;
    }
    giveSalary() {
        for (let manager of this.managers) {
            console.log(`${manager.name} ${manager.surname} отримав ${manager.countedSalary()} шекєлей`);
            for (let teammate of manager.team) {
                console.log(`${teammate.name} ${teammate.surname} отримав ${teammate.countedSalary()} шекєлей`);
            }
        }
    }
};


const firstDesigner = new Designer('Тарас', 'Орловський', 2003, 6, 0.6);
const nextfirstDesigner = new Designer('Андрій', 'Барабанов', 2005, 5, 0.5);
const firstDeveloper = new Developer('Олена', 'Омельченко', 2900, 1.5);
const nextfirstDeveloper = new Developer('Антон', 'Лавришин', 3100, 2);
const firstManager = new Manager('Олександр', 'Загребельний', 2000, 2, [firstDesigner, nextfirstDesigner, firstDeveloper, nextfirstDeveloper]);

const secondDesigner = new Designer('Вадим', 'Скаковський', 3200, 2, 0.2);
const secondDeveloper = new Developer('Данило', 'Загрядський', 1700, 0.3);
const nextsecondDeveloper = new Developer('Сергій', 'Забережний', 2500, 8);
const secondManager = new Manager('Олег', 'Жабровець', 2450, 5, [secondDesigner, secondDeveloper, nextsecondDeveloper]);

const thirdDesigner = new Designer('Володимир', 'Страшко', 1999, 9, 0.9);
const nextthirdDesigner = new Designer('Іван', 'Багряний', 1989, 6, 0.7);
const thirdDeveloper = new Developer('Роман', 'Мовчан', 2950, 3);
const thirdManager = new Manager('Ілля', 'Помінчук', 2850, 8, [thirdDesigner, nextthirdDesigner, thirdDeveloper]);

const department = new Department([firstManager, secondManager, thirdManager]);

department.giveSalary();