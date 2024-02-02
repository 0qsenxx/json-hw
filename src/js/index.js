const formRef = document.querySelector("[data-form=addStudent]");
const tableRef = document.querySelector("#table");
const selectedCourseRef = document.getElementById("selectedCourse");
const selectVisitedCoursesRef = document.getElementById("selectVisitedCourses");

// !add student
formRef.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let arrStudents = [];
  const student = {
    name: evt.target.elements.name.value,
    surname: evt.target.elements.surname.value,
    age: evt.target.elements.age.value,
    course: evt.target.elements.addCourse.value,
    visitedCourse: evt.target.elements.addVisitedCourse.value,
  };

  if (localStorage.getItem("studentsList")) {
    arrStudents = JSON.parse(localStorage.getItem("studentsList"));
  }
  arrStudents.push(student);

  localStorage.setItem("studentsList", JSON.stringify(arrStudents));

  const currentIdx = arrStudents.length;
  tableRef.insertAdjacentHTML(
    "beforeend",
    `<td>${currentIdx}. ${student.name}</td>
<td>${student.surname}</td>
<td>${student.age}</td>
<td>${student.course}</td>
<td>${student.visitedCourse}</td>`
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const localStorageData = JSON.parse(localStorage.getItem("studentsList"));

  if (localStorageData) {
    localStorageData.forEach((student, idx) => {
      const currentIdx = idx + 1;
      tableRef.insertAdjacentHTML(
        "beforeend",
        `<td>${currentIdx}. ${student.name}</td>
      <td>${student.surname}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.visitedCourse}</td>`
      );
    });
  }
});

// !edit student
const editStudentDataOpenBtnRef = document.querySelector(
  "[data-button=editStudent]"
);
const editStudentBackdropRef = document.querySelector(".backdrop-edit");
const editStudentFormFormRef = document.querySelector(
  "[data-form=editStudent]"
);
const editStudentDataCloseBtnRef = document.querySelector(
  "[data-button=closeEditStudent]"
);
const numInputEditStudentRef = document.querySelector(
  "[data-input=numEditInput]"
);

editStudentDataOpenBtnRef.addEventListener("click", () =>
  editStudentBackdropRef.classList.toggle("is-hidden-edit")
);
editStudentDataCloseBtnRef.addEventListener("click", () =>
  editStudentBackdropRef.classList.toggle("is-hidden-edit")
);

numInputEditStudentRef.addEventListener("input", (evt) => {
  const inputValue = Number(evt.target.value);
  const localStorageData = JSON.parse(localStorage.getItem("studentsList"));
  const formElements = editStudentFormFormRef.elements;

  if (
    inputValue > 0 &&
    inputValue <= localStorageData.length &&
    localStorageData
  ) {
    formElements.editName.value = localStorageData[inputValue - 1].name;
    formElements.editSurname.value = localStorageData[inputValue - 1].surname;
    formElements.editAge.value = localStorageData[inputValue - 1].age;
    formElements.editCourse.value = localStorageData[inputValue - 1].course;
    formElements.editVisitedCourse.value =
      localStorageData[inputValue - 1].visitedCourse;
  } else alert("Перевірте номер користувача який ви ввели ❗️");
});

editStudentFormFormRef.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const inputValue = Number(numInputEditStudentRef.value);
  const localStorageData = JSON.parse(localStorage.getItem("studentsList"));
  const formElements = evt.target.elements;

  if (
    inputValue > 0 &&
    inputValue <= localStorageData.length &&
    localStorageData
  ) {
    localStorageData[inputValue - 1].name = formElements.editName.value;
    localStorageData[inputValue - 1].surname = formElements.editSurname.value;
    localStorageData[inputValue - 1].age = formElements.editAge.value;
    localStorageData[inputValue - 1].course = formElements.editCourse.value;
    localStorageData[inputValue - 1].visitedCourse =
      formElements.editVisitedCourse.value;

    localStorage.setItem("studentsList", JSON.stringify(localStorageData));

    tableRef.innerHTML = ``;

    localStorageData.forEach((student, idx) => {
      const currentIdx = idx + 1;
      tableRef.insertAdjacentHTML(
        "beforeend",
        `<td>${currentIdx}. ${student.name}</td>
        <td>${student.surname}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
        <td>${student.visitedCourse}</td>`
      );
    });
  }
  editStudentBackdropRef.classList.add("is-hidden-edit");
  evt.target.reset();
});

// !delete student
const deleteStudentDataOpenBtnRef = document.querySelector(
  "[data-button=deleteStudent]"
);
const deleteStudentBackdropRef = document.querySelector(".backdrop-delete");
const deleteStudentFormFormRef = document.querySelector(
  "[data-form=deleteStudent]"
);
const deleteStudentDataCloseBtnRef = document.querySelector(
  "[data-button=closeDeleteStudent]"
);
const numInputDeleteStudentRef = document.querySelector(
  "[data-input=numDeleteInput]"
);

deleteStudentDataOpenBtnRef.addEventListener("click", () =>
  deleteStudentBackdropRef.classList.toggle("is-hidden-delete")
);
deleteStudentDataCloseBtnRef.addEventListener("click", () =>
  deleteStudentBackdropRef.classList.toggle("is-hidden-delete")
);

numInputDeleteStudentRef.addEventListener("input", (evt) => {
  const inputValue = Number(evt.target.value);
  const localStorageData = JSON.parse(localStorage.getItem("studentsList"));

  if (
    inputValue > 0 &&
    inputValue <= localStorageData.length &&
    localStorageData
  )
    return;
  else alert("Перевірте номер користувача який ви ввели ❗️");
});

deleteStudentFormFormRef.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const inputValue = Number(numInputDeleteStudentRef.value);
  const localStorageData = JSON.parse(localStorage.getItem("studentsList"));

  if (
    inputValue > 0 &&
    inputValue <= localStorageData.length &&
    localStorageData
  ) {
    localStorageData.splice(inputValue - 1, 1);
    localStorage.setItem("studentsList", JSON.stringify(localStorageData));

    tableRef.innerHTML = ``;

    localStorageData.forEach((student, idx) => {
      const currentIdx = idx + 1;
      tableRef.insertAdjacentHTML(
        "beforeend",
        `<td>${currentIdx}. ${student.name}</td>
          <td>${student.surname}</td>
          <td>${student.age}</td>
          <td>${student.course}</td>
          <td>${student.visitedCourse}</td>`
      );
    });
  }

  deleteStudentBackdropRef.classList.add("is-hidden-edit");
  evt.target.reset();
});
