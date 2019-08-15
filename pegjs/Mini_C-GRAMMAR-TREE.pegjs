
{
  var TYPES_TO_PROPERTY_NAMES = {
    CallExpression:   "callee",
    MemberExpression: "object",
  };

  function filledArray(count, value) {
    return Array.apply(null, new Array(count))
      .map(function() { return value; });
  }

  function extractOptional(optional, index) {
    return optional ? optional[index] : null;
  }

  function extractList(list, index) {
    return list.map(function(element) { return element[index]; });
  }

  function buildList(head, tail, index) {
    return [head].concat(extractList(tail, index));
  }

  function buildBinaryExpression(head, tail) {
    return tail.reduce(function(result, element) {
      return {
        type: "BinaryExpression",
        operator: element[1],
        left: result,
        right: element[3]
      };
    }, head);
  }

  function buildLogicalExpression(head, tail) {
    return tail.reduce(function(result, element) {
      return {
        type: "LogicalExpression",
        operator: element[1],
        left: result,
        right: element[3]
      };
    }, head);
  }

  function optionalList(value) {
    return value !== null ? value : [];
  }

	function clearArray(arrInput){
 		let arrOutput = [];
        
        for(let a of arrInput){
        
        	if(a instanceof Array){
            	if(a.lenght > 0){
                	arrOutput.push(a);
                }
            }else{
            	arrOutput.push(a);
            } 
        }
        return arrInput;
    }
    
    function parseValueInput(str){
    	
        
        return {value:str[0],line:str[1],column:str[2]}
        
    }



}





Programinit
= InitialRule

InitialRule
= main2: (Type IDENTIFIER_MAIN DELIMITER_BLOCK_LEFT_PARENTHESES DELIMITER_BLOCK_RIGHT_PARENTHESES DELIMITER_BLOCK_LEFT_BRACE DELIMITER_BLOCK_RIGHT_BRACE) { return {type:'main',body:'empty'} }
/ main:(Type IDENTIFIER_MAIN DELIMITER_BLOCK_LEFT_PARENTHESES DELIMITER_BLOCK_RIGHT_PARENTHESES DELIMITER_BLOCK_LEFT_BRACE Program DELIMITER_BLOCK_RIGHT_BRACE){return {type:'main',body:main[5]} }
/ main:(IDENTIFIER_MAIN DELIMITER_BLOCK_LEFT_PARENTHESES DELIMITER_BLOCK_RIGHT_PARENTHESES DELIMITER_BLOCK_LEFT_BRACE Program DELIMITER_BLOCK_RIGHT_BRACE){return {type:'main',body:main[4]} }

Program
= (SourceElement) *


SourceElement  
= StatementSimple
/ StatementBlock


StatementSimple
= VariableStatement
/ ScanfStatement
/ PrintfStatement
/ ReturnStatement
/ ContinueStatement
/ BreakStatement

StatementBlock
= IfStatement
/ ForStatement
/ WhileStatement
/ DoWhileStatement



Statement
= VariableStatement
/ ExpressionStatement
/ IfStatement
/ ForStatement
/ ContinueStatement
/ BreakStatement
/ ReturnStatement


EOL
= a: DELIMITER_DOT_COMMA { return a }

IOS
= DELIMITER_BLOCK_LEFT_BRACE

EOS
= b: DELIMITER_BLOCK_RIGHT_BRACE { return b }

EOF "EOF"
= !.

  test "test"
    = Type(Identifier DELIMITER_COMMA) * Identifier DELIMITER_DOT_COMMA


CodeComposer
= IOS Program EOS

//WHILE STATEMENT

WhileStatement
= a: (COMMAND_WHILE ExpressionStatement CodeComposer)
{ return {type:'WhileStatement',expression:a[1],code:a[2]} }

// ************************************************************

DoWhileStatement
= a: (COMMAND_DO CodeComposer COMMAND_WHILE ExpressionStatement EOL )
{ return {type:'DoWhileStatement',code:a[1],whileCmd:a[2], expression:a[3]} }

//**************************************************************

//IF STATEMENT

