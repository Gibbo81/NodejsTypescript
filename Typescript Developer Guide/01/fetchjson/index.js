"use strict";
//command to execute directly without converting  'ts-node index.ts' only for debugging
//command to convert the file "tsc index.ts"
exports.__esModule = true;
var axios_1 = require("axios");
var url = 'https://jsonplaceholder.typicode.com/todos/1';
axios_1["default"].get(url)
    .then(function (response) {
    var todo = response.data;
    var ID = todo.id;
    var title = todo.title;
    var finished = todo.completed;
    //backtick (`) characters is alt + 96
    toLog(ID, title, finished);
});
var toLog = function (ID, title, finished) {
    console.log("   \n    The tod with ID: ".concat(ID, "\n    has a title of: ").concat(title, "\n    It it finished? ").concat(finished));
    //backtick (`) characters is alt + 96  
};
