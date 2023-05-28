class Student {
  #name = "";
  #age = 0;

  constructor(name, age) {
    if (age < 0) throw new Error("나이가 음수면 안됩니다.");
    this.#name = name;
    this.#age = age;
  }

  #changeAge(age) {
    this.#age = age;
  }
}

let student = new Student("John", 19);

student["#changeAge"](29);