IfStatement
= c: (COMMAND_IF ExpressionStatement CodeComposer) e:(COMMAND_ELSE COMMAND_IF ExpressionStatement CodeComposer) 
{ return {type:'IfStatement',expression:c[1],code:c[2], elseCode:e} }
/ c:(COMMAND_IF ExpressionStatement CodeComposer COMMAND_ELSE CodeComposer) 
{ return {type:'IfStatement',expression:c[1],code:c[2], elseCode:c[4]} }
/ c: (COMMAND_IF ExpressionStatement CodeComposer) 
{ return {type:'IfStatement',expression:c[1],code:c[2], elseCode:"null"} }

//***************************************************************

// FOR STATEMENT
ForStatement
= a: (COMMAND_FOR ForExpressionTerm CodeComposer) 
{return {type:'ForStatement',expression:a[1],code:a[2] }}


ForExpressionTerm
= DELIMITER_BLOCK_LEFT_PARENTHESES f:ForFistTerm s:ForSecondTerm t:ForThirdTerm DELIMITER_BLOCK_RIGHT_PARENTHESES
{return {type:'ForExpressionTerms',fistTerm:f ,secondTerm:s, thirdTerm:t }}

ForFistTerm
= Type Identifier VariableAtribuition DELIMITER_DOT_COMMA

ForSecondTerm
= Identifier ComparisonOperators Identifier DELIMITER_DOT_COMMA
  / Identifier ComparisonOperators InstanceType DELIMITER_DOT_COMMA

ForThirdTerm
= Identifier VariableAtribuition

// ***********************************************************

// PRINTF STATEMENT

PrintfStatement
= a: (COMMAND_PRINTF PrintfArgumentList EOL ) 
{return {type:'PrintfStatement',body:a[1]}}



PrintfArgumentList
= DELIMITER_BLOCK_LEFT_PARENTHESES STRINGS DELIMITER_BLOCK_RIGHT_PARENTHESES
  / DELIMITER_BLOCK_LEFT_PARENTHESES STRINGS DELIMITER_COMMA MultipleIdentifierWithComma DELIMITER_BLOCK_RIGHT_PARENTHESES



// ***********************************************************
// RETURN STATEMENT

ReturnStatement
= a: (COMMAND_RETURN Identifier EOL)
{return {type:'ReturnStatement',body:a[1]}}
/ a:(COMMAND_RETURN InstanceType EOL)
{return {type:'ReturnStatement',body:a[1]}}

//************************************************************
// BREAK STATEMENT

BreakStatement
= a: (COMMAND_BREAK EOL)
{return {type:'BreakStatement'}}

//************************************************************

// CONTINUE STATEMENT

ContinueStatement
= a: (COMMAND_CONTINUE EOL)
{return {type:'ContinueStatement'}}

//***********************************************************


// SCANF STATEMENT

ScanfStatement
= a: (COMMAND_SCANF ScanfArgumentList EOL)
{return {type:'ScanfStatement',body:a[1]}}

ScanfArgumentList
= a: (DELIMITER_BLOCK_LEFT_PARENTHESES STRINGS DELIMITER_COMMA Identifier DELIMITER_BLOCK_RIGHT_PARENTHESES)
/ a:(DELIMITER_BLOCK_LEFT_PARENTHESES STRINGS DELIMITER_COMMA MultipleIdentifierWithComma DELIMITER_BLOCK_RIGHT_PARENTHESES)

// ***********************************************************
// DEFINITION OF DECLARATION OF VARIABLES



VariableStatement
= varDec: (Type VariableStatementList EOL) { return {type:"VariableStatement", body:varDec}}
/ varAss:(Identifier VariableAtribuition EOL){ return {type:"VariableStatement", body:varAss}}
/ varDec:(Type Identifier VariableDaclarationList EOL) { return {type:"VariableStatement", body:varDec}}

VariableDaclarationList 
= vardec:(OPERATOR_ATRIBUTION_EQUAL) vardec2:(ExpressionStatement)

