const antlr4 = require('antlr4');
const CLexer = require('./grammar/CLexer');
const CParser = require('./grammar/CParser');

const input = '"asdasd"';

const chars = new antlr4.InputStream(input);
const lexer = new CLexer.CLexer(chars);

lexer.strictMode = false; // do not use js strictMode

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new CParser.CParser(tokens);
const tree = parser.primaryExpression();

console.log(tree.toStringTree(parser.ruleNames));