let notName: string = "Klara";
let noTypeName: any = "NieKlara";

notName = "Tak";

const names: string[] = [notName, noTypeName];

const ourTuple: [jakiśNumer: number, jakiśBool: boolean, any] = [5, true, "xd"];

let [x, y, z] = ourTuple;

z = 6;

console.log(typeof z, x);

type aNumber = number;

let justANumber: aNumber = 25;

console.log(typeof justANumber);
