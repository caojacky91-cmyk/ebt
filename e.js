/*e.js v.1.1(!) - ELIZA JS library(N.Landsteiner 2005)
  Eliza is a mock Rogerian psychotherapist.
  Original program by Joseph Weizenbaum in MAD-SLIP for "Project MAC" at MIT.
  cf: Weizenbaum, Joseph "ELIZA - A Computer Program For the Study of Natural Language
      Communication Between Man and Machine"
      in: Communications of the ACM; Volume 9, Issue 1 (January 1966): p 36-45.
  JavaScript implementation by Norbert Landsteiner 2005; <https://www.masswerk.at>

  synopsis:

         new E( <random-choice-disable-flag> )
         E.prototype.t( <inputstr )
         E.prototype.I()
         E.prototype.F()
         E.prototype.x()

  usage: var eliza = new E();
         var initial = eliza.I();
         var reply = eliza.t(<inputstr>);
         if (eliza.q) {
             // last user input was a quit phrase
         }

         // method `t()' returns a final phrase in case of a quit phrase
         // but you can also get a final phrase with:
         var final = eliza.F();

         // other methods: reset memory & internal state
         eliza.x();

         // to set the internal memory size override property `ms':
         eliza.ms = 100; // (default: 20))

         // to reproduce the example conversation given by J. Weizenbaum
         // initialize with the optional random-choice-disable flag
         var originalEliza = new E(true);

  `E' is also a general chatbot engine that can be supplied with any rule set.
  (for required data structures cf. "d.js" and/or see the documentation.)
  data is parsed & transformed for internal use at the creation time of the first instance of the `E' constructor.

  vers 1.1: lambda functions in RegExps are currently a problem with too many browsers.
     changed code to work around.
install ref to global object&parse data&convert it from canonical form to internal use prodoce synonym list,check for ks or install empty structure to prevent any errors,convert rules to regexps,expand synonyms(work around lambda function),insert asterisk expressions for backtracking,check for eQ&install default if missing,unify text str,split text in part sentences&loop through them,check for quit exprs,preprocess(v.1.1: work around lambda function),loop through ks,if nothing in mem,so try X if nothing in M,return L or a default str,fix array.prototype methods(push,shift) if not implemented(MSIE fix),save captures for _X&check D&store it as decomp's element 2,save original index for sorting&expand asterisk expressions(v.1.1: work around lambda function),expand white space&sort ks by rank(highest first),compose regexps,rf for pr&pst*/
function E(f=false){this.f=!!f;this.c=true;this.d=false;this.ms=20;this.v='1.1(!)';if(!this._d)this._i();this.x();};E.prototype.x=function(){this.q=false;this.M=[];this.z=[];for(var k=0;k<eK.length;k++){this.z[k]=[];var r=eK[k][2];for(var i=0;i<r.length;i++)this.z[k][i]=-1;};};E.prototype._d=false;E.prototype._i=function(){var g=E.prototype.global=self;var sP={};if((g.eS)&&(typeof eS=='object'))for(var i=0;i<eS.length;i++)sP[i]='('+i+'|'+eS[i].join('|')+')';if((!g.eK)||(typeof eK.length=='undefined'))eK=[['###',0,[['###',[]]]]];var V=/@(\S+)/;var ar=/(\S)\s*\*\s*(\S)/;var a1=/^\s*\*\s*(\S)/;var a2=/(\S)\s*\*\s*$/;var a3=/^\s*\*\s*$/;var ws=/\s+/g;for(var k=0;k<eK.length;k++){eK[k][3]=k;var R=eK[k][2];for(var i=0;i<R.length;i++){var r=R[i];if(r[0].charAt(0)=='$'){var f=1;while(r[0].charAt(f)==' ')f++;r[0]=r[0].substring(f);r[2]=true;}else r[2]=false;};var m=V.exec(r[0]);while(m){var sp=(sP[m[1]])?sP[m[1]]:m[1];r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);m=V.exec(r[0]);};if(a3.test(r[0]))r[0]='\\s*(.*)\\s*';else{m=ar.exec(r[0]);if(m){var lp='';var rp=r[0];while(m){lp+=rp.substring(0,m.index+1);if(m[1]!=')')lp+='\\b';lp+='\\s*(.*)\\s*';if((m[2]!='(')&&(m[2]!='\\'))lp+='\\b';lp+=m[2];rp=rp.substring(m.index+m[0].length);m=ar.exec(rp);};r[0]=lp+rp;};m=a1.exec(r[0]);if(m){var lp='\\s*(.*)\\s*';if((m[1]!=')')&&(m[1]!='\\'))lp+='\\b';r[0]=lp+r[0].substring(m.index-1+m[0].length);};m=a2.exec(r[0]);if(m){var lp=r[0].substring(0,m.index+1);if(m[1]!='(')lp+='\\b';r[0]=lp+'\\s*(.*)\\s*';};};r[0]=r[0].replace(ws,'\\s+');ws.lastIndex=0;};eK.sort(this._s);E.prototype.pp={};E.prototype.ps={};E.prototype.px=(g.ePp&&ePp.length)?this._ge(ePp,'pp'):/####/;E.prototype.tx=(g.eP&&eP.length)?this._ge(eP,'ps'):/####/;if((!g.eQ)||(typeof eQ.length=='undefined'))eQ=[];E.prototype._d=true;};E.prototype._ge=function(a,n){var b=[];for(var i=0;i<a.length;i+=2){var k=a[i];if(Array.isArray(k))b.push('('+k.map(function(k){return'\\b'+k+'\\b';}).join('|')+')');else b.push('\\b'+k+'\\b');this[n][a[i]]=a[i+1];};return new RegExp('('+b.join('|')+')');};E.prototype._s=function(a,b){if(a[1]>b[1])return-1;else if(a[1]<b[1])return 1;else if(a[3]>b[3])return 1;else if(a[3]<b[3])return-1;else return 0;};E.prototype.t=function(e){var L='';this.q=false;e=e.toLowerCase().replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g,' ').replace(/\s+-+\s+/g,'.').replace(/\s*[,\.\?!;]+\s*/g,'.').replace(/\s*\bbut\b\s*/g,'.').replace(/\s{2,}/g,' ');var P=e.split('.');for(var i=0;i<P.length;i++){var p=P[i];if(p!=''){for(var q=0;q<eQ.length;q++)if(eQ[q]==p){this.q=true;return this.F();};var m=this.px.exec(p);if(m){var lp='';var rp=p;while(m){lp+=rp.substring(0,m.index)+this.pp[m[1]];rp=rp.substring(m.index+m[0].length);m=this.px.exec(rp);};p=lp+rp;};this.sc=p;for(var k=0;k<eK.length;k++){var K=eK[k][0];var kr;if(Array.isArray(K))kr=new RegExp('\\b('+K.join('|')+')\\b','i');else if(K.indexOf('%:')==0)kr=new RegExp(K.slice(2).trim(),'i');else kr=new RegExp('\\b'+K+'\\b','i');var km=p.match(kr);if(km)L=this._X(k);};};};if(!L)L=this._G();if(L==''){this.sc=' ';var k=this._gri('X');if(k>=0)L=this._X(k,true);};return(L!='')?L:'I am at a loss for words.';};E.prototype._X=function(k,b=false){var r=eK[k];if(r[1]<0&&!b){if(this.d)console.log('keyword '+r[0]+' blocked');return'';};var dc=r[2];var pr=/\(([0-9]+)\)/;for(var i=0;i<dc.length;i++){var m=this.sc.match(dc[i][0]);if(m!=null){var rm=dc[i][1];var D=dc[i][2];var ri=(this.f)?0:Math.floor(Math.random()*rm.length);if(((this.f)&&(this.z[k][i]>ri))||(this.z[k][i]==ri)){ri=++this.z[k][i];if(ri>=rm.length)ri=0;this.z[k][i]=-1;}else this.z[k][i]=ri;};var L=rm[ri];if(this.d)alert('match:\nkey:'+eK[k][0]+'\nrank:'+eK[k][1]+'\ndc:'+dc[i][0]+'\nrm:'+L+'\nD:'+D);if(L.charAt(0)=='~'){var k=this._gri(L.substring(2).trim());if(k>=0)L=this._X(k,true);}var m1=pr.exec(L);if(m1){var lp='';var rp=L;while(m1){var pm=m[parseInt(m1[1])];var m2=this.tx.exec(pm);if(m2){var lp2='';var rp2=pm;while(m2){lp2+=rp2.substring(0,m2.index)+this.ps[m2[1]];rp2=rp2.substring(m2.index+m2[0].length);m2=this.tx.exec(rp2);};pm=lp2+rp2;};lp+=rp.substring(0,m1.index)+pm;rp=rp.substring(m1.index+m1[0].length);m1=pr.exec(rp);};L=lp+rp;};L=this._pF(L);if(D)this._S(L);else return L;};return'';};E.prototype._pF=function(s){s=s.replace(/\s{2,}/g,' ').replace(/\s+\./g,'.');if((this.global.ePf)&&(ePf.length))for(var i=0;i<ePf.length;i+=2){s=s.replace(ePf[i],ePf[i+1]);ePf[i].lastIndex=0;};if(this.c){var m=/^([a-z])/.exec(s);if(m)s=m[0].toUpperCase()+s.substring(1);};return s;};E.prototype._gri=function(k){for(var i=0;i<eK.length;i++)if(eK[i][0]==k)return i;return-1;};E.prototype._S=function(t){this.M.push(t);if(this.M.length>this.ms)this.M.shift();};E.prototype._G=function(){if(this.M.length){if(this.f)return this.M.shift();else{var n=Math.floor(Math.random()*this.M.length);var L=this.M[n];for(var i=n+1;i<this.M.length;i++)this.M[i-1]=this.M[i];this.M.length--;return L;};}else return'';};E.prototype.F=function(){if(!E.prototype.global.eF)return'';return eF[Math.floor(Math.random()*eF.length)];};E.prototype.I=function(){if(!E.prototype.global.eI)return'';return eI[Math.floor(Math.random()*eI.length)];};if(typeof Array.prototype.push=='undefined')Array.prototype.push=function(v){return this[this.length]=v;};if(typeof Array.prototype.shift=='undefined')Array.prototype.shift=function(){if(this.length==0)return null;for(var i=0;i<this.length;i++){this[i+1]=this[i];this.length--;};return this[0];};//eof