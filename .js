const A = {
  name: "Ann",
  // A.print.[[HomeObject]] === A
  print() {
    console.log(this.name);
  },
};

const B = {
  __proto__: A,
  name: "Ben",
  // B.print.[[HomeObject]] === B
  print() {
    super.print();
  },
};

const C = {
  __proto__: B,
  name: "Charles",
  // C.print.[[HomeObject]] === C
  print() {
    super.print();
  },
};

C.print(); // Charles
