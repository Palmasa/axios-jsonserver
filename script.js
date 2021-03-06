const dataWrapper = document.getElementById("data-wrapper");
let form = document.getElementById("add-form");
let creating = true;
let currentSection;

const host = "http://localhost:8000";


// ------------------------ API Calls ------------------------
const goToStudents = () => {
  // GET
  setCurrentSection("students");
  // draw cards
};

const goToInstructors = () => {
  // GET
  setCurrentSection("instructors");
  // draw cards
};

const goToLeadInstructors = () => {
	// GET
	setCurrentSection("leadInstructors");
	// draw cards
};

const deleteElement = (id) => {
	// DELETE
	/* showPopup(currentSection === "students" ? "🎓 Congrats! 🎓" : "🔥 fired 🔥");
	deleteCard(`${currentSection}-${id}`) */
};

const submitForm = (e) => {
  e.preventDefault();
  const data = {
    fullName: formValue("fullName"),
    nickname: formValue("nickname"),
    drink: formValue("drink"),
    meal: formValue("meal"),
    pet: formValue("pet"),
    feeling: formValue("feeling"),
    reason: formValue("reason"),
  };
  creating ? create(data) : edit(data, formValue("id"));
};

const edit = (data, id) => {
	// PUT
	/* deleteCard(`${currentSection}-${id}`);
	drawCard(element);
	form.reset(); 
	creating = true
	setFormSubmitLabel()*/
};

const create = (data) => {
	// POST
	/* drawItem(element);
	drawCard(element);
	form.reset(); 
	setFormSubmitLabel()*/
};

const showEditElement = (id) => {
	// GET
	/* fillFormData(element);
	showForm(); */
};

// ------------------------- DOM manipulation -------------------------
// ------------------------------ Cards -------------------------------
const drawCards = (items) => {
  clearData();
  items.forEach((item) => drawCard(item));
};

const drawCard = ({
  id,
  fullName,
  nickname,
  drink,
  meal,
  pet,
  feeling,
  reason,
}) => {
  const element = document.createElement("div");
  element.className = "card";
  element.innerHTML = `
		<h2>🖐️ ${fullName} 🖐️</h2>
		<p><b>😎 Nick 😎</b> - ${nickname}</p>
		<p><b>🍹 Bebida 🍹</b> - ${drink}</p>
		<p><b>🍲 Comida 🍲</b> - ${meal}</p>
		<p><b>🐰 Mascota 🐰</b> - ${pet}</p>
		<p><b>🤔 Feeling 🤔</b> - ${feeling}</p>
		<p><b>🔥 Xq 🔥</b> - ${reason}</p>
	`;
  element.id = `${currentSection}-${id}`;
  const removeButton = createButton(
    currentSection === "students" ? "graduate" : "fire",
    () => deleteElement(id)
  );
  element.appendChild(removeButton);
  const editButton = createButton("edit", () => showEditElement(id));
  element.appendChild(editButton);
  removeButton.onclick = dataWrapper.appendChild(element);
  dataWrapper.prepend(element);
};

const deleteCard = (id) => {
  console.log(id);
  const element = document.getElementById(id);
  element.parentElement.removeChild(element);
};

const createButton = (text, onClick) => {
  const btn = document.createElement("button");
  btn.classList = text;
  btn.innerText = text;
  btn.addEventListener("click", onClick);
  return btn;
};

// ----------------------------- Content --------------------------------
const clearData = () => {
  dataWrapper.innerHTML = "";
  creating = true;
};

// ------------------------------ Popup --------------------------------
const showPopup = (e) => {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerText = e || "🔥 Erroooor 🔥";
  document.body.appendChild(popup);
  setTimeout(() => document.body.removeChild(popup), 6000);
};

// ---------------------------- Form/fields ----------------------------
const formValue = (id) => {
  return document.getElementById(id).value;
};

const fillFormData = (data) => {
  creating = false;
  Object.entries(data).forEach(([k, v]) => {
    fillField(k, v);
  });
};

const fillField = (field, value) => {
  const el = form.querySelector(`#${field}`);
  if (el) {
    console.log(`found ${field} ${value}`);
    el.value = value;
  }
};

const showForm = () => {
  setFormSubmitLabel();
  form.classList.remove("hidden");
  focusForm();
};

const showEmptyForm = (e) => {
  e.preventDefault();
  creating = true;
  form.reset();
  setFormSubmitLabel();
  form.classList.remove("hidden");
  focusForm();
};

const hideForm = (e) => {
  e.preventDefault();
  form.classList.add("hidden");
};

const setFormSubmitLabel = () => {
  form.querySelector(".submit").innerText = creating ? "add" : "edit";
};

const focusForm = () => {
  document.getElementById("fullName").focus();
};

const setCurrentSection = (section) => {
  form.reset();
  document.querySelector(".current")?.classList.remove("current");
  document.getElementById(section)?.classList.add("current");
  currentSection = section;
};

// --------------------------- Initialize ---------------------------
goToStudents();
