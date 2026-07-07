/*e.js v.1.1r - ELIZA JS library(N.Landsteiner 2005)
  Eliza is a mock Rogerian psychotherapist.
  Original program by Joseph Weizenbaum in MAD-SLIP for "Project MAC" at MIT.
  cf: Weizenbaum, Joseph "ELIZA - A Computer Program For the Study of Natural Language
      Communication Between Man and Machine"
      in: Communications of the ACM; Volume 9, Issue 1 (January 1966): p 36-45.
  JavaScript implementation by Norbert Landsteiner 2005; <https://www.masswerk.at>

  synopsis:

         new E( <random-choice-disable-flag> )
         E.prototype.t( <inptstr> )
         E.prototype.I()
         E.prototype.F()
         E.prototype.x()

  usage: var eliza = new E();
         var initial = eliza.I();
         var reply = eliza.t(<inptstr>);
         if (eliza.q) {
             // last user input was a quit phrase
         }

         // method `t()' returns a final phrase in case of a quit phrase
         // but you can also get a final phrase with:
         var final = eliza.F();

         // other methods: reset memory & internal state
         eliza.x();

         // to set the internal memory size override property `W':
         eliza.W = 100; // (dflt: 20)

         // to reproduce the xmpl conversation given by J. Weizenbaum
         // initialize with the optional random-choice-disable flag
         var originalEliza = new E(true);

  `E' is also a general chatbot engine that can be supplied with any rule set. use "<key|key>" to add OR statements
  (for required data structures cf. "d.js" and/or see the documentation.)
  data is parsed & transformed for internal use at the creation time of the first instance of the `E' constructor.

(redacted)1.1r: Code reduced & optimized.
instl rf to glbl obj&parse data&convrt it from canonical form to intrnl use prodoce synons ls,chk for ks or instl mt struct to prvnt any errs,convrt rls to rgx,xpnd synons(wrk around lambda fn),ins astrsk xprs for bktrkng,chk for eQ&instl dflt if mssng,unify inpt str,splt txt in prt sntncs&loop through them,chk for quit xprs,prpcs(v.1.1:wrk around lambda fn),loop through ks,if nthng in M,so try X if nthng in M,return L or a dflt str,fix array.prototype mths(push,shift,isArray) if not mpltd(MSIE fix),sve captures for _X&chk D&stre it as decomp's elm 2,sve orignl idx for srtng&xpnd astrsk xprs(v.1.1:wrk around lambda fn),xpnd white spc&srt ks by rnk(hghst frst),compose rgx,rf for P&p*/function E(F=false){this.f=!!F;this.c=true;this.d=false;this.W=20;this.V='1.1r';this._d||this._();this.x();};E.prototype.x=function(){this.q=false;this.M=[];this.z=[];for(var k=0;k<eK.length;k++){this.z[k]=[];var r=eK[k][2];for(var i=0;i<r.length;i++)this.z[k][i]=-1;};};E.prototype._d=false;E.prototype._=function(){var g=E.prototype.global=self;var sP={};if(g.eS&&typeof eS=='object')for(var i in eS)sP[i]='('+i+'|'+eS[i].join('|')+')';g.eK&&Array.isArray(eK)||(eK=[['###',0,[['###',[]]]]]);var b=/@(\S+)/;var V=/\s+/g;for(var k=0;k<eK.length;k++){eK[k][3]=k;var R=eK[k][2];for(var i=0;i<R.length;i++){var r=R[i];if(r[0].charAt(0)=='$'){var f=1;while(r[0].charAt(f)==' ')f++;r[0]=r[0].substring(f);r[2]=true;}else r[2]=false;var m=b.exec(r[0]);while(m){var sp=sP[m[1]]||m[1];r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);m=b.exec(r[0]);};r[0].indexOf('*')>=0&&(r[0]=r[0].replace(/\*/g,'\\s*(.*)\\s*'));r[0]=r[0].replace(V,'\\s+');V.lastIndex=0;};};eK.sort(this._s);E.prototype.P={};E.prototype.p={};E.prototype.px=g.eX&&Array.isArray(eX)?this._A(eX,'P'):/####/;E.prototype.o=g.eP&&Array.isArray(eP)?this._A(eP,'p'):/####/;g.eQ&&Array.isArray(eQ)||(eQ=[]);E.prototype._d=true;};E.prototype._A=function(a,n){var B=[];for(var i=0;i<a.length;i+=2){var k=a[i];var e=Array.isArray(k)?'\\b('+k.join('|')+')\\b':'\\b'+k+'\\b';B.push(e);this[n][a[i]]=a[i+1];};return new RegExp('('+B.join('|')+')');};E.prototype._s=function(a,b){return a[1]>b[1]?-1:a[1]<b[1]?1:a[3]>b[3]?1:a[3]<b[3]?-1:0;};E.prototype.t=function(e){var L='';this.q=false;e=e.toLowerCase().replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g,' ').replace(/\s+-+\s+/g,'.').replace(/\s*[,\.\?!;]+\s*/g,'.').replace(/\s*\bbut\b\s*/g,'.').replace(/\s{2,}/g,' ');var P=e.split('.');for(var i=0;i<P.length;i++){var p=P[i];if(p!=''){for(var q=0;q<eQ.length;q++)if(eQ[q]==p){this.q=true;return this.F();};var m=this.px.exec(p);if(m){var lp='';var j=p;while(m){lp+=j.substring(0,m.index)+this.P[m[1]];j=j.substring(m.index+m[0].length);m=this.px.exec(j);};p=lp+j;};this.N=p;for(var k=0;k<eK.length;k++){var K=eK[k][0];var h=K.charAt(0)==";"?new RegExp(K.substring(1).trim()):new RegExp('\\b'+K+'\\b');var km=p.match(h);if(km)return this._X(k);};};};L||(L=this._G());if(L==''){this.N=' ';var k=this._H("X");if(k>=0)return this._X(k,true);};return L||'I am at a loss for words.';};E.prototype._X=function(k,s=false){var r=eK[k];if(r[1]<0&!s){this.d&&console.log('BLOCKING K'+r[0]);return'';};var Y=r[2];var pr=/\(([0-9]+)\)/;for(var i=0;i<Y.length;i++){var m=this.N.match(Y[i][0]);if(m!=null){var U=Y[i][1];var D=Y[i][2];var I=this.f?0:Math.floor(Math.random()*U.length);if(this.f&&this.z[k][i]>I||this.z[k][i]==I){I=++this.z[k][i];if(I>=U.length){I=0;this.z[k][i]=-1;};}else this.z[k][i]=I;};var L=U[I];this.d&&alert('MTCH:\nK:'+r[0]+'\nRNK:'+r[1]+'\nY:'+Y[i][0]+'\nU:'+L+'\nD:'+D);if(L.charAt(0)=="~"){var k=this._H(L.substring(1).trim());if(k>=0)return this._X(k,true);};var m1=pr.exec(L);if(m1){var lp='';var j=L;while(m1){var pm=m[parseInt(m1[1])];var m2=this.o.exec(pm);if(m2){var lP='';var J=pm;while(m2){lP+=J.substring(0,m2.index)+this.p[m2[1]];J=J.substring(m2.index+m2[0].length);m2=this.o.exec(J);};pm=lP+J;};lp+=j.substring(0,m1.index)+pm;j=j.substring(m1.index+m1[0].length);m1=pr.exec(j);};L=lp+j;};L=this._C(L);if(D)this._S(L);else return L;};return'';};E.prototype._C=function(s){s=s.replace(/\s{2,}/g,' ').replace(/\s+\./g,".");if(this.global.eT&&Array.isArray(eT))for(var i=0;i<eT.length;i+=2){s=s.replace(eT[i],eT[i+1]);eT[i].lastIndex=0;};if(this.c){var m=/^([a-z])/.exec(s);m&&(s=m[0].toUpperCase()+s.substring(1);};return s;};E.prototype._H=function(k){var K=eK;for(var i=0;i<K.length;i++)if(eK[i][0]==k)return i;return-1;};E.prototype._S=function(T){this.M.push(T);this.M.length>this.W&&this.M.shift();};E.prototype._G=function(){var l=this.M.length;if(l){var L;if(this.f)L=this.M.shift();else{var n=Math.floor(Math.random()*l);l--;L=this.M[n];for(var i=n;i<l;i++)this.M[i]=this.M[i+1];this.M.length=l;};};return L||'';};E.prototype.F=function(){return E.prototype.global.eF?eF[Math.floor(Math.random()*eF.length)]:'';};E.prototype.I=function(){return E.prototype.global.eI?eI[Math.floor(Math.random()*eI.length)]:'';};Array.prototype.push||(Array.prototype.push=function(v){return this[this.length]=v;});Array.prototype.shift||(Array.prototype.shift=function(){var l=this.length;if(!l)return null;l--;for(var i=0;i<l;i++)this[i]=this[i+1];this.length=l;return this[0];});Array.isArray||(Array.isArray=function(A){A instanceof Array;});//eof