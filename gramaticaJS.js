ES5 {

  Program = &(Directive*) SourceElement*

  // §A.1 Lexical Grammar -- https://es5.github.io/#A.1

  /*
    Note: the following lexical conventions (see https://es5.github.io/#x7)
    are not implemented in this parser.

    // Goal production in contexts where a leading "/" or "/=" is permitted:
    InputElementDiv = whitespace | lineTerminator | comment | token | DivPunctuator

    // Goal production in contexts where a leading "/" or "/=' is not permitted:
    InputElementRegExp = whitespace | lineTerminator | comment | token | regularExpressionLiteral
  */

  sourceCharacter = any

  // Override Ohm's built-in definition of space.
  space := whitespace | lineTerminator | comment

  whitespace = "\t"
             | "\x0B"    -- verticalTab
             | "\x0C"    -- formFeed
             | " "
             | "\u00A0"  -- noBreakSpace
             | "\uFEFF"  -- byteOrderMark
             | unicodeSpaceSeparator

  lineTerminator = "\n" | "\r" | "\u2028" | "\u2029"
  lineTerminatorSequence = "\n" | "\r" ~"\n" | "\u2028" | "\u2029" | "\r\n"

  comment = multiLineComment | singleLineComment

  multiLineComment = "/*" (~"*/" sourceCharacter)* "*/"
  singleLineComment = "//" (~lineTerminator sourceCharacter)*

  identifier (an identifier) = ~reservedWord identifierName
  identifierName = identifierStart identifierPart*

  identifierStart = letter | "$" | "_"
                  | "\\" unicodeEscapeSequence -- escaped
  identifierPart = identifierStart | unicodeCombiningMark
                 | unicodeDigit | unicodeConnectorPunctuation
                 | "\u200C" | "\u200D"
  letter += unicodeCategoryNl
  unicodeCategoryNl
    = "\u2160".."\u2182" | "\u3007" | "\u3021".."\u3029"
  unicodeDigit (a digit)
    = "\u0030".."\u0039" | "\u0660".."\u0669" | "\u06F0".."\u06F9" | "\u0966".."\u096F" | "\u09E6".."\u09EF" | "\u0A66".."\u0A6F" | "\u0AE6".."\u0AEF" | "\u0B66".."\u0B6F" | "\u0BE7".."\u0BEF" | "\u0C66".."\u0C6F" | "\u0CE6".."\u0CEF" | "\u0D66".."\u0D6F" | "\u0E50".."\u0E59" | "\u0ED0".."\u0ED9" | "\u0F20".."\u0F29" | "\uFF10".."\uFF19"

  unicodeCombiningMark (a Unicode combining mark)
    = "\u0300".."\u0345" | "\u0360".."\u0361" | "\u0483".."\u0486" | "\u0591".."\u05A1" | "\u05A3".."\u05B9" | "\u05BB".."\u05BD" | "\u05BF".."\u05BF" | "\u05C1".."\u05C2" | "\u05C4".."\u05C4" | "\u064B".."\u0652" | "\u0670".."\u0670" | "\u06D6".."\u06DC" | "\u06DF".."\u06E4" | "\u06E7".."\u06E8" | "\u06EA".."\u06ED" | "\u0901".."\u0902" | "\u093C".."\u093C" | "\u0941".."\u0948" | "\u094D".."\u094D" | "\u0951".."\u0954" | "\u0962".."\u0963" | "\u0981".."\u0981" | "\u09BC".."\u09BC" | "\u09C1".."\u09C4" | "\u09CD".."\u09CD" | "\u09E2".."\u09E3" | "\u0A02".."\u0A02" | "\u0A3C".."\u0A3C" | "\u0A41".."\u0A42" | "\u0A47".."\u0A48" | "\u0A4B".."\u0A4D" | "\u0A70".."\u0A71" | "\u0A81".."\u0A82" | "\u0ABC".."\u0ABC" | "\u0AC1".."\u0AC5" | "\u0AC7".."\u0AC8" | "\u0ACD".."\u0ACD" | "\u0B01".."\u0B01" | "\u0B3C".."\u0B3C" | "\u0B3F".."\u0B3F" | "\u0B41".."\u0B43" | "\u0B4D".."\u0B4D" | "\u0B56".."\u0B56" | "\u0B82".."\u0B82" | "\u0BC0".."\u0BC0" | "\u0BCD".."\u0BCD" | "\u0C3E".."\u0C40" | "\u0C46".."\u0C48" | "\u0C4A".."\u0C4D" | "\u0C55".."\u0C56" | "\u0CBF".."\u0CBF" | "\u0CC6".."\u0CC6" | "\u0CCC".."\u0CCD" | "\u0D41".."\u0D43" | "\u0D4D".."\u0D4D" | "\u0E31".."\u0E31" | "\u0E34".."\u0E3A" | "\u0E47".."\u0E4E" | "\u0EB1".."\u0EB1" | "\u0EB4".."\u0EB9" | "\u0EBB".."\u0EBC" | "\u0EC8".."\u0ECD" | "\u0F18".."\u0F19" | "\u0F35".."\u0F35" | "\u0F37".."\u0F37" | "\u0F39".."\u0F39" | "\u0F71".."\u0F7E" | "\u0F80".."\u0F84" | "\u0F86".."\u0F87" | "\u0F90".."\u0F95" | "\u0F97".."\u0F97" | "\u0F99".."\u0FAD" | "\u0FB1".."\u0FB7" | "\u0FB9".."\u0FB9" | "\u20D0".."\u20DC" | "\u20E1".."\u20E1" | "\u302A".."\u302F" | "\u3099".."\u309A" | "\uFB1E".."\uFB1E" | "\uFE20".."\uFE23"

  unicodeConnectorPunctuation = "\u005F" | "\u203F".."\u2040" | "\u30FB" | "\uFE33".."\uFE34" | "\uFE4D".."\uFE4F" | "\uFF3F" | "\uFF65"
  unicodeSpaceSeparator = "\u2000".."\u200B" | "\u3000"

  reservedWord = keyword | futureReservedWord | nullLiteral | booleanLiteral

  // Note: keywords that are the complete prefix of another keyword should
  // be prioritized (e.g. 'in' should come before 'instanceof')
  keyword = break    | do        | instanceof | typeof
          | case     | else      | new        | var
          | catch    | finally   | return     | void
          | continue | for       | switch     | while
          | debugger | function  | this       | with
          | default  | if        | throw
          | delete   | in        | try

  futureReservedWordLax = class  | enum  | extends
                        | super  | const | export
                        | import

  futureReservedWordStrict = futureReservedWordLax
                           | implements | let     | private   | public
                           | interface  | package | protected | static
                           | yield

  futureReservedWord = futureReservedWordStrict

  /*
    Note: Punctuator and DivPunctuator (see https://es5.github.io/x7.html#x7.7) are
    not currently used by this grammar.
  */

  literal = nullLiteral | booleanLiteral | numericLiteral
          | stringLiteral | regularExpressionLiteral // spec forgot Regexp literals in appendix?
  nullLiteral = "null" ~identifierPart
  booleanLiteral = ("true" | "false") ~identifierPart

  // For semantics on how decimal literals are constructed, see section 7.8.3

  // Note that the ordering of hexIntegerLiteral and decimalLiteral is reversed w.r.t. the spec
  // This is intentional: the order decimalLiteral | hexIntegerLiteral will parse
  // "0x..." as a decimal literal "0" followed by "x..."
  numericLiteral = octalIntegerLiteral | hexIntegerLiteral | decimalLiteral

  decimalLiteral = decimalIntegerLiteral "." decimalDigit* exponentPart -- bothParts
                 |                       "." decimalDigit+ exponentPart -- decimalsOnly
                 | decimalIntegerLiteral                   exponentPart -- integerOnly

  decimalIntegerLiteral = nonZeroDigit decimalDigit*  -- nonZero
                        | "0"                         -- zero
  decimalDigit = "0".."9"
  nonZeroDigit = "1".."9"

  exponentPart = exponentIndicator signedInteger -- present
               |                                 -- absent
  exponentIndicator = "e" | "E"
  signedInteger = "+" decimalDigit* -- positive
                | "-" decimalDigit* -- negative
                |     decimalDigit+ -- noSign

  hexIntegerLiteral = "0x" hexDigit+
                    | "0X" hexDigit+

  // hexDigit defined in Ohm's built-in rules (otherwise: hexDigit = "0".."9" | "a".."f" | "A".."F")

  octalIntegerLiteral = "0" octalDigit+

  octalDigit = "0".."7"

  // For semantics on how string literals are constructed, see section 7.8.4
  stringLiteral = "\"" doubleStringCharacter* "\""
                | "'" singleStringCharacter* "'"
  doubleStringCharacter = ~("\"" | "\\" | lineTerminator) sourceCharacter -- nonEscaped
                        | "\\" escapeSequence                             -- escaped
                        | lineContinuation                                -- lineContinuation
  singleStringCharacter = ~("'" | "\\" | lineTerminator) sourceCharacter -- nonEscaped
                        | "\\" escapeSequence                            -- escaped
                        | lineContinuation                               -- lineContinuation
  lineContinuation = "\\" lineTerminatorSequence
  escapeSequence = unicodeEscapeSequence
                 | hexEscapeSequence
                 | octalEscapeSequence
                 | characterEscapeSequence  // Must come last.
  characterEscapeSequence = singleEscapeCharacter
                          | nonEscapeCharacter
  singleEscapeCharacter = "'" | "\"" | "\\" | "b" | "f" | "n" | "r" | "t" | "v"
  nonEscapeCharacter = ~(escapeCharacter | lineTerminator) sourceCharacter
  escapeCharacter = singleEscapeCharacter | decimalDigit | "x" | "u"
  octalEscapeSequence = zeroToThree octalDigit octalDigit    -- whole
                      | fourToSeven octalDigit               -- eightTimesfourToSeven
                      | zeroToThree octalDigit ~decimalDigit -- eightTimesZeroToThree
                      | octalDigit ~decimalDigit             -- octal
  hexEscapeSequence = "x" hexDigit hexDigit
  unicodeEscapeSequence = "u" hexDigit hexDigit hexDigit hexDigit

  zeroToThree = "0".."3"
  fourToSeven = "4".."7"

  // §7.8.5 Regular Expression Literals -- https://es5.github.io/#x7.8.5

  regularExpressionLiteral = "/" regularExpressionBody "/" regularExpressionFlags
  regularExpressionBody = regularExpressionFirstChar regularExpressionChar*
  regularExpressionFirstChar = ~("*" | "\\" | "/" | "[") regularExpressionNonTerminator
                             | regularExpressionBackslashSequence
                             | regularExpressionClass
  regularExpressionChar = ~("\\" | "/" | "[") regularExpressionNonTerminator
                        | regularExpressionBackslashSequence
                        | regularExpressionClass
  regularExpressionBackslashSequence = "\\" regularExpressionNonTerminator
  regularExpressionNonTerminator = ~(lineTerminator) sourceCharacter
  regularExpressionClass = "[" regularExpressionClassChar* "]"
  regularExpressionClassChar = ~("]" | "\\") regularExpressionNonTerminator
                             | regularExpressionBackslashSequence
  regularExpressionFlags = identifierPart*

  // === Implementation-level rules (not part of the spec) ===

  multiLineCommentNoNL = "/*" (~("*/" | lineTerminator) sourceCharacter)* "*/"

  // does not accept lineTerminators, not even implicit ones in a multiLineComment (cf. section 7.4)
  spacesNoNL = (whitespace | singleLineComment | multiLineCommentNoNL)*

  // A semicolon is "automatically inserted" if a newline or the end of the input stream is
  // reached, or the offending token is "}".
  // See https://es5.github.io/#x7.9 for more information.
  // NOTE: Applications of this rule *must* appear in a lexical context -- either in the body of a
  // lexical rule, or inside `#()`.
  sc = space* (";" | end)
     | spacesNoNL (lineTerminator | ~multiLineCommentNoNL multiLineComment | &"}")

  // Convenience rules for parsing keyword tokens.
  break = "break" ~identifierPart
  do = "do" ~identifierPart
  instanceof = "instanceof" ~identifierPart
  typeof = "typeof" ~identifierPart
  case = "case" ~identifierPart
  else = "else" ~identifierPart
  new = "new" ~identifierPart
  var = "var" ~identifierPart
  catch = "catch" ~identifierPart
  finally = "finally" ~identifierPart
  return = "return" ~identifierPart
  void = "void" ~identifierPart
  continue = "continue" ~identifierPart
  for = "for" ~identifierPart
  switch = "switch" ~identifierPart
  while = "while" ~identifierPart
  debugger = "debugger" ~identifierPart
  function = "function" ~identifierPart
  this = "this" ~identifierPart
  with = "with" ~identifierPart
  default = "default" ~identifierPart
  if = "if" ~identifierPart
  throw = "throw" ~identifierPart
  delete = "delete" ~identifierPart
  in = "in" ~identifierPart
  try = "try" ~identifierPart
  get = "get" ~identifierPart
  set = "set" ~identifierPart
  class = "class" ~identifierPart
  enum = "enum" ~identifierPart
  extends = "extends" ~identifierPart
  super = "super" ~identifierPart
  const = "const" ~identifierPart
  export = "export" ~identifierPart
  import = "import" ~identifierPart
  implements = "implements" ~identifierPart
  let = "let" ~identifierPart
  private = "private" ~identifierPart
  public = "public" ~identifierPart
  interface = "interface" ~identifierPart
  package = "package" ~identifierPart
  protected = "protected" ~identifierPart
  static = "static" ~identifierPart
  yield = "yield" ~identifierPart
  
  // end of lexical rules

  noIn = ~in
  withIn =

  // §A.3 Expressions -- https://es5.github.io/#A.3

  PrimaryExpression = this
                    | identifier
                    | literal
                      // ( litToken.type === "regexp"
                      //   ? this.ast(_fromIdx, "RegExpExpr",{body:  litToken.value.body
                      //                            flags: litToken.value.flags}, [])
                      //   : this.ast(_fromIdx, "LiteralExpr",{type:  litToken.type
                      //                             value: litToken.value}, []) )
                    | ArrayLiteral
                    | ObjectLiteral
                    | "(" Expression<withIn> ")"  -- parenExpr

  ArrayLiteral = "[" ListOf<AssignmentExpressionOrElision, ","> "]"
  AssignmentExpressionOrElision = AssignmentExpression<withIn>
                                |                       -- elision

  ObjectLiteral = "{" ListOf<PropertyAssignment, ","> "}"              -- noTrailingComma
                | "{" NonemptyListOf<PropertyAssignment, ","> "," "}"  -- trailingComma

  PropertyAssignment = get PropertyName "(" ")" "{" FunctionBody "}"                  -- getter
                     | set PropertyName "(" FormalParameter ")" "{" FunctionBody "}"  -- setter
                     | PropertyName ":" AssignmentExpression<withIn>                  -- simple

  PropertyName = identifierName
               | stringLiteral
               | numericLiteral

  MemberExpression = MemberExpression "[" Expression<withIn> "]"  -- arrayRefExp
                   | MemberExpression "." identifierName  -- propRefExp
                   | new MemberExpression Arguments       -- newExp
                   | FunctionExpression
                   | PrimaryExpression

  NewExpression = MemberExpression
                | new NewExpression -- newExp

  CallExpression = CallExpression "[" Expression<withIn> "]"  -- arrayRefExp
                 | CallExpression "." identifierName  -- propRefExp
                 | CallExpression Arguments           -- callExpExp
                 | MemberExpression Arguments         -- memberExpExp

  Arguments = "(" ListOf<AssignmentExpression<withIn>, ","> ")"

  LeftHandSideExpression = CallExpression
                         | NewExpression

  PostfixExpression = LeftHandSideExpression #(spacesNoNL "++")  -- postIncrement
                    | LeftHandSideExpression #(spacesNoNL "--")  -- postDecrement
                    | LeftHandSideExpression

  UnaryExpression = delete UnaryExpression  -- deleteExp
                  | void   UnaryExpression  -- voidExp
                  | typeof UnaryExpression  -- typeofExp
                  | "++"   UnaryExpression  -- preIncrement
                  | "--"   UnaryExpression  -- preDecrement
                  | "+"    UnaryExpression  -- unaryPlus
                  | "-"    UnaryExpression  -- unaryMinus
                  | "~"    UnaryExpression  -- bnot
                  | "!"    UnaryExpression  -- lnot
                  | PostfixExpression

  MultiplicativeExpression = MultiplicativeExpression "*" UnaryExpression -- mul
                           | MultiplicativeExpression "/" UnaryExpression -- div
                           | MultiplicativeExpression "%" UnaryExpression -- mod
                           | UnaryExpression

  AdditiveExpression = AdditiveExpression "+" MultiplicativeExpression -- add
                     | AdditiveExpression "-" MultiplicativeExpression -- sub
                     | MultiplicativeExpression

  ShiftExpression = ShiftExpression "<<" AdditiveExpression  -- lsl
                  | ShiftExpression ">>>" AdditiveExpression -- lsr
                  | ShiftExpression ">>" AdditiveExpression  -- asr
                  | AdditiveExpression

  RelationalExpression<guardIn>
    = RelationalExpression<guardIn> "<" ShiftExpression           -- lt
    | RelationalExpression<guardIn> ">" ShiftExpression           -- gt
    | RelationalExpression<guardIn> "<=" ShiftExpression          -- le
    | RelationalExpression<guardIn> ">=" ShiftExpression          -- ge
    | RelationalExpression<guardIn> "instanceof" ShiftExpression  -- instanceOfExp
    | RelationalExpression<guardIn> guardIn "in" ShiftExpression  -- inExp
    | ShiftExpression

  EqualityExpression<guardIn>
    = EqualityExpression<guardIn> "==" RelationalExpression<guardIn>  -- equal
    | EqualityExpression<guardIn> "!=" RelationalExpression<guardIn>  -- notEqual
    | EqualityExpression<guardIn> "===" RelationalExpression<guardIn> -- eq
    | EqualityExpression<guardIn> "!==" RelationalExpression<guardIn> -- notEq
    | RelationalExpression<guardIn>

  BitwiseANDExpression<guardIn>
    = BitwiseANDExpression<guardIn> "&" EqualityExpression<guardIn> -- band
    | EqualityExpression<guardIn>

  BitwiseXORExpression<guardIn>
    = BitwiseXORExpression<guardIn> "^" BitwiseANDExpression<guardIn> -- bxor
    | BitwiseANDExpression<guardIn>

  BitwiseORExpression<guardIn>
    = BitwiseORExpression<guardIn> "|" BitwiseXORExpression<guardIn> -- bor
    | BitwiseXORExpression<guardIn>

  LogicalANDExpression<guardIn>
    = LogicalANDExpression<guardIn> "&&" BitwiseORExpression<guardIn> -- land
    | BitwiseORExpression<guardIn>

  LogicalORExpression<guardIn>
    = LogicalORExpression<guardIn> "||" LogicalANDExpression<guardIn> -- lor
    | LogicalANDExpression<guardIn>

  ConditionalExpression<guardIn>
    = LogicalORExpression<guardIn> "?" AssignmentExpression<withIn> ":" AssignmentExpression<guardIn> -- conditional
    | LogicalORExpression<guardIn>

  AssignmentExpression<guardIn>
    = LeftHandSideExpression assignmentOperator AssignmentExpression<guardIn> -- assignment
    | ConditionalExpression<guardIn>

  Expression<guardIn> (an expression)
    = Expression<guardIn> "," AssignmentExpression<guardIn> -- commaExp
    | AssignmentExpression<guardIn>

  assignmentOperator = "=" | ">>>=" | "<<=" | ">>="
                     | "*=" | "/=" | "%=" | "+=" | "-=" | "&=" | "^=" | "|="

  // §A.4 Statements -- https://es5.github.io/#A.4

  Statement
    = Block
    | VariableStatement
    | EmptyStatement
    | ExpressionStatement
    | IfStatement
    | IterationStatement
    | ContinueStatement
    | BreakStatement
    | ReturnStatement
    | WithStatement
    | LabelledStatement
    | SwitchStatement
    | ThrowStatement
    | TryStatement
    | DebuggerStatement

  Block = "{" StatementList "}"

  StatementList = Statement*

  VariableStatement = var VariableDeclarationList<withIn> #sc

  VariableDeclarationList<guardIn> = NonemptyListOf<VariableDeclaration<guardIn>, ",">

  VariableDeclaration<guardIn> = identifier Initialiser<guardIn>?

  Initialiser<guardIn> = "=" AssignmentExpression<guardIn>

  EmptyStatement = ";" // note: this semicolon eats newlines

  ExpressionStatement = ~("{" | function) Expression<withIn> #sc

  IfStatement = if "(" Expression<withIn> ")" Statement (else Statement)?

  IterationStatement = do Statement while "(" Expression<withIn> ")" #sc  -- doWhile
                     | while "(" Expression<withIn> ")" Statement           -- whileDo
                     | for "(" Expression<noIn>? ";"
                                 Expression<withIn>? ";"
                                 Expression<withIn>? ")" Statement          -- for3
                     | for "(" var VariableDeclarationList<noIn> ";"
                                 Expression<withIn>? ";"
                                 Expression<withIn>? ")" Statement          -- for3var
                     | for "(" LeftHandSideExpression in
                                 Expression<withIn> ")" Statement           -- forIn
                     | for "(" var VariableDeclaration<noIn> in
                                 Expression<withIn> ")" Statement           -- forInVar

  ContinueStatement = continue #((spacesNoNL identifier)? sc)

  BreakStatement = break #((spacesNoNL identifier)? sc)

  ReturnStatement = return (#(spacesNoNL ~space) Expression<withIn>)? #sc

  WithStatement = with "(" Expression<withIn> ")" Statement

  SwitchStatement = switch "(" Expression<withIn> ")" CaseBlock

  CaseBlock = "{" CaseClause* DefaultClause CaseClause* "}"  -- withDefault
            | "{"                           CaseClause* "}"  -- withoutDefault

  CaseClause = case Expression<withIn> ":" Statement*

  DefaultClause = default ":" Statement*

  LabelledStatement = identifier ":" Statement

  ThrowStatement = throw Expression<withIn> #sc  -- throwExpr

  TryStatement = try Block Catch Finally  -- tryCatchFinally
               | try Block Finally        -- tryFinally
               | try Block Catch          -- tryCatch

  Catch = catch "(" FormalParameter ")" Block

  Finally = finally Block

  DebuggerStatement = #(debugger sc)

  // §A.5 Functions and Programs -- https://es5.github.io/#A.5

  FunctionDeclaration
    = function identifier "(" FormalParameterList ")" "{" FunctionBody "}"

  FunctionExpression
    = function identifier "(" FormalParameterList ")" "{" FunctionBody "}"  -- named
    | function "(" FormalParameterList ")" "{" FunctionBody "}"             -- anonymous

  FormalParameterList = ListOf<FormalParameter, ",">

  FormalParameter = identifier

  /*
    Note: The Directive Prologue is the longest sequence of ExpressionStatement
    productions occurring as the initial SourceElement (see https://es5.github.io/#x14.1)
  */
  FunctionBody = &(Directive*) SourceElement*

  SourceElement = Declaration | Statement

  // Broken out so es6 can override to include ConstDecl and LetDecl
  Declaration = FunctionDeclaration

  Directive = stringLiteral #sc
}

ES5Lax <: ES5 {
  futureReservedWord := futureReservedWordLax
}
