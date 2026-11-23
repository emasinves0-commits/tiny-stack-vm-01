import{readdirSync as R,readFileSync as F,mkdirSync as K,writeFileSync as W}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
// Opcode table: base-36 digit per opcode byte = pops*4+pushes; 'g' (16) = not an opcode -> trap 5.
// Digit d: pops=d>>2, pushes=d&3. Opcodes past the table end trap likewise (T[a] undefined -> NaN).
const T="01146abfgggggggg999999959995999g999ggggggggggggg04400ggggggggggg58gggggggggggggg4414";
const MAX_STEPS=1e6; // step limit (ISA: trap 10 past 1,000,000 steps)
function run(p,q){
const n=p.length,S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,y=0,i=0,t=0,l=0;
const e=x=>[x,o.slice(0,l)];
for(;;){
if(t===MAX_STEPS)return e(10);
if(y<0||y>=n)return e(9);
const a=p[y],v=parseInt(T[a],36);
if(v>15||v!==v)return e(5);
const g=a===1?1:a===2?4:a>47&&a<52?2:0;
if(y+g>=n)return e(9);
t++;
const x=y+1+g,u=v>>2,w=v&3;
if(s<u)return e(2);
if(s-u+w>256)return e(3);
y=x;
switch(a){
case 0:return e(0);
case 1:S[s++]=(p[x-1]<<24)>>24;break;
case 2:S[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:S[s]=S[s-1];s++;break;
case 5:{const z=S[s-1];S[s-1]=S[s-2];S[s-2]=z;break;}
case 6:S[s]=S[s-2];s++;break;
case 7:{const z=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=z;break;}
case 23:S[s-1]=-S[s-1]|0;break;
case 27:S[s-1]=~S[s-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const b=S[s-1],A=S[s-2];let r;
if(a===16)r=A+b|0;else if(a===17)r=A-b|0;else if(a===18)r=Math.imul(A,b);
else if(a===19){if(!b)return e(4);r=(A/b)|0;}
else if(a===20){if(!b)return e(4);r=b===-1?0:A%b|0;}
else if(a===21){if(!b)return e(4);r=Math.floor((A>>>0)/(b>>>0))|0;}
else if(a===22){if(!b)return e(4);r=(A>>>0)%(b>>>0)|0;}
else if(a===24)r=A&b;else if(a===25)r=A|b;else if(a===26)r=A^b;
else if(a===28)r=A<<(b&31);else if(a===29)r=A>>(b&31);else if(a===30)r=A>>>(b&31)|0;
else if(a===32)r=A===b?1:0;else if(a===33)r=A<b?1:0;else r=(A>>>0)<(b>>>0)?1:0;
s-=2;S[s++]=r;break;}
case 48:case 49:case 50:{
const h=(p[x-2]|p[x-1]<<8)<<16>>16;let k=a===48;
if(a!==48){const z=S[--s];k=a===49?z===0:z!==0;}
if(k)y=x+h;break;}
case 51:if(c===64)return e(7);C[c++]=x;y=p[x-2]|p[x-1]<<8;break;
case 52:if(!c)return e(8);y=C[--c];break;
case 64:{const A=S[s-1];if(A<0||A>255)return e(6);S[s-1]=M[A];break;}
case 65:{const A=S[s-1];if(A<0||A>255)return e(6);M[A]=S[s-2];s-=2;break;}
case 80:{const b=Buffer.from(String(S[s-1]));if(l+b.length>65536)return e(11);s--;o.set(b,l);l+=b.length;break;}
case 81:if(l>=65536)return e(11);o[l++]=S[--s]&255;break;
case 82:S[s++]=i<q.length?q[i++]:-1;break;
case 83:return e(S[--s]&255);
}
}
}
for(const d of R(I).sort()){const[x,y]=run(F(`${I}/${d}/program.bin`),F(`${I}/${d}/input.bin`));K(`${O}/${d}`,{recursive:true});W(`${O}/${d}/stdout.bin`,y);W(`${O}/${d}/exit.txt`,String(x));}