VariableStatementList
= varDec2: (VariableStatementAtribuition* VariableStatementSimple*) tail:(Identifier VariableStatementArray OPERATOR_ATRIBUTION_EQUAL InstanceType) 
{ return {type:"VariableStatementList",body:varDec2, tail:{type:'VariableStatementAtribuitionArraySimple',body:tail}}}
/ varDec:(VariableStatementAtribuition * VariableStatementSimple *) tail:(Identifier VariableStatementArray) 
{ return {type:"VariableStatementList",body:varDec, tail:{type:'VariableStatementArray',body:tail}}}
/ varDec2: (VariableStatementAtribuition * VariableStatementSimple*) tail:( Identifier OPERATOR_ATRIBUTION_EQUAL InstanceType)
{ return {type:"VariableStatementList",body:varDec2,tail:{type:'VariableStatementAtribuitionSimple',body:tail}}}
/ varDec:(VariableStatementAtribuition* VariableStatementSimple*) tail:(Identifier)
{ return {type:"VariableStatementList",body:varDec, tail:{type:'VariableStatementSimple',body:tail}}}

VariableStatementAtribuition 
= a: (Identifier VariableStatementArray OPERATOR_ATRIBUTION_EQUAL InstanceType DELIMITER_COMMA) 
{ return {type:"VariableStatementAtribuition",body:a}}
/ a: (Identifier VariableAtribuition)( DELIMITER_COMMA){ return {type:"VariableStatementAtribuition",body:a}}
/ a: (Identifier OPERATOR_ATRIBUTION_EQUAL InstanceType)( DELIMITER_COMMA) { return {type:"VariableStatementAtribuition",body:a}}



VariableStatementSimple
= a: (Identifier) (DELIMITER_COMMA) { return {type:'VariableStatementSimple',body:a}}
/ a:(Identifier VariableStatementArray) (DELIMITER_COMMA) { return {type:'VariableStatementSimple',body:a}}

VariableStatementArray
= a: (DELIMITER_BLOCK_LEFT_BRACKET INSTANCE_OF_INT DELIMITER_BLOCK_RIGHT_BRACKET)  { return {type:'VariableStatementArray',body:a}}


VariableAtribuition
= a: (OPERATOR_ATRIBUTION_EQUAL VariableAtribuitionTypes){return a}
/a: (OPERATOR_ATRIBUTION_EQUAL OPERATOR_UNARY_E VariableAtribuitionTypes)



VariableAtribuitionTypes
= ExpressionStatement
/ AssignmentExpression
/ Equation
/ InstanceType
/ Identifier
//***************************************************************

// SOME EQUATION OPERATIONS    


Equation
= a: (Term (MoreOrLess Term) *){ return a }

Term
= a: (Factor(SomeOperators Factor) *){ return a }

Factor
= a: (DELIMITER_BLOCK_LEFT_PARENTHESES Equation DELIMITER_BLOCK_RIGHT_PARENTHESES) { return a }
/ a:Numeric{return a} 
/ a: Identifier{ return a }


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


ExpressionEquationStatement
= ArithmeticOperators Equation
// *************************************

// DEFINITION OF EXPRESSIONS

ExpressionStatement
= a:(DELIMITER_BLOCK_LEFT_PARENTHESES(ExpressionUnit LogicalOperators) * ExpressionUnit ExpressionEquationStatement * DELIMITER_BLOCK_RIGHT_PARENTHESES)
{return {type:'ExpressionStatement',body:clearArray(a)}}
/ a:((ExpressionUnit LogicalOperators)* ExpressionUnit)
{return {type:'ExpressionStatement',body:clearArray(a)}}

LogicalOperators
= OPERATOR_LOGICAL_AND
/ OPERATOR_LOGICAL_OR

ExpressionUnit
= a: (DELIMITER_BLOCK_LEFT_PARENTHESES AssignmentExpression DELIMITER_BLOCK_RIGHT_PARENTHESES)
{return {type:'ExpressionStatement',body:clearArray(a)}}
/ a:AssignmentExpression
{return {type:'ExpressionStatement',body:a}}
/ a: OPERATOR_NEGATION (DELIMITER_BLOCK_LEFT_PARENTHESES AssignmentExpression DELIMITER_BLOCK_RIGHT_PARENTHESES)
{return {type:'ExpressionStatement',body:a}}
/ a:OPERATOR_NEGATION AssignmentExpression
{return {type:'ExpressionStatement',body:a}}


