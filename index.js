var Lexer = require('flex-js');
const process = require('process');
const fs = require('fs');


var lexer = new Lexer();

var tokens = [];

var code = '';
var errors = [];

var intervals = [];


const ENUM_TOKENS = {

    INSTANCE_OF_INT: 'INSTANCE_OF_INT',
    INSTANCE_OF_FLOAT: 'INSTANCE_OF_FLOAT',
    INSTANCE_OF_BOOL: 'INSTANCE_OF_BOOL',
    INSTANCE_OF_CHAR_SIMPLE: 'INSTANCE_OF_CHAR_SIMPLE',
    INSTANCE_OF_CHAR_MULTPLE: 'INSTANCE_OF_CHAR_MULTPLE',

    TYPE_INT: 'TYPE_INT',
    TYPE_BOOL: 'TYPE_BOOL',
    TYPE_FLOAT: 'TYPE_FLOAT',
    TYPE_CHAR: 'TYPE_CHAR',
    TYPE_VOID: 'TYPE_VOID',

    COMMAND_IF: 'COMMAND_IF',
    COMMAND_FOR: 'COMMAND_FOR',
    COMMAND_WHILE: 'COMMAND_WHILE',
    COMMAND_DO: 'COMMAND_DO',
    COMMAND_BREAK: 'COMMAND_BREAK',
    COMMAND_CONTINUE: 'COMMAND_CONTINUE',
    COMMAND_SCANF: 'COMMAND_SCANF',
    COMMAND_PRINTF: 'COMMAND_PRINTF',
    COMMAND_INCLUDE: 'COMMAND_INCLUDE',
    COMMAND_RETURN: 'COMMAND_RETURN',
    COMMAND_ELSE:'COMMAND_ELSE',

    IDENTIFIER_MAIN: 'IDENTIFIER_MAIN',
    IDENTIFIER_VARIABLES: 'IDENTIFIER_VARIABLES',
    IDENTIFIER_POINTER_VARIABLE: 'IDENTIFIER_POINTER_VARIABLE',
    IDENTIFIER_POINTER_ADDRESS: 'IDENTIFIER_POINTER_ADDRESS',

    OPERATOR_ARITHMETIC_PLUS: 'OPERATOR_ARITHMETIC_PLUS',
    OPERATOR_ARITHMETIC_LESS: 'OPERATOR_ARITHMETIC_LESS',
    OPERATOR_ARITHMETIC_MULTIPLICATION: 'OPERATOR_ARITHMETIC_MULTIPLICATION',
    OPERATOR_ARITHMETIC_DIVISION: 'OPERATOR_ARITHMETIC_DIVISION',
    OPERATOR_ARITHMETIC_DIV: 'OPERATOR_ARITHMETIC_DIV',
    OPERATOR_ARITHMETIC_MOD: 'OPERATOR_ARITHMETIC_MOD',
    OPERATOR_COMPARISON_LESS_THEN: 'OPERATOR_COMPARISON_LESS_THEN',
    OPERATOR_COMPARISON_MORE_THEN: 'OPERATOR_COMPARISON_MORE_THEN',
    OPERATOR_COMPARISON_LESS_EQUAL: 'OPERATOR_COMPARISON_LESS_EQUAL',
    OPERATOR_COMPARISON_MORE_EQUAL: 'OPERATOR_COMPARISON_MORE_EQUAL',
    OPERATOR_COMPARISON_DIFFERENT: 'OPERATOR_COMPARISON_DIFFERENT',
    OPERATOR_COMPARISON_EQUAL: 'OPERATOR_COMPARISON_EQUAL',
    OPERATOR_ATRIBUTION_EQUAL: 'OPERATOR_ATRIBUTION_EQUAL',
    OPERATOR_NEGATION: 'OPERATOR_NEGATION',
    OPERATOR_UNARY_PIPE: 'OPERATOR_UNARY_PIPE',
    OPERATOR_UNARY_E: 'OPERATOR_UNARY_E',

    DELIMITER_BLOCK_LEFT_BRACKET: 'DELIMITER_BLOCK_LEFT_BRACKET',
    DELIMITER_BLOCK_LEFT_BRACE: 'DELIMITER_BLOCK_LEFT_BRACE',
    DELIMITER_BLOCK_LEFT_PARENTHESES: 'DELIMITER_BLOCK_LEFT_PARENTHESES',
    DELIMITER_BLOCK_RIGHT_BRACKET: 'DELIMITER_BLOCK_RIGHT_BRACKET',
    DELIMITER_BLOCK_RIGHT_BRACE: 'DELIMITER_BLOCK_RIGHT_BRACE',
    DELIMITER_BLOCK_RIGHT_PARENTHESES: 'DELIMITER_BLOCK_RIGHT_PARENTHESES',
    DELIMITER_END_LINE: 'DELIMITER_END_LINE',
    DELIMITER_HASHTAG: 'DELIMITER_HASHTAG',
    DELIMITER_COMMA: 'DELIMITER_COMMA',
    DELIMITER_DOT:'DELIMITER_DOT',
    DELIMITER_DOT_COMMA:'DELIMITER_DOT_COMMA',
    COMMENT_SIMPLE: 'COMMENT_SIMPLE',
    COMMENT_MULTIPLE: 'COMMENT_MULTIPLE',

    INCLUDE_CONTENT: 'INCLUDE_CONTENT'

}


