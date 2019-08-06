
Program_init 
= InitialRule 

InitialRule 
= main2:(Type IDENTIFIER_MAIN DELIMITER_BLOCK_LEFT_PARENTHESES DELIMITER_BLOCK_RIGHT_PARENTHESES DELIMITER_BLOCK_LEFT_BRACE DELIMITER_BLOCK_RIGHT_BRACE){return main2.join(' ')}   
/ main:(Type IDENTIFIER_MAIN DELIMITER_BLOCK_LEFT_PARENTHESES DELIMITER_BLOCK_RIGHT_PARENTHESES DELIMITER_BLOCK_LEFT_BRACE Program DELIMITER_BLOCK_RIGHT_BRACE){return main.join(' ')} 

Program 
= SourceElements 

SourceElements 
= (SourceElement)*  

SourceElement  
= StatementSimple  
/ StatementBlock


StatementSimple 
	= VariableStatement 
    
StatementBlock 
	= IfStatement


Statement
= VariableStatement
/ ExpressionStatement
/ IfStatement
/ IterationStatement
/ ContinueStatement
/ BreakStatement
/ ReturnStatement


EOL 
= a:DELIMITER_DOT_COMMA {return a}

IOS 
= DELIMITER_BLOCK_LEFT_BRACE

EOS 
= b:DELIMITER_BLOCK_RIGHT_BRACE {return b}

EOF "EOF"
= !.

test "test"
= Type(Identifier DELIMITER_COMMA) * Identifier DELIMITER_DOT_COMMA


CodeComposer
= IOS SourceElements EOS 


//IF STATEMENT

IfStatement 
 = b:(COMMAND_IF ExpressionStatement CodeComposer COMMAND_ELSE CodeComposer) {return b.join(' ') }
 / a:(COMMAND_IF ExpressionStatement CodeComposer) {return("\n"+a.join(' '))}
 
//***************************************************************

ForStatement 
	= a:(COMMAND_FOR ForExpressionList CodeComposer)

ForExpressionList 
	= DELIMITER_BLOCK_LEFT_PARENTHESES ForFistTerm ForSecondTerm ForThirdTerm DELIMITER_BLOCK_RIGHT_PARENTHESES 

ForFistTerm 
  =  Type VariableAtribuition DELIMITER_DOT_COMMA 

ForSecondTerm
  = Identifier ComparisonOperators Identifier DELIMITER_DOT_COMMA
  / Identifier ComparisonOperators InstanceType DELIMITER_DOT_COMMA


ForThirdTerm 
    = ''

// DEFINITION OF DECLARATION OF VARIABLES

VariableStatement 
	= varDec:(Type VariableStatementList EOL){return ("\n"+varDec.join(' '))}
	/ varAss:(VariableAtribuition EOL){{return ("\n"+varAss.join(' '))}}
VariableStatementList 
= varDec2:(VariableStatementAtribuition* VariableStatementSimple* Identifier OPERATOR_ATRIBUTION_EQUAL InstanceType){return (varDec2.join(' '))} 
  / varDec:(VariableStatementAtribuition * VariableStatementSimple * Identifier){return (varDec.join(' '))} 

VariableStatementAtribuition 
= a:(Identifier OPERATOR_ATRIBUTION_EQUAL InstanceType DELIMITER_COMMA){return (a.join(' '))} 

VariableStatementSimple 
= a:(Identifier DELIMITER_COMMA){return (a.join(''))} 

VariableAtribuition
	= a:(Identifier OPERATOR_ATRIBUTION_EQUAL Identifier)
    / a:(Identifier OPERATOR_ATRIBUTION_EQUAL InstanceType)
      
//***************************************************************
    
// SOME EQUATION OPERATIONS    
MoreOrLess 
  = OPERATOR_ARITHMETIC_PLUS
  / OPERATOR_ARITHMETIC_LESS

SomeOperators
  = OPERATOR_ARITHMETIC_MULTIPLICATION
  / OPERATOR_ARITHMETIC_DIVISION
  / OPERATOR_ARITHMETIC_MOD
  / OPERATOR_ARITHMETIC_DIV
  

ArithmeticOperators 
  = OPERATOR_ARITHMETIC_PLUS
  / OPERATOR_ARITHMETIC_LESS
  / OPERATOR_ARITHMETIC_MULTIPLICATION
  / OPERATOR_ARITHMETIC_DIVISION
  / OPERATOR_ARITHMETIC_MOD
  / OPERATOR_ARITHMETIC_DIV
  