AssignmentExpression 
= a: (Identifier ComparisonOperators Identifier) 
{return {type:'ExpressionStatement',body:clearArray(a)}}
/ a:(Identifier ComparisonOperators InstanceType)
{return {type:'ExpressionStatement',body:clearArray(a)}}
/ a: (InstanceType ComparisonOperators InstanceType) 
{return {type:'ExpressionStatement',body:clearArray(a)}}
/ a: (Identifier LogicalOperators Identifier) 
{return {type:'ExpressionStatement',body:clearArray(a)}}
/ a:(Identifier LogicalOperators InstanceType)
{return {type:'ExpressionStatement',body:clearArray(a)}}
/ a: (InstanceType LogicalOperators InstanceType) 
{return {type:'ExpressionStatement',body:clearArray(a)}}
/ a: (InstanceType VariableAtribuition) 
{return {type:'ExpressionStatement',body:clearArray(a)}}
/ a: (Identifier VariableAtribuition) 
{return {type:'ExpressionStatement',body:clearArray(a)}}


ComparisonOperators
= OPERATOR_COMPARISON_EQUAL
/ OPERATOR_COMPARISON_DIFFERENT
/ OPERATOR_COMPARISON_LESS_EQUAL
/ OPERATOR_COMPARISON_LESS_THEN
/ OPERATOR_COMPARISON_MORE_EQUAL
/ OPERATOR_COMPARISON_MORE_THEN
/ OPERATOR_NEGATION OPERATOR_ATRIBUTION_EQUAL 
/ LogicalOperators

// *****************************************

MultipleIdentifierWithComma
= (Identifier DELIMITER_COMMA)* Identifier

STRINGS
= INSTANCE_OF_CHAR_MULTPLE
/ INSTANCE_OF_CHAR_SIMPLE

Type "Type"
= TYPE_INT
/ TYPE_BOOL
/ TYPE_FLOAT
/ TYPE_CHAR
/ TYPE_VOID


InstanceType 
= INSTANCE_OF_BOOL
/ INSTANCE_OF_CHAR_MULTPLE
/ INSTANCE_OF_CHAR_SIMPLE
/ INSTANCE_OF_FLOAT
/ INSTANCE_OF_INT 

Identifier
= c: (IDENTIFIER_VARIABLES) { return c }
/ a:(IDENTIFIER_POINTER_ADDRESS) {return a} 
/ b: (OPERATOR_UNARY_E* OPERATOR_ARITHMETIC_MULTIPLICATION* IDENTIFIER_POINTER_VARIABLE) { return {type:"IDENTIFIER_POINTER_VARIABLE", body:clearArray(b)} }


_ "Optional Whitespace"
= w: [\t\n\r] * { return[w.join('')] }

__ "Mandatory Whitespace" = [\t\r\n] +

_LB = _
  / LineBreak *

  LineBreak 
= '\n'

ValueInput  
	= v:("{" +'"' Value* '"'+ "|" Line "|" Column "}"){return [v[2].join(''),v[5].join(''),v[7].join('')]};

Value "va"  
= a:(!("\"") .){return a[1]}  

 

Line = [0-9]*

Column = [0-9]*

INSTANCE_OF_INT = 'INSTANCE_OF_INT'  v:ValueInput { return {type:'INSTANCE_OF_INT',value:parseValueInput(v)} }
INSTANCE_OF_FLOAT = 'INSTANCE_OF_FLOAT'  v:ValueInput { return {type:'INSTANCE_OF_FLOAT',value:parseValueInput(v)} }
INSTANCE_OF_BOOL = 'INSTANCE_OF_BOOL'  v:ValueInput { return {type:'INSTANCE_OF_BOOL',value:parseValueInput(v)} }
INSTANCE_OF_CHAR_SIMPLE = 'INSTANCE_OF_CHAR_SIMPLE'  v:ValueInput { return {type:'INSTANCE_OF_CHAR_SIMPLE',value:parseValueInput(v)} }
INSTANCE_OF_CHAR_MULTPLE = 'INSTANCE_OF_CHAR_MULTPLE'  v:ValueInput { return {type:'INSTANCE_OF_CHAR_MULTPLE',value:parseValueInput(v)} }

