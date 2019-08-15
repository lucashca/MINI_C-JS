const ENUM_LIST = require('./enumList');

var simbolicTable = [];
var scopeLabel = [];
scopeLabel.push('Global');

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
            VerifyStatement(state);
        }
    } else {
        VerifyStatement(body);
    }

}

function IfStatement(statement) {
    scopeLabel.push({ label: 'IfStatement', index: getIndexScope('IfStatement') });
    let type = statement.type;
    let expression = statement.expression;

    let code = statement.code;
    ExpressionStatement(expression);
    depthSearch(code);
    scopeLabel.pop();

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

    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.EXPRESSION_UNIT) {
        ExpressionUnitStatement(statement);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.IF) {
        IfStatement(statement);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE) {
        VariableStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_ATRIBUITION) {
        VariableAtribuitionStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_ATRIBUITION_SIMPLE) {
        VariableAtribuitionSimpleStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_ATRIBUITION_ARRAY_SIMPLE) {
        VariableStatementAtribuitionArraySimple(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_ARRAY_SIMPLE) {
        VariableStatementArray(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_LIST) {
        VariableStatementList(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.VARIABLE_SIMPLE) {
        VariableSimpleStatement(statement, typeOfVar);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.DO_WHILE) {
        DoWhileStatement(statement);
    }
    if (statement.type == ENUM_LIST.STATEMENTS_ENUM.EQUATION) {
        EquationStatement(statement, typeOfVar);
    }
}

function VariableStatementAtribuitionArraySimple(statement, typeOfVar) {
    VariableSimpleStatement(statement, typeOfVar)
}

function VariableStatementArray(statement, typeOfVar) {
    setVariableAtribution(statement, typeOfVar);
}

function DoWhileStatement(statement) {
    console.log('DoWhileStatement');
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
      
    for (let i = 1; i <= scopeLabel.length ; i ++) {
        console.log(scopeLabel);
        console.log(scopeLabel[scopeLabel.length - i]);
        for (let r of simbolicTable) {
            if (r.identifier == identifier && r.scope == scopeLabel[scopeLabel.length - i]) {
                return r.type;
            }
        }
    }
}

function updateData(row) {
    for (let i in simbolicTable) {

        let r = simbolicTable[i];
        if (r.identifier == row.identifier) {
            row.scope = r.scope;
            simbolicTable[i] = row;
        };
    }
}




function depthSearch(body, typeOfVar) {
    if (body instanceof Array) {
        for (let b of body) {
            depthSearch(b, typeOfVar);
        }
    } else {
        if (body != undefined)
            VerifyStatement(body, typeOfVar);
    }
}

function VariableStatementList(statement, typeOfVar) {
    //console.log(statement);
    let body = statement.body;
    let tail = statement.tail;
    if (tail == undefined) {
        let tableRow = new SamanticTableData(typeOfVar, body.value.value, '', body.value.line, body.value.column, scopeLabel[scopeLabel.length - 1]);

    }
    depthSearch(body, typeOfVar);

    depthSearch(tail, typeOfVar);
}

function VariableSimpleStatement(statement, typeOfVar) {
    let body = statement.body;
    if (body instanceof Array) {
        body = body[0];
    }

    //console.log(body);
    let tableRow = new SamanticTableData(typeOfVar, body.value.value, '', body.value.line, body.value.column, scopeLabel[scopeLabel.length - 1]);
    putOnTable(tableRow);
}

function VariableAtribuitionStatement(statement, typeOfVar) {
    setVariableAtribution(statement, typeOfVar);
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

        if (!(state.body instanceof Array)) {
            state.body = [state.body];
        }
        for (let sta of state.body) {
            if (ENUM_LIST.IDENTIFIER.includes(sta.type)) {
                if (!containsValue(sta.value.value)) {
                    console.error('\x1b[31m%s\x1b[0m', "  Error found on line " + sta.value.line + " column " + sta.value.column + ". '" + sta.value.value + "' it was not declared");
                }
            }
        }
    }
}

function VariableAtribuitionStatement(statement, typeOfVar) {
    let body = statement.body;
    let val = '';
    let atrib = body[2];
    
    let update = false;
    if (typeOfVar == null) {
        typeOfVar = getType(body[0].value.value);
        update = true;
    }
    if (atrib.type == ENUM_LIST.STATEMENTS_ENUM.EQUATION) {
        val = EquationStatement(atrib, typeOfVar);
    }
    let tableRow = new SamanticTableData(typeOfVar, body[0].value.value, val, body[0].value.line, body[0].value.column, scopeLabel[scopeLabel.length - 1]);
    if (update) {
        updateData(tableRow);
    } else {
        putOnTable(tableRow);
    }
}

function EquationStatement(statement, typeOfVar) {
    let type = statement.type;
    let body = statement.body;
    let str = '';

    if (!(body instanceof Array)) {
        body = [body];
    }

    for (let s of body) {
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
function containsValue(value) {
    for (let obj of simbolicTable) {
        if (obj.identifier == value) {

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
    if (t1 == ENUM_LIST.ENUM_TOKENS.TYPE_INT && t2 == ENUM_LIST.ENUM_TOKENS.INSTANCE_OF_INT) {
        return true;
    }
    if (t1 == ENUM_LIST.ENUM_TOKENS.TYPE_BOOL && t2 == ENUM_LIST.ENUM_TOKENS.INSTANCE_OF_BOOL) {
        return true;
    }
    if (t1 == ENUM_LIST.ENUM_TOKENS.TYPE_FLOAT && t2 == ENUM_LIST.ENUM_TOKENS.INSTANCE_OF_FLOAT) {
        return true;
    }
    if (t1 == ENUM_LIST.ENUM_TOKENS.TYPE_CHAR && (t2 == ENUM_LIST.ENUM_TOKENS.INSTANCE_OF_CHAR_MULTPLE || t2 == ENUM_LIST.ENUM_TOKENS.INSTANCE_OF_CHAR_SIMPLE)) {
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