{BSJSParser=objectThatDelegatesTo(OMeta,{
"space":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return OMeta._superApplyWithArgs(this,'space');}),(function(){return this._applyWithArgs("fromTo","//","\n");}),(function(){return this._applyWithArgs("fromTo","/*","*/");}));},
"nameFirst":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return this._apply("letter");}),(function(){return (function(){switch(this._apply('anything')){case "$":return "$";case "_":return "_";default: throw fail}}).call(this);}));},
"nameRest":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return this._apply("nameFirst");}),(function(){return this._apply("digit");}));},
"iName":function(){var $elf=this,_fromIdx=this.input.idx;return this._consumedBy((function(){return (function(){this._apply("nameFirst");return this._many((function(){return this._apply("nameRest");}));}).call(this);}));},
"isKeyword":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return this._pred(BSJSParser._isKeyword(x));}).call(this);},
"name":function(){var $elf=this,_fromIdx=this.input.idx,n;return (function(){n=this._apply("iName");this._not((function(){return this._applyWithArgs("isKeyword",n);}));return ["name",((n == "self")?"$elf":n)];}).call(this);},
"keyword":function(){var $elf=this,_fromIdx=this.input.idx,k;return (function(){k=this._apply("iName");this._applyWithArgs("isKeyword",k);return [k,k];}).call(this);},
"hexDigit":function(){var $elf=this,_fromIdx=this.input.idx,x,v;return (function(){x=this._apply("char");v=this["hexDigits"].indexOf(x.toLowerCase());this._pred((v >= (0)));return v;}).call(this);},
"hexLit":function(){var $elf=this,_fromIdx=this.input.idx,n,d;return this._or((function(){return (function(){n=this._apply("hexLit");d=this._apply("hexDigit");return ((n * (16)) + d);}).call(this);}),(function(){return this._apply("hexDigit");}));},
"number":function(){var $elf=this,_fromIdx=this.input.idx,n,f;return this._or((function(){return (function(){switch(this._apply('anything')){case "0":return (function(){this._applyWithArgs("exactly","x");"0x";n=this._apply("hexLit");return ["number",n];}).call(this);default: throw fail}}).call(this);}),(function(){return (function(){f=this._consumedBy((function(){return (function(){this._many1((function(){return this._apply("digit");}));return this._opt((function(){return (function(){this._applyWithArgs("exactly",".");return this._many1((function(){return this._apply("digit");}));}).call(this);}));}).call(this);}));return ["number",parseFloat(f)];}).call(this);}));},
"escapeChar":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=this._consumedBy((function(){return (function(){this._applyWithArgs("exactly","\\");return this._or((function(){return (function(){switch(this._apply('anything')){case "u":return (function(){this._apply("hexDigit");this._apply("hexDigit");this._apply("hexDigit");return this._apply("hexDigit");}).call(this);case "x":return (function(){this._apply("hexDigit");return this._apply("hexDigit");}).call(this);default: throw fail}}).call(this);}),(function(){return this._apply("char");}));}).call(this);}));return unescape(s);}).call(this);},
"str":function(){var $elf=this,_fromIdx=this.input.idx,cs,n;return this._or((function(){return (function(){switch(this._apply('anything')){case "\"":return this._or((function(){return (function(){switch(this._apply('anything')){case "\"":return (function(){this._applyWithArgs("exactly","\"");"\"\"\"";cs=this._many((function(){return (function(){this._not((function(){return (function(){this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");return "\"\"\"";}).call(this);}));return this._apply("char");}).call(this);}));this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");"\"\"\"";return ["string",cs.join("")];}).call(this);default: throw fail}}).call(this);}),(function(){return (function(){cs=this._many((function(){return this._or((function(){return this._apply("escapeChar");}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\"");}));return this._apply("char");}).call(this);}));}));this._applyWithArgs("exactly","\"");return ["string",cs.join("")];}).call(this);}));case "\'":return (function(){cs=this._many((function(){return this._or((function(){return this._apply("escapeChar");}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\'");}));return this._apply("char");}).call(this);}));}));this._applyWithArgs("exactly","\'");return ["string",cs.join("")];}).call(this);default: throw fail}}).call(this);}),(function(){return (function(){(function(){switch(this._apply('anything')){case "#":return "#";case "`":return "`";default: throw fail}}).call(this);n=this._apply("iName");return ["string",n];}).call(this);}));},
"special":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=(function(){switch(this._apply('anything')){case "(":return "(";case ")":return ")";case "{":return "{";case "}":return "}";case "[":return "[";case "]":return "]";case ",":return ",";case ";":return ";";case "?":return "?";case ":":return ":";case "!":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "!==";default: throw fail}}).call(this);}),(function(){return "!=";}));default: throw fail}}).call(this);}),(function(){return "!";}));case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "===";default: throw fail}}).call(this);}),(function(){return "==";}));default: throw fail}}).call(this);}),(function(){return "=";}));case ">":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return ">=";default: throw fail}}).call(this);}),(function(){return ">";}));case "<":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "<=";default: throw fail}}).call(this);}),(function(){return "<";}));case "+":return this._or((function(){return (function(){switch(this._apply('anything')){case "+":return "++";case "=":return "+=";default: throw fail}}).call(this);}),(function(){return "+";}));case "-":return this._or((function(){return (function(){switch(this._apply('anything')){case "-":return "--";case "=":return "-=";default: throw fail}}).call(this);}),(function(){return "-";}));case "*":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "*=";default: throw fail}}).call(this);}),(function(){return "*";}));case "/":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "/=";default: throw fail}}).call(this);}),(function(){return "/";}));case "%":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "%=";default: throw fail}}).call(this);}),(function(){return "%";}));case "&":return (function(){switch(this._apply('anything')){case "&":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "&&=";default: throw fail}}).call(this);}),(function(){return "&&";}));default: throw fail}}).call(this);case "|":return (function(){switch(this._apply('anything')){case "|":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "||=";default: throw fail}}).call(this);}),(function(){return "||";}));default: throw fail}}).call(this);case ".":return ".";default: throw fail}}).call(this);return [s,s];}).call(this);},
"tok":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("spaces");return this._or((function(){return this._apply("name");}),(function(){return this._apply("keyword");}),(function(){return this._apply("number");}),(function(){return this._apply("str");}),(function(){return this._apply("special");}));}).call(this);},
"toks":function(){var $elf=this,_fromIdx=this.input.idx,ts;return (function(){ts=this._many((function(){return this._apply("token");}));this._apply("spaces");this._apply("end");return ts;}).call(this);},
"token":function(){var $elf=this,_fromIdx=this.input.idx,tt,t;return (function(){tt=this._apply("anything");t=this._apply("tok");this._pred((t[(0)] == tt));return t[(1)];}).call(this);},
"spacesNoNl":function(){var $elf=this,_fromIdx=this.input.idx;return this._many((function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\n");}));return this._apply("space");}).call(this);}));},
"expr":function(){var $elf=this,_fromIdx=this.input.idx,e,t,f,rhs;return (function(){e=this._apply("orExpr");return this._or((function(){return (function(){this._applyWithArgs("token","?");t=this._apply("expr");this._applyWithArgs("token",":");f=this._apply("expr");return ["condExpr",e,t,f];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","=");rhs=this._apply("expr");return ["set",e,rhs];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","+=");rhs=this._apply("expr");return ["mset",e,"+",rhs];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","-=");rhs=this._apply("expr");return ["mset",e,"-",rhs];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","*=");rhs=this._apply("expr");return ["mset",e,"*",rhs];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","/=");rhs=this._apply("expr");return ["mset",e,"/",rhs];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","%=");rhs=this._apply("expr");return ["mset",e,"%",rhs];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","&&=");rhs=this._apply("expr");return ["mset",e,"&&",rhs];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","||=");rhs=this._apply("expr");return ["mset",e,"||",rhs];}).call(this);}),(function(){return (function(){this._apply("empty");return e;}).call(this);}));}).call(this);},
"orExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("orExpr");this._applyWithArgs("token","||");y=this._apply("andExpr");return ["binop","||",x,y];}).call(this);}),(function(){return this._apply("andExpr");}));},
"andExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("andExpr");this._applyWithArgs("token","&&");y=this._apply("eqExpr");return ["binop","&&",x,y];}).call(this);}),(function(){return this._apply("eqExpr");}));},
"eqExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("eqExpr");return this._or((function(){return (function(){this._applyWithArgs("token","==");y=this._apply("relExpr");return ["binop","==",x,y];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","!=");y=this._apply("relExpr");return ["binop","!=",x,y];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","===");y=this._apply("relExpr");return ["binop","===",x,y];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","!==");y=this._apply("relExpr");return ["binop","!==",x,y];}).call(this);}));}).call(this);}),(function(){return this._apply("relExpr");}));},
"relExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("relExpr");return this._or((function(){return (function(){this._applyWithArgs("token",">");y=this._apply("addExpr");return ["binop",">",x,y];}).call(this);}),(function(){return (function(){this._applyWithArgs("token",">=");y=this._apply("addExpr");return ["binop",">=",x,y];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","<");y=this._apply("addExpr");return ["binop","<",x,y];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","<=");y=this._apply("addExpr");return ["binop","<=",x,y];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","instanceof");y=this._apply("addExpr");return ["binop","instanceof",x,y];}).call(this);}));}).call(this);}),(function(){return this._apply("addExpr");}));},
"addExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("addExpr");this._applyWithArgs("token","+");y=this._apply("mulExpr");return ["binop","+",x,y];}).call(this);}),(function(){return (function(){x=this._apply("addExpr");this._applyWithArgs("token","-");y=this._apply("mulExpr");return ["binop","-",x,y];}).call(this);}),(function(){return this._apply("mulExpr");}));},
"mulExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("mulExpr");this._applyWithArgs("token","*");y=this._apply("unary");return ["binop","*",x,y];}).call(this);}),(function(){return (function(){x=this._apply("mulExpr");this._applyWithArgs("token","/");y=this._apply("unary");return ["binop","/",x,y];}).call(this);}),(function(){return (function(){x=this._apply("mulExpr");this._applyWithArgs("token","%");y=this._apply("unary");return ["binop","%",x,y];}).call(this);}),(function(){return this._apply("unary");}));},
"unary":function(){var $elf=this,_fromIdx=this.input.idx,p;return this._or((function(){return (function(){this._applyWithArgs("token","-");p=this._apply("postfix");return ["unop","-",p];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","+");p=this._apply("postfix");return ["unop","+",p];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","++");p=this._apply("postfix");return ["preop","++",p];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","--");p=this._apply("postfix");return ["preop","--",p];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","!");p=this._apply("unary");return ["unop","!",p];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","void");p=this._apply("unary");return ["unop","void",p];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","delete");p=this._apply("unary");return ["unop","delete",p];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","typeof");p=this._apply("unary");return ["unop","typeof",p];}).call(this);}),(function(){return this._apply("postfix");}));},
"postfix":function(){var $elf=this,_fromIdx=this.input.idx,p;return (function(){p=this._apply("primExpr");return this._or((function(){return (function(){this._apply("spacesNoNl");this._applyWithArgs("token","++");return ["postop","++",p];}).call(this);}),(function(){return (function(){this._apply("spacesNoNl");this._applyWithArgs("token","--");return ["postop","--",p];}).call(this);}),(function(){return (function(){this._apply("empty");return p;}).call(this);}));}).call(this);},
"primExpr":function(){var $elf=this,_fromIdx=this.input.idx,p,i,m,as,f;return this._or((function(){return (function(){p=this._apply("primExpr");return this._or((function(){return (function(){this._applyWithArgs("token","[");i=this._apply("expr");this._applyWithArgs("token","]");return ["getp",i,p];}).call(this);}),(function(){return (function(){this._applyWithArgs("token",".");m=this._applyWithArgs("token","name");this._applyWithArgs("token","(");as=this._applyWithArgs("listOf","expr",",");this._applyWithArgs("token",")");return ["send",m,p].concat(as);}).call(this);}),(function(){return (function(){this._applyWithArgs("token",".");f=this._applyWithArgs("token","name");return ["getp",["string",f],p];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","(");as=this._applyWithArgs("listOf","expr",",");this._applyWithArgs("token",")");return ["call",p].concat(as);}).call(this);}));}).call(this);}),(function(){return this._apply("primExprHd");}));},
"primExprHd":function(){var $elf=this,_fromIdx=this.input.idx,e,n,s,as,es;return this._or((function(){return (function(){this._applyWithArgs("token","(");e=this._apply("expr");this._applyWithArgs("token",")");return e;}).call(this);}),(function(){return (function(){this._applyWithArgs("token","this");return ["this"];}).call(this);}),(function(){return (function(){n=this._applyWithArgs("token","name");return ["get",n];}).call(this);}),(function(){return (function(){n=this._applyWithArgs("token","number");return ["number",n];}).call(this);}),(function(){return (function(){s=this._applyWithArgs("token","string");return ["string",s];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","function");return this._apply("funcRest");}).call(this);}),(function(){return (function(){this._applyWithArgs("token","new");n=this._applyWithArgs("token","name");this._applyWithArgs("token","(");as=this._applyWithArgs("listOf","expr",",");this._applyWithArgs("token",")");return ["new",n].concat(as);}).call(this);}),(function(){return (function(){this._applyWithArgs("token","[");es=this._applyWithArgs("listOf","expr",",");this._applyWithArgs("token","]");return ["arr"].concat(es);}).call(this);}),(function(){return this._apply("json");}),(function(){return this._apply("re");}));},
"json":function(){var $elf=this,_fromIdx=this.input.idx,bs;return (function(){this._applyWithArgs("token","{");bs=this._applyWithArgs("listOf","jsonBinding",",");this._applyWithArgs("token","}");return ["json"].concat(bs);}).call(this);},
"jsonBinding":function(){var $elf=this,_fromIdx=this.input.idx,n,v;return (function(){n=this._apply("jsonPropName");this._applyWithArgs("token",":");v=this._apply("expr");return ["binding",n,v];}).call(this);},
"jsonPropName":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return this._applyWithArgs("token","name");}),(function(){return this._applyWithArgs("token","number");}),(function(){return this._applyWithArgs("token","string");}));},
"re":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){this._apply("spaces");x=this._consumedBy((function(){return (function(){this._applyWithArgs("exactly","/");this._apply("reBody");this._applyWithArgs("exactly","/");return this._many((function(){return this._apply("reFlag");}));}).call(this);}));return ["regExpr",x];}).call(this);},
"reBody":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("re1stChar");return this._many((function(){return this._apply("reChar");}));}).call(this);},
"re1stChar":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return (function(){this._not((function(){return (function(){switch(this._apply('anything')){case "*":return "*";case "\\":return "\\";case "/":return "/";case "[":return "[";default: throw fail}}).call(this);}));return this._apply("reNonTerm");}).call(this);}),(function(){return this._apply("escapeChar");}),(function(){return this._apply("reClass");}));},
"reChar":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return this._apply("re1stChar");}),(function(){return (function(){switch(this._apply('anything')){case "*":return "*";default: throw fail}}).call(this);}));},
"reNonTerm":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._not((function(){return (function(){switch(this._apply('anything')){case "\n":return "\n";case "\r":return "\r";default: throw fail}}).call(this);}));return this._apply("char");}).call(this);},
"reClass":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._applyWithArgs("exactly","[");this._many((function(){return this._apply("reClassChar");}));return this._applyWithArgs("exactly","]");}).call(this);},
"reClassChar":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._not((function(){return (function(){switch(this._apply('anything')){case "[":return "[";case "]":return "]";default: throw fail}}).call(this);}));return this._apply("reChar");}).call(this);},
"reFlag":function(){var $elf=this,_fromIdx=this.input.idx;return this._apply("nameFirst");},
"formal":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("spaces");return this._applyWithArgs("token","name");}).call(this);},
"funcRest":function(){var $elf=this,_fromIdx=this.input.idx,fs,body;return (function(){this._applyWithArgs("token","(");fs=this._applyWithArgs("listOf","formal",",");this._applyWithArgs("token",")");this._applyWithArgs("token","{");body=this._apply("srcElems");this._applyWithArgs("token","}");return ["func",fs,body];}).call(this);},
"sc":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return (function(){this._apply("spacesNoNl");return this._or((function(){return (function(){switch(this._apply('anything')){case "\n":return "\n";default: throw fail}}).call(this);}),(function(){return this._lookahead((function(){return this._applyWithArgs("exactly","}");}));}),(function(){return this._apply("end");}));}).call(this);}),(function(){return this._applyWithArgs("token",";");}));},
"varBinding":function(){var $elf=this,_fromIdx=this.input.idx,n,v;return (function(){n=this._applyWithArgs("token","name");v=this._or((function(){return (function(){this._applyWithArgs("token","=");return this._apply("expr");}).call(this);}),(function(){return (function(){this._apply("empty");return ["get","undefined"];}).call(this);}));return ["var",n,v];}).call(this);},
"block":function(){var $elf=this,_fromIdx=this.input.idx,ss;return (function(){this._applyWithArgs("token","{");ss=this._apply("srcElems");this._applyWithArgs("token","}");return ss;}).call(this);},
"stmt":function(){var $elf=this,_fromIdx=this.input.idx,decl,bs,c,t,f,s,i,u,n,v,e,cs,x;return this._or((function(){return this._apply("block");}),(function(){return (function(){decl=this._or((function(){return this._applyWithArgs("token","var");}),(function(){return this._applyWithArgs("token","let");}),(function(){return this._applyWithArgs("token","const");}));bs=this._applyWithArgs("listOf","varBinding",",");this._apply("sc");return ["beginVar",decl].concat(bs);}).call(this);}),(function(){return (function(){this._applyWithArgs("token","if");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");t=this._apply("stmt");f=this._or((function(){return (function(){this._applyWithArgs("token","else");return this._apply("stmt");}).call(this);}),(function(){return (function(){this._apply("empty");return ["get","undefined"];}).call(this);}));return ["if",c,t,f];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","while");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");return ["while",c,s];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","do");s=this._apply("stmt");this._applyWithArgs("token","while");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");this._apply("sc");return ["doWhile",s,c];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","for");this._applyWithArgs("token","(");i=this._or((function(){return (function(){decl=this._or((function(){return this._applyWithArgs("token","var");}),(function(){return this._applyWithArgs("token","let");}),(function(){return this._applyWithArgs("token","const");}));bs=this._applyWithArgs("listOf","varBinding",",");return ["beginVar",decl].concat(bs);}).call(this);}),(function(){return this._apply("expr");}),(function(){return (function(){this._apply("empty");return ["get","undefined"];}).call(this);}));this._applyWithArgs("token",";");c=this._or((function(){return this._apply("expr");}),(function(){return (function(){this._apply("empty");return ["get","true"];}).call(this);}));this._applyWithArgs("token",";");u=this._or((function(){return this._apply("expr");}),(function(){return (function(){this._apply("empty");return ["get","undefined"];}).call(this);}));this._applyWithArgs("token",")");s=this._apply("stmt");return ["for",i,c,u,s];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","for");this._applyWithArgs("token","(");v=this._or((function(){return (function(){this._applyWithArgs("token","var");n=this._applyWithArgs("token","name");return ["var",n,["get","undefined"]];}).call(this);}),(function(){return this._apply("expr");}));this._applyWithArgs("token","in");e=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");return ["forIn",v,e,s];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","switch");this._applyWithArgs("token","(");e=this._apply("expr");this._applyWithArgs("token",")");this._applyWithArgs("token","{");cs=this._many((function(){return this._or((function(){return (function(){this._applyWithArgs("token","case");c=this._apply("expr");this._applyWithArgs("token",":");cs=this._apply("srcElems");return ["case",c,cs];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","default");this._applyWithArgs("token",":");cs=this._apply("srcElems");return ["default",cs];}).call(this);}));}));this._applyWithArgs("token","}");return ["switch",e].concat(cs);}).call(this);}),(function(){return (function(){this._applyWithArgs("token","break");this._apply("sc");return ["break"];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","continue");this._apply("sc");return ["continue"];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","throw");this._apply("spacesNoNl");e=this._apply("expr");this._apply("sc");return ["throw",e];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","try");t=this._apply("block");this._applyWithArgs("token","catch");this._applyWithArgs("token","(");e=this._applyWithArgs("token","name");this._applyWithArgs("token",")");c=this._apply("block");f=this._or((function(){return (function(){this._applyWithArgs("token","finally");return this._apply("block");}).call(this);}),(function(){return (function(){this._apply("empty");return ["get","undefined"];}).call(this);}));return ["try",t,e,c,f];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","return");e=this._or((function(){return this._apply("expr");}),(function(){return (function(){this._apply("empty");return ["get","undefined"];}).call(this);}));this._apply("sc");return ["return",e];}).call(this);}),(function(){return (function(){this._applyWithArgs("token","with");this._applyWithArgs("token","(");x=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");return ["with",x,s];}).call(this);}),(function(){return (function(){e=this._apply("expr");this._apply("sc");return e;}).call(this);}),(function(){return (function(){this._applyWithArgs("token",";");return ["get","undefined"];}).call(this);}));},
"srcElem":function(){var $elf=this,_fromIdx=this.input.idx,n,f;return this._or((function(){return (function(){this._applyWithArgs("token","function");n=this._applyWithArgs("token","name");f=this._apply("funcRest");return ["var",n,f];}).call(this);}),(function(){return this._apply("stmt");}));},
"srcElems":function(){var $elf=this,_fromIdx=this.input.idx,ss;return (function(){ss=this._many((function(){return this._apply("srcElem");}));return ["begin"].concat(ss);}).call(this);},
"topLevel":function(){var $elf=this,_fromIdx=this.input.idx,r;return (function(){r=this._apply("srcElems");this._apply("spaces");this._apply("end");return r;}).call(this);}});(BSJSParser["hexDigits"]="0123456789abcdef");(BSJSParser["keywords"]=({}));(keywords=["break","case","catch","continue","default","delete","do","else","finally","for","function","if","in","instanceof","new","return","switch","this","throw","try","typeof","var","void","while","with","ometa","let","const"]);for(var idx=(0);(idx < keywords["length"]);idx++){(BSJSParser["keywords"][keywords[idx]]=true);}(BSJSParser["_isKeyword"]=(function (k){return this["keywords"].hasOwnProperty(k);}));BSSemActionParser=objectThatDelegatesTo(BSJSParser,{
"curlySemAction":function(){var $elf=this,_fromIdx=this.input.idx,r,s,ss;return this._or((function(){return (function(){this._applyWithArgs("token","{");r=this._apply("expr");this._apply("sc");this._applyWithArgs("token","}");this._apply("spaces");return r;}).call(this);}),(function(){return (function(){this._applyWithArgs("token","{");ss=this._many((function(){return (function(){s=this._apply("srcElem");this._lookahead((function(){return this._apply("srcElem");}));return s;}).call(this);}));s=this._or((function(){return (function(){r=this._apply("expr");this._apply("sc");return ["return",r];}).call(this);}),(function(){return this._apply("srcElem");}));ss.push(s);this._applyWithArgs("token","}");this._apply("spaces");return ["send","call",["func",[],["begin"].concat(ss)],["this"]];}).call(this);}));},
"semAction":function(){var $elf=this,_fromIdx=this.input.idx,r;return this._or((function(){return this._apply("curlySemAction");}),(function(){return (function(){r=this._apply("primExpr");this._apply("spaces");return r;}).call(this);}));}});BSJSTranslator=objectThatDelegatesTo(OMeta,{
"trans":function(){var $elf=this,_fromIdx=this.input.idx,t,ans;return (function(){this._form((function(){return (function(){t=this._apply("anything");return ans=this._applyWithArgs("apply",t);}).call(this);}));return ans;}).call(this);},
"curlyTrans":function(){var $elf=this,_fromIdx=this.input.idx,r,rs;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return r=this._apply("curlyTrans");}).call(this);}));return r;}).call(this);}),(function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return rs=this._many((function(){return this._apply("trans");}));}).call(this);}));return (("{" + rs.join(";")) + ";}");}).call(this);}),(function(){return (function(){r=this._apply("trans");return (("{" + r) + ";}");}).call(this);}));},
"this":function(){var $elf=this,_fromIdx=this.input.idx;return "this";},
"break":function(){var $elf=this,_fromIdx=this.input.idx;return "break";},
"continue":function(){var $elf=this,_fromIdx=this.input.idx;return "continue";},
"number":function(){var $elf=this,_fromIdx=this.input.idx,n;return (function(){n=this._apply("anything");return (("(" + n) + ")");}).call(this);},
"string":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=this._apply("anything");return s.toProgramString();}).call(this);},
"regExpr":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return x;}).call(this);},
"arr":function(){var $elf=this,_fromIdx=this.input.idx,xs;return (function(){xs=this._many((function(){return this._apply("trans");}));return (("[" + xs.join(",")) + "]");}).call(this);},
"unop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return (((("(" + op) + " ") + x) + ")");}).call(this);},
"getp":function(){var $elf=this,_fromIdx=this.input.idx,fd,x;return (function(){fd=this._apply("trans");x=this._apply("trans");return (((x + "[") + fd) + "]");}).call(this);},
"get":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return x;}).call(this);},
"set":function(){var $elf=this,_fromIdx=this.input.idx,lhs,rhs;return (function(){lhs=this._apply("trans");rhs=this._apply("trans");return (((("(" + lhs) + "=") + rhs) + ")");}).call(this);},
"mset":function(){var $elf=this,_fromIdx=this.input.idx,lhs,op,rhs;return (function(){lhs=this._apply("trans");op=this._apply("anything");rhs=this._apply("trans");return ((((("(" + lhs) + op) + "=") + rhs) + ")");}).call(this);},
"binop":function(){var $elf=this,_fromIdx=this.input.idx,op,x,y;return (function(){op=this._apply("anything");x=this._apply("trans");y=this._apply("trans");return (((((("(" + x) + " ") + op) + " ") + y) + ")");}).call(this);},
"preop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return (op + x);}).call(this);},
"postop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return (x + op);}).call(this);},
"return":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("trans");return ("return " + x);}).call(this);},
"with":function(){var $elf=this,_fromIdx=this.input.idx,x,s;return (function(){x=this._apply("trans");s=this._apply("curlyTrans");return ((("with(" + x) + ")") + s);}).call(this);},
"if":function(){var $elf=this,_fromIdx=this.input.idx,cond,t,e;return (function(){cond=this._apply("trans");t=this._apply("curlyTrans");e=this._apply("curlyTrans");return ((((("if(" + cond) + ")") + t) + "else") + e);}).call(this);},
"condExpr":function(){var $elf=this,_fromIdx=this.input.idx,cond,t,e;return (function(){cond=this._apply("trans");t=this._apply("trans");e=this._apply("trans");return (((((("(" + cond) + "?") + t) + ":") + e) + ")");}).call(this);},
"while":function(){var $elf=this,_fromIdx=this.input.idx,cond,body;return (function(){cond=this._apply("trans");body=this._apply("curlyTrans");return ((("while(" + cond) + ")") + body);}).call(this);},
"doWhile":function(){var $elf=this,_fromIdx=this.input.idx,body,cond;return (function(){body=this._apply("curlyTrans");cond=this._apply("trans");return (((("do" + body) + "while(") + cond) + ")");}).call(this);},
"for":function(){var $elf=this,_fromIdx=this.input.idx,init,cond,upd,body;return (function(){init=this._apply("trans");cond=this._apply("trans");upd=this._apply("trans");body=this._apply("curlyTrans");return ((((((("for(" + init) + ";") + cond) + ";") + upd) + ")") + body);}).call(this);},
"forIn":function(){var $elf=this,_fromIdx=this.input.idx,x,arr,body;return (function(){x=this._apply("trans");arr=this._apply("trans");body=this._apply("curlyTrans");return ((((("for(" + x) + " in ") + arr) + ")") + body);}).call(this);},
"begin":function(){var $elf=this,_fromIdx=this.input.idx,x,xs;return this._or((function(){return (function(){x=this._apply("trans");this._apply("end");return x;}).call(this);}),(function(){return (function(){xs=this._many((function(){return (function(){x=this._apply("trans");return this._or((function(){return (function(){this._or((function(){return this._pred((x[(x["length"] - (1))] == "}"));}),(function(){return this._apply("end");}));return x;}).call(this);}),(function(){return (function(){this._apply("empty");return (x + ";");}).call(this);}));}).call(this);}));return (("{" + xs.join("")) + "}");}).call(this);}));},
"beginVar":function(){var $elf=this,_fromIdx=this.input.idx,decl,x,xs;return this._or((function(){return (function(){decl=this._apply("anything");x=this._apply("trans");this._apply("end");return ((decl + " ") + x);}).call(this);}),(function(){return (function(){decl=this._apply("anything");xs=this._many((function(){return (function(){x=this._apply("trans");return this._or((function(){return (function(){this._or((function(){return this._pred((x[(x["length"] - (1))] == "}"));}),(function(){return this._apply("end");}));return ((decl + " ") + x);}).call(this);}),(function(){return (function(){this._apply("empty");return (((decl + " ") + x) + ";");}).call(this);}));}).call(this);}));return (("{" + xs.join("")) + "}");}).call(this);}));},
"func":function(){var $elf=this,_fromIdx=this.input.idx,args,body;return (function(){args=this._apply("anything");body=this._apply("curlyTrans");return (((("(function (" + args.join(",")) + ")") + body) + ")");}).call(this);},
"call":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");args=this._many((function(){return this._apply("trans");}));return (((fn + "(") + args.join(",")) + ")");}).call(this);},
"send":function(){var $elf=this,_fromIdx=this.input.idx,msg,recv,args;return (function(){msg=this._apply("anything");recv=this._apply("trans");args=this._many((function(){return this._apply("trans");}));return (((((recv + ".") + msg) + "(") + args.join(",")) + ")");}).call(this);},
"new":function(){var $elf=this,_fromIdx=this.input.idx,cls,args;return (function(){cls=this._apply("anything");args=this._many((function(){return this._apply("trans");}));return (((("new " + cls) + "(") + args.join(",")) + ")");}).call(this);},
"var":function(){var $elf=this,_fromIdx=this.input.idx,name,val;return (function(){name=this._apply("anything");val=this._apply("trans");return ((name + "=") + val);}).call(this);},
"throw":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("trans");return ("throw " + x);}).call(this);},
"try":function(){var $elf=this,_fromIdx=this.input.idx,x,name,c,f;return (function(){x=this._apply("curlyTrans");name=this._apply("anything");c=this._apply("curlyTrans");f=this._apply("curlyTrans");return ((((((("try " + x) + "catch(") + name) + ")") + c) + "finally") + f);}).call(this);},
"json":function(){var $elf=this,_fromIdx=this.input.idx,props;return (function(){props=this._many((function(){return this._apply("trans");}));return (("({" + props.join(",")) + "})");}).call(this);},
"binding":function(){var $elf=this,_fromIdx=this.input.idx,name,val;return (function(){name=this._apply("anything");val=this._apply("trans");return ((name.toProgramString() + ": ") + val);}).call(this);},
"switch":function(){var $elf=this,_fromIdx=this.input.idx,x,cases;return (function(){x=this._apply("trans");cases=this._many((function(){return this._apply("trans");}));return (((("switch(" + x) + "){") + cases.join(";")) + "}");}).call(this);},
"case":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return (function(){x=this._apply("trans");y=this._apply("trans");return ((("case " + x) + ": ") + y);}).call(this);},
"default":function(){var $elf=this,_fromIdx=this.input.idx,y;return (function(){y=this._apply("trans");return ("default: " + y);}).call(this);}})}
