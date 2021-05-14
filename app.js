//global variables from HTML

//Input fields
var insertName = document.getElementById('insertName');
var insertGrades = document.getElementById('insertGrades');

//Table body
var tableBodyStudent = document.getElementById('tableBodyStudent');
var tableBodyGrades = document.getElementById('tableBodyGrades');




//Adding buttons
var addStudentButton = document.getElementById('addStudent');
var addGradesButton = document.getElementById('addGrades');

//Sorting buttons
var sortAscStudents = document.getElementById("sortAscStudents");
var sortDescStudents = document.getElementById("sortDescStudents");
var sortAscGrades = document.getElementById("sortAscGrades");
var sortDescGrades = document.getElementById("sortDescGrades");

//Hide button
var hideGrades = document.getElementById('hideGrades');

//Variable used to display the grades div
var studentGradesDisplay = document.getElementById('note_elev_wrapper');

//Variable to select the student name and display it
var showStudent = document.getElementById('showStudent');

//Variable used to display messages
var studentTextDisplay = document.querySelector(".studentTextDisplay");
var gradeTextDisplay = document.querySelector(".gradeTextDisplay");

//Focus on insert name input field
window.onload = function(){
  insertName.focus();
}



//global variables needed for the program in which the values for the students are stored
let studentList = [];
let currentStudent;
//global variables to select and generate Ids for students and grades
var globalId = 0;
var globalGradesId = 0;


//event listeners to add a student in the table with coresponding average grade and buttons when "Add Student" button is clicked or the "enter" keyword is pushed.
addStudentButton.addEventListener('click', function (event) {
  event.preventDefault();
  addStudent();
});

document.addEventListener("keydown", function (event) {
  if (event.key == 13) {
    addStudent(event);
  }
});


//event listeners to add a student in the table with coresponding average grade and buttons when "Add Grades" button is clicked or the "enter" keyword is pushed.
 addGradesButton.addEventListener('click', function(event) {
  event.preventDefault();
  addGrades(currentStudent);
});

document.addEventListener("keydown", function (event) {
  if (event.key == 13) { 
   addGrades(currentStudent);
}
});


//Event listener to sort ascending the students from the table when "Ascending Sort" button is clicked
sortAscStudents.addEventListener('click', function(event){
  event.preventDefault();
  ascendingSortStudent();
  renderStudentTable();
});

//Event listener to sort descending the students from the table when "Descending Sort" button is clicked
sortDescStudents.addEventListener('click', function(event){
  event.preventDefault();
  descendingSortStudent();
  renderStudentTable();
});


//Event listener to sort ascending the grades from the table when "Ascending Sort" button is clicked
sortAscGrades.addEventListener('click', function(event){
  event.preventDefault();
  sortGradesAscending(currentStudent);
})

//Event listener to sort descending the grades from the table when "Descending Sort" button is clicked
sortDescGrades.addEventListener('click', function(event){
  event.preventDefault();
  sortGradesDescending(currentStudent);
})

// Event listener to hide the div where the student grades are when "Hide Grades" button is pushed
hideGrades.addEventListener('click', hideGradesFunction);



// function to check the input value and modify the content of the student table
function addStudent() {
  
  let inputStudent = insertName.value;
  let newStudentList = {
    name: inputStudent,
    id: globalId,
    grades: []
  }
  
  if(inputStudent === ''){
      showText(studentTextDisplay, "Please insert a valid name!", true);
    }else{
      insertName.value = "";
      studentList.push(newStudentList);
      globalId++;
      renderStudentTable();
     }
}

// function to render the students table
function renderStudentTable() {
  tableBodyStudent.innerHTML = ''
  for(let i=0; i < studentList.length; i++){
    createStudent(studentList[i]);
  }
}

// function to add students to the list
function createStudent(student) {

  let studentCell = document.createElement('td');
  studentCell.innerText = student.name;
  studentCell.setAttribute('id', "student"+student.id);

  let seeGrades = document.createElement('button');
  seeGrades.innerText = "See / Add grades";
  seeGrades.addEventListener('click', function(event) {
    event.preventDefault();
    
    seeGradesFromTable(student.id);
    insertGrades.focus();
  });

  let deleteStudent = document.createElement('button');
  deleteStudent.innerText = "Delete Student"
  deleteStudent.addEventListener('click', function(event) {
    event.preventDefault();
    deleteStudentFromTable(student.id)
    hideGradesFunction();
  });

  
  let averageGradesCell = document.createElement('td');
  averageGradesCell.innerText = getGradesAverage(student.grades);

  let studentGradesCell = document.createElement('td'); 
  studentGradesCell.appendChild(seeGrades);

  let deleteStudentCell = document.createElement('td');
  deleteStudentCell.appendChild(deleteStudent);
  
  let row = document.createElement('tr');
  row.classList.add("tableRowStudent");
  row.appendChild(studentCell);
  row.appendChild(averageGradesCell);
  row.appendChild(studentGradesCell);
  row.appendChild(deleteStudentCell);
  
  tableBodyStudent.appendChild(row);
 
}

//Function to delete a student from the table
function deleteStudentFromTable(studentDeleted){
  let position;
  for(let i=0; i< studentList.length; i++){
    if(studentList[i].id === studentDeleted){
      position = i;
      break;
    }
  }
  studentList.splice(position, 1); 
  renderStudentTable(currentStudent);

}