// DEFINE OPTIONS FOR THIS LEXER
lexer.setIgnoreCase(true);  // SET IGNORE CASE

// OVERIDE THE DEFAULT ERROR ACTION
lexer.echo = function () {
    let i = getInterval(this.index);
    errors.push({ error: "ENTRY DOES NOT MATCH", value: this.text, line: i.line, column: i.column });
}


//ADD DEFINITION WITH REGULAR EXPRESSIONS

//INSTANCES OF TYPES
lexer.addDefinition('INSTANCE_OF_INT', /[0-9]+/);
//lexer.addDefinition('INSTANCE_OF_FLOAT', /\b((\d+)\.(\d+))|(\d+)E-(\d+)\b/);
lexer.addDefinition('INSTANCE_OF_FLOAT', /\b(\d*\.\d+((e|E)(-|\+)?\d+)?|\d+(\.\d+)?((e|E)(-|\+)?\d+))\b/);
lexer.addDefinition('INSTANCE_OF_BOOL', /\btrue\b|\bfalse\b/);
lexer.addDefinition('INSTANCE_OF_CHAR_SIMPLE', /'.{1}'/);
lexer.addDefinition('INSTANCE_OF_CHAR_MULTPLE', /"([^"\\\n]|\\.|\\\n)*["]/);

//TYPES
lexer.addDefinition('TYPE_INT', /\bint\b/);
lexer.addDefinition('TYPE_FLOAT', /\bfloat\b/);
lexer.addDefinition('TYPE_BOOL', /\bbool\b/);
lexer.addDefinition('TYPE_CHAR', /\bchar\b/);
lexer.addDefinition('TYPE_VOID', /\bvoid\b/);


//COMMANDS
lexer.addDefinition('COMMAND_IF', /\bif\b/);
lexer.addDefinition('COMMAND_FOR', /\bfor\b/);
lexer.addDefinition('COMMAND_WHILE', /\bwhile\b/);
lexer.addDefinition('COMMAND_DO', /\bdo\b/);
lexer.addDefinition('COMMAND_BREAK', /\bbreak\b/);
lexer.addDefinition('COMMAND_CONTINUE', /\bcontinue\b/);
lexer.addDefinition('COMMAND_INCLUDE', /\binclude\b/);
lexer.addDefinition('COMMAND_RETURN', /\breturn\b/);
lexer.addDefinition('COMMAND_ELSE', /\belse\b/);
lexer.addDefinition('COMMAND_SCANF', /\scanf\b/);
lexer.addDefinition('COMMAND_PRINTF', /\bprintf\b/);


//OPERATORS
lexer.addDefinition('OPERATOR_ARITHMETIC_PLUS', /\+/);
lexer.addDefinition('OPERATOR_ARITHMETIC_LESS', /-/);
lexer.addDefinition('OPERATOR_ARITHMETIC_MULTIPLICATION', /\*/);
lexer.addDefinition('OPERATOR_ARITHMETIC_DIVISION', /\b\/\b/);
lexer.addDefinition('OPERATOR_ARITHMETIC_DIV', /div/);
lexer.addDefinition('OPERATOR_ARITHMETIC_MOD', /mod/);
lexer.addDefinition('OPERATOR_COMPARISON_LESS_THEN', /</);
lexer.addDefinition('OPERATOR_COMPARISON_MORE_THEN', />/);
lexer.addDefinition('OPERATOR_COMPARISON_LESS_EQUAL', /<=/);
lexer.addDefinition('OPERATOR_COMPARISON_MORE_EQUAL', />=/);
lexer.addDefinition('OPERATOR_COMPARISON_DIFFERENT', /!=/);
lexer.addDefinition('OPERATOR_COMPARISON_EQUAL', /==/);
lexer.addDefinition('OPERATOR_ATRIBUTION_EQUAL', /=/);
lexer.addDefinition('OPERATOR_NEGATION', /!/);
lexer.addDefinition('OPERATOR_UNARY_PIPE', /\|/);
lexer.addDefinition('OPERATOR_UNARY_E', /&/);



//DELIMITERS
lexer.addDefinition('DELIMITER_BLOCK_LEFT_BRACKET', /\[/);
lexer.addDefinition('DELIMITER_BLOCK_LEFT_BRACE', /\{/);
lexer.addDefinition('DELIMITER_BLOCK_LEFT_PARENTHESES', /\(/);
lexer.addDefinition('DELIMITER_BLOCK_RIGHT_BRACKET', /\]/);
lexer.addDefinition('DELIMITER_BLOCK_RIGHT_BRACE', /\}/);
lexer.addDefinition('DELIMITER_BLOCK_RIGHT_PARENTHESES', /\)/);
lexer.addDefinition('DELIMITER_HASHTAG', /#/);
lexer.addDefinition('DELIMITER_COMMA', /,/);
lexer.addDefinition('DELIMITER_DOT', /\./);
lexer.addDefinition('DELIMITER_DOT_COMMA', /;/);


//IDENTIFIER
lexer.addDefinition('IDENTIFIER_MAIN', /\bmain\b/);
lexer.addDefinition('IDENTIFIER_VARIABLES', /[_a-zA-Z]([_a-zA-Z0-9])*/);
lexer.addDefinition('IDENTIFIER_POINTER_VARIABLE', /[*][_a-zA-Z][_a-zA-Z0-9]{0,30}/);
lexer.addDefinition('IDENTIFIER_POINTER_ADDRESS', /[&][_a-zA-Z][_a-zA-Z0-9]{0,30}/);

//COMMENT - DISABLED
lexer.addDefinition('COMMENT_SIMPLE', /\/\/.*/)
lexer.addDefinition('COMMENT_MULTIPLE', /((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/)

//INCLUDE - DISABLED
lexer.addDefinition('INCLUDE_CONTENT', /<\w+.h>/)

lexer.addDefinition('MULTIPLES_IN_CHAR', /'.{2,}'/)

//ADD RULES

//RULES FOR INSTANCES OF TYPES 
lexer.addRule(/{INSTANCE_OF_INT}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_INT, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{INSTANCE_OF_FLOAT}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_FLOAT, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{INSTANCE_OF_BOOL}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_BOOL, value: lexer.text, line: i.line, column: i.column });
});

lexer.addRule(/{MULTIPLES_IN_CHAR}/, function (lexer) {
    let i = getInterval(lexer.index);
    verifyAgain(lexer.text, i);

});
// A filter for specific characters in single quotation marks that can be recognized with simple char
function verifyAgain(str, i) {
    str = clearString(str);

    if (str == '\n' || str == '\"' || str == '\r' || str == '\t' || str == '\f' || str == '\'' || str == '\"' || str == '\b') {
        tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_CHAR_SIMPLE, value: str, line: i.line, column: i.column });
    } else {
        errors.push({ error: "MULTIPLE CHARACTERS IN A CHAR", value: str, line: i.line, column: i.column });
    }
}

