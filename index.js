var lexer = require('./lexer');
const process = require('process');
const fs = require('fs');
const parser = require('./parser/parser')
const Semantic = require('./semantic');

var semantic;

var code = '';
var errors = [];

var tokensWithValuesToParse = [
    'IDENTIFIER_POINTER_ADDRESS',
    'IDENTIFIER_POINTER_VARIABLE',
    'IDENTIFIER_VARIABLES',
    'INSTANCE_OF_BOOL',
    'INSTANCE_OF_CHAR_MULTPLE',
    'INSTANCE_OF_CHAR_SIMPLE',
    'INSTANCE_OF_FLOAT',
    'INSTANCE_OF_INT'
];
var intervals = [];

str = process.argv[2];

if (str) {
    fs.readFile(str, 'utf-8', function (err, data) {
        if (err) {
            console.error("Could not open file: %s", err);
            process.exit(1);
        }
        console.log("Arquivo aberto")
        makeIterval(data.split('\n'));
        console.log(data)
        console.log(code);

        let lex = lexer.lexer;
        let tokens = lexer.tokens;
        let errors = lexer.errors;


        lex.setSource(data)
        lex.myData(data);
        lex.lex();

        console.table(tokens);
        console.table(errors);

        let str = generateStringParser(tokens);
        console.log(str +'\n\n\n\n\n\n');
        let tree = parser.parse(str);
        semantic = new Semantic(tree)
        semantic.run();


    });
}

function makeIterval(arr) {
    start = 0;
    let i = 0;
    for (let s of arr) {
        i++;
        intervals.push({ start: start, end: start + s.length });
        start = start + s.length + 1;
        if (i < 10) {
            code = code + i + "     " + s + "\n";
        } else if (i < 100) {
            code = code + i + "    " + s + "\n";
        } else {
            code = code + i + "   " + s + "\n";
        }
    }
}

function generateStringParser(token) {
    str = '';
    for (let t of token) {
        str += t.token;

        str = setValueInString(str, t);
        if (t.token == 'DELIMITER_DOT_COMMA') {
            // str += '\n';
        }
    }
    fs.writeFileSync('out.txt', str);
    return str;

}

function setValueInString(str, token) {

    if (tokensWithValuesToParse.indexOf(token.token) > -1) {
        if (token.value == "\b") {
            str += '{' + '\"\"' + '|' + token.line + '|' + token.column + '}';
        } else {
            str += '{' + '\"' + token.value + '\"' + '|' + token.line + '|' + token.column + '}';

        }
        //str+= '{'+"\""+clearStringReverse(token.value)+"\""+'|'+token.line+'|'+token.column+'}';

    }
    return str;


}