TYPE_INT = 'TYPE_INT'   { return {type:'TYPE_INT'} }
TYPE_BOOL = 'TYPE_BOOL'   { return {type:'TYPE_BOOL'} }
TYPE_FLOAT = 'TYPE_FLOAT'  { return {type:'TYPE_FLOAT'} }
TYPE_CHAR = 'TYPE_CHAR' { return {type:'TYPE_CHAR'} }
TYPE_VOID = 'TYPE_VOID'   { return {type:'TYPE_VOID'} }

COMMAND_IF = 'COMMAND_IF'{ return {type:'COMMAND_IF'} }
COMMAND_FOR = 'COMMAND_FOR' { return {type:'COMMAND_FOR'} }
COMMAND_WHILE = 'COMMAND_WHILE'  { return {type:'COMMAND_WHILE'} }
COMMAND_DO = 'COMMAND_DO'  { return {type:'COMMAND_DO'} }
COMMAND_BREAK = 'COMMAND_BREAK'  { return {type:'COMMAND_BREAK'} }
COMMAND_CONTINUE = 'COMMAND_CONTINUE'  { return {type:'COMMAND_CONTINUE'} }
COMMAND_SCANF = 'COMMAND_SCANF'  { return {type:'COMMAND_SCANF'} }
COMMAND_PRINTF = 'COMMAND_PRINTF'  { return {type:'COMMAND_PRINTF'} }
COMMAND_INCLUDE = 'COMMAND_INCLUDE'  { return {type:'COMMAND_INCLUDE'} }
COMMAND_RETURN = 'COMMAND_RETURN' { return {type:'COMMAND_RETURN'} }
COMMAND_ELSE = 'COMMAND_ELSE' { return {type:'COMMAND_ELSE'} }

IDENTIFIER_MAIN = 'IDENTIFIER_MAIN' { return {type:'IDENTIFIER_MAIN' }}
IDENTIFIER_VARIABLES = 'IDENTIFIER_VARIABLES' v:ValueInput { return {type:'IDENTIFIER_VARIABLES',value:parseValueInput(v)} }
IDENTIFIER_POINTER_VARIABLE = 'IDENTIFIER_POINTER_VARIABLE' v:ValueInput { return {type:'IDENTIFIER_POINTER_VARIABLE',value:parseValueInput(v)} }
IDENTIFIER_POINTER_ADDRESS = 'IDENTIFIER_POINTER_ADDRESS'v:ValueInput { return {type:'IDENTIFIER_POINTER_ADDRESS',value:parseValueInput(v)} }