lexer.addRule(/{INSTANCE_OF_CHAR_SIMPLE}/, function (lexer) {
    let i = getInterval(lexer.index);
    s = clearString(lexer.text);
    tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_CHAR_SIMPLE, value: s, line: i.line, column: i.column });
});
lexer.addRule(/{INSTANCE_OF_CHAR_MULTPLE}/, function (lexer) {
    let i = getInterval(lexer.index);
    s = clearString(lexer.text);
    //console.log(s);
    tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_CHAR_MULTPLE, value: s, line: i.line, column: i.column });
});


//RULES FOR TYPES 
lexer.addRule(/{TYPE_INT}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.TYPE_INT, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{TYPE_VOID}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.TYPE_VOID, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{TYPE_FLOAT}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.TYPE_FLOAT, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{TYPE_BOOL}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.TYPE_BOOL, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{TYPE_CHAR}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.TYPE_CHAR, value: lexer.text, line: i.line, column: i.column });
});

//RULES FOR COMMANDS
lexer.addRule(/{COMMAND_IF}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.COMMAND_IF, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{COMMAND_ELSE}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.COMMAND_ELSE, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{COMMAND_FOR}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.COMMAND_FOR, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{COMMAND_WHILE}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.COMMAND_WHILE, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{COMMAND_DO}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.COMMAND_DO, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{COMMAND_BREAK}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.COMMAND_BREAK, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{COMMAND_CONTINUE}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.COMMAND_CONTINUE, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{COMMAND_INCLUDE}/, function (lexer) {
    let i = getInterval(lexer.index);
    // tokens.push({ token: ENUM_TOKENS.COMMAND_INCLUDE, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{COMMAND_RETURN}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.COMMAND_RETURN, value: lexer.text, line: i.line, column: i.column });
});

