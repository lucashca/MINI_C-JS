var Lexer = require('flex-js');
const process = require('process');
const fs = require('fs');


var lexer = new Lexer();

var tokens = [];

var code = '';




const ENUM_TOKENS = {

    INSTANCE_OF_INT: 'INT',
    INSTANCE_OF_FLOAT: 'FLOAT',
    INSTANCE_OF_BOOL: 'BOOL',
    INSTANCE_OF_CHAR_SIMPLE: 'INSTANCE_OF_CHAR_SIMPLE',
    INSTANCE_OF_CHAR_MULTPLE: 'INSTANCE_OF_CHAR_MULTPLE',

    TYPE_INT: 'TYPE_INT',
    TYPE_BOOL: 'TYPE_BOOL',
    TYPE_FLOAT: 'TYPE_FLOAT',
    TYPE_CHAR: 'TYPE_CHAR',
    COMMAND_IF: 'COMMAND_IF',
    COMMAND_FOR: 'COMMAND_FOR',
    COMMAND_WHILE: 'COMMAND_WHILE',
    COMMAND_DO: 'COMMAND_DO',
    COMMAND_BREAK: 'COMMAND_BREAK',
    COMMAND_CONTINUE: 'COMMAND_CONTINUE',
    COMMAND_SCANF: 'COMMAND_SCANF',
    COMMAND_PRINT: 'COMMAND_PRINT',
    COMMAND_INCLUDE: 'COMMAND_INCLUDE',

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

    DELIMITER_BLOCK_LEFT_BRACKET: 'DELIMITER_BLOCK_LEFT_BRACKET',
    DELIMITER_BLOCK_LEFT_BRACE: 'DELIMITER_BLOCK_LEFT_BRACE',
    DELIMITER_BLOCK_LEFT_PARENTHESES: 'DELIMITER_BLOCK_LEFT_PARENTHESES',
    DELIMITER_BLOCK_RIGHT_BRACKET: 'DELIMITER_BLOCK_RIGHT_BRACKET',
    DELIMITER_BLOCK_RIGHT_BRACE: 'DELIMITER_BLOCK_RIGHT_BRACE',
    DELIMITER_BLOCK_RIGHT_PARENTHESES: 'DELIMITER_BLOCK_RIGHT_PARENTHESES',
    DELIMITER_END_LINE: 'DELIMITER_END_LINE',
    DELIMITER_HASHTAG: 'DELIMITER_HASHTAG',
    DELIMITER_COMMA: 'DELIMITER_COMMA',

    COMMENT_SIMPLE: 'COMMENT_SIMPLE',
    COMMENT_MULTIPLE: 'COMMENT_MULTIPLE',

    INCLUDE_CONTENT: 'INCLUDE_CONTENT'

}


// options
lexer.setIgnoreCase(true);  // does not make sense for this scanner, just for reference

