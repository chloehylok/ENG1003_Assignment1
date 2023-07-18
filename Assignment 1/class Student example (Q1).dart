class Student
{
    constructor(name)
    {
        this._name = name;
    }
    fromData(data)
    {
        this._name = data._name;
    }
    toString()
    {
        return "Student name is " + this._name;
    }
}
class StudentList
{
    constructor()
    {
        // list contains an array of offering objects. each offering has an array of students
        this._list = [];
    }
    addOffering(offeringName)
    {
        let offering = {
            name: offeringName,
            students: []
        }
        this._list.push(offering);
    }
    enrolStudent(offeringIndex, student)
    {
        this._list[offeringIndex].students.push(student);
    }
    fromData(data)
    {
        this._list = [];
        for (let i = 0; i < data._list.length; i++)
        {
            // create each offering
            let offering = {
                name: data._list[i].name,
                students: []
            };
            for (let j = 0; j < data._list[i].students.length; j++)
            {
                let tempStudent = new Student();
                tempStudent.fromData(data._list[i].students[j]);
                offering.students.push(tempStudent);
            }
            this._list.push(offering);
        }
    }
    toString()
    {
        let output = "List of students\n";
        for (let i = 0; i < this._list.length; i++)
        {
            output += `${this._list[i].toString()}\n`;
        }
        return output;
    }
}
let john = new Student("John");
let mary = new Student("Mary");
let eng0001 = new StudentList();
eng0001.addOffering("21-S2");
eng0001.enrolStudent(0,john);
eng0001.enrolStudent(0,mary);
let mari = new Student("Mari");
eng0001.addOffering("21-OCT");
eng0001.enrolStudent(1,mari);

localStorage.setItem("studentData",JSON.stringify(eng0001));

let eng0001Data = JSON.parse(localStorage.getItem("studentData"));
eng0001 = new StudentList();
eng0001.fromData(eng0001Data);
console.log(eng0001);