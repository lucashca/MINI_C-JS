


primary_expression
    = IDENTIFIER
    / CONSTANT
    / STRING_LITERAL

postfix_expression
    = primary_expression
    / postfix_expression DELIMITER_BLOCK_LEFT_BRACKET expression DELIMITER_BLOCK_RIGHT_BRACKET
        / postfix_expression DELIMITER_BLOCK_LEFT_PARENTHESES DELIMITER_BLOCK_RIGHT_PARENTHESES
            / postfix_expression DELIMITER_BLOCK_LEFT_PARENTHESES argument_expression_list DELIMITER_BLOCK_RIGHT_PARENTHESES
                / postfix_expression DELIMITER_DOT IDENTIFIER
                    / postfix_expression INC_OP
                        / postfix_expression DEC_OP




expression
    = assignment_expression
    / expression DELIMITER_COMMA assignment_expression

assignment_expression
    = conditional_expression
    / unary_expression assignment_operator assignment_expression

argument_expression_list
    = assignment_expression
    / argument_expression_list DELIMITER_COMMA assignment_expression



conditional_expression
    = logical_or_expression
    / logical_or_expression '?' expression ':' conditional_expression

logical_or_expression
    = logical_and_expression
    / logical_or_expression OR_OP logical_and_expression

logical_and_expression
    = inclusive_or_expression
    / logical_and_expression AND_OP inclusive_or_expression

unary_expression
    = postfix_expression
    / INC_OP unary_expression
        / DEC_OP unary_expression


inclusive_or_expression
    = exclusive_or_expression
    / inclusive_or_expression OPERATOR_UNARY_PIPE exclusive_or_expression

exclusive_or_expression
    = and_expression
    / exclusive_or_expression '^' and_expression

and_expression
    = equality_expression
    / and_expression OPERATOR_UNARY_E equality_expression

equality_expression
    = relational_expression
    / equality_expression OPERATOR_COMPARISON_EQUAL relational_expression
        / equality_expression NE_OP relational_expression

relational_expression
    = additive_expression
    / relational_expression OPERATOR_COMPARISON_LESS_THEN additive_expression
        / relational_expression OPERATOR_COMPARISON_MORE_THEN additive_expression
            / relational_expression OPERATOR_COMPARISON_LESS_EQUAL additive_expression
                / relational_expression OPERATOR_COMPARISON_MORE_EQUAL additive_expression

multiplicative_expression
    = cast_expression
    / multiplicative_expression OPERATOR_ARITHMETIC_MULTIPLICATION cast_expression
        / multiplicative_expression OPERATOR_ARITHMETIC_DIVISION cast_expression
            / multiplicative_expression OPERATOR_ARITHMETIC_MOD cast_expression


additive_expression
    = multiplicative_expression
    / additive_expression OPERATOR_ARITHMETIC_PLUS multiplicative_expression
        / additive_expression OPERATOR_ARITHMETIC_LESS multiplicative_expression

cast_expression
    = unary_expression



DELIMITER_BLOCK_LEFT_BRACKET = 'DELIMITER_BLOCK_LEFT_BRACKET'
DELIMITER_BLOCK_LEFT_BRACE = 'DELIMITER_BLOCK_LEFT_BRACE'
DELIMITER_BLOCK_LEFT_PARENTHESES = 'DELIMITER_BLOCK_LEFT_PARENTHESES'
DELIMITER_BLOCK_RIGHT_BRACKET = 'DELIMITER_BLOCK_RIGHT_BRACKET'
DELIMITER_BLOCK_RIGHT_BRACE = 'DELIMITER_BLOCK_RIGHT_BRACE'
DELIMITER_BLOCK_RIGHT_PARENTHESES = 'DELIMITER_BLOCK_RIGHT_PARENTHESES'
DELIMITER_END_LINE = 'DELIMITER_END_LINE'
DELIMITER_HASHTAG = 'DELIMITER_HASHTAG'
DELIMITER_COMMA = 'DELIMITER_COMMA'
DELIMITER_DOT = 'DELIMITER_DOT'

OPERATOR_ARITHMETIC_PLUS = 'OPERATOR_ARITHMETIC_PLUS'
OPERATOR_ARITHMETIC_LESS = 'OPERATOR_ARITHMETIC_LESS'
OPERATOR_ARITHMETIC_MULTIPLICATION = 'OPERATOR_ARITHMETIC_MULTIPLICATION'
OPERATOR_ARITHMETIC_DIVISION = 'OPERATOR_ARITHMETIC_DIVISION'
OPERATOR_ARITHMETIC_DIV = 'OPERATOR_ARITHMETIC_DIV'
OPERATOR_ARITHMETIC_MOD = 'OPERATOR_ARITHMETIC_MOD'
OPERATOR_COMPARISON_LESS_THEN = 'OPERATOR_COMPARISON_LESS_THEN'
OPERATOR_COMPARISON_MORE_THEN = 'OPERATOR_COMPARISON_MORE_THEN'
OPERATOR_COMPARISON_LESS_EQUAL = 'OPERATOR_COMPARISON_LESS_EQUAL'
OPERATOR_COMPARISON_MORE_EQUAL = 'OPERATOR_COMPARISON_MORE_EQUAL'
OPERATOR_COMPARISON_DIFFERENT = 'OPERATOR_COMPARISON_DIFFERENT'
OPERATOR_COMPARISON_EQUAL = 'OPERATOR_COMPARISON_EQUAL'
OPERATOR_ATRIBUTION_EQUAL = 'OPERATOR_ATRIBUTION_EQUAL'
OPERATOR_NEGATION = 'OPERATOR_NEGATION'
OPERATOR_UNARY_PIPE = 'OPERATOR_UNARY_PIPE'
OPERATOR_UNARY_E = 'OPERATOR_UNARY_E'



unary_operator
    = 'OPERATOR_UNARY_E'
    / 'OPERATOR_ARITHMETIC_MULTIPLICATION'
    / 'OPERATOR_ARITHMETIC_PLUS'
    / 'OPERATOR_ARITHMETIC_LESS'
    / 'OPERATOR_NEGATION'

assignment_operator
    = 'OPERATOR_ATRIBUTION_EQUAL'


IDENTIFIER
    = 'IDENTIFIER_MAIN'
    / 'IDENTIFIER_VARIABLES'
    / 'IDENTIFIER_POINTER_VARIABLE'
    / 'IDENTIFIER_POINTER_ADDRESS'
    / DELIMITER_BLOCK_LEFT_PARENTHESES expression DELIMITER_BLOCK_RIGHT_PARENTHESES


CONSTANT
    = 'INSTANCE_OF_INT'
    / 'INSTANCE_OF_FLOAT'
    / 'INSTANCE_OF_BOOL'
    / 'INSTANCE_OF_CHAR_SIMPLE'

STRING_LITERAL
    = 'INSTANCE_OF_CHAR_MULTPLE'

OR_OP = 'OPERATOR_OR'
AND_OP = 'OPERATOR_AND'
INC_OP = 'OPERATOR_INCREMENT'
DEC_OP = 'OPERATOR_DECREMENT'
NE_OP = OPERATOR_NEGATION OPERATOR_ATRIBUTION_EQUAL
PTR_OP = '*'