lexer.addDefinition('INSTANCE_OF_INT', /\b(\d+)\b/);
lexer.addDefinition('INSTANCE_OF_FLOAT', /\b(\d+)\.(\d+)\b/);
lexer.addDefinition('INSTANCE_OF_BOOL', /\btrue\b|\bfalse\b/);
lexer.addDefinition('INSTANCE_OF_CHAR_SIMPLE', /'(\w)'/);
lexer.addDefinition('INSTANCE_OF_CHAR_MULTPLE', /"([^"\\\n]|\\.|\\\n)*["]/);

lexer.addDefinition('TYPE_INT', /\bint\b/);
lexer.addDefinition('TYPE_FLOAT', /\bfloat\b/);
lexer.addDefinition('TYPE_BOOL', /\bbool\b/);
lexer.addDefinition('TYPE_CHAR', /\bchar\b/);

lexer.addDefinition('COMMAND_IF', /\bif\b/);
lexer.addDefinition('COMMAND_FOR', /\bfor\b/);
lexer.addDefinition('COMMAND_WHILE', /\bwhile\b/);
lexer.addDefinition('COMMAND_DO', /\bdo\b/);
lexer.addDefinition('COMMAND_BREAK', /\bbreak\b/);
lexer.addDefinition('COMMAND_CONTINUE', /\bcontinue\b/);
lexer.addDefinition('COMMAND_INCLUDE', /\binclude\b/);

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

lexer.addDefinition('DELIMITER_BLOCK_LEFT_BRACKET', /\[/);
lexer.addDefinition('DELIMITER_BLOCK_LEFT_BRACE', /\{/);
lexer.addDefinition('DELIMITER_BLOCK_LEFT_PARENTHESES', /\(/);
lexer.addDefinition('DELIMITER_BLOCK_RIGHT_BRACKET', /\]/);
lexer.addDefinition('DELIMITER_BLOCK_RIGHT_BRACE', /\}/);
lexer.addDefinition('DELIMITER_BLOCK_RIGHT_PARENTHESES', /\)/);
lexer.addDefinition('DELIMITER_END_LINE', /;/);
lexer.addDefinition('DELIMITER_HASHTAG', /#/);
lexer.addDefinition('DELIMITER_COMMA', /,/);


lexer.addDefinition('IDENTIFIER_MAIN', /\bmain\b/);
lexer.addDefinition('IDENTIFIER_VARIABLES', /[_a-zA-Z][_a-zA-Z0-9]{0,30}/);
lexer.addDefinition('IDENTIFIER_POINTER_VARIABLE', /[*][_a-zA-Z][_a-zA-Z0-9]{0,30}/);
lexer.addDefinition('IDENTIFIER_POINTER_ADDRESS', /[&][_a-zA-Z][_a-zA-Z0-9]{0,30}/);

lexer.addDefinition('COMMENT_SIMPLE', /\/\/.*/)
lexer.addDefinition('COMMENT_MULTIPLE', /\/\*.*\*\//)

lexer.addDefinition('INCLUDE_CONTENT', /<\w+.h>/)



lexer.addRule(/{INCLUDE_CONTENT}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.INCLUDE_CONTENT, value: lexer.text });
});
lexer.addRule(/{INSTANCE_OF_INT}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_INT, value: lexer.text });
});
lexer.addRule(/{INSTANCE_OF_FLOAT}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_FLOAT, value: lexer.text });
});
lexer.addRule(/{INSTANCE_OF_BOOL}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_BOOL, value: lexer.text });
});
lexer.addRule(/{INSTANCE_OF_CHAR_SIMPLE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_CHAR_SIMPLE, value: lexer.text });
});
lexer.addRule(/{INSTANCE_OF_CHAR_MULTPLE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.INSTANCE_OF_CHAR_MULTPLE, value: lexer.text });
});

lexer.addRule(/{TYPE_INT}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.TYPE_INT, value: lexer.text });
});
lexer.addRule(/{TYPE_FLOAT}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.TYPE_FLOAT, value: lexer.text });
});
lexer.addRule(/{TYPE_BOOL}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.TYPE_BOOL, value: lexer.text });
});
lexer.addRule(/{TYPE_CHAR}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.TYPE_CHAR, value: lexer.text });
});

lexer.addRule(/{COMMAND_IF}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.COMMAND_IF, value: lexer.text });
});
lexer.addRule(/{COMMAND_FOR}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.COMMAND_FOR, value: lexer.text });
});
lexer.addRule(/{COMMAND_WHILE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.COMMAND_WHILE, value: lexer.text });
});
lexer.addRule(/{COMMAND_DO}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.COMMAND_DO, value: lexer.text });
});
lexer.addRule(/{COMMAND_BREAK}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.COMMAND_BREAK, value: lexer.text });
});
lexer.addRule(/{COMMAND_CONTINUE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.COMMAND_CONTINUE, value: lexer.text });
});
lexer.addRule(/{COMMAND_INCLUDE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.COMMAND_INCLUDE, value: lexer.text });
});