Numeric
  = INSTANCE_OF_INT
  / INSTANCE_OF_FLOAT
  

Equation
  = Term MoreOrLess Term

Term 
   = Factor SomeOperators Factor
   
Factor
  = DELIMITER_BLOCK_LEFT_PARENTHESES Equation DELIMITER_BLOCK_RIGHT_PARENTHESES
  / Numeric
  / Identifier
  
           
// *************************************

// DEFINITION OF EXPRESSIONS

ExpressionStatement 
=(ExpressionUnit LogicalOperators)* ExpressionUnit

LogicalOperators
= OPERATOR_LOGICAL_AND
/ OPERATOR_LOGICAL_OR

ExpressionUnit 
= a:(DELIMITER_BLOCK_LEFT_PARENTHESES AssignmentExpression DELIMITER_BLOCK_RIGHT_PARENTHESES){return a.join(' ')}

AssignmentExpression 
= a:(IDENTIFIER_VARIABLES ComparisonOperators IDENTIFIER_VARIABLES){return a.join(' ')}
/ a:(IDENTIFIER_VARIABLES ComparisonOperators InstanceType){return a.join(' ')}
/ a:(InstanceType ComparisonOperators InstanceType){return a.join(' ')}


ComparisonOperators
= OPERATOR_COMPARISON_EQUAL
/ OPERATOR_COMPARISON_DIFFERENT
/ OPERATOR_COMPARISON_LESS_EQUAL
/ OPERATOR_COMPARISON_LESS_THEN
/ OPERATOR_COMPARISON_MORE_EQUAL
/ OPERATOR_COMPARISON_MORE_THEN

// *****************************************


Type "Type"
= TYPE_INT
/ TYPE_BOOL
/ TYPE_FLOAT
/ TYPE_CHAR
/ TYPE_VOID


  
InstanceType "InstanceType"
= INSTANCE_OF_BOOL
/ INSTANCE_OF_CHAR_MULTPLE
/ INSTANCE_OF_CHAR_SIMPLE
/ INSTANCE_OF_FLOAT
/ INSTANCE_OF_INT


Identifier "Identifier"
= c:(IDENTIFIER_VARIABLES) {return c} 
/ a:(IDENTIFIER_POINTER_ADDRESS) {return a} 
/ b:(IDENTIFIER_POINTER_VARIABLE) {return b} 

ArgumentsList 
= 'ARGS'




ReturnStatement 
= ''
ContinueStatement 
= ''
IterationStatement 
= ''
BreakStatement
= ''

_ "Optional Whitespace"
= w: [\t\n\r] * { return[w.join('')] }

__ "Mandatory Whitespace" = [\t\r\n] +


_LB = _
  / LineBreak *

  LineBreak 
= '\n'




INSTANCE_OF_INT = 'INSTANCE_OF_INT' {return 'Inteiro'}
INSTANCE_OF_FLOAT = 'INSTANCE_OF_FLOAT' {return 'Decimal'}
INSTANCE_OF_BOOL = 'INSTANCE_OF_BOOL' {return 'Boleano'}
INSTANCE_OF_CHAR_SIMPLE = 'INSTANCE_OF_CHAR_SIMPLE' {return 'Character'}
INSTANCE_OF_CHAR_MULTPLE = 'INSTANCE_OF_CHAR_MULTPLE' {return 'String'}

TYPE_INT = 'TYPE_INT'{return 'int'}
TYPE_BOOL = 'TYPE_BOOL' {return 'bool'}
TYPE_FLOAT = 'TYPE_FLOAT' {return 'float'}
TYPE_CHAR = 'TYPE_CHAR' {return 'char'}
TYPE_VOID = 'TYPE_VOID' {return 'void'}

COMMAND_IF = 'COMMAND_IF'{return 'if'}
COMMAND_FOR = 'COMMAND_FOR' {return 'for'}
COMMAND_WHILE = 'COMMAND_WHILE' {return 'while'}
COMMAND_DO = 'COMMAND_DO' {return 'do'}
COMMAND_BREAK = 'COMMAND_BREAK' {return 'break'}
COMMAND_CONTINUE = 'COMMAND_CONTINUE' {return 'continue'}
COMMAND_SCANF = 'COMMAND_SCANF'{return 'scanf'}
COMMAND_PRINT = 'COMMAND_PRINT' {return 'print'}
COMMAND_INCLUDE = 'COMMAND_INCLUDE' {return 'include'}
COMMAND_RETURN = 'COMMAND_RETURN' {return 'return'}
COMMAND_ELSE = 'COMMAND_ELSE' {return 'else'}