lexer.addRule(/{COMMAND_PRINTF}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.COMMAND_PRINTF, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{COMMAND_SCANF}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.COMMAND_SCANF, value: lexer.text, line: i.line, column: i.column });
});


//RULES FOR OPERATORS
lexer.addRule(/{OPERATOR_ARITHMETIC_PLUS}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_PLUS, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_ARITHMETIC_LESS}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_LESS, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_ARITHMETIC_MULTIPLICATION}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_MULTIPLICATION, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_ARITHMETIC_DIVISION}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_DIVISION, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_ARITHMETIC_DIV}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_DIV, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_ARITHMETIC_MOD}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_MOD, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_COMPARISON_LESS_THEN}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_LESS_THEN, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_COMPARISON_MORE_THEN}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_MORE_THEN, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_COMPARISON_LESS_EQUAL}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_LESS_EQUAL, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_COMPARISON_MORE_EQUAL}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_MORE_EQUAL, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_COMPARISON_DIFFERENT}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_DIFFERENT, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_COMPARISON_EQUAL}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_EQUAL, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_ATRIBUTION_EQUAL}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ATRIBUTION_EQUAL, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_NEGATION}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_NEGATION, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_UNARY_PIPE}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_UNARY_PIPE, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{OPERATOR_UNARY_E}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.OPERATOR_UNARY_E, value: lexer.text, line: i.line, column: i.column });
});


