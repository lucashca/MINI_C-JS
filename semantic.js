const ENUM_LIST = require('./enumList');

var simbolicTable = [];
var scopeLabel = [];
scopeLabel.push('Global');


var boleanDomain = [ENUM_LIST.ENUM_TOKENS.INSTANCE_OF_BOOL, ENUM_LIST.ENUM_TOKENS.TYPE_BOOL];

var charDomain = [ENUM_LIST.ENUM_TOKENS.INSTANCE_OF_CHAR_MULTPLE, ENUM_LIST.ENUM_TOKENS.INSTANCE_OF_CHAR_SIMPLE, ENUM_LIST.ENUM_TOKENS.TYPE_CHAR]
charDomain = charDomain.concat(boleanDomain);

var intDomain = [ENUM_LIST.ENUM_TOKENS.INSTANCE_OF_INT, ENUM_LIST.ENUM_TOKENS.TYPE_INT];
intDomain = intDomain.concat(charDomain);

var floatDomain = [ENUM_LIST.ENUM_TOKENS.INSTANCE_OF_FLOAT, ENUM_LIST.ENUM_TOKENS.TYPE_FLOAT];
floatDomain = floatDomain.concat(intDomain);


class SamanticTableData {
    constructor(type, identifier, value, line, column, scope) {
        this.type = type;
        this.identifier = identifier;
        this.value = value;
        this.line = line;
        this.column = column;
        this.scope = scope;
    }


}


class Semantics {




    constructor(tree) {
        this.tree = tree;
        this.body = tree.body;
    }

    run() {
        var str = JSON.stringify(this.body, null, 2);
        //console.log(str);

        for (let statement of this.body) {
            this.make(statement);

        }
        console.table(simbolicTable);
    }

    make(statement) {
        let type = statement.type;
        VerifyStatement(statement);
    }

}

function ExpressionStatement(statement) {

    let type = statement.type;
    let body = statement.body;
    if (body instanceof Array) {
        for (let state of statement.body) {
            return depthSearch(state);
        }
    } else {
        return depthSearch(body);
    }

}

function IfStatement(statement) {
    let type = statement.type;
    let expression = statement.expression;
    ExpressionStatement(expression);

    // IF SCOPE
    scopeLabel.push({ label: 'IfStatement', index: getIndexScope('IfStatement') });
    let code = statement.code;
    depthSearch(code);


    scopeLabel.pop();
    // END SCOPE 

    // ELSE SCOPE
    scopeLabel.push({ label: 'ElseStatement', index: getIndexScope('ElseStatement') });
    let elseCode = statement.elseCode;
    depthSearch(elseCode);
    scopeLabel.pop();
    //END SCOPE



}

function forTermStatement(statement) {
    let body = statement.body;
    let typeOfVar = body[0].type;

    let newBody = body.slice(1, body.length);
    statement.body = newBody;
    depthSearch(statement, typeOfVar);
}
function ForStatement(statement) {

    //console.log(statement);
    let type = statement.type;

    // FOR SCOPE
    scopeLabel.push({ label: 'ForStatement', index: getIndexScope('ForStatement') });

    let expression = statement.expression;
    let fistTerm = expression.fistTerm;
    let secondTerm = expression.secondTerm;
    let thirdTerm = expression.thirdTerm;
    forTermStatement(fistTerm);
    depthSearch(secondTerm);
    depthSearch(thirdTerm);

    //forTermStatement(thirdTerm);

    //depthSearch(thirdTerm);


    let code = statement.code;
    depthSearch(code);
    scopeLabel.pop();
    // END SCOPE 

    //ExpressionStatement(expression);

    /*
*/

}

function getIndexScope(str) {
    cont = 0;
    for (let s of scopeLabel) {
        if (s.label == str) {
            cont++;
        }
    }
    return cont;
}