//Function to get the student that we want to see it's grades
function seeGradesFromTable(seeGrades) {
  let position;
  for(let i=0; i< studentList.length; i++){
    if(studentList[i].id === seeGrades){
      position = i;
      break;
    }
  }
  
  currentStudent = studentList[position]
  showGrades(currentStudent);
  renderGradesTable(currentStudent);
}


// Function to display the div containing the grades for each student
function showGrades(student) {
  let currentStudent = student.name;
  studentGradesDisplay.style.display = "block";
  toShowStudent(showStudent, `Student grades: ${currentStudent}`, true);
  // renderGradesTable(student);

}

//Function to add grades for each choosen student
function addGrades(student) {
  // let gradesOfStudent = parseInt(insertGrades.value);
  let gradesOfStudent = insertGrades.value;
  let newGradesList = {
      grade: parseInt(gradesOfStudent),
      id: globalGradesId++
    }

  if( (gradesOfStudent ==='') || (parseInt(gradesOfStudent) < 1) || (parseInt(gradesOfStudent) > 10) ){
    insertGrades.value = '';
    showText(gradeTextDisplay, "Please insert a grade between 1 and 10!", true);
  } else {
    insertGrades.value = '';
    // student.grades.push(parseInt(gradesOfStudent));
    currentStudent.grades.push(newGradesList);
    // globalId++
    renderGradesTable(student);
  }
  
  renderStudentTable(student);
  
}


// Function to render the grades table for each student
function renderGradesTable(student) {
  let studentGrades = student.grades;
  tableBodyGrades.innerHTML = '';
  for(let i=0; i < studentGrades.length; i++) {
    createGrades(studentGrades[i]);
  }
}


// Function to display the grades in a table for each choosen student
function createGrades(grades) {
let gradesCell = document.createElement('td');
gradesCell.innerText = grades.grade;
gradesCell.setAttribute('id', "grades-" + grades.id);

let deleteGrade = document.createElement('button');
deleteGrade.innerText = "x";
deleteGrade.addEventListener('click', function(event){
  event.preventDefault();
  deleteStudentGrades(grades.id);
});

let deleteGradeCell = document.createElement('td');
deleteGradeCell.appendChild(deleteGrade);

let row = document.createElement('tr');
row.classList.add('tableRowGrades');

row.appendChild(gradesCell);
row.appendChild(deleteGradeCell);

tableBodyGrades.appendChild(row);

}


//Function to calculate the average of the students grades
function getGradesAverage(grades){
  if(grades.length === 0){
    return 0
  }else {
    var sumOfGrades = (previous, currentValue) => ({grade: previous.grade + currentValue.grade});
    var average = grades.reduce(sumOfGrades).grade / grades.length;
    return average;
  }

}


//Function to delete the grades
function deleteStudentGrades(GradeId) {
    let position;
    console.log(currentStudent.grades);
    for(let i=0; i< currentStudent.grades.length; i++){
      if(currentStudent.grades[i].id === GradeId){
        position = i;
        break;
      }
    }
    currentStudent.grades.splice(position, 1); 
    renderGradesTable(currentStudent);
    renderStudentTable(currentStudent);
}



// Function to display the chosen student
function toShowStudent(element, text, value) {
  if(value === true){
    element.innerText = text;
  } 
}


// Sorting functions to sort the students ascending
function ascendingSortStudent() {

  studentList.sort((student1, student2) => {return sortStudentsAsc(student1, student2, 'name')});

}

// Sorting functions to sort the students ascending
function sortStudentsAsc(object1, object2, key) {

  obj1 = object1[key];
  obj2 = object2[key];
  
  if(obj1< obj2){
    return -1;
  }
  if(obj1 > obj2){
    return 1;
  }
  return 0;

}


// Sorting functions to sort the students descending
function descendingSortStudent() {
  studentList.sort((student1, student2) => {return sortStudentDesc(student1, student2, "name")});
}

// Sorting functions to sort the students descending
function sortStudentDesc(object1, object2, key) {
  obj1 = object1[key];
  obj2 = object2[key];
  
  if(obj1 < obj2) {
    return 1;
  }
  if(obj1 > obj2) {
    return -1;
  }
  return 0;
}

// Sorting functions to sort the grades ascending
function sortGradesAscending() {
  currentStudent.grades.sort((a, b) => {
    if(a.grade<b.grade){
      return -1;
    }
    if(a.grade>b.grade) {
      return 1;
    }
    return 0;
  });
  renderGradesTable(currentStudent);
}

// Sorting functions to sort the grades descending
function  sortGradesDescending() {
   currentStudent.grades.sort((a,b) => {
    if(a.grade<b.grade){
      return 1;
    }
    if(a.grade>b.grade){
      return -1;
    }
    return 0;
  });
  renderGradesTable(currentStudent);
}

// Function to hide the tabel with the student grades
function hideGradesFunction() {
  studentGradesDisplay.style.display = "none";
  insertName.focus();
}


// Function to show a message in case there is no imput for the input fields
function showText(element, text, value) {
    if (value === true) {
      element.classList.add('alert');
      element.innerText = text;
      setTimeout(function () {
        element.classList.remove('alert');
      }, 2000);
   }
}