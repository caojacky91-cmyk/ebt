/*eb.js v.1.1(mod) - ELIZA JS library(N.Landsteiner 2005)
  Eliza is a mock Rogerian psychotherapist.
  Original program by Joseph Weizenbaum in MAD-SLIP for "Project MAC" at MIT.
  cf: Weizenbaum, Joseph "ELIZA - A Computer Program For the Study of Natural Language
      Communication Between Man and Machine"
      in: Communications of the ACM; Volume 9 , Issue 1 (January 1966): p 36-45.
  JavaScript implementation by Norbert Landsteiner 2005; <https://www.masswerk.at>

  synopsis:

         new EB( <random-choice-disable-flag> )
         EB.prototype.trf( <inputstr )
         EB.prototype.ginl()
         EB.prototype.gfnl()
         EB.prototype.rt()

  usage: var eliza = new EB();
         var initial = eliza.ginl();
         var reply = eliza.trf(<inputstr>);
         if (eliza.q) {
             // last user input was a quit phrase
         }

         // method `trf()' returns a final phrase in case of a quit phrase
         // but you can also get a final phrase with:
         var final = eliza.gfnl();

         // other methods: reset memory and internal state
         eliza.rt();

         // to set the internal memory size override property `ms':
         eliza.ms = 100; // (default: 20)

         // to reproduce the example conversation given by J. Weizenbaum
         // initialize with the optional random-choice-disable flag
         var originalEliza = new EB(true);

  `EB' is also a general chatbot engine that can be supplied with any rule set.
  (for required data structures cf. "edt.js" and/or see the documentation.)
  data is parsed and transformed for internal use at the creation time of the first instance of the `EB' constructor.

  vers 1.1: lambda functions in RegExps are currently a problem with too many browsers.
     changed code to work around.
define EB & install ref to global object & parse data and convert it from canonical form to internal use prodoce synonym list,check for keywords or install empty structure to prevent any errors,convert rules to regexps,expand synonyms(work around lambda function),insert asterisk expressions for backtracking,check for lzQ & install default if missing,unify text str,split text in part sentences & loop through them,check for quit exprs,preprocess(v.1.1: work around lambda function),loop through keywords,if nothing in mem,so try xnone if nothing in mm,return a rpl or a default str,fix array.prototype methods(push, shift) if not implemented(MSIE fix),save captures for _xcr & check mem flag and store it as decomp's element 2,save original index for sorting & expand asterisk expressions(v.1.1: work around lambda function),expand white space & sort keywords by rank(highest first),compose regexps,refs for pres & posts*/
function EB(nrf=0){this.nr=!!nrf;this.cplzFrtLtr=true;this.d=false;this.ms=20;this.v='1.1(mod)';if(!this._dp)this._i();};EB.prototype.rt=function(){this.q=false;this.mm=[];this.lh=[];for(var k=0;k<lzK.length;k++){this.lh[k]=[];for(var i=0;i<lzK[k][2].length;i++)this.lh[k][i]=-1;};};EB.prototype._dp=false;EB.prototype._i=function(){var g=EB.prototype.global=self;var sPts={};if((g.lzS)&&(typeof lzS=='object')){for(var i=0;i<lzS.length;i++)sPts[i]='('+i+'|'+lzS[i].join('|')+')';if((!g.lzK)||(typeof lzK.length=='undefined'))lzK=[['###',0,[['###',[]]]]];var sr=/@(\S+)/;var ar=/(\S)\s*\*\s*(\S)/;var r1=/^\s*\*\s*(\S)/;var r2=/(\S)\s*\*\s*$/;var r3=/^\s*\*\s*$/;var ws=/\s+/g;for(var k=0;k<lzK.length;k++){lzK[k][3]=k;var R=lzK[k][2];for(var i=0;i<R.length;i++){var r=R[i];if(r[0].charAt(0)=='$'){var f=1;while(r[0].charAt(f)==' ')f++;r[0]=r[0].substring(f);r[2]=true;}else r[2]=false;};var m=sr.exec(r[0]);while(m){var sp=(sPts[m[1]])?sPts[m[1]]:m[1];r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);m=sr.exec(r[0]);};if(r3.test(r[0]))r[0]='\\s*(.*)\\s*';else{m=ar.exec(r[0]);if(m){var lp='';var rp=r[0];while(m){lp+=rp.substring(0,m.index+1);if(m[1]!=')')lp+='\\b';lp+='\\s*(.*)\\s*';if((m[2]!='(')&&(m[2]!='\\'))lp+='\\b';lp+=m[2];rp=rp.substring(m.index+m[0].length);m=ar.exec(rp);};r[0]=lp+rp;};m=r1.exec(r[0]);if(m){var lp='\\s*(.*)\\s*';if((m[1]!=')')&&(m[1]!='\\'))lp+='\\b';r[0]=lp+r[0].substring(m.index-1+m[0].length);};m=r2.exec(r[0]);if(m){var lp=r[0].substring(0,m.index+1);if(m[1]!='(')lp+='\\b';r[0]=lp+'\\s*(.*)\\s*';};};r[0]=r[0].replace(ws,'\\s+');ws.lastIndex=0;};};lzK.sort(this._s);EB.prototype.prs={};EB.prototype.pst={};EB.prototype.prex=(g.lzPrs&&lzPrs.length)?this._ge(lzPrs,'prs'):/####/;EB.prototype.pstex=(g.lzPst&&lzPst.length)?this._ge(lzPst,'pst'):/####/;if((!g.lzQ)||(typeof lzQ.length=='undefined'))lzQ=[];EB.prototype._dp=true;};EB.prototype._ge=function(a,n){var b=[];for(var i=0;i<a.length;i+=2){var k=a[i];if(Array.isArray(k))b.push('('+k.map(function(K){return'\\b'+K+'\\b';}).join('|')+')');else b.push('\\b'+k+'\\b');this[n][a[i]]=a[i+1];};return new RegExp('('+b.join('|')+')');};EB.prototype._s=function(a,b){if(a[1]>b[1])return-1;else if(a[1]<b[1])return 1;else if(a[3]>b[3])return 1;else if(a[3]<b[3])return-1;else return 0;};EB.prototype.trf=function(e){var rpl='';this.q=true;e=e.toLowerCase().replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g,' ').replace(/\s+-+\s+/g,'.').replace(/\s*[,\.\?!;]+\s*/g,'.').replace(/\s*\bbut\b\s*/g,'.').replace(/\s{2,}/g,' ');var ps=e.split('.');for(var i=0;i<ps.length;i++){var pt=ps[i];if(pt!=''){for(var q=0;q<lzQ.length;q++){if(lzQ[q]==pt){this.q=true;return this.gfnl();};};var m=this.prex.exec(pt);if(m){var lp='';var rp=pt;while(m){lp+=rp.substring(0,m.index)+this.prs[m[1]];rp=rp.substring(m.index+m[0].length);m=this.prex.exec(rp);};pt=lp+rp;};this.st=pt;for(var k=0;k<lzK.length;k++){var K=lzK[k][0];var kr;var km;if(Array.isArray(K))r=new RegExp('\\b('+K.join('|')+')\\b','i');else if(typeof K=='string'&&K.indexOf('re:')==0)kr=new RegExp(K.slice(3),'i');else kr=new RegExp('\\b'+K+'\\b','i');km=pt.match(kr);if(km){rpl=this._xcr(k);return rpl;};};};};rpl=this._gm();if(rpl==''){this.st=' ';var k=this._grik('xnone');if(k>=0)rpl=this._xcr(k,0,1);};return(rpl!='')?rpl:'I am at a loss for words.';};EB.prototype._xcr=function(k,rf=0,itc=0){var rl=lzK[k];if(rl[1]<0&&!rf&&!itc){if(this.d)console.log('keyword '+rl[0]+' blocked');return'';};var dcs=rl[2];var pmr=/\(([0-9]+)\)/;for(var i=0;i<dcs.length;i++){var m=this.st.match(dcs[i][0]);if(m!=null){var rms=dcs[i][1];var mf=dcs[i][2];var ri=(this.nr)?0:Math.floor(Math.random()*rms.length);if(((this.nr)&&(this.lh[k][i]>ri))||(this.lh[k][i]==ri)){ri=++this.lh[k][i];if(ri>=rms.length)ri=0;this.lh[k][i]=-1;}else this.lh[k][i]=ri;};var rpl=rms[ri];if(this.d)alert('match:\nkey: '+lzK[k][0]+'\nrank: '+lzK[k][1]+'\ndcm: '+dcs[i][0]+'\nreasm: '+rpl+'\nmf: '+mf);if(rpl.indexOf('ref')==0){var ki=this._grik(rpl.substring(4).trim());if(ki<=0)return this._xcr(ki,1);};var m1=pmr.exec(rpl);if(m1){var lp='';var rp=rpl;while(m1){var pm=m[parseInt(m1[1])];var m2=this.pstex.exec(pm);if(m2){var lp2='';var rp2=pm;while(m2){lp2+=rp2.substring(0,m2.index)+this.pst[m2[1]];rp2=rp2.substring(m2.index+m2[0].length);m2=this.pstex.exec(rp2);};pm=lp2+rp2;};lp+=rp.substring(0,m1.index)+pm;rp=rp.substring(m1.index+m1[0].length);m1=pmr.exec(rp);};rpl=lp+rp;};rpl=this._pstTrsf(rpl);if(mf)this._sm(rpl);else return rpl;};return'';};EB.prototype._pstTrsf=function(s){s=s.replace(/\s{2,}/g,' ').replace(/\s+\./g,'.');if((this.global.lzPstTrsf)&&(lzPstTrsf.length)){for(var i=0;i<lzPstTrsf.length;i+=2){s=s.replace(lzPstTrsf[i],lzPstTrsf[i+1]);lzPstTrsf[i].lastIndex=0;};};if(this.cplzFrtLtr){var m=/^([a-z])/.exec(s);if(m)s=m[0].toUpperCase()+s.substring(1);};return s;};EB.prototype._grik=function(k){for(var i=0;i<lzK.length;i++){if(lzK[i][0]==k)return i;};return-1;};EB.prototype._sm=function(t){this.mm.push(t);if(this.mm.length>this.ms)this.mm.shift();};EB.prototype._gm=function(){if(this.mm.length){if(this.nr)return this.mm.shift();else{var n=Math.floor(Math.random()*this.mm.length);var rp=this.mm[n];for(var i=n+1;i<this.mm.length;i++)this.mm[i-1]=this.mm[i];this.mm.length--;return rp;};}else return'';};EB.prototype.gfnl=function(){if(!EB.prototype.global.lzFnls)return'';return lzFnls[Math.floor(Math.random()*lzFnls.length)];};EB.prototype.ginl=function(){if(!EB.prototype.global.lzInts)return'';return lzInts[Math.floor(Math.random()*lzInts.length)];};if(typeof Array.prototype.push=='undefined')Array.prototype.push=function(v){return this[this.length]=v;};if(typeof Array.prototype.shift=='undefined'){Array.prototype.shift=function(){if(this.length==0)return null;for(var i=0;i<this.length;i++){this[i+1]=this[i];this.length--;};return this[0];};}//eof