lexer.addRule(/{OPERATOR_ARITHMETIC_PLUS}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_PLUS, value: lexer.text });
});
lexer.addRule(/{OPERATOR_ARITHMETIC_LESS}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_LESS, value: lexer.text });
});
lexer.addRule(/{OPERATOR_ARITHMETIC_MULTIPLICATION}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_MULTIPLICATION, value: lexer.text });
});
lexer.addRule(/{OPERATOR_ARITHMETIC_DIVISION}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_DIVISION, value: lexer.text });
});
lexer.addRule(/{OPERATOR_ARITHMETIC_DIV}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_DIV, value: lexer.text });
});
lexer.addRule(/{OPERATOR_ARITHMETIC_MOD}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ARITHMETIC_MOD, value: lexer.text });
});
lexer.addRule(/{OPERATOR_COMPARISON_LESS_THEN}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_LESS_THEN, value: lexer.text });
});
lexer.addRule(/{OPERATOR_COMPARISON_MORE_THEN}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_MORE_THEN, value: lexer.text });
});
lexer.addRule(/{OPERATOR_COMPARISON_LESS_EQUAL}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_LESS_EQUAL, value: lexer.text });
});
lexer.addRule(/{OPERATOR_COMPARISON_MORE_EQUAL}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_MORE_EQUAL, value: lexer.text });
});
lexer.addRule(/{OPERATOR_COMPARISON_DIFFERENT}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_DIFFERENT, value: lexer.text });
});
lexer.addRule(/{OPERATOR_COMPARISON_EQUAL}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_COMPARISON_EQUAL, value: lexer.text });
});
lexer.addRule(/{OPERATOR_ATRIBUTION_EQUAL}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_ATRIBUTION_EQUAL, value: lexer.text });
});
lexer.addRule(/{OPERATOR_NEGATION}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.OPERATOR_NEGATION, value: lexer.text });
});


lexer.addRule(/{DELIMITER_BLOCK_LEFT_BRACKET}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_LEFT_BRACKET, value: lexer.text });
});
lexer.addRule(/{DELIMITER_BLOCK_LEFT_BRACE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_LEFT_BRACE, value: lexer.text });
});
lexer.addRule(/{DELIMITER_BLOCK_LEFT_PARENTHESES}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_LEFT_PARENTHESES, value: lexer.text });
});
lexer.addRule(/{DELIMITER_BLOCK_RIGHT_BRACKET}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_RIGHT_BRACKET, value: lexer.text });
});
lexer.addRule(/{DELIMITER_BLOCK_RIGHT_BRACE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_RIGHT_BRACE, value: lexer.text });
});
lexer.addRule(/{DELIMITER_BLOCK_RIGHT_PARENTHESES}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.DELIMITER_BLOCK_RIGHT_PARENTHESES, value: lexer.text });
});
lexer.addRule(/{DELIMITER_END_LINE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.DELIMITER_END_LINE, value: lexer.text });
});
lexer.addRule(/{IDENTIFIER_MAIN}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.IDENTIFIER_MAIN, value: lexer.text });
});
lexer.addRule(/{IDENTIFIER_VARIABLES}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.IDENTIFIER_VARIABLES, value: lexer.text });
});
lexer.addRule(/{IDENTIFIER_POINTER_ADDRESS}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.IDENTIFIER_POINTER_ADDRESS, value: lexer.text });
});
lexer.addRule(/{IDENTIFIER_POINTER_VARIABLE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.IDENTIFIER_POINTER_VARIABLE, value: lexer.text });
});
lexer.addRule(/{COMMENT_SIMPLE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.COMMENT_SIMPLE, value: lexer.text });
});
lexer.addRule(/{COMMENT_MULTIPLE}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.COMMENT_MULTIPLE, value: lexer.text });
});
lexer.addRule(/{DELIMITER_COMMA}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.DELIMITER_COMMA, value: lexer.text });
});
lexer.addRule(/{DELIMITER_HASHTAG}/, function (lexer) {
    tokens.push({ token: ENUM_TOKENS.DELIMITER_HASHTAG, value: lexer.text });
});
lexer.addRule(/\s+/);

/*

lexer.addRule(/{TYPE_FLOAT}/,function(lexer){
    tokens.push({token: ENUM_TOKENS.TYPE_INT, value: lexer.text });
})
lexer.addRule(/{TYPE_BOOL}/,function(lexer){
    tokens.push({token: ENUM_TOKENS.TYPE_INT, value: lexer.text });

*/
// code

str = process.argv[2];
/*
    if (str) {
        console.log(str)
        lexer.setSource(str);
        lexer.lex();
        console.log(tokens)
        console.log();
    }
*/
if (str) {
    fs.readFile(str, 'utf-8', function (err, data) {
        if (err) {
            console.error("Could not open file: %s", err);
            process.exit(1);
        }
        console.log("Arquivo aberto")
        console.log(data);
        lexer.setSource(data);
        lexer.lex();
        console.log(tokens)
    });
}
//Todo
/*
    Criar comentario
    Criar comentario multiplas linhas
    Criar Char Literal * DONE

*/