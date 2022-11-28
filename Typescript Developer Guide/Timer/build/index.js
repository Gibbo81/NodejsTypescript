var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function createPromise(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}
var x = setInterval(mytimer, 4000);
var x2 = setInterval(mytimer2, 5000);
var x3 = setInterval(mytimerasync, 5000);
var count = 1;
function mytimer() {
    console.log(`try ${count} date: ${new Date()}`);
    count += 1;
}
var count2 = { count: 1 };
function mytimer2() {
    console.log(`BIS BIS BIS: ${count2.count}`);
    count2 = { count: (count2.count + 1) }; // try out recreating the object
}
var count3 = 1;
function mytimerasync() {
    return __awaiter(this, void 0, void 0, function* () {
        var promise = createPromise(count3 + 100);
        var result = yield promise;
        console.log(`promise: ${count3}, value: ${result} `);
        count3 += 1;
    });
} // try out recreating the object
