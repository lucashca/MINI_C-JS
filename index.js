var Lexer = require('flex-js');

var lexer = new Lexer();



var tokens = [];

const ENUM_TOKENS = {
    INT: 'INT',
    FLOAT: 'FLOAT',
    BOOL: 'BOOL',
    CHAR: 'CHAR',
    TYPE_INT: 'TYPE_INT',
    TYPE_CHAR: 'TYPE_CHAR',
    TYPE_BOOL: 'TYPE_BOOL',
    TYPE_FLOAT: 'TYPE_FLOAT',
    COMMAND_IF: 'COMMAND_IF',
    COMMAND_FOR: 'COMMAND_FOR',
    COMMAND_WHILE: 'COMMAND_WHILE',
    COMMAND_DO: 'COMMAND_DO',
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
    OPERATOR_NEGATION:'OPERATOR_NEGATION',
    COMMAND_FOR: 'COMMAND_FOR',
    COMMAND_WHILE: 'COMMAND_WHILE',
    COMMAND_DO: 'COMMAND_DO',
    COMMAND_IF: 'COMMAND_IF',
    COMMAND_BREAK: 'COMMAND_BREAK',
    COMMAND_CONTINUE: 'COMMAND_CONTINUE',
    
    ID_MAIN: 'ID_MAIN',
    ID_VARIABLES: 'ID_VARIABLES',
    DELIMITER_BLOCK_LEFT_BRACKET:'DELIMITER_BLOCK_LEFT_BRACKET',
    DELIMITER_BLOCK_LEFT_BRACE:'DELIMITER_BLOCK_LEFT_BRACE',
    DELIMITER_BLOCK_LEFT_PARENTHESES:'DELIMITER_BLOCK_LEFT_PARENTHESES',
    DELIMITER_BLOCK_RIGHT_BRACKET:'DELIMITER_BLOCK_RIGHT_BRACKET',
    DELIMITER_BLOCK_RIGHT_BRACE:'DELIMITER_BLOCK_RIGHT_BRACE',
    DELIMITER_BLOCK_RIGHT_PARENTHESES:'DELIMITER_BLOCK_RIGHT_PARENTHESES'

    
    
    

}

// options
lexer.setIgnoreCase(true);  // does not make sense for this scanner, just for reference

// definitions
lexer.addDefinition('DIGIT', /[0-9]/);
lexer.addDefinition('ALFA', /[A-Za-z]/);
lexer.addDefinition('ALFANUM', /[A-Za-z0-9]/);
lexer.addDefinition('ALFANUMID', /[A-Za-z0-9_-]/);
lexer.addDefinition('SOMETHING', /.*/);
lexer.addDefinition('QUOT', /"/);
lexer.addDefinition('SIMPLE_QUOT', /'/);
lexer.addDefinition('IF', /if/);
lexer.addDefinition('FOR', /for/);
lexer.addDefinition('DO', /do/);
lexer.addDefinition('WHILE', /while/);
lexer.addDefinition('INT', /int/);
lexer.addDefinition('FLOAT', /float/);
lexer.addDefinition('BOOL', /bool/);
lexer.addDefinition('CHAR', /char/);
lexer.addDefinition('BREAK', /break\[\]/);
lexer.addDefinition('CONTINUE', /continue/);
lexer.addDefinition("LBRACKET", /\[/);
lexer.addDefinition("RBRACKET", /\]/);
lexer.addDefinition("LBRACE", /\{/);
lexer.addDefinition("RBRACE", /\}/);



// rules

//FLOAT
lexer.addRule(/{DIGIT}+\.{DIGIT}+/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.FLOAT,value:lexer.text});
});
//CHAR
lexer.addRule(/{QUOT}+{SOMETHING}+{QUOT}/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.CHAR,value:lexer.text});
});
//CHAR
lexer.addRule(/{SIMPLE_QUOT}+{SOMETHING}+{SIMPLE_QUOT}/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.CHAR,value:lexer.text});
});
//INT
lexer.addRule(/{DIGIT}/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.INT,value:lexer.text});
});
//IF
lexer.addRule(/{IF}/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.COMMAND_IF,value:lexer.text});
});
//FOR
lexer.addRule(/{FOR}/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.COMMAND_FOR,value:lexer.text});
});
//DO
lexer.addRule(/{DO}/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.COMMAND_DO,value:lexer.text});
});
//WHILE
lexer.addRule(/{WHILE}/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.COMMAND_WHILE,value:lexer.text});
});
//BOOL
lexer.addRule(/{BOOL}/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.TYPE_BOOL,value:lexer.text});
});
//FLOAT
lexer.addRule(/{FLOAT}/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.TYPE_FLOAT,value:lexer.text});
});
//INT
lexer.addRule(/{INT}/, function (lexer) {
    tokens.push({token:ENUM_TOKENS.INT,value:lexer.text});
});


lexer.addRule(/\s+/);

// code

str = "int main(){char c = \'\\n';}";
lexer.setSource('int main(){char c = \'\\n');
lexer.lex();
console.log(tokens);

//Todo 
/*
    Criar comentario
    Criar comentario multiplas linhas
    Criar Char Literal * DONE

*/