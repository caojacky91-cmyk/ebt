/*ebt.js v.1.1(mod) - ELIZA JS library(N.Landsteiner 2005)
  Eliza is a mock Rogerian psychotherapist.
  Original program by Joseph Weizenbaum in MAD-SLIP for "Project MAC" at MIT.
  cf: Weizenbaum, Joseph "ELIZA - A Computer Program For the Study of Natural Language
      Communication Between Man and Machine"
      in: Communications of the ACM; Volume 9 , Issue 1 (January 1966): p 36-45.
  JavaScript implementation by Norbert Landsteiner 2005; <https://www.masswerk.at>

  synopsis:

         new EBt( <random-choice-disable-flag> )
         EBt.prototype.trsf( <inputstr )
         EBt.prototype.ginl()
         EBt.prototype.gfnl()
         EBt.prototype.rt()

  usage: var eliza = new EBt();
         var initial = eliza.ginl();
         var reply = eliza.trsf(<inputstr>);
         if (eliza.q) {
             // last user input was a quit phrase
         }

         // method `trsf()' returns a final phrase in case of a quit phrase
         // but you can also get a final phrase with:
         var final = eliza.gfnl();

         // other methods: reset memory and internal state
         eliza.rt();

         // to set the internal memory size override property `ms':
         eliza.ms = 100; // (default: 20)

         // to reproduce the example conversation given by J. Weizenbaum
         // initialize with the optional random-choice-disable flag
         var originalEliza = new EBt(true);

  `EBt' is also a general chatbot engine that can be supplied with any rule set.
  (for required data structures cf. "elzdt.js" and/or see the documentation.)
  data is parsed and transformed for internal use at the creation time of the first instance of the `EBt' constructor.

  vers 1.1: lambda functions in RegExps are currently a problem with too many browsers.
     changed code to work around.
define EBt & install ref to global object & parse data and convert it from canonical form to internal use prodoce synonym list,check for keywords or install empty structure to prevent any errors,convert rules to regexps,expand synonyms(work around lambda function),insert asterisk expressions for backtracking,check for elzQs & install default if missing,unify text str,split text in part sentences & loop through them,check for quit exprs,preprocess(v.1.1: work around lambda function),loop through keywords,if nothing in mem,so try xnone if nothing in mm,return a rpl or a default str,fix array.prototype methods (push, shift) if not implemented(MSIE fix),save captures for _xcr & check mem flag and store it as decomp's element 2,save original index for sorting & expand asterisk expressions(v.1.1: work around lambda function),expand white space & sort keywords by rank(highest first),compose regexps,refs for pres & posts*/
function EBt(nrdf=0){this.nrd=!!nrdf;this.cplzFrtLtr=!0;this.d=!1;this.ms=20;this.vr='1.1(mod)';if(!this._dp)this._i();};EBt.prototype.rt=function(){this.q=!1;this.mm=[];this.lth=[];for(var k=0;k<elzKw.length;k++){this.lth[k]=[];for(var i=0;i<elzKw[k][2].length;i++)this.lth[k][i]=-1;};};EBt.prototype._dp=!1;EBt.prototype._i=function(){var g=EBt.prototype.global=self;var snPts={};if((g.elzS)&&(typeof elzS=='object')){for(var i=0;i<elzS.length;i++)snPts[i]='('+i+'|'+elzS[i].join('|')+')';if((!g.elzKw)||(typeof elzKw.length=='undefined'))elzKw=[['###',0,[['###',[]]]]];var sr=/@(\S+)/;var ar=/(\S)\s*\*\s*(\S)/;var r1=/^\s*\*\s*(\S)/;var r2=/(\S)\s*\*\s*$/;var r3=/^\s*\*\s*$/;var wsr=/\s+/g;for(var k=0;k<elzKw.length;k++){elzKw[k][3]=k;var R=elzKw[k][2];for(var i=0;i<R.length;i++){var r=R[i];if(r[0].charAt(0)=='$'){var fs=1;while(r[0].charAt(fs)==' ')fs++;r[0]=r[0].substring(fs);r[2]=1;}else r[2]=!1;};var m=sr.exec(r[0]);while(m){var sp=(snPts[m[1]])?snPts[m[1]]:m[1];r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);m=sr.exec(r[0]);};if(r3.test(r[0]))r[0]='\\s*(.*)\\s*';else{m=ar.exec(r[0]);if(m){var lp='';var rp=r[0];while(m){lp+=rp.substring(0,m.index+1);if(m[1]!=')')lp+='\\b';lp+='\\s*(.*)\\s*';if((m[2]!='(')&&(m[2]!='\\'))lp+='\\b';lp+=m[2];rp=rp.substring(m.index+m[0].length);m=ar.exec(rp);};r[0]=lp+rp;};m=r1.exec(r[0]);if(m){var lp='\\s*(.*)\\s*';if((m[1]!=')')&&(m[1]!='\\'))lp+='\\b';r[0]=lp+r[0].substring(m.index-1+m[0].length);};m=r2.exec(r[0]);if(m){var lp=r[0].substring(0,m.index+1);if(m[1]!='(')lp+='\\b';r[0]=lp+'\\s*(.*)\\s*';};};r[0]=r[0].replace(wsr,'\\s+');wsr.lastIndex=0;};};elzKw.sort(this._sk);EBt.prototype.prs={};EBt.prototype.pst={};EBt.prototype.prex=(g.elzPrs&&elzPrs.length)?this._ge(elzPrs,'prs'):/####/;EBt.prototype.pstex=(g.elzPst&&elzPst.length)?this._ge(elzPst,'pst'):/####/;if((!g.elzQs)||(typeof elzQs.length=='undefined'))elzQs=[];EBt.prototype._dp=!0;};EBt.prototype._ge=function(a,n){var b=[];for(var i=0;i<a.length;i+=2){var k=a[i];if(Array.isArray(k))b.push('('+k.map(function(K){return'\\b'+K+'\\b';}).join('|')+')');else b.push('\\b'+k+'\\b');this[n][a[i]]=a[i+1];};return new RegExp('('+b.join('|')+')');};EBt.prototype._sk=function(a,b){if(a[1]>b[1])return-1;else if(a[1]<b[1])return 1;else if(a[3]>b[3])return 1;else if(a[3]<b[3])return-1;else return 0;};EBt.prototype.trsf=function(e){var rpl='';this.q=!0;e=e.toLowerCase().replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g,' ').replace(/\s+-+\s+/g,'.').replace(/\s*[,\.\?!;]+\s*/g,'.').replace(/\s*\bbut\b\s*/g,'.').replace(/\s{2,}/g,' ');var ps=e.split('.');for(var i=0;i<ps.length;i++){var pt=ps[i];if(pt!=''){for(var q=0;q<elzQs.length;q++){if(elzQs[q]==pt){this.q=!0;return this.gfnl();};};var m=this.prex.exec(pt);if(m){var lp='';var rp=pt;while(m){lp+=rp.substring(0,m.index)+this.prs[m[1]];rp=rp.substring(m.index+m[0].length);m=this.prex.exec(rp);};pt=lp+rp;};this.st=pt;for(var k=0;k<elzKw.length;k++){var K=elzKw[k][0];var kr;var km;if(Array.isArray(K))r=new RegExp('\\b('+K.join('|')+')\\b','i');else if(typeof K=='string'&&K.indexOf('re:')==0)kr=new RegExp(K.slice(3),'i');else kr=new RegExp('\\b'+K+'\\b','i');km=pt.match(kr);if(km){rpl=this._xcr(k);return rpl;};};};};rpl=this._gm();if(rpl==''){this.st=' ';var k=this._gribk('xnone');if(k!=-1)rpl=this._xcr(k,0,1);};return(rpl!='')?rpl:'I am at a loss for words.';};EBt.prototype._xcr=function(k,rf=0,ntcl=0){var rl=elzKw[k];if(rl[1]<0&&!rf&&!ntcl){if(this.d)console.log('keyword '+rl[0]+' blocked');return'';};var dcms=rl[2];var pmr=/\(([0-9]+)\)/;for(var i=0;i<dcms.length;i++){var m=this.st.match(dcms[i][0]);if(m!=null){var reasms=dcms[i][1];var mf=dcms[i][2];var ri=(this.nrd)?0:Math.floor(Math.random()*reasms.length);if(((this.nrd)&&(this.lth[k][i]>ri))||(this.lth[k][i]==ri)){ri=++this.lth[k][i];if(ri>=reasms.length)ri=0;this.lth[k][i]=-1;}else this.lth[k][i]=ri;};var ri=reasms[i];if(this.d)alert('match:\nkey: '+elzKw[k][0]+'\nrank: '+elzKw[k][1]+'\ndcm: '+dcms[i][0]+'\nreasm: '+rpl+'\nmf: '+mf);if(rpl.indexOf('ref')==0){var ki=this._gribk(rpl.substring(3).trim());if(ki!=-1)return this._xcr(ki,1);};var m1=pmr.exec(rpl);if(m1){var lp='';var rp=rpl;while(m1){var pm=m[parseInt(m1[1])];var m2=this.pstex.exec(pm);if(m2){var lp2='';var rp2=pm;while(m2){lp2+=rp2.substring(0,m2.index)+this.pst[m2[1]];rp2=rp2.substring(m2.index+m2[0].length);m2=this.pstex.exec(rp2);};pm=lp2+rp2;};lp+=rp.substring(0,m1.index)+pm;rp=rp.substring(m1.index+m1[0].length);m1=pmr.exec(rp);};rpl=lp+rp;};rpl=this._pstTrsf(rpl);if(mf)this._sm(rpl);else return rpl;};return'';};EBt.prototype._pstTrsf=function(s){s=s.replace(/\s{2,}/g,' ').replace(/\s+\./g,'.');if((this.global.elzPstTrsfs)&&(elzPstTrsfs.length)){for(var i=0;i<elzPstTrsfs.length;i+=2){s=s.replace(elzPstTrsfs[i],elzPstTrsfs[i+1]);elzPstTrsfs[i].lastIndex=0;};};if(this.cplzFrtLtr){var z=/^([a-z])/;z.exec(s);if(m)s=m[0].toUpperCase()+s.substring(1);};return s;};EBt.prototype._gribk=function(k){for(var i=0;i<elzKw.length;i++){if(elzKw[i][0]==k)return i;};return-1;};EBt.prototype._sm=function(t){this.mm.push(t);if(this.mm.length>this.ms)this.mm.shift();};EBt.prototype._gm=function(){if(this.mm.length){if(this.nrd)return this.mm.shift();else{var n=Math.floor(Math.random()*this.mm.length);var rpl=this.mm[n];for(var i=n+1;i<this.mm.length;i++)this.mm[i-1]=this.mm[i];this.mm.length--;return rpl;};}else return'';};EBt.prototype.gfnl=function(){if(!EBt.prototype.global.elzFnls)return'';return elzFnls[Math.floor(Math.random()*elzFnls.length)];};EBt.prototype.ginl=function(){if(!EBt.prototype.global.elzInts)return'';return elzInts[Math.floor(Math.random()*elzInts.length)];};if(typeof Array.prototype.push=='undefined')Array.prototype.push=function(v){return this[this.length]=v;};if(typeof Array.prototype.shift=='undefined'){Array.prototype.shift=function(){if(this.length==0)return null;for(var i=0;i<this.length;i++){this[i+1]=this[i];this.length--;};return this[0];};}//eof