console.log("1  Hi");

const my = new Promise((resolve, reject) => {
  console.log("2  ");
  setTimeout(() => {
    console.log("3  Set timeout in promise");
    resolve("foo");
    reject("bar");
  }, 0);
});

setTimeout(() => {
  console.log("4  Set timeout");
}, 0);

console.log("6  outside");

my.then((v) => console.log(`5  then ${v} bar`)).catch((v) =>
  console.log(`5  catch ${v} bar`)
);

const myy = new Promise((resolve, reject) => {
  console.log("7  ");
  setTimeout(() => {
    console.log("8  Set timeout in promise");
    resolve("foo");
    reject("bar");
  }, 0);
});

myy
  .then((v) => console.log(`9  then ${v} bar`))
  .catch((v) => console.log(`9  catch ${v} bar`));