IDENTIFIER_MAIN = 'IDENTIFIER_MAIN' {return 'main'}
IDENTIFIER_VARIABLES = 'IDENTIFIER_VARIABLES' {return 'x'}
IDENTIFIER_POINTER_VARIABLE = 'IDENTIFIER_POINTER_VARIABLE' {return '*ptr'}
IDENTIFIER_POINTER_ADDRESS = 'IDENTIFIER_POINTER_ADDRESS'{return '&end'}

OPERATOR_ARITHMETIC_PLUS = 'OPERATOR_ARITHMETIC_PLUS'{return '+'}
OPERATOR_ARITHMETIC_LESS = 'OPERATOR_ARITHMETIC_LESS'{return '-'}
OPERATOR_ARITHMETIC_MULTIPLICATION = 'OPERATOR_ARITHMETIC_MULTIPLICATION' {return '*'}
OPERATOR_ARITHMETIC_DIVISION = 'OPERATOR_ARITHMETIC_DIVISION' {return '/'}
OPERATOR_ARITHMETIC_DIV = 'OPERATOR_ARITHMETIC_DIV' 
OPERATOR_ARITHMETIC_MOD = 'OPERATOR_ARITHMETIC_MOD'
OPERATOR_COMPARISON_LESS_THEN = 'OPERATOR_COMPARISON_LESS_THEN' {return '<'}
OPERATOR_COMPARISON_MORE_THEN = 'OPERATOR_COMPARISON_MORE_THEN' {return '>'}
OPERATOR_COMPARISON_LESS_EQUAL = 'OPERATOR_COMPARISON_LESS_EQUAL' {return '<='} 
OPERATOR_COMPARISON_MORE_EQUAL = 'OPERATOR_COMPARISON_MORE_EQUAL' {return '>='}
OPERATOR_COMPARISON_DIFFERENT = 'OPERATOR_COMPARISON_DIFFERENT' {return '!='}
OPERATOR_COMPARISON_EQUAL = 'OPERATOR_COMPARISON_EQUAL'{return '=='}
OPERATOR_ATRIBUTION_EQUAL = 'OPERATOR_ATRIBUTION_EQUAL'{return '='}
OPERATOR_NEGATION = 'OPERATOR_NEGATION' {return '!'}
OPERATOR_LOGICAL_AND = 'OPERATOR_LOGICAL_AND' {return '&&'}
OPERATOR_LOGICAL_OR = 'OPERATOR_LOGICAL_OR' {return '||'}
OPERATOR_UNARY_PIPE = 'OPERATOR_UNARY_PIPE' {return '|'}
OPERATOR_UNARY_E = 'OPERATOR_UNARY_E' {return '&'}

DELIMITER_BLOCK_LEFT_BRACKET = 'DELIMITER_BLOCK_LEFT_BRACKET'
DELIMITER_BLOCK_LEFT_BRACE = 'DELIMITER_BLOCK_LEFT_BRACE' {return 'LC'}
DELIMITER_BLOCK_LEFT_PARENTHESES = 'DELIMITER_BLOCK_LEFT_PARENTHESES' {return '('}
DELIMITER_BLOCK_RIGHT_BRACKET = 'DELIMITER_BLOCK_RIGHT_BRACKET'
DELIMITER_BLOCK_RIGHT_BRACE = 'DELIMITER_BLOCK_RIGHT_BRACE' {return '\nRC'}
DELIMITER_BLOCK_RIGHT_PARENTHESES = 'DELIMITER_BLOCK_RIGHT_PARENTHESES' {return ')'}
DELIMITER_END_LINE = 'DELIMITER_END_LINE'
DELIMITER_HASHTAG = 'DELIMITER_HASHTAG'
DELIMITER_COMMA = 'DELIMITER_COMMA'{return ','}
DELIMITER_DOT = 'DELIMITER_DOT'
DELIMITER_DOT_COMMA = 'DELIMITER_DOT_COMMA' {return ';'}

COMMENT_SIMPLE = 'COMMENT_SIMPLE'
COMMENT_MULTIPLE = 'COMMENT_MULTIPLE'

INCLUDE_CONTENT = 'INCLUDE_CONTENT'