function VerifyStatement(statement, typeOfVar) {

    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.EXPRESSION) {

        return ExpressionStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.EXPRESSION_UNIT) {

        return ExpressionUnitStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.IF) {
        return IfStatement(statement);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.FOR) {
        return ForStatement(statement);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE) {
        return VariableStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_ATRIBUITION) {
        return VariableAtribuitionStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_ATRIBUITION_SIMPLE) {
        return VariableAtribuitionSimpleStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_ATRIBUITION_ARRAY_SIMPLE) {
        return VariableStatementAtribuitionArraySimple(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_ARRAY_SIMPLE) {
        return VariableStatementArray(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_LIST) {
        return VariableStatementList(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_SIMPLE) {
        return VariableSimpleStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.DO_WHILE) {
        return DoWhileStatement(statement);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.EQUATION) {
        return EquationStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.IDENTIFIER_ATRIBUTION) {
        return IdentifierAtributionStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_IDENTIFIER) {
        return OnlyIdentifierStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.ASSIGMENT_EXPRESSION) {
        return AssignmentExpressionStatement(statement, typeOfVar);
    }

}

function VariableStatementAtribuitionArraySimple(statement, typeOfVar) {
    VariableSimpleStatement(statement, typeOfVar)
}

function VariableStatementArray(statement, typeOfVar) {


    let body = statement.body;
    let type = [];
    type.push(typeOfVar);


    for (let i = 1; i < body.length; i++) {
        type.push(body[i].type);
    }

    let tableRow = new SamanticTableData(type, body[0].value.value, '', body[0].value.line, body[0].value.column, scopeLabel[scopeLabel.length - 1]);
    putOnTable(tableRow);


    /*
    let body = statement.body;
    let val = '';
    let atrib = body[2];
    if (atrib.type == ENUM_LIST.STATEMENTS_ENUM.EQUATION) {
        val = EquationStatement(atrib, typeOfVar);
    } else {
        try {
            val = atrib.value.value;
        } catch (error) {

        }
    }
    
    setVariableAtribution(statement, typeOfVar);
    */
}

function DoWhileStatement(statement) {
}

function VariableStatement(statement) {



    let typeOfVar = statement.body[0].type;
    let body = statement.body[1];

    if (body.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_LIST) {

        VariableStatementList(body, typeOfVar);
    } else {
        body = statement.body[0];
        VariableStatementList(body, null);



        //typeOfVar = getType()

        /*
        let b = statement.body[0];
        let atrib = statement.body[1][1];
        let val = '';
        if(atrib.type == ENUM_LIST.STATEMENTS_ENUM.EQUATION){
            let val = EquationStatement(atrib);
        }
        
        console.log(atrib);
        
        let tableRow = new SamanticTableData('', b.value.value, '', b.value.line, b.value.column, scopeLabel[scopeLabel.length - 1]);
        //let type = getType(identifier);
        */

    }


}

function getType(identifier) {

    for (let i = 1; i <= scopeLabel.length; i++) {
        for (let r of simbolicTable) {
            if (r.identifier == identifier && r.scope == scopeLabel[scopeLabel.length - i]) {
                return r.type;
            }
        }
    }
}

function updateData(row) {


    for (let i = 1; i <= simbolicTable.length; i++) {
        let index = simbolicTable.length - i;
        let r = simbolicTable[index];
        if (r.identifier == row.identifier && scopeLabel.includes(r.scope)) {
            simbolicTable[index] = row;
            break;
        }
    }
}




function depthSearch(body, typeOfVar) {

    if (body instanceof Array) {
        for (let b of body) {
            depthSearch(b, typeOfVar);

        }
    } else {
        if (body != undefined) {

            return VerifyStatement(body, typeOfVar);
        }
    }
}

function printErrorNotDeclared(id, line, column) {
    console.error('\x1b[31m%s\x1b[0m', "  Error found on line " + line + " column " + column + ". '" + id + "' it was not declared");
}

function printErrorHasBenDeclared(id, line, column) {
    console.error('\x1b[31m%s\x1b[0m', "  Error found on line " + line + " column " + column + ". '" + id + "' has already been declared ");

}
function printErrorTypes(line, column, t1, t2) {
    console.error('\x1b[31m%s\x1b[0m', "Expected " + t1 + " but found " + t2 + " on line " + line + " column " + column)

}



function OnlyIdentifierStatement(statement, typeOfVar) {
    let body = statement.body;

    if (body.type == ENUM_LIST.STATEMENTS_ENUM.POINTER_STATEMENT) {
        let type = []; type.push(typeOfVar);
        let t = body.type;
        for (let item of body.body) {
            type.push(t);
        }
        body = body.body[body.body.length - 1];
        let id = body.value.value + '';
        id = id.replace('*', '');
        let tableRow = new SamanticTableData(type, id, '', body.value.line, body.value.column, scopeLabel[scopeLabel.length - 1]);
        putOnTable(tableRow);

    } else {
        let id = body.value.value;
        let line = body.value.line;
        let column = body.value.column;

        if (containsValueInScope(id)) {
            printErrorHasBenDeclared(id, line, column);
        } else {
            let tableRow = new SamanticTableData(typeOfVar, id, '', line, column, scopeLabel[scopeLabel.length - 1]);
            putOnTable(tableRow);
        }
    }


}

function IdentifierAtributionStatement(statement, typeOfVar) {

    let body = statement.body;

    let id = body[0].value.value;
    let line = body[0].value.line;
    let column = body[0].value.column;
    if (!typeOfVar) {

        if (containsValueInTable(id)) {
            let type = getType(id);
            if (body[2] != null) {
                SimpleDefinitionStatement(statement, type, true);
            }
        } else {
            printErrorNotDeclared(id, line, column);
        }

    } else {

        if (!(containsValueInScope(id))) {
            SimpleDefinitionStatement(statement, typeOfVar);
        } else {

            printErrorHasBenDeclared(id, line, column);
        }
    }

}


function SimpleDefinitionStatement(statement, typeOfVar, update) {

    let body = statement.body;
    let id = body[0].value.value;
    let line = body[0].value.line;
    let column = body[0].value.column;

    let val = '';
    let atrib = body[2];

    val = VerifyStatement(atrib, typeOfVar);
    if (!val) {
        if (compareTypes(typeOfVar, atrib.type)) {
            val = atrib.value.value;
        } else {
            printErrorTypes(line, column, typeOfVar, atrib.type);
        }
    }


    let tableRow = new SamanticTableData(typeOfVar, id, val, line, column, scopeLabel[scopeLabel.length - 1]);
    if (update) {
        updateData(tableRow);
    } else {
        putOnTable(tableRow);
    }

}

function VariableStatementList(statement, typeOfVar) {

    let body = statement.body;
    let tail = statement.tail;


    depthSearch(body, typeOfVar);

    depthSearch(tail, typeOfVar);
}

function VariableSimpleStatement(statement, typeOfVar) {


    let body = statement.body;
    if (body instanceof Array) {
        body = body[0];
    }
    let type = [];
    type.push(typeOfVar);
    if (body.type == ENUM_LIST.STATEMENTS_ENUM.POINTER_STATEMENT) {
        let t = body.type;
        for (let item of body.body) {
            type.push(t);
        }
        body = body.body[body.body.length - 1];
        let id = body.value.value + '';
        id = id.replace('*', '');
        let tableRow = new SamanticTableData(type, id, '', body.value.line, body.value.column, scopeLabel[scopeLabel.length - 1]);
        putOnTable(tableRow);

    } else {
        let tableRow = new SamanticTableData(typeOfVar, body.value.value, '', body.value.line, body.value.column, scopeLabel[scopeLabel.length - 1]);
        putOnTable(tableRow);

    }

    //console.log(body);
}



function VariableAtribuitionSimpleStatement(statement, typeOfVar) {
    setVariableAtribution(statement, typeOfVar);
}

function setVariableAtribution(statement, typeOfVar) {

    let body = statement.body;
    let val = '';
    let atrib = body[2];
    if (atrib.type == ENUM_LIST.STATEMENTS_ENUM.EQUATION) {
        val = EquationStatement(atrib, typeOfVar);
    } else {
        try {
            val = atrib.value.value;
        } catch (error) {

        }
    }
    let tableRow = new SamanticTableData(typeOfVar, body[0].value.value, val, body[0].value.line, body[0].value.column, scopeLabel[scopeLabel.length - 1]);
    putOnTable(tableRow);
}


function ExpressionUnitStatement(statement) {
    let body = statement.body;
    if (!(body instanceof Array)) {
        body = [body];
    }
    for (let state of body) {
        return depthSearch(state);

    }
}
function AssignmentExpressionStatement(statement, typeOfVar) {
    let body = statement.body;
    if (!(body instanceof Array)) {
        body = [body];
    }
    for (let b of body) {
        if (ENUM_LIST.IDENTIFIER.includes(b.type)) {
            let id = b.value.value;
            let line = b.value.line;
            let column = b.value.column;

            if (!containsValueInTable(id)) {
                printErrorNotDeclared(id, line, column);
                return false;
            }
        }
    }
    return 'bool';
}
function VariableAtribuitionStatement(statement, typeOfVar) {
    if (typeOfVar == null) {
        typeOfVar = getType(body[0].value.value);
        SimpleDefinitionStatement(statement, typeOfVar, true);

    } else {
        SimpleDefinitionStatement(statement, typeOfVar);
    }
    /*
    if (atrib.type == ENUM_LIST.STATEMENTS_ENUM.EQUATION) {
        val = EquationStatement(atrib, typeOfVar);
    }
    let tableRow = new SamanticTableData(typeOfVar, body[0].value.value, val, body[0].value.line, body[0].value.column, scopeLabel[scopeLabel.length - 1]);
    if (update) {
        updateData(tableRow);
    } else {
        putOnTable(tableRow);
    }
    */
}




function EquationStatement(statement, typeOfVar) {
    let type = statement.type;
    let body = statement.body;
    let str = '';

    if (!(body instanceof Array)) {
        body = [body];
    }

    for (let s of body) {
        if (ENUM_LIST.IDENTIFIER.includes(s.type)) {
            s.type = getType(s.value.value);
        }

        if (getSign(s.type)) {
            str = str + getSign(s.type) + ' ';
        } else {
            if (compareTypes(typeOfVar, s.type)) {
                str = str + s.value.value + ' ';
            } else {

                console.error('\x1b[31m%s\x1b[0m', "Expected " + typeOfVar + " but found " + s.type + " on line " + s.value.line + " column " + s.value.column)

                return false;
            }
        }
    }
    return str;
}
/*
function variableStatementDefinition(statement, typeOfVar) {
    let type = statement.type;
    let body = statement.body;
    if (type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_ATRIBUITION) {

        let val = '';

        let atrib = body[2];

        if (atrib.type == ENUM_LIST.STATEMENTS_ENUM.EQUATION) {
            val = EquationStatement(atrib, typeOfVar);
        }

        let tableRow = new SamanticTableData(typeOfVar, body[0].value.value, val, body[0].value.line, body[0].value.column, scopeLabel[scopeLabel.length - 1]);
        putOnTable(tableRow);

    }


    if (type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_ATRIBUITION_SIMPLE) {


        let val = '';

        let atrib = body[2];

        if (atrib.type == ENUM_LIST.STATEMENTS_ENUM.EQUATION) {
            val = EquationStatement(atrib, typeOfVar);
        }

        let tableRow = new SamanticTableData(typeOfVar, body[0].value.value, val, body[0].value.line, body[0].value.column, scopeLabel[scopeLabel.length - 1]);
        putOnTable(tableRow);


    }


    if (type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_SIMPLE) {

        if (body instanceof Array) {
            body = body[0];
        }
        let tableRow = new SamanticTableData(typeOfVar, body.value.value, '', body.value.line, body.value.column);
        putOnTable(tableRow);
    }

}
*/
function putOnTable(row) {
    if (!contains(row)) {
        simbolicTable.push(row);
        return true;
    }
    console.error('\x1b[31m%s\x1b[0m', "  Error found on line " + row.line + " column " + row.column + ". '" + row.identifier + "' has already been declared ");

    return false;

}


function contains(row) {
    for (let obj of simbolicTable) {
        if (obj.identifier == row.identifier && obj.scope == scopeLabel[scopeLabel.length - 1]) {

            return true;
        }
    }
    return false;
}
function containsValueInScope(value) {

    for (let obj of simbolicTable) {
        if (obj.identifier == value && obj.scope == scopeLabel[scopeLabel.length - 1]) {

            return true;
        }

    }

    return false;
}


function containsValueInTable(value) {


    for (let i = 1; i <= simbolicTable.length; i++) {
        let index = simbolicTable.length - i;
        let r = simbolicTable[index];
        if (r.identifier == value && scopeLabel.includes(r.scope)) {
            return true;
        }
    }
    return false;
}




function getSign(token) {
    if (token == ENUM_LIST.ENUM_TOKENS.OPERATOR_ARITHMETIC_LESS) {
        return '-';
    }
    if (token == ENUM_LIST.ENUM_TOKENS.OPERATOR_ARITHMETIC_DIVISION) {
        return '/';
    }
    if (token == ENUM_LIST.ENUM_TOKENS.OPERATOR_ARITHMETIC_MULTIPLICATION) {
        return '*';
    }
    if (token == ENUM_LIST.ENUM_TOKENS.OPERATOR_ARITHMETIC_PLUS) {
        return '+';
    }
    if (token == ENUM_LIST.ENUM_TOKENS.OPERATOR_ARITHMETIC_DIV) {
        return '//';
    }
    if (token == ENUM_LIST.ENUM_TOKENS.OPERATOR_ARITHMETIC_MOD) {
        return '%';
    }
    return false;
}


function compareTypes(t1, t2) {

    if (t1 instanceof Array) {
        if (t2 instanceof Array) {
            if (t1.length == t2.length) {
                for (let i = 0; i < t1.length; i++) {
                    if (!compareTypes(t1[i], t2[i])) {
                        return false;
                    }
                }
                return true
            }
        }
    }
    if (t1 == 'Array' && (t2 == 'Array') || (t2 == 'Pointer')) {
        return true;
    }
    if (t1 == 'Pointer' && (t2 == 'Array') || (t2 == 'Pointer')) {
        return true;
    }

    if (t1 == ENUM_LIST.ENUM_TOKENS.TYPE_INT && intDomain.includes(t2)) {
        return true;
    }
    if (t1 == ENUM_LIST.ENUM_TOKENS.TYPE_BOOL && boleanDomain.includes(t2)) {
        return true;
    }
    if (t1 == ENUM_LIST.ENUM_TOKENS.TYPE_FLOAT && floatDomain.includes(t2)) {
        return true;
    }
    if (t1 == ENUM_LIST.ENUM_TOKENS.TYPE_CHAR && charDomain.includes(t2)) {
        return true;
    }
    return false;
}

function variableStatement(statement) {

    let typeOfVar = statement.body[0].type;
    let statementList = statement.body[1].body;
    let tail = statement.body[1].tail;



    variableStatementDeph(statementList, typeOfVar);
    variableStatementDeph(tail, typeOfVar);


}

function variableStatementDeph(statement, typeOfVar) {

    if (statement instanceof Array) {

        for (let state of statement) {
            variableStatementDeph(state, typeOfVar);
        }
    } else {
        variableStatementDefinition(statement, typeOfVar)
    }

}


module.exports = Semantics;