//RULES FOR DELIMITERS
lexer.addRule(/{DELIMITER_BLOCK_LEFT_BRACKET}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_LEFT_BRACKET, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{DELIMITER_BLOCK_LEFT_BRACE}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_LEFT_BRACE, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{DELIMITER_BLOCK_LEFT_PARENTHESES}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_LEFT_PARENTHESES, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{DELIMITER_BLOCK_RIGHT_BRACKET}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_RIGHT_BRACKET, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{DELIMITER_BLOCK_RIGHT_BRACE}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_RIGHT_BRACE, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{DELIMITER_BLOCK_RIGHT_PARENTHESES}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_RIGHT_PARENTHESES, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{DELIMITER_COMMA}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.DELIMITER_COMMA, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{DELIMITER_HASHTAG}/, function (lexer) {
    let i = getInterval(lexer.index);
    //tokens.push({ token: ENUM_TOKENS.DELIMITER_HASHTAG, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{DELIMITER_DOT}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.DELIMITER_DOT, value: lexer.text, line: i.line, column: i.column });
});

lexer.addRule(/{DELIMITER_DOT_COMMA}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.DELIMITER_DOT_COMMA, value: lexer.text, line: i.line, column: i.column });
});



//RULES FOR IDENTIFIER
lexer.addRule(/{IDENTIFIER_MAIN}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.IDENTIFIER_MAIN, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{IDENTIFIER_VARIABLES}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.IDENTIFIER_VARIABLES, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{IDENTIFIER_POINTER_ADDRESS}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.IDENTIFIER_POINTER_ADDRESS, value: lexer.text, line: i.line, column: i.column });
});
lexer.addRule(/{IDENTIFIER_POINTER_VARIABLE}/, function (lexer) {
    let i = getInterval(lexer.index);
    tokens.push({ token: ENUM_TOKENS.IDENTIFIER_POINTER_VARIABLE, value: lexer.text, line: i.line, column: i.column });
});

//COMMENT RULES - DISABLED
lexer.addRule(/{COMMENT_SIMPLE}/, function (lexer) {
    let i = getInterval(lexer.index);
    //tokens.push({ token: ENUM_TOKENS.COMMENT_SIMPLE, value: lexer.text, line: i.line, column: i.column });

});
lexer.addRule(/{COMMENT_MULTIPLE}/, function (lexer) {
    let i = getInterval(lexer.index);
    //console.log(lexer.text);
    tokens.push({ token: ENUM_TOKENS.COMMENT_MULTIPLE, value: lexer.text, line: i.line, column: i.column });
});


//INCLUDE RULES - DISABLED
lexer.addRule(/{INCLUDE_CONTENT}/, function (lexer) {
    let i = getInterval(lexer.index);
    //tokens.push({ token: ENUM_TOKENS.INCLUDE_CONTENT, value: lexer.text, line: i.line, column: i.column });
});

lexer.addRule(/\s+/);

str = process.argv[2];

if (str) {
    fs.readFile(str, 'utf-8', function (err, data) {
        if (err) {
            console.error("Could not open file: %s", err);
            process.exit(1);
        }
        console.log("Arquivo aberto")
        console.log();
        makeIterval(data.split('\n'));
        console.log(code);
        lexer.setSource(data);
        lexer.lex();
        console.table(tokens);
        console.table(errors);
        generateStringParser(tokens);
    });
}

function generateStringParser(token){
    str = '';
    for(let t of token){
        str+=t.token;
    }
    console.log(str);
    return str;
  
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
function getInterval(pos) {
    for (let i = 0; i < intervals.length; i++) {
        if (pos >= intervals[i].start && pos <= intervals[i].end) {
            return { line: i + 1, column: pos - intervals[i].start };
        }
    }
    return { line: '', column: '' };
}

function clearString(s) {
    let a = 'a ';
    if (s[0] == '\'' || s[0] == '\"') {
        s = s.slice(1, s.length);
    }
    if (s[s.length - 1] == '\'' || s[s.length - 1] == '\"') {
        s = s.slice(0, s.length - 1);
    }
    s = s.replace(/(\\n)+/g, '\n');
    s = s.replace(/(\\t)+/g, '\t');
    s = s.replace(/(\\f)+/g, '\f');
    s = s.replace(/(\\b)+/g, '\b');
    s = s.replace(/(\\r)+/g, '\r');
    s = s.replace(/(\\')+/g, '\'');
    s = s.replace(/(\\")+/g, '\"');
    s = s.replace(/(\\)+/g, '\\');
    return s;
}