OPERATOR_ARITHMETIC_PLUS = 'OPERATOR_ARITHMETIC_PLUS'{ return {type:"OPERATOR_ARITHMETIC_PLUS"} }
OPERATOR_ARITHMETIC_LESS = 'OPERATOR_ARITHMETIC_LESS'{ return {type:"OPERATOR_ARITHMETIC_LESS"} }
OPERATOR_ARITHMETIC_MULTIPLICATION = 'OPERATOR_ARITHMETIC_MULTIPLICATION' { return {type:"OPERATOR_ARITHMETIC_MULTIPLICATION"} }
OPERATOR_ARITHMETIC_DIVISION = 'OPERATOR_ARITHMETIC_DIVISION' { return {type:"OPERATOR_ARITHMETIC_DIVISION"} }
OPERATOR_ARITHMETIC_DIV = 'OPERATOR_ARITHMETIC_DIV' { return {type:"OPERATOR_ARITHMETIC_DIV"} }
OPERATOR_ARITHMETIC_MOD = 'OPERATOR_ARITHMETIC_MOD' { return {type:"OPERATOR_ARITHMETIC_MOD"} }
OPERATOR_COMPARISON_LESS_THEN = 'OPERATOR_COMPARISON_LESS_THEN' { return {type:"OPERATOR_COMPARISON_LESS_THEN"} }
OPERATOR_COMPARISON_MORE_THEN = 'OPERATOR_COMPARISON_MORE_THEN' { return {type:"OPERATOR_COMPARISON_MORE_THEN"} }
OPERATOR_COMPARISON_LESS_EQUAL = 'OPERATOR_COMPARISON_LESS_EQUAL' { return {type:"OPERATOR_COMPARISON_LESS_EQUAL"} }
OPERATOR_COMPARISON_MORE_EQUAL = 'OPERATOR_COMPARISON_MORE_EQUAL' { return {type:"OPERATOR_COMPARISON_MORE_EQUAL"} }
OPERATOR_COMPARISON_DIFFERENT = 'OPERATOR_COMPARISON_DIFFERENT' { return {type:"OPERATOR_COMPARISON_DIFFERENT"} }
OPERATOR_COMPARISON_EQUAL = 'OPERATOR_COMPARISON_EQUAL' { return {type:"OPERATOR_COMPARISON_EQUAL"} }
OPERATOR_ATRIBUTION_EQUAL = 'OPERATOR_ATRIBUTION_EQUAL' { return {type:"OPERATOR_ATRIBUTION_EQUAL"} }
OPERATOR_NEGATION = 'OPERATOR_NEGATION' { return {type:"OPERATOR_NEGATION"} }
OPERATOR_LOGICAL_AND = 'OPERATOR_LOGICAL_AND' { return {type:"OPERATOR_LOGICAL_AND"} }
OPERATOR_LOGICAL_OR = 'OPERATOR_LOGICAL_OR' { return {type:"OPERATOR_LOGICAL_OR"} }
OPERATOR_UNARY_PIPE = 'OPERATOR_UNARY_PIPE' { return {type:"OPERATOR_UNARY_PIPE"} }
OPERATOR_UNARY_E = 'OPERATOR_UNARY_E' { return {type:"OPERATOR_UNARY_E"} }

DELIMITER_BLOCK_LEFT_BRACKET = 'DELIMITER_BLOCK_LEFT_BRACKET' { return {type:"DELIMITER_BLOCK_LEFT_BRACKET"} }
DELIMITER_BLOCK_LEFT_BRACE = 'DELIMITER_BLOCK_LEFT_BRACE' { return {type:"DELIMITER_BLOCK_LEFT_BRACE"} }
DELIMITER_BLOCK_LEFT_PARENTHESES = 'DELIMITER_BLOCK_LEFT_PARENTHESES' { return {type:"DELIMITER_BLOCK_LEFT_PARENTHESES"} }
DELIMITER_BLOCK_RIGHT_BRACKET = 'DELIMITER_BLOCK_RIGHT_BRACKET' { return {type:"DELIMITER_BLOCK_RIGHT_BRACKET"} }
DELIMITER_BLOCK_RIGHT_BRACE = 'DELIMITER_BLOCK_RIGHT_BRACE' { return {type:"DELIMITER_BLOCK_RIGHT_BRACE"} }
DELIMITER_BLOCK_RIGHT_PARENTHESES = 'DELIMITER_BLOCK_RIGHT_PARENTHESES' { return {type:"DELIMITER_BLOCK_RIGHT_PARENTHESES"} }
DELIMITER_END_LINE = 'DELIMITER_END_LINE' { return {type:"DELIMITER_END_LINE"} }
DELIMITER_HASHTAG = 'DELIMITER_HASHTAG'{ return {type:"DELIMITER_HASHTAG"} }
DELIMITER_COMMA = 'DELIMITER_COMMA'{ return {type:"DELIMITER_COMMA"} }
DELIMITER_DOT = 'DELIMITER_DOT' { return {type:"DELIMITER_DOT"} }
DELIMITER_DOT_COMMA = 'DELIMITER_DOT_COMMA' { return {type:"DELIMITER_DOT_COMMA"} }

COMMENT_SIMPLE = 'COMMENT_SIMPLE'
COMMENT_MULTIPLE = 'COMMENT_MULTIPLE'

INCLUDE_CONTENT = 'INCLUDE_CONTENT'