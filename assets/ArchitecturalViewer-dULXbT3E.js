import{r as Re,j as R}from"./index-5gAtpGEE.js";import{l as fc,a as pc,b as Vt,r as na,t as mc,c as gc,d as _c,e as vc,f as xc,g as yc}from"./toronto-map-data-CMgPUShg.js";import{E as Sc,O as Mc,U as Kr,S as Ec,w as bc}from"./maplibre-gl-DzgmNEc9.js";import{a as ia}from"./architectural-BVBjbasQ.js";const Lo="180",ui={ROTATE:0,DOLLY:1,PAN:2},ai={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Tc=0,ra=1,Ac=2,vl=1,xl=2,ln=3,An=0,Pt=1,cn=2,En=0,hi=1,sa=2,oa=3,aa=4,wc=5,On=100,Rc=101,Cc=102,Pc=103,Dc=104,Lc=200,Nc=201,Ic=202,Uc=203,Fs=204,Os=205,Fc=206,Oc=207,Bc=208,zc=209,Hc=210,kc=211,Vc=212,Gc=213,Wc=214,Bs=0,zs=1,Hs=2,fi=3,ks=4,Vs=5,Gs=6,Ws=7,yl=0,Xc=1,jc=2,bn=0,Yc=1,qc=2,Zc=3,$c=4,Kc=5,Jc=6,Qc=7,Sl=300,pi=301,mi=302,Xs=303,js=304,Gr=306,Ys=1e3,zn=1001,qs=1002,qt=1003,eu=1004,Ki=1005,$t=1006,Jr=1007,Hn=1008,Qt=1009,Ml=1010,El=1011,Bi=1012,No=1013,kn=1014,hn=1015,ji=1016,Io=1017,Uo=1018,zi=1020,bl=35902,Tl=35899,Al=1021,wl=1022,Yt=1023,Hi=1026,ki=1027,Rl=1028,Fo=1029,Cl=1030,Oo=1031,Bo=1033,Ar=33776,wr=33777,Rr=33778,Cr=33779,Zs=35840,$s=35841,Ks=35842,Js=35843,Qs=36196,eo=37492,to=37496,no=37808,io=37809,ro=37810,so=37811,oo=37812,ao=37813,lo=37814,co=37815,uo=37816,ho=37817,fo=37818,po=37819,mo=37820,go=37821,_o=36492,vo=36494,xo=36495,yo=36283,So=36284,Mo=36285,Eo=36286,tu=3200,nu=3201,Pl=0,iu=1,Sn="",Ct="srgb",gi="srgb-linear",Ir="linear",it="srgb",Yn=7680,la=519,ru=512,su=513,ou=514,Dl=515,au=516,lu=517,cu=518,uu=519,ca=35044,ua="300 es",Kt=2e3,Ur=2001;class Xn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const St=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pr=Math.PI/180,bo=180/Math.PI;function xi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(St[i&255]+St[i>>8&255]+St[i>>16&255]+St[i>>24&255]+"-"+St[e&255]+St[e>>8&255]+"-"+St[e>>16&15|64]+St[e>>24&255]+"-"+St[t&63|128]+St[t>>8&255]+"-"+St[t>>16&255]+St[t>>24&255]+St[n&255]+St[n>>8&255]+St[n>>16&255]+St[n>>24&255]).toLowerCase()}function Ze(i,e,t){return Math.max(e,Math.min(t,i))}function hu(i,e){return(i%e+e)%e}function Qr(i,e,t){return(1-t)*i+t*e}function Ei(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function wt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const du={DEG2RAD:Pr};class me{constructor(e=0,t=0){me.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3];const f=s[o+0],p=s[o+1],g=s[o+2],v=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(h!==v||c!==f||l!==p||u!==g){let m=1-a;const d=c*f+l*p+u*g+h*v,T=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const P=Math.sqrt(E),A=Math.atan2(P,d*T);m=Math.sin(m*A)/P,a=Math.sin(a*A)/P}const x=a*T;if(c=c*m+f*x,l=l*m+p*x,u=u*m+g*x,h=h*m+v*x,m===1-a){const P=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=P,l*=P,u*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[o],f=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+u*h+c*p-l*f,e[t+1]=c*g+u*f+l*h-a*p,e[t+2]=l*g+u*p+a*f-c*h,e[t+3]=u*g-a*h-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),h=a(s/2),f=c(n/2),p=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"YZX":this._x=f*u*h+l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h-f*p*g;break;case"XZY":this._x=f*u*h-l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(o-r)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+l)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(s-l)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ha.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ha.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=r+c*h+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return es.copy(this).projectOnVector(e),this.sub(es)}reflect(e){return this.sub(es.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const es=new I,ha=new Vn;class Ye{constructor(e,t,n,r,s,o,a,c,l){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],p=n[5],g=n[8],v=r[0],m=r[3],d=r[6],T=r[1],E=r[4],x=r[7],P=r[2],A=r[5],L=r[8];return s[0]=o*v+a*T+c*P,s[3]=o*m+a*E+c*A,s[6]=o*d+a*x+c*L,s[1]=l*v+u*T+h*P,s[4]=l*m+u*E+h*A,s[7]=l*d+u*x+h*L,s[2]=f*v+p*T+g*P,s[5]=f*m+p*E+g*A,s[8]=f*d+p*x+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*s,p=l*s-o*c,g=t*h+n*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(r*l-u*n)*v,e[2]=(a*n-r*o)*v,e[3]=f*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-a*t)*v,e[6]=p*v,e[7]=(n*c-l*t)*v,e[8]=(o*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ts.makeScale(e,t)),this}rotate(e){return this.premultiply(ts.makeRotation(-e)),this}translate(e,t){return this.premultiply(ts.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ts=new Ye;function Ll(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fu(){const i=Fr("canvas");return i.style.display="block",i}const da={};function Vi(i){i in da||(da[i]=!0,console.warn(i))}function pu(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const fa=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pa=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mu(){const i={enabled:!0,workingColorSpace:gi,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===it&&(r.r=dn(r.r),r.g=dn(r.g),r.b=dn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===it&&(r.r=di(r.r),r.g=di(r.g),r.b=di(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Sn?Ir:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Vi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Vi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[gi]:{primaries:e,whitePoint:n,transfer:Ir,toXYZ:fa,fromXYZ:pa,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ct},outputColorSpaceConfig:{drawingBufferColorSpace:Ct}},[Ct]:{primaries:e,whitePoint:n,transfer:it,toXYZ:fa,fromXYZ:pa,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ct}}}),i}const tt=mu();function dn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function di(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qn;class gu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{qn===void 0&&(qn=Fr("canvas")),qn.width=e.width,qn.height=e.height;const r=qn.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=qn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=dn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(dn(t[n]/255)*255):t[n]=dn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _u=0;class zo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=xi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ns(r[o].image)):s.push(ns(r[o]))}else s=ns(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ns(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?gu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vu=0;const is=new I;class Tt extends Xn{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=zn,r=zn,s=$t,o=Hn,a=Yt,c=Qt,l=Tt.DEFAULT_ANISOTROPY,u=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=xi(),this.name="",this.source=new zo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(is).x}get height(){return this.source.getSize(is).y}get depth(){return this.source.getSize(is).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ys:e.x=e.x-Math.floor(e.x);break;case zn:e.x=e.x<0?0:1;break;case qs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ys:e.y=e.y-Math.floor(e.y);break;case zn:e.y=e.y<0?0:1;break;case qs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=Sl;Tt.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,t=0,n=0,r=1){ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],p=c[5],g=c[9],v=c[2],m=c[6],d=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(l+1)/2,x=(p+1)/2,P=(d+1)/2,A=(u+f)/4,L=(h+v)/4,N=(g+m)/4;return E>x&&E>P?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=A/n,s=L/n):x>P?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=A/r,s=N/r):P<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),n=L/s,r=N/s),this.set(n,r,s,t),this}let T=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(h-v)/T,this.z=(f-u)/T,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xu extends Xn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t);const r={width:e,height:t,depth:n.depth},s=new Tt(r);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:$t,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new zo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gn extends xu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Nl extends Tt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class yu extends Tt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yi{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Gt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Gt):Gt.fromBufferAttribute(s,o),Gt.applyMatrix4(e.matrixWorld),this.expandByPoint(Gt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ji.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ji.copy(n.boundingBox)),Ji.applyMatrix4(e.matrixWorld),this.union(Ji)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gt),Gt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bi),Qi.subVectors(this.max,bi),Zn.subVectors(e.a,bi),$n.subVectors(e.b,bi),Kn.subVectors(e.c,bi),fn.subVectors($n,Zn),pn.subVectors(Kn,$n),Pn.subVectors(Zn,Kn);let t=[0,-fn.z,fn.y,0,-pn.z,pn.y,0,-Pn.z,Pn.y,fn.z,0,-fn.x,pn.z,0,-pn.x,Pn.z,0,-Pn.x,-fn.y,fn.x,0,-pn.y,pn.x,0,-Pn.y,Pn.x,0];return!rs(t,Zn,$n,Kn,Qi)||(t=[1,0,0,0,1,0,0,0,1],!rs(t,Zn,$n,Kn,Qi))?!1:(er.crossVectors(fn,pn),t=[er.x,er.y,er.z],rs(t,Zn,$n,Kn,Qi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const nn=[new I,new I,new I,new I,new I,new I,new I,new I],Gt=new I,Ji=new Yi,Zn=new I,$n=new I,Kn=new I,fn=new I,pn=new I,Pn=new I,bi=new I,Qi=new I,er=new I,Dn=new I;function rs(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Dn.fromArray(i,s);const a=r.x*Math.abs(Dn.x)+r.y*Math.abs(Dn.y)+r.z*Math.abs(Dn.z),c=e.dot(Dn),l=t.dot(Dn),u=n.dot(Dn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Su=new Yi,Ti=new I,ss=new I;class Wr{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Su.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ti.subVectors(e,this.center);const t=Ti.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ti,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ss.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ti.copy(e.center).add(ss)),this.expandByPoint(Ti.copy(e.center).sub(ss))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const rn=new I,os=new I,tr=new I,mn=new I,as=new I,nr=new I,ls=new I;class Xr{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,rn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=rn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(rn.copy(this.origin).addScaledVector(this.direction,t),rn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){os.copy(e).add(t).multiplyScalar(.5),tr.copy(t).sub(e).normalize(),mn.copy(this.origin).sub(os);const s=e.distanceTo(t)*.5,o=-this.direction.dot(tr),a=mn.dot(this.direction),c=-mn.dot(tr),l=mn.lengthSq(),u=Math.abs(1-o*o);let h,f,p,g;if(u>0)if(h=o*c-a,f=o*a-c,g=s*u,h>=0)if(f>=-g)if(f<=g){const v=1/u;h*=v,f*=v,p=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-c),s),p=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-s,-c),s),p=f*(f+2*c)+l):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-c),s),p=-h*h+f*(f+2*c)+l);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(os).addScaledVector(tr,f),p}intersectSphere(e,t){rn.subVectors(e.center,this.origin);const n=rn.dot(this.direction),r=rn.dot(rn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,rn)!==null}intersectTriangle(e,t,n,r,s){as.subVectors(t,e),nr.subVectors(n,e),ls.crossVectors(as,nr);let o=this.direction.dot(ls),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mn.subVectors(this.origin,e);const c=a*this.direction.dot(nr.crossVectors(mn,nr));if(c<0)return null;const l=a*this.direction.dot(as.cross(mn));if(l<0||c+l>o)return null;const u=-a*mn.dot(ls);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,n,r,s,o,a,c,l,u,h,f,p,g,v,m){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,u,h,f,p,g,v,m)}set(e,t,n,r,s,o,a,c,l,u,h,f,p,g,v,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Jn.setFromMatrixColumn(e,0).length(),s=1/Jn.setFromMatrixColumn(e,1).length(),o=1/Jn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,p=o*h,g=a*u,v=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=p+g*l,t[5]=f-v*l,t[9]=-a*c,t[2]=v-f*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,p=c*h,g=l*u,v=l*h;t[0]=f+v*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=v+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,p=c*h,g=l*u,v=l*h;t[0]=f-v*a,t[4]=-o*h,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=v-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,p=o*h,g=a*u,v=a*h;t[0]=c*u,t[4]=g*l-p,t[8]=f*l+v,t[1]=c*h,t[5]=v*l+f,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,p=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=v-f*h,t[8]=g*h+p,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*h+g,t[10]=f-v*h}else if(e.order==="XZY"){const f=o*c,p=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+v,t[5]=o*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=a*u,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mu,e,Eu)}lookAt(e,t,n){const r=this.elements;return Ut.subVectors(e,t),Ut.lengthSq()===0&&(Ut.z=1),Ut.normalize(),gn.crossVectors(n,Ut),gn.lengthSq()===0&&(Math.abs(n.z)===1?Ut.x+=1e-4:Ut.z+=1e-4,Ut.normalize(),gn.crossVectors(n,Ut)),gn.normalize(),ir.crossVectors(Ut,gn),r[0]=gn.x,r[4]=ir.x,r[8]=Ut.x,r[1]=gn.y,r[5]=ir.y,r[9]=Ut.y,r[2]=gn.z,r[6]=ir.z,r[10]=Ut.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],p=n[13],g=n[2],v=n[6],m=n[10],d=n[14],T=n[3],E=n[7],x=n[11],P=n[15],A=r[0],L=r[4],N=r[8],S=r[12],y=r[1],w=r[5],k=r[9],Z=r[13],O=r[2],z=r[6],V=r[10],Y=r[14],B=r[3],$=r[7],le=r[11],j=r[15];return s[0]=o*A+a*y+c*O+l*B,s[4]=o*L+a*w+c*z+l*$,s[8]=o*N+a*k+c*V+l*le,s[12]=o*S+a*Z+c*Y+l*j,s[1]=u*A+h*y+f*O+p*B,s[5]=u*L+h*w+f*z+p*$,s[9]=u*N+h*k+f*V+p*le,s[13]=u*S+h*Z+f*Y+p*j,s[2]=g*A+v*y+m*O+d*B,s[6]=g*L+v*w+m*z+d*$,s[10]=g*N+v*k+m*V+d*le,s[14]=g*S+v*Z+m*Y+d*j,s[3]=T*A+E*y+x*O+P*B,s[7]=T*L+E*w+x*z+P*$,s[11]=T*N+E*k+x*V+P*le,s[15]=T*S+E*Z+x*Y+P*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],p=e[14],g=e[3],v=e[7],m=e[11],d=e[15];return g*(+s*c*h-r*l*h-s*a*f+n*l*f+r*a*p-n*c*p)+v*(+t*c*p-t*l*f+s*o*f-r*o*p+r*l*u-s*c*u)+m*(+t*l*h-t*a*p-s*o*h+n*o*p+s*a*u-n*l*u)+d*(-r*a*u-t*c*h+t*a*f+r*o*h-n*o*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],p=e[11],g=e[12],v=e[13],m=e[14],d=e[15],T=h*m*l-v*f*l+v*c*p-a*m*p-h*c*d+a*f*d,E=g*f*l-u*m*l-g*c*p+o*m*p+u*c*d-o*f*d,x=u*v*l-g*h*l+g*a*p-o*v*p-u*a*d+o*h*d,P=g*h*c-u*v*c-g*a*f+o*v*f+u*a*m-o*h*m,A=t*T+n*E+r*x+s*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/A;return e[0]=T*L,e[1]=(v*f*s-h*m*s-v*r*p+n*m*p+h*r*d-n*f*d)*L,e[2]=(a*m*s-v*c*s+v*r*l-n*m*l-a*r*d+n*c*d)*L,e[3]=(h*c*s-a*f*s-h*r*l+n*f*l+a*r*p-n*c*p)*L,e[4]=E*L,e[5]=(u*m*s-g*f*s+g*r*p-t*m*p-u*r*d+t*f*d)*L,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*d-t*c*d)*L,e[7]=(o*f*s-u*c*s+u*r*l-t*f*l-o*r*p+t*c*p)*L,e[8]=x*L,e[9]=(g*h*s-u*v*s-g*n*p+t*v*p+u*n*d-t*h*d)*L,e[10]=(o*v*s-g*a*s+g*n*l-t*v*l-o*n*d+t*a*d)*L,e[11]=(u*a*s-o*h*s-u*n*l+t*h*l+o*n*p-t*a*p)*L,e[12]=P*L,e[13]=(u*v*r-g*h*r+g*n*f-t*v*f-u*n*m+t*h*m)*L,e[14]=(g*a*r-o*v*r-g*n*c+t*v*c+o*n*m-t*a*m)*L,e[15]=(o*h*r-u*a*r+u*n*c-t*h*c-o*n*f+t*a*f)*L,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,h=a+a,f=s*l,p=s*u,g=s*h,v=o*u,m=o*h,d=a*h,T=c*l,E=c*u,x=c*h,P=n.x,A=n.y,L=n.z;return r[0]=(1-(v+d))*P,r[1]=(p+x)*P,r[2]=(g-E)*P,r[3]=0,r[4]=(p-x)*A,r[5]=(1-(f+d))*A,r[6]=(m+T)*A,r[7]=0,r[8]=(g+E)*L,r[9]=(m-T)*L,r[10]=(1-(f+v))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Jn.set(r[0],r[1],r[2]).length();const o=Jn.set(r[4],r[5],r[6]).length(),a=Jn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Wt.copy(this);const l=1/s,u=1/o,h=1/a;return Wt.elements[0]*=l,Wt.elements[1]*=l,Wt.elements[2]*=l,Wt.elements[4]*=u,Wt.elements[5]*=u,Wt.elements[6]*=u,Wt.elements[8]*=h,Wt.elements[9]*=h,Wt.elements[10]*=h,t.setFromRotationMatrix(Wt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=Kt,c=!1){const l=this.elements,u=2*s/(t-e),h=2*s/(n-r),f=(t+e)/(t-e),p=(n+r)/(n-r);let g,v;if(c)g=s/(o-s),v=o*s/(o-s);else if(a===Kt)g=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Ur)g=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=Kt,c=!1){const l=this.elements,u=2/(t-e),h=2/(n-r),f=-(t+e)/(t-e),p=-(n+r)/(n-r);let g,v;if(c)g=1/(o-s),v=o/(o-s);else if(a===Kt)g=-2/(o-s),v=-(o+s)/(o-s);else if(a===Ur)g=-1/(o-s),v=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=h,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Jn=new I,Wt=new at,Mu=new I(0,0,0),Eu=new I(1,1,1),gn=new I,ir=new I,Ut=new I,ma=new at,ga=new Vn;class en{constructor(e=0,t=0,n=0,r=en.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ma.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ma,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ga.setFromEuler(this),this.setFromQuaternion(ga,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}en.DEFAULT_ORDER="XYZ";class Ho{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let bu=0;const _a=new I,Qn=new Vn,sn=new at,rr=new I,Ai=new I,Tu=new I,Au=new Vn,va=new I(1,0,0),xa=new I(0,1,0),ya=new I(0,0,1),Sa={type:"added"},wu={type:"removed"},ei={type:"childadded",child:null},cs={type:"childremoved",child:null};class yt extends Xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bu++}),this.uuid=xi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new I,t=new en,n=new Vn,r=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new Ye}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ho,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qn.setFromAxisAngle(e,t),this.quaternion.multiply(Qn),this}rotateOnWorldAxis(e,t){return Qn.setFromAxisAngle(e,t),this.quaternion.premultiply(Qn),this}rotateX(e){return this.rotateOnAxis(va,e)}rotateY(e){return this.rotateOnAxis(xa,e)}rotateZ(e){return this.rotateOnAxis(ya,e)}translateOnAxis(e,t){return _a.copy(e).applyQuaternion(this.quaternion),this.position.add(_a.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(va,e)}translateY(e){return this.translateOnAxis(xa,e)}translateZ(e){return this.translateOnAxis(ya,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(sn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?rr.copy(e):rr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ai.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sn.lookAt(Ai,rr,this.up):sn.lookAt(rr,Ai,this.up),this.quaternion.setFromRotationMatrix(sn),r&&(sn.extractRotation(r.matrixWorld),Qn.setFromRotationMatrix(sn),this.quaternion.premultiply(Qn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sa),ei.child=e,this.dispatchEvent(ei),ei.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wu),cs.child=e,this.dispatchEvent(cs),cs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),sn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),sn.multiply(e.parent.matrixWorld)),e.applyMatrix4(sn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sa),ei.child=e,this.dispatchEvent(ei),ei.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,e,Tu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ai,Au,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}yt.DEFAULT_UP=new I(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xt=new I,on=new I,us=new I,an=new I,ti=new I,ni=new I,Ma=new I,hs=new I,ds=new I,fs=new I,ps=new ft,ms=new ft,gs=new ft;class jt{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Xt.subVectors(e,t),r.cross(Xt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Xt.subVectors(r,t),on.subVectors(n,t),us.subVectors(e,t);const o=Xt.dot(Xt),a=Xt.dot(on),c=Xt.dot(us),l=on.dot(on),u=on.dot(us),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,an)===null?!1:an.x>=0&&an.y>=0&&an.x+an.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,an)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,an.x),c.addScaledVector(o,an.y),c.addScaledVector(a,an.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return ps.setScalar(0),ms.setScalar(0),gs.setScalar(0),ps.fromBufferAttribute(e,t),ms.fromBufferAttribute(e,n),gs.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ps,s.x),o.addScaledVector(ms,s.y),o.addScaledVector(gs,s.z),o}static isFrontFacing(e,t,n,r){return Xt.subVectors(n,t),on.subVectors(e,t),Xt.cross(on).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),on.subVectors(this.a,this.b),Xt.cross(on).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return jt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;ti.subVectors(r,n),ni.subVectors(s,n),hs.subVectors(e,n);const c=ti.dot(hs),l=ni.dot(hs);if(c<=0&&l<=0)return t.copy(n);ds.subVectors(e,r);const u=ti.dot(ds),h=ni.dot(ds);if(u>=0&&h<=u)return t.copy(r);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(ti,o);fs.subVectors(e,s);const p=ti.dot(fs),g=ni.dot(fs);if(g>=0&&p<=g)return t.copy(s);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(ni,a);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return Ma.subVectors(s,r),a=(h-u)/(h-u+(p-g)),t.copy(r).addScaledVector(Ma,a);const d=1/(m+v+f);return o=v*d,a=f*d,t.copy(n).addScaledVector(ti,o).addScaledVector(ni,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Il={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_n={h:0,s:0,l:0},sr={h:0,s:0,l:0};function _s(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class $e{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=tt.workingColorSpace){if(e=hu(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=_s(o,s,e+1/3),this.g=_s(o,s,e),this.b=_s(o,s,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ct){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){const n=Il[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=dn(e.r),this.g=dn(e.g),this.b=dn(e.b),this}copyLinearToSRGB(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return tt.workingToColorSpace(Mt.copy(this),e),Math.round(Ze(Mt.r*255,0,255))*65536+Math.round(Ze(Mt.g*255,0,255))*256+Math.round(Ze(Mt.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Mt.copy(this),t);const n=Mt.r,r=Mt.g,s=Mt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Mt.copy(this),t),e.r=Mt.r,e.g=Mt.g,e.b=Mt.b,e}getStyle(e=Ct){tt.workingToColorSpace(Mt.copy(this),e);const t=Mt.r,n=Mt.g,r=Mt.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(_n),this.setHSL(_n.h+e,_n.s+t,_n.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_n),e.getHSL(sr);const n=Qr(_n.h,sr.h,t),r=Qr(_n.s,sr.s,t),s=Qr(_n.l,sr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mt=new $e;$e.NAMES=Il;let Ru=0;class yi extends Xn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=xi(),this.name="",this.type="Material",this.blending=hi,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fs,this.blendDst=Os,this.blendEquation=On,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=fi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=la,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yn,this.stencilZFail=Yn,this.stencilZPass=Yn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(n.blending=this.blending),this.side!==An&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fs&&(n.blendSrc=this.blendSrc),this.blendDst!==Os&&(n.blendDst=this.blendDst),this.blendEquation!==On&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==fi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==la&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Or extends yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new I,or=new me;let Cu=0;class Jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Cu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ca,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)or.fromBufferAttribute(this,t),or.applyMatrix3(e),this.setXY(t,or.x,or.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),r=wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),r=wt(r,this.array),s=wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ca&&(e.usage=this.usage),e}}class Ul extends Jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Fl extends Jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pt extends Jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Pu=0;const Ht=new at,vs=new yt,ii=new I,Ft=new Yi,wi=new Yi,xt=new I;class Dt extends Xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pu++}),this.uuid=xi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ll(e)?Fl:Ul)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ye().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ht.makeRotationFromQuaternion(e),this.applyMatrix4(Ht),this}rotateX(e){return Ht.makeRotationX(e),this.applyMatrix4(Ht),this}rotateY(e){return Ht.makeRotationY(e),this.applyMatrix4(Ht),this}rotateZ(e){return Ht.makeRotationZ(e),this.applyMatrix4(Ht),this}translate(e,t,n){return Ht.makeTranslation(e,t,n),this.applyMatrix4(Ht),this}scale(e,t,n){return Ht.makeScale(e,t,n),this.applyMatrix4(Ht),this}lookAt(e){return vs.lookAt(e),vs.updateMatrix(),this.applyMatrix4(vs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ii).negate(),this.translate(ii.x,ii.y,ii.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Ft.setFromBufferAttribute(s),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,Ft.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,Ft.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(Ft.min),this.boundingBox.expandByPoint(Ft.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Ft.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];wi.setFromBufferAttribute(a),this.morphTargetsRelative?(xt.addVectors(Ft.min,wi.min),Ft.expandByPoint(xt),xt.addVectors(Ft.max,wi.max),Ft.expandByPoint(xt)):(Ft.expandByPoint(wi.min),Ft.expandByPoint(wi.max))}Ft.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)xt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(xt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)xt.fromBufferAttribute(a,l),c&&(ii.fromBufferAttribute(e,l),xt.add(ii)),r=Math.max(r,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let N=0;N<n.count;N++)a[N]=new I,c[N]=new I;const l=new I,u=new I,h=new I,f=new me,p=new me,g=new me,v=new I,m=new I;function d(N,S,y){l.fromBufferAttribute(n,N),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,y),f.fromBufferAttribute(s,N),p.fromBufferAttribute(s,S),g.fromBufferAttribute(s,y),u.sub(l),h.sub(l),p.sub(f),g.sub(f);const w=1/(p.x*g.y-g.x*p.y);isFinite(w)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(w),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(w),a[N].add(v),a[S].add(v),a[y].add(v),c[N].add(m),c[S].add(m),c[y].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let N=0,S=T.length;N<S;++N){const y=T[N],w=y.start,k=y.count;for(let Z=w,O=w+k;Z<O;Z+=3)d(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const E=new I,x=new I,P=new I,A=new I;function L(N){P.fromBufferAttribute(r,N),A.copy(P);const S=a[N];E.copy(S),E.sub(P.multiplyScalar(P.dot(S))).normalize(),x.crossVectors(A,S);const w=x.dot(c[N])<0?-1:1;o.setXYZW(N,E.x,E.y,E.z,w)}for(let N=0,S=T.length;N<S;++N){const y=T[N],w=y.start,k=y.count;for(let Z=w,O=w+k;Z<O;Z+=3)L(e.getX(Z+0)),L(e.getX(Z+1)),L(e.getX(Z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const r=new I,s=new I,o=new I,a=new I,c=new I,l=new I,u=new I,h=new I;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let p=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?p=c[v]*a.data.stride+a.offset:p=c[v]*u;for(let d=0;d<u;d++)f[g++]=l[p++]}return new Jt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Dt,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],p=e(f,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const p=l[h];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ea=new at,Ln=new Xr,ar=new Wr,ba=new I,lr=new I,cr=new I,ur=new I,xs=new I,hr=new I,Ta=new I,dr=new I;class ut extends yt{constructor(e=new Dt,t=new Or){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){hr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(xs.fromBufferAttribute(h,e),o?hr.addScaledVector(xs,u):hr.addScaledVector(xs.sub(t),u))}t.add(hr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere),ar.applyMatrix4(s),Ln.copy(e.ray).recast(e.near),!(ar.containsPoint(Ln.origin)===!1&&(Ln.intersectSphere(ar,ba)===null||Ln.origin.distanceToSquared(ba)>(e.far-e.near)**2))&&(Ea.copy(s).invert(),Ln.copy(e.ray).applyMatrix4(Ea),!(n.boundingBox!==null&&Ln.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ln)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=o[m.materialIndex],T=Math.max(m.start,p.start),E=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=T,P=E;x<P;x+=3){const A=a.getX(x),L=a.getX(x+1),N=a.getX(x+2);r=fr(this,d,e,n,l,u,h,A,L,N),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const T=a.getX(m),E=a.getX(m+1),x=a.getX(m+2);r=fr(this,o,e,n,l,u,h,T,E,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=o[m.materialIndex],T=Math.max(m.start,p.start),E=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=T,P=E;x<P;x+=3){const A=x,L=x+1,N=x+2;r=fr(this,d,e,n,l,u,h,A,L,N),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const T=m,E=m+1,x=m+2;r=fr(this,o,e,n,l,u,h,T,E,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Du(i,e,t,n,r,s,o,a){let c;if(e.side===Pt?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===An,a),c===null)return null;dr.copy(a),dr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(dr);return l<t.near||l>t.far?null:{distance:l,point:dr.clone(),object:i}}function fr(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,lr),i.getVertexPosition(c,cr),i.getVertexPosition(l,ur);const u=Du(i,e,t,n,lr,cr,ur,Ta);if(u){const h=new I;jt.getBarycoord(Ta,lr,cr,ur,h),r&&(u.uv=jt.getInterpolatedAttribute(r,a,c,l,h,new me)),s&&(u.uv1=jt.getInterpolatedAttribute(s,a,c,l,h,new me)),o&&(u.normal=jt.getInterpolatedAttribute(o,a,c,l,h,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new I,materialIndex:0};jt.getNormal(lr,cr,ur,f.normal),u.face=f,u.barycoord=h}return u}class Tn extends Dt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(u,3)),this.setAttribute("uv",new pt(h,2));function g(v,m,d,T,E,x,P,A,L,N,S){const y=x/L,w=P/N,k=x/2,Z=P/2,O=A/2,z=L+1,V=N+1;let Y=0,B=0;const $=new I;for(let le=0;le<V;le++){const j=le*w-Z;for(let De=0;De<z;De++){const Be=De*y-k;$[v]=Be*T,$[m]=j*E,$[d]=O,l.push($.x,$.y,$.z),$[v]=0,$[m]=0,$[d]=A>0?1:-1,u.push($.x,$.y,$.z),h.push(De/L),h.push(1-le/N),Y+=1}}for(let le=0;le<N;le++)for(let j=0;j<L;j++){const De=f+j+z*le,Be=f+j+z*(le+1),we=f+(j+1)+z*(le+1),Ve=f+(j+1)+z*le;c.push(De,Be,Ve),c.push(Be,we,Ve),B+=6}a.addGroup(p,B,S),p+=B,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function _i(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function bt(i){const e={};for(let t=0;t<i.length;t++){const n=_i(i[t]);for(const r in n)e[r]=n[r]}return e}function Lu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ol(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Nu={clone:_i,merge:bt};var Iu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wn extends yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Iu,this.fragmentShader=Uu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_i(e.uniforms),this.uniformsGroups=Lu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Bl extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=Kt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vn=new I,Aa=new me,wa=new me;class kt extends Bl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=bo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bo*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vn.x,vn.y).multiplyScalar(-e/vn.z),vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vn.x,vn.y).multiplyScalar(-e/vn.z)}getViewSize(e,t){return this.getViewBounds(e,Aa,wa),t.subVectors(wa,Aa)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Pr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ri=-90,si=1;class Fu extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new kt(ri,si,e,t);r.layers=this.layers,this.add(r);const s=new kt(ri,si,e,t);s.layers=this.layers,this.add(s);const o=new kt(ri,si,e,t);o.layers=this.layers,this.add(o);const a=new kt(ri,si,e,t);a.layers=this.layers,this.add(a);const c=new kt(ri,si,e,t);c.layers=this.layers,this.add(c);const l=new kt(ri,si,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===Kt)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ur)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class zl extends Tt{constructor(e=[],t=pi,n,r,s,o,a,c,l,u){super(e,t,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ou extends Gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new zl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Tn(5,5,5),s=new wn({name:"CubemapFromEquirect",uniforms:_i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:En});s.uniforms.tEquirect.value=t;const o=new ut(r,s),a=t.minFilter;return t.minFilter===Hn&&(t.minFilter=$t),new Fu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}class un extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bu={type:"move"};class ys{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),d=this._getHandJoint(l,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Bu)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new un;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Br{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new $e(e),this.near=t,this.far=n}clone(){return new Br(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}let zu=class extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};const Ss=new I,Hu=new I,ku=new Ye;class yn{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ss.subVectors(n,t).cross(Hu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ss),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ku.getNormalMatrix(e),r=this.coplanarPoint(Ss).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nn=new Wr,Vu=new me(.5,.5),pr=new I;class ko{constructor(e=new yn,t=new yn,n=new yn,r=new yn,s=new yn,o=new yn){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Kt,n=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],h=s[5],f=s[6],p=s[7],g=s[8],v=s[9],m=s[10],d=s[11],T=s[12],E=s[13],x=s[14],P=s[15];if(r[0].setComponents(l-o,p-u,d-g,P-T).normalize(),r[1].setComponents(l+o,p+u,d+g,P+T).normalize(),r[2].setComponents(l+a,p+h,d+v,P+E).normalize(),r[3].setComponents(l-a,p-h,d-v,P-E).normalize(),n)r[4].setComponents(c,f,m,x).normalize(),r[5].setComponents(l-c,p-f,d-m,P-x).normalize();else if(r[4].setComponents(l-c,p-f,d-m,P-x).normalize(),t===Kt)r[5].setComponents(l+c,p+f,d+m,P+x).normalize();else if(t===Ur)r[5].setComponents(c,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Nn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nn)}intersectsSprite(e){Nn.center.set(0,0,0);const t=Vu.distanceTo(e.center);return Nn.radius=.7071067811865476+t,Nn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(pr.x=r.normal.x>0?e.max.x:e.min.x,pr.y=r.normal.y>0?e.max.y:e.min.y,pr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(pr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vo extends yi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const zr=new I,Hr=new I,Ra=new at,Ri=new Xr,mr=new Wr,Ms=new I,Ca=new I;class Hl extends yt{constructor(e=new Dt,t=new Vo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)zr.fromBufferAttribute(t,r-1),Hr.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=zr.distanceTo(Hr);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(r),mr.radius+=s,e.ray.intersectsSphere(mr)===!1)return;Ra.copy(r).invert(),Ri.copy(e.ray).applyMatrix4(Ra);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=p,m=g-1;v<m;v+=l){const d=u.getX(v),T=u.getX(v+1),E=gr(this,e,Ri,c,d,T,v);E&&t.push(E)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(p),d=gr(this,e,Ri,c,v,m,g-1);d&&t.push(d)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let v=p,m=g-1;v<m;v+=l){const d=gr(this,e,Ri,c,v,v+1,v);d&&t.push(d)}if(this.isLineLoop){const v=gr(this,e,Ri,c,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function gr(i,e,t,n,r,s,o){const a=i.geometry.attributes.position;if(zr.fromBufferAttribute(a,r),Hr.fromBufferAttribute(a,s),t.distanceSqToSegment(zr,Hr,Ms,Ca)>n)return;Ms.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ms);if(!(l<e.near||l>e.far))return{distance:l,point:Ca.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Pa=new I,Da=new I;class Gu extends Hl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Pa.fromBufferAttribute(t,r),Da.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Pa.distanceTo(Da);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Wu extends Tt{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class kl extends Tt{constructor(e,t,n=kn,r,s,o,a=qt,c=qt,l,u=Hi,h=1){if(u!==Hi&&u!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Vl extends Tt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ii extends Dt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],p=[];let g=0;const v=[],m=n/2;let d=0;T(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new pt(h,3)),this.setAttribute("normal",new pt(f,3)),this.setAttribute("uv",new pt(p,2));function T(){const x=new I,P=new I;let A=0;const L=(t-e)/n;for(let N=0;N<=s;N++){const S=[],y=N/s,w=y*(t-e)+e;for(let k=0;k<=r;k++){const Z=k/r,O=Z*c+a,z=Math.sin(O),V=Math.cos(O);P.x=w*z,P.y=-y*n+m,P.z=w*V,h.push(P.x,P.y,P.z),x.set(z,L,V).normalize(),f.push(x.x,x.y,x.z),p.push(Z,1-y),S.push(g++)}v.push(S)}for(let N=0;N<r;N++)for(let S=0;S<s;S++){const y=v[S][N],w=v[S+1][N],k=v[S+1][N+1],Z=v[S][N+1];(e>0||S!==0)&&(u.push(y,w,Z),A+=3),(t>0||S!==s-1)&&(u.push(w,k,Z),A+=3)}l.addGroup(d,A,0),d+=A}function E(x){const P=g,A=new me,L=new I;let N=0;const S=x===!0?e:t,y=x===!0?1:-1;for(let k=1;k<=r;k++)h.push(0,m*y,0),f.push(0,y,0),p.push(.5,.5),g++;const w=g;for(let k=0;k<=r;k++){const O=k/r*c+a,z=Math.cos(O),V=Math.sin(O);L.x=S*V,L.y=m*y,L.z=S*z,h.push(L.x,L.y,L.z),f.push(0,y,0),A.x=z*.5+.5,A.y=V*.5*y+.5,p.push(A.x,A.y),g++}for(let k=0;k<r;k++){const Z=P+k,O=w+k;x===!0?u.push(O,O+1,Z):u.push(O+1,O,Z),N+=3}l.addGroup(d,N,x===!0?1:2),d+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ii(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Go extends Dt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),l(n),u(),this.setAttribute("position",new pt(s,3)),this.setAttribute("normal",new pt(s.slice(),3)),this.setAttribute("uv",new pt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(T){const E=new I,x=new I,P=new I;for(let A=0;A<t.length;A+=3)p(t[A+0],E),p(t[A+1],x),p(t[A+2],P),c(E,x,P,T)}function c(T,E,x,P){const A=P+1,L=[];for(let N=0;N<=A;N++){L[N]=[];const S=T.clone().lerp(x,N/A),y=E.clone().lerp(x,N/A),w=A-N;for(let k=0;k<=w;k++)k===0&&N===A?L[N][k]=S:L[N][k]=S.clone().lerp(y,k/w)}for(let N=0;N<A;N++)for(let S=0;S<2*(A-N)-1;S++){const y=Math.floor(S/2);S%2===0?(f(L[N][y+1]),f(L[N+1][y]),f(L[N][y])):(f(L[N][y+1]),f(L[N+1][y+1]),f(L[N+1][y]))}}function l(T){const E=new I;for(let x=0;x<s.length;x+=3)E.x=s[x+0],E.y=s[x+1],E.z=s[x+2],E.normalize().multiplyScalar(T),s[x+0]=E.x,s[x+1]=E.y,s[x+2]=E.z}function u(){const T=new I;for(let E=0;E<s.length;E+=3){T.x=s[E+0],T.y=s[E+1],T.z=s[E+2];const x=m(T)/2/Math.PI+.5,P=d(T)/Math.PI+.5;o.push(x,1-P)}g(),h()}function h(){for(let T=0;T<o.length;T+=6){const E=o[T+0],x=o[T+2],P=o[T+4],A=Math.max(E,x,P),L=Math.min(E,x,P);A>.9&&L<.1&&(E<.2&&(o[T+0]+=1),x<.2&&(o[T+2]+=1),P<.2&&(o[T+4]+=1))}}function f(T){s.push(T.x,T.y,T.z)}function p(T,E){const x=T*3;E.x=e[x+0],E.y=e[x+1],E.z=e[x+2]}function g(){const T=new I,E=new I,x=new I,P=new I,A=new me,L=new me,N=new me;for(let S=0,y=0;S<s.length;S+=9,y+=6){T.set(s[S+0],s[S+1],s[S+2]),E.set(s[S+3],s[S+4],s[S+5]),x.set(s[S+6],s[S+7],s[S+8]),A.set(o[y+0],o[y+1]),L.set(o[y+2],o[y+3]),N.set(o[y+4],o[y+5]),P.copy(T).add(E).add(x).divideScalar(3);const w=m(P);v(A,y+0,T,w),v(L,y+2,E,w),v(N,y+4,x,w)}}function v(T,E,x,P){P<0&&T.x===1&&(o[E]=T.x-1),x.x===0&&x.z===0&&(o[E]=P/2/Math.PI+.5)}function m(T){return Math.atan2(T.z,-T.x)}function d(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Go(e.vertices,e.indices,e.radius,e.details)}}class tn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let r=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const u=n[r],f=n[r+1]-u,p=(o-u)/f;return(r+p)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new me:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new I,r=[],s=[],o=[],a=new I,c=new at;for(let p=0;p<=e;p++){const g=p/e;r[p]=this.getTangentAt(g,new I)}s[0]=new I,o[0]=new I;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ze(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(Ze(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Wo extends tn{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new me){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*u-p*h+this.aX,l=f*h+p*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Xu extends Wo{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Xo(){let i=0,e=0,t=0,n=0;function r(s,o,a,c){i=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let f=(o-s)/l-(a-s)/(l+u)+(a-o)/u,p=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,p*=u,r(o,a,f,p)},calc:function(s){const o=s*s,a=o*s;return i+e*s+t*o+n*a}}}const _r=new I,Es=new Xo,bs=new Xo,Ts=new Xo;class ju extends tn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new I){const n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(_r.subVectors(r[0],r[1]).add(r[0]),l=_r);const h=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(_r.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=_r),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),p),v=Math.pow(h.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Es.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,v,m),bs.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,v,m),Ts.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,v,m)}else this.curveType==="catmullrom"&&(Es.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),bs.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),Ts.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(Es.calc(c),bs.calc(c),Ts.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function La(i,e,t,n,r){const s=(n-e)*.5,o=(r-t)*.5,a=i*i,c=i*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*i+t}function Yu(i,e){const t=1-i;return t*t*e}function qu(i,e){return 2*(1-i)*i*e}function Zu(i,e){return i*i*e}function Ui(i,e,t,n){return Yu(i,e)+qu(i,t)+Zu(i,n)}function $u(i,e){const t=1-i;return t*t*t*e}function Ku(i,e){const t=1-i;return 3*t*t*i*e}function Ju(i,e){return 3*(1-i)*i*i*e}function Qu(i,e){return i*i*i*e}function Fi(i,e,t,n,r){return $u(i,e)+Ku(i,t)+Ju(i,n)+Qu(i,r)}class Gl extends tn{constructor(e=new me,t=new me,n=new me,r=new me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new me){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Fi(e,r.x,s.x,o.x,a.x),Fi(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class eh extends tn{constructor(e=new I,t=new I,n=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new I){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Fi(e,r.x,s.x,o.x,a.x),Fi(e,r.y,s.y,o.y,a.y),Fi(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Wl extends tn{constructor(e=new me,t=new me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new me){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class th extends tn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xl extends tn{constructor(e=new me,t=new me,n=new me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new me){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Ui(e,r.x,s.x,o.x),Ui(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nh extends tn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Ui(e,r.x,s.x,o.x),Ui(e,r.y,s.y,o.y),Ui(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class jl extends tn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new me){const n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return n.set(La(a,c.x,l.x,u.x,h.x),La(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new me().fromArray(r))}return this}}var To=Object.freeze({__proto__:null,ArcCurve:Xu,CatmullRomCurve3:ju,CubicBezierCurve:Gl,CubicBezierCurve3:eh,EllipseCurve:Wo,LineCurve:Wl,LineCurve3:th,QuadraticBezierCurve:Xl,QuadraticBezierCurve3:nh,SplineCurve:jl});class ih extends tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new To[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new To[r.type]().fromJSON(r))}return this}}class Ao extends ih{constructor(e){super(),this.type="Path",this.currentPoint=new me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Wl(this.currentPoint.clone(),new me(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new Xl(this.currentPoint.clone(),new me(e,t),new me(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){const a=new Gl(this.currentPoint.clone(),new me(e,t),new me(n,r),new me(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new jl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,r,s,o,a,c),this}absellipse(e,t,n,r,s,o,a,c){const l=new Wo(e,t,n,r,s,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Yl extends Ao{constructor(e){super(e),this.uuid=xi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new Ao().fromJSON(r))}return this}}function rh(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=ql(i,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(n&&(s=ch(i,e,s,t)),i.length>80*t){a=1/0,c=1/0;let u=-1/0,h=-1/0;for(let f=t;f<r;f+=t){const p=i[f],g=i[f+1];p<a&&(a=p),g<c&&(c=g),p>u&&(u=p),g>h&&(h=g)}l=Math.max(u-a,h-c),l=l!==0?32767/l:0}return Gi(s,o,t,a,c,l,0),o}function ql(i,e,t,n,r){let s;if(r===yh(i,e,t,n)>0)for(let o=e;o<t;o+=n)s=Na(o/n|0,i[o],i[o+1],s);else for(let o=t-n;o>=e;o-=n)s=Na(o/n|0,i[o],i[o+1],s);return s&&vi(s,s.next)&&(Xi(s),s=s.next),s}function Wn(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(vi(t,t.next)||ht(t.prev,t,t.next)===0)){if(Xi(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Gi(i,e,t,n,r,s,o){if(!i)return;!o&&s&&ph(i,n,r,s);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(s?oh(i,n,r,s):sh(i)){e.push(c.i,i.i,l.i),Xi(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=ah(Wn(i),e),Gi(i,e,t,n,r,s,2)):o===2&&lh(i,e,t,n,r,s):Gi(Wn(i),e,t,n,r,s,1);break}}}function sh(i){const e=i.prev,t=i,n=i.next;if(ht(e,t,n)>=0)return!1;const r=e.x,s=t.x,o=n.x,a=e.y,c=t.y,l=n.y,u=Math.min(r,s,o),h=Math.min(a,c,l),f=Math.max(r,s,o),p=Math.max(a,c,l);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=p&&Pi(r,a,s,c,o,l,g.x,g.y)&&ht(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function oh(i,e,t,n){const r=i.prev,s=i,o=i.next;if(ht(r,s,o)>=0)return!1;const a=r.x,c=s.x,l=o.x,u=r.y,h=s.y,f=o.y,p=Math.min(a,c,l),g=Math.min(u,h,f),v=Math.max(a,c,l),m=Math.max(u,h,f),d=wo(p,g,e,t,n),T=wo(v,m,e,t,n);let E=i.prevZ,x=i.nextZ;for(;E&&E.z>=d&&x&&x.z<=T;){if(E.x>=p&&E.x<=v&&E.y>=g&&E.y<=m&&E!==r&&E!==o&&Pi(a,u,c,h,l,f,E.x,E.y)&&ht(E.prev,E,E.next)>=0||(E=E.prevZ,x.x>=p&&x.x<=v&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&Pi(a,u,c,h,l,f,x.x,x.y)&&ht(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;E&&E.z>=d;){if(E.x>=p&&E.x<=v&&E.y>=g&&E.y<=m&&E!==r&&E!==o&&Pi(a,u,c,h,l,f,E.x,E.y)&&ht(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;x&&x.z<=T;){if(x.x>=p&&x.x<=v&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&Pi(a,u,c,h,l,f,x.x,x.y)&&ht(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function ah(i,e){let t=i;do{const n=t.prev,r=t.next.next;!vi(n,r)&&$l(n,t,t.next,r)&&Wi(n,r)&&Wi(r,n)&&(e.push(n.i,t.i,r.i),Xi(t),Xi(t.next),t=i=r),t=t.next}while(t!==i);return Wn(t)}function lh(i,e,t,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&_h(o,a)){let c=Kl(o,a);o=Wn(o,o.next),c=Wn(c,c.next),Gi(o,e,t,n,r,s,0),Gi(c,e,t,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function ch(i,e,t,n){const r=[];for(let s=0,o=e.length;s<o;s++){const a=e[s]*n,c=s<o-1?e[s+1]*n:i.length,l=ql(i,a,c,n,!1);l===l.next&&(l.steiner=!0),r.push(gh(l))}r.sort(uh);for(let s=0;s<r.length;s++)t=hh(r[s],t);return t}function uh(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function hh(i,e){const t=dh(i,e);if(!t)return e;const n=Kl(t,i);return Wn(n,n.next),Wn(t,t.next)}function dh(i,e){let t=e;const n=i.x,r=i.y;let s=-1/0,o;if(vi(i,t))return t;do{if(vi(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>s&&(s=h,o=t.x<t.next.x?t:t.next,h===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Zl(r<l?n:s,r,c,l,r<l?s:n,r,t.x,t.y)){const h=Math.abs(r-t.y)/(n-t.x);Wi(t,i)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&fh(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function fh(i,e){return ht(i.prev,i,e.prev)<0&&ht(e.next,i,i.next)<0}function ph(i,e,t,n){let r=i;do r.z===0&&(r.z=wo(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,mh(r)}function mh(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,t*=2}while(e>1);return i}function wo(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function gh(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Zl(i,e,t,n,r,s,o,a){return(r-o)*(e-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(n-a)}function Pi(i,e,t,n,r,s,o,a){return!(i===o&&e===a)&&Zl(i,e,t,n,r,s,o,a)}function _h(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!vh(i,e)&&(Wi(i,e)&&Wi(e,i)&&xh(i,e)&&(ht(i.prev,i,e.prev)||ht(i,e.prev,e))||vi(i,e)&&ht(i.prev,i,i.next)>0&&ht(e.prev,e,e.next)>0)}function ht(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function vi(i,e){return i.x===e.x&&i.y===e.y}function $l(i,e,t,n){const r=xr(ht(i,e,t)),s=xr(ht(i,e,n)),o=xr(ht(t,n,i)),a=xr(ht(t,n,e));return!!(r!==s&&o!==a||r===0&&vr(i,t,e)||s===0&&vr(i,n,e)||o===0&&vr(t,i,n)||a===0&&vr(t,e,n))}function vr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function xr(i){return i>0?1:i<0?-1:0}function vh(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&$l(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Wi(i,e){return ht(i.prev,i,i.next)<0?ht(i,e,i.next)>=0&&ht(i,i.prev,e)>=0:ht(i,e,i.prev)<0||ht(i,i.next,e)<0}function xh(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Kl(i,e){const t=Ro(i.i,i.x,i.y),n=Ro(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Na(i,e,t,n){const r=Ro(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Xi(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ro(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function yh(i,e,t,n){let r=0;for(let s=e,o=t-n;s<t;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class Sh{static triangulate(e,t,n=2){return rh(e,t,n)}}class li{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return li.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];Ia(e),Ua(n,e);let o=e.length;t.forEach(Ia);for(let c=0;c<t.length;c++)r.push(o),o+=t[c].length,Ua(n,t[c]);const a=Sh.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function Ia(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Ua(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class jo extends Dt{constructor(e=new Yl([new me(.5,.5),new me(-.5,.5),new me(-.5,-.5),new me(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,r=[],s=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new pt(r,3)),this.setAttribute("uv",new pt(s,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const d=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:Mh;let E,x=!1,P,A,L,N;d&&(E=d.getSpacedPoints(u),x=!0,f=!1,P=d.computeFrenetFrames(u,!1),A=new I,L=new I,N=new I),f||(m=0,p=0,g=0,v=0);const S=a.extractPoints(l);let y=S.shape;const w=S.holes;if(!li.isClockWise(y)){y=y.reverse();for(let ce=0,ie=w.length;ce<ie;ce++){const se=w[ce];li.isClockWise(se)&&(w[ce]=se.reverse())}}function Z(ce){const se=10000000000000001e-36;let re=ce[0];for(let de=1;de<=ce.length;de++){const ue=de%ce.length,Q=ce[ue],ye=Q.x-re.x,ge=Q.y-re.y,b=ye*ye+ge*ge,_=Math.max(Math.abs(Q.x),Math.abs(Q.y),Math.abs(re.x),Math.abs(re.y)),F=se*_*_;if(b<=F){ce.splice(ue,1),de--;continue}re=Q}}Z(y),w.forEach(Z);const O=w.length,z=y;for(let ce=0;ce<O;ce++){const ie=w[ce];y=y.concat(ie)}function V(ce,ie,se){return ie||console.error("THREE.ExtrudeGeometry: vec does not exist"),ce.clone().addScaledVector(ie,se)}const Y=y.length;function B(ce,ie,se){let re,de,ue;const Q=ce.x-ie.x,ye=ce.y-ie.y,ge=se.x-ce.x,b=se.y-ce.y,_=Q*Q+ye*ye,F=Q*b-ye*ge;if(Math.abs(F)>Number.EPSILON){const q=Math.sqrt(_),ae=Math.sqrt(ge*ge+b*b),ne=ie.x-ye/q,Ce=ie.y+Q/q,_e=se.x-b/ae,Ne=se.y+ge/ae,Ie=((_e-ne)*b-(Ne-Ce)*ge)/(Q*b-ye*ge);re=ne+Q*Ie-ce.x,de=Ce+ye*Ie-ce.y;const he=re*re+de*de;if(he<=2)return new me(re,de);ue=Math.sqrt(he/2)}else{let q=!1;Q>Number.EPSILON?ge>Number.EPSILON&&(q=!0):Q<-Number.EPSILON?ge<-Number.EPSILON&&(q=!0):Math.sign(ye)===Math.sign(b)&&(q=!0),q?(re=-ye,de=Q,ue=Math.sqrt(_)):(re=Q,de=ye,ue=Math.sqrt(_/2))}return new me(re/ue,de/ue)}const $=[];for(let ce=0,ie=z.length,se=ie-1,re=ce+1;ce<ie;ce++,se++,re++)se===ie&&(se=0),re===ie&&(re=0),$[ce]=B(z[ce],z[se],z[re]);const le=[];let j,De=$.concat();for(let ce=0,ie=O;ce<ie;ce++){const se=w[ce];j=[];for(let re=0,de=se.length,ue=de-1,Q=re+1;re<de;re++,ue++,Q++)ue===de&&(ue=0),Q===de&&(Q=0),j[re]=B(se[re],se[ue],se[Q]);le.push(j),De=De.concat(j)}let Be;if(m===0)Be=li.triangulateShape(z,w);else{const ce=[],ie=[];for(let se=0;se<m;se++){const re=se/m,de=p*Math.cos(re*Math.PI/2),ue=g*Math.sin(re*Math.PI/2)+v;for(let Q=0,ye=z.length;Q<ye;Q++){const ge=V(z[Q],$[Q],ue);ve(ge.x,ge.y,-de),re===0&&ce.push(ge)}for(let Q=0,ye=O;Q<ye;Q++){const ge=w[Q];j=le[Q];const b=[];for(let _=0,F=ge.length;_<F;_++){const q=V(ge[_],j[_],ue);ve(q.x,q.y,-de),re===0&&b.push(q)}re===0&&ie.push(b)}}Be=li.triangulateShape(ce,ie)}const we=Be.length,Ve=g+v;for(let ce=0;ce<Y;ce++){const ie=f?V(y[ce],De[ce],Ve):y[ce];x?(L.copy(P.normals[0]).multiplyScalar(ie.x),A.copy(P.binormals[0]).multiplyScalar(ie.y),N.copy(E[0]).add(L).add(A),ve(N.x,N.y,N.z)):ve(ie.x,ie.y,0)}for(let ce=1;ce<=u;ce++)for(let ie=0;ie<Y;ie++){const se=f?V(y[ie],De[ie],Ve):y[ie];x?(L.copy(P.normals[ce]).multiplyScalar(se.x),A.copy(P.binormals[ce]).multiplyScalar(se.y),N.copy(E[ce]).add(L).add(A),ve(N.x,N.y,N.z)):ve(se.x,se.y,h/u*ce)}for(let ce=m-1;ce>=0;ce--){const ie=ce/m,se=p*Math.cos(ie*Math.PI/2),re=g*Math.sin(ie*Math.PI/2)+v;for(let de=0,ue=z.length;de<ue;de++){const Q=V(z[de],$[de],re);ve(Q.x,Q.y,h+se)}for(let de=0,ue=w.length;de<ue;de++){const Q=w[de];j=le[de];for(let ye=0,ge=Q.length;ye<ge;ye++){const b=V(Q[ye],j[ye],re);x?ve(b.x,b.y+E[u-1].y,E[u-1].x+se):ve(b.x,b.y,h+se)}}}X(),te();function X(){const ce=r.length/3;if(f){let ie=0,se=Y*ie;for(let re=0;re<we;re++){const de=Be[re];Me(de[2]+se,de[1]+se,de[0]+se)}ie=u+m*2,se=Y*ie;for(let re=0;re<we;re++){const de=Be[re];Me(de[0]+se,de[1]+se,de[2]+se)}}else{for(let ie=0;ie<we;ie++){const se=Be[ie];Me(se[2],se[1],se[0])}for(let ie=0;ie<we;ie++){const se=Be[ie];Me(se[0]+Y*u,se[1]+Y*u,se[2]+Y*u)}}n.addGroup(ce,r.length/3-ce,0)}function te(){const ce=r.length/3;let ie=0;oe(z,ie),ie+=z.length;for(let se=0,re=w.length;se<re;se++){const de=w[se];oe(de,ie),ie+=de.length}n.addGroup(ce,r.length/3-ce,1)}function oe(ce,ie){let se=ce.length;for(;--se>=0;){const re=se;let de=se-1;de<0&&(de=ce.length-1);for(let ue=0,Q=u+m*2;ue<Q;ue++){const ye=Y*ue,ge=Y*(ue+1),b=ie+re+ye,_=ie+de+ye,F=ie+de+ge,q=ie+re+ge;Le(b,_,F,q)}}}function ve(ce,ie,se){c.push(ce),c.push(ie),c.push(se)}function Me(ce,ie,se){je(ce),je(ie),je(se);const re=r.length/3,de=T.generateTopUV(n,r,re-3,re-2,re-1);C(de[0]),C(de[1]),C(de[2])}function Le(ce,ie,se,re){je(ce),je(ie),je(re),je(ie),je(se),je(re);const de=r.length/3,ue=T.generateSideWallUV(n,r,de-6,de-3,de-2,de-1);C(ue[0]),C(ue[1]),C(ue[3]),C(ue[1]),C(ue[2]),C(ue[3])}function je(ce){r.push(c[ce*3+0]),r.push(c[ce*3+1]),r.push(c[ce*3+2])}function C(ce){s.push(ce.x),s.push(ce.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Eh(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];n.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new To[r.type]().fromJSON(r)),new jo(n,e.options)}}const Mh={generateTopUV:function(i,e,t,n,r){const s=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[r*3],u=e[r*3+1];return[new me(s,o),new me(a,c),new me(l,u)]},generateSideWallUV:function(i,e,t,n,r,s){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[r*3],p=e[r*3+1],g=e[r*3+2],v=e[s*3],m=e[s*3+1],d=e[s*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new me(o,1-c),new me(l,1-h),new me(f,1-g),new me(v,1-d)]:[new me(a,1-c),new me(u,1-h),new me(p,1-g),new me(m,1-d)]}};function Eh(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Yo extends Go{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Yo(e.radius,e.detail)}}class jr extends Dt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,h=e/a,f=t/c,p=[],g=[],v=[],m=[];for(let d=0;d<u;d++){const T=d*f-o;for(let E=0;E<l;E++){const x=E*h-s;g.push(x,-T,0),v.push(0,0,1),m.push(E/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let T=0;T<a;T++){const E=T+l*d,x=T+l*(d+1),P=T+1+l*(d+1),A=T+1+l*d;p.push(E,x,A),p.push(x,P,A)}this.setIndex(p),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(v,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jr(e.width,e.height,e.widthSegments,e.heightSegments)}}class kr extends Dt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],c=[],l=[],u=new I,h=new I,f=new I;for(let p=0;p<=n;p++)for(let g=0;g<=r;g++){const v=g/r*s,m=p/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(v),h.y=(e+t*Math.cos(m))*Math.sin(v),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/r),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=r;g++){const v=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,d=(r+1)*(p-1)+g,T=(r+1)*p+g;o.push(v,m,T),o.push(m,d,T)}this.setIndex(o),this.setAttribute("position",new pt(a,3)),this.setAttribute("normal",new pt(c,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class xn extends yi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pl,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bh extends yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Th extends yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Jl extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ah extends Jl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $e(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const As=new at,Fa=new I,Oa=new I;class wh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ko,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Fa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fa),Oa.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Oa),t.updateMatrixWorld(),As.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(As,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(As)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ql extends Bl{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Rh extends wh{constructor(){super(new Ql(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ch extends Jl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new Rh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ph extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ba=new at;class Dh{constructor(e,t,n=0,r=1/0){this.ray=new Xr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ho,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ba.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ba),this}intersectObject(e,t=!0,n=[]){return Co(e,this,n,t),n.sort(za),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Co(e[r],this,n,t);return n.sort(za),n}}function za(i,e){return i.distance-e.distance}function Co(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let o=0,a=s.length;o<a;o++)Co(s[o],e,t,!0)}}class Po{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Lh extends Gu{constructor(e=10,t=10,n=4473924,r=8947848){n=new $e(n),r=new $e(r);const s=t/2,o=e/t,a=e/2,c=[],l=[];for(let f=0,p=0,g=-a;f<=t;f++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);const v=f===s?n:r;v.toArray(l,p),p+=3,v.toArray(l,p),p+=3,v.toArray(l,p),p+=3,v.toArray(l,p),p+=3}const u=new Dt;u.setAttribute("position",new pt(c,3)),u.setAttribute("color",new pt(l,3));const h=new Vo({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Nh extends Xn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Ha(i,e,t,n){const r=Ih(n);switch(t){case Al:return i*e;case Rl:return i*e/r.components*r.byteLength;case Fo:return i*e/r.components*r.byteLength;case Cl:return i*e*2/r.components*r.byteLength;case Oo:return i*e*2/r.components*r.byteLength;case wl:return i*e*3/r.components*r.byteLength;case Yt:return i*e*4/r.components*r.byteLength;case Bo:return i*e*4/r.components*r.byteLength;case Ar:case wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Rr:case Cr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case $s:case Js:return Math.max(i,16)*Math.max(e,8)/4;case Zs:case Ks:return Math.max(i,8)*Math.max(e,8)/2;case Qs:case eo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case to:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case no:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case io:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ro:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case so:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case oo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ao:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case lo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case co:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case uo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ho:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case fo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case po:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case mo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case go:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case _o:case vo:case xo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case yo:case So:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Mo:case Eo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ih(i){switch(i){case Qt:case Ml:return{byteLength:1,components:1};case Bi:case El:case ji:return{byteLength:2,components:1};case Io:case Uo:return{byteLength:2,components:4};case kn:case No:case hn:return{byteLength:4,components:1};case bl:case Tl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lo);function ec(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Uh(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,h[f]=v)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const v=h[p];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var Fh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Oh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Gh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Xh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,$h=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Jh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,td=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,nd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,sd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,od=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ad=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ld=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ud=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dd="gl_FragColor = linearToOutputTexel( gl_FragColor );",fd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,md=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_d=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,xd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Md=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ed=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Td=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ad=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Rd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Cd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ld=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Id=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ud=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Od=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$d=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Jd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ef=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,of=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,af=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,df=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ff=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_f=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,xf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Sf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Mf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ef=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,bf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Af=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Df=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Uf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ff=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Of=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Gf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Wf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$f=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Kf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,np=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ip=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,op=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ap=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,up=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:Fh,alphahash_pars_fragment:Oh,alphamap_fragment:Bh,alphamap_pars_fragment:zh,alphatest_fragment:Hh,alphatest_pars_fragment:kh,aomap_fragment:Vh,aomap_pars_fragment:Gh,batching_pars_vertex:Wh,batching_vertex:Xh,begin_vertex:jh,beginnormal_vertex:Yh,bsdfs:qh,iridescence_fragment:Zh,bumpmap_pars_fragment:$h,clipping_planes_fragment:Kh,clipping_planes_pars_fragment:Jh,clipping_planes_pars_vertex:Qh,clipping_planes_vertex:ed,color_fragment:td,color_pars_fragment:nd,color_pars_vertex:id,color_vertex:rd,common:sd,cube_uv_reflection_fragment:od,defaultnormal_vertex:ad,displacementmap_pars_vertex:ld,displacementmap_vertex:cd,emissivemap_fragment:ud,emissivemap_pars_fragment:hd,colorspace_fragment:dd,colorspace_pars_fragment:fd,envmap_fragment:pd,envmap_common_pars_fragment:md,envmap_pars_fragment:gd,envmap_pars_vertex:_d,envmap_physical_pars_fragment:Rd,envmap_vertex:vd,fog_vertex:xd,fog_pars_vertex:yd,fog_fragment:Sd,fog_pars_fragment:Md,gradientmap_pars_fragment:Ed,lightmap_pars_fragment:bd,lights_lambert_fragment:Td,lights_lambert_pars_fragment:Ad,lights_pars_begin:wd,lights_toon_fragment:Cd,lights_toon_pars_fragment:Pd,lights_phong_fragment:Dd,lights_phong_pars_fragment:Ld,lights_physical_fragment:Nd,lights_physical_pars_fragment:Id,lights_fragment_begin:Ud,lights_fragment_maps:Fd,lights_fragment_end:Od,logdepthbuf_fragment:Bd,logdepthbuf_pars_fragment:zd,logdepthbuf_pars_vertex:Hd,logdepthbuf_vertex:kd,map_fragment:Vd,map_pars_fragment:Gd,map_particle_fragment:Wd,map_particle_pars_fragment:Xd,metalnessmap_fragment:jd,metalnessmap_pars_fragment:Yd,morphinstance_vertex:qd,morphcolor_vertex:Zd,morphnormal_vertex:$d,morphtarget_pars_vertex:Kd,morphtarget_vertex:Jd,normal_fragment_begin:Qd,normal_fragment_maps:ef,normal_pars_fragment:tf,normal_pars_vertex:nf,normal_vertex:rf,normalmap_pars_fragment:sf,clearcoat_normal_fragment_begin:of,clearcoat_normal_fragment_maps:af,clearcoat_pars_fragment:lf,iridescence_pars_fragment:cf,opaque_fragment:uf,packing:hf,premultiplied_alpha_fragment:df,project_vertex:ff,dithering_fragment:pf,dithering_pars_fragment:mf,roughnessmap_fragment:gf,roughnessmap_pars_fragment:_f,shadowmap_pars_fragment:vf,shadowmap_pars_vertex:xf,shadowmap_vertex:yf,shadowmask_pars_fragment:Sf,skinbase_vertex:Mf,skinning_pars_vertex:Ef,skinning_vertex:bf,skinnormal_vertex:Tf,specularmap_fragment:Af,specularmap_pars_fragment:wf,tonemapping_fragment:Rf,tonemapping_pars_fragment:Cf,transmission_fragment:Pf,transmission_pars_fragment:Df,uv_pars_fragment:Lf,uv_pars_vertex:Nf,uv_vertex:If,worldpos_vertex:Uf,background_vert:Ff,background_frag:Of,backgroundCube_vert:Bf,backgroundCube_frag:zf,cube_vert:Hf,cube_frag:kf,depth_vert:Vf,depth_frag:Gf,distanceRGBA_vert:Wf,distanceRGBA_frag:Xf,equirect_vert:jf,equirect_frag:Yf,linedashed_vert:qf,linedashed_frag:Zf,meshbasic_vert:$f,meshbasic_frag:Kf,meshlambert_vert:Jf,meshlambert_frag:Qf,meshmatcap_vert:ep,meshmatcap_frag:tp,meshnormal_vert:np,meshnormal_frag:ip,meshphong_vert:rp,meshphong_frag:sp,meshphysical_vert:op,meshphysical_frag:ap,meshtoon_vert:lp,meshtoon_frag:cp,points_vert:up,points_frag:hp,shadow_vert:dp,shadow_frag:fp,sprite_vert:pp,sprite_frag:mp},be={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},Zt={basic:{uniforms:bt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:bt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new $e(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:bt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:bt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:bt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new $e(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:bt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:bt([be.points,be.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:bt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:bt([be.common,be.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:bt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:bt([be.sprite,be.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:bt([be.common,be.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:bt([be.lights,be.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Zt.physical={uniforms:bt([Zt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const yr={r:0,b:0,g:0},In=new en,gp=new at;function _p(i,e,t,n,r,s,o){const a=new $e(0);let c=s===!0?0:1,l,u,h=null,f=0,p=null;function g(E){let x=E.isScene===!0?E.background:null;return x&&x.isTexture&&(x=(E.backgroundBlurriness>0?t:e).get(x)),x}function v(E){let x=!1;const P=g(E);P===null?d(a,c):P&&P.isColor&&(d(P,1),x=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,x){const P=g(x);P&&(P.isCubeTexture||P.mapping===Gr)?(u===void 0&&(u=new ut(new Tn(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:_i(Zt.backgroundCube.uniforms),vertexShader:Zt.backgroundCube.vertexShader,fragmentShader:Zt.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,L,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),In.copy(x.backgroundRotation),In.x*=-1,In.y*=-1,In.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(In.y*=-1,In.z*=-1),u.material.uniforms.envMap.value=P,u.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(gp.makeRotationFromEuler(In)),u.material.toneMapped=tt.getTransfer(P.colorSpace)!==it,(h!==P||f!==P.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=P,f=P.version,p=i.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):P&&P.isTexture&&(l===void 0&&(l=new ut(new jr(2,2),new wn({name:"BackgroundMaterial",uniforms:_i(Zt.background.uniforms),vertexShader:Zt.background.vertexShader,fragmentShader:Zt.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=P,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=tt.getTransfer(P.colorSpace)!==it,P.matrixAutoUpdate===!0&&P.updateMatrix(),l.material.uniforms.uvTransform.value.copy(P.matrix),(h!==P||f!==P.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=P,f=P.version,p=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function d(E,x){E.getRGB(yr,Ol(i)),n.buffers.color.setClear(yr.r,yr.g,yr.b,x,o)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,x=1){a.set(E),c=x,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,d(a,c)},render:v,addToRenderList:m,dispose:T}}function vp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,o=!1;function a(y,w,k,Z,O){let z=!1;const V=h(Z,k,w);s!==V&&(s=V,l(s.object)),z=p(y,Z,k,O),z&&g(y,Z,k,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,x(y,w,k,Z),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,w,k){const Z=k.wireframe===!0;let O=n[y.id];O===void 0&&(O={},n[y.id]=O);let z=O[w.id];z===void 0&&(z={},O[w.id]=z);let V=z[Z];return V===void 0&&(V=f(c()),z[Z]=V),V}function f(y){const w=[],k=[],Z=[];for(let O=0;O<t;O++)w[O]=0,k[O]=0,Z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:k,attributeDivisors:Z,object:y,attributes:{},index:null}}function p(y,w,k,Z){const O=s.attributes,z=w.attributes;let V=0;const Y=k.getAttributes();for(const B in Y)if(Y[B].location>=0){const le=O[B];let j=z[B];if(j===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(j=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(j=y.instanceColor)),le===void 0||le.attribute!==j||j&&le.data!==j.data)return!0;V++}return s.attributesNum!==V||s.index!==Z}function g(y,w,k,Z){const O={},z=w.attributes;let V=0;const Y=k.getAttributes();for(const B in Y)if(Y[B].location>=0){let le=z[B];le===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(le=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(le=y.instanceColor));const j={};j.attribute=le,le&&le.data&&(j.data=le.data),O[B]=j,V++}s.attributes=O,s.attributesNum=V,s.index=Z}function v(){const y=s.newAttributes;for(let w=0,k=y.length;w<k;w++)y[w]=0}function m(y){d(y,0)}function d(y,w){const k=s.newAttributes,Z=s.enabledAttributes,O=s.attributeDivisors;k[y]=1,Z[y]===0&&(i.enableVertexAttribArray(y),Z[y]=1),O[y]!==w&&(i.vertexAttribDivisor(y,w),O[y]=w)}function T(){const y=s.newAttributes,w=s.enabledAttributes;for(let k=0,Z=w.length;k<Z;k++)w[k]!==y[k]&&(i.disableVertexAttribArray(k),w[k]=0)}function E(y,w,k,Z,O,z,V){V===!0?i.vertexAttribIPointer(y,w,k,O,z):i.vertexAttribPointer(y,w,k,Z,O,z)}function x(y,w,k,Z){v();const O=Z.attributes,z=k.getAttributes(),V=w.defaultAttributeValues;for(const Y in z){const B=z[Y];if(B.location>=0){let $=O[Y];if($===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&($=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&($=y.instanceColor)),$!==void 0){const le=$.normalized,j=$.itemSize,De=e.get($);if(De===void 0)continue;const Be=De.buffer,we=De.type,Ve=De.bytesPerElement,X=we===i.INT||we===i.UNSIGNED_INT||$.gpuType===No;if($.isInterleavedBufferAttribute){const te=$.data,oe=te.stride,ve=$.offset;if(te.isInstancedInterleavedBuffer){for(let Me=0;Me<B.locationSize;Me++)d(B.location+Me,te.meshPerAttribute);y.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Me=0;Me<B.locationSize;Me++)m(B.location+Me);i.bindBuffer(i.ARRAY_BUFFER,Be);for(let Me=0;Me<B.locationSize;Me++)E(B.location+Me,j/B.locationSize,we,le,oe*Ve,(ve+j/B.locationSize*Me)*Ve,X)}else{if($.isInstancedBufferAttribute){for(let te=0;te<B.locationSize;te++)d(B.location+te,$.meshPerAttribute);y.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let te=0;te<B.locationSize;te++)m(B.location+te);i.bindBuffer(i.ARRAY_BUFFER,Be);for(let te=0;te<B.locationSize;te++)E(B.location+te,j/B.locationSize,we,le,j*Ve,j/B.locationSize*te*Ve,X)}}else if(V!==void 0){const le=V[Y];if(le!==void 0)switch(le.length){case 2:i.vertexAttrib2fv(B.location,le);break;case 3:i.vertexAttrib3fv(B.location,le);break;case 4:i.vertexAttrib4fv(B.location,le);break;default:i.vertexAttrib1fv(B.location,le)}}}}T()}function P(){N();for(const y in n){const w=n[y];for(const k in w){const Z=w[k];for(const O in Z)u(Z[O].object),delete Z[O];delete w[k]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const w=n[y.id];for(const k in w){const Z=w[k];for(const O in Z)u(Z[O].object),delete Z[O];delete w[k]}delete n[y.id]}function L(y){for(const w in n){const k=n[w];if(k[y.id]===void 0)continue;const Z=k[y.id];for(const O in Z)u(Z[O].object),delete Z[O];delete k[y.id]}}function N(){S(),o=!0,s!==r&&(s=r,l(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:N,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function xp(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];t.update(p,n,1)}function c(l,u,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let v=0;v<h;v++)g+=u[v]*f[v];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function yp(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(L){return!(L!==Yt&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){const N=L===ji&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Qt&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==hn&&!N)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:P,maxSamples:A}}function Sp(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new yn,a=new Ye,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||n!==0||r;return r=f,n=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,d=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const T=s?0:n,E=T*4;let x=d.clippingState||null;c.value=x,x=u(g,f,E,p);for(let P=0;P!==E;++P)x[P]=t[P];d.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,p,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const d=p+v*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<d)&&(m=new Float32Array(d));for(let E=0,x=p;E!==v;++E,x+=4)o.copy(h[E]).applyMatrix4(T,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Mp(i){let e=new WeakMap;function t(o,a){return a===Xs?o.mapping=pi:a===js&&(o.mapping=mi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Xs||a===js)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Ou(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const ci=4,ka=[.125,.215,.35,.446,.526,.582],Bn=20,ws=new Ql,Va=new $e;let Rs=null,Cs=0,Ps=0,Ds=!1;const Fn=(1+Math.sqrt(5))/2,oi=1/Fn,Ga=[new I(-Fn,oi,0),new I(Fn,oi,0),new I(-oi,0,Fn),new I(oi,0,Fn),new I(0,Fn,-oi),new I(0,Fn,oi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],Ep=new I;class Wa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){const{size:o=256,position:a=Ep}=s;Rs=this._renderer.getRenderTarget(),Cs=this._renderer.getActiveCubeFace(),Ps=this._renderer.getActiveMipmapLevel(),Ds=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ya(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ja(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Rs,Cs,Ps),this._renderer.xr.enabled=Ds,e.scissorTest=!1,Sr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===pi||e.mapping===mi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rs=this._renderer.getRenderTarget(),Cs=this._renderer.getActiveCubeFace(),Ps=this._renderer.getActiveMipmapLevel(),Ds=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:$t,minFilter:$t,generateMipmaps:!1,type:ji,format:Yt,colorSpace:gi,depthBuffer:!1},r=Xa(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xa(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bp(s)),this._blurMaterial=Tp(s,e,t)}return r}_compileMaterial(e){const t=new ut(this._lodPlanes[0],e);this._renderer.compile(t,ws)}_sceneToCubeUV(e,t,n,r,s){const c=new kt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(Va),h.toneMapping=bn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const v=new Or({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1}),m=new ut(new Tn,v);let d=!1;const T=e.background;T?T.isColor&&(v.color.copy(T),e.background=null,d=!0):(v.color.copy(Va),d=!0);for(let E=0;E<6;E++){const x=E%3;x===0?(c.up.set(0,l[E],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[E],s.y,s.z)):x===1?(c.up.set(0,0,l[E]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[E],s.z)):(c.up.set(0,l[E],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[E]));const P=this._cubeSize;Sr(r,x*P,E>2?P:0,P,P),h.setRenderTarget(r),d&&h.render(m,c),h.render(e,c)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=p,h.autoClear=f,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===pi||e.mapping===mi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ya()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ja());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ut(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Sr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,ws)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ga[(r-s-1)%Ga.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ut(this._lodPlanes[r],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Bn-1),v=s/g,m=isFinite(s)?1+Math.floor(u*v):Bn;m>Bn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bn}`);const d=[];let T=0;for(let L=0;L<Bn;++L){const N=L/v,S=Math.exp(-N*N/2);d.push(S),L===0?T+=S:L<m&&(T+=2*S)}for(let L=0;L<d.length;L++)d[L]=d[L]/T;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-n;const x=this._sizeLods[r],P=3*x*(r>E-ci?r-E+ci:0),A=4*(this._cubeSize-x);Sr(t,P,A,3*x,2*x),c.setRenderTarget(t),c.render(h,ws)}}function bp(i){const e=[],t=[],n=[];let r=i;const s=i-ci+1+ka.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>i-ci?c=ka[o-i+ci-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,v=3,m=2,d=1,T=new Float32Array(v*g*p),E=new Float32Array(m*g*p),x=new Float32Array(d*g*p);for(let A=0;A<p;A++){const L=A%3*2/3-1,N=A>2?0:-1,S=[L,N,0,L+2/3,N,0,L+2/3,N+1,0,L,N,0,L+2/3,N+1,0,L,N+1,0];T.set(S,v*g*A),E.set(f,m*g*A);const y=[A,A,A,A,A,A];x.set(y,d*g*A)}const P=new Dt;P.setAttribute("position",new Jt(T,v)),P.setAttribute("uv",new Jt(E,m)),P.setAttribute("faceIndex",new Jt(x,d)),e.push(P),r>ci&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Xa(i,e,t){const n=new Gn(i,e,t);return n.texture.mapping=Gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Sr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Tp(i,e,t){const n=new Float32Array(Bn),r=new I(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:Bn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function ja(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Ya(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function qo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ap(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Xs||c===js,u=c===pi||c===mi;if(l||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Wa(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return l&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new Wa(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function wp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Vi("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Rp(i,e,t,n){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const p in f)e.update(f[p],i.ARRAY_BUFFER)}function l(h){const f=[],p=h.index,g=h.attributes.position;let v=0;if(p!==null){const T=p.array;v=p.version;for(let E=0,x=T.length;E<x;E+=3){const P=T[E+0],A=T[E+1],L=T[E+2];f.push(P,A,A,L,L,P)}}else if(g!==void 0){const T=g.array;v=g.version;for(let E=0,x=T.length/3-1;E<x;E+=3){const P=E+0,A=E+1,L=E+2;f.push(P,A,A,L,L,P)}}else return;const m=new(Ll(f)?Fl:Ul)(f,1);m.version=v;const d=s.get(h);d&&e.remove(d),s.set(h,m)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Cp(i,e,t){let n;function r(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,p){i.drawElements(n,p,s,f*o),t.update(p,n,1)}function l(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,s,f*o,g),t.update(p,n,g))}function u(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,n,1)}function h(f,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/o,p[d],v[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,f,0,v,0,g);let d=0;for(let T=0;T<g;T++)d+=p[T]*v[T];t.update(d,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Pp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Dp(i,e,t){const n=new WeakMap,r=new ft;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let S=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let E=0;p===!0&&(E=1),g===!0&&(E=2),v===!0&&(E=3);let x=a.attributes.position.count*E,P=1;x>e.maxTextureSize&&(P=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const A=new Float32Array(x*P*4*h),L=new Nl(A,x,P,h);L.type=hn,L.needsUpdate=!0;const N=E*4;for(let y=0;y<h;y++){const w=m[y],k=d[y],Z=T[y],O=x*P*4*y;for(let z=0;z<w.count;z++){const V=z*N;p===!0&&(r.fromBufferAttribute(w,z),A[O+V+0]=r.x,A[O+V+1]=r.y,A[O+V+2]=r.z,A[O+V+3]=0),g===!0&&(r.fromBufferAttribute(k,z),A[O+V+4]=r.x,A[O+V+5]=r.y,A[O+V+6]=r.z,A[O+V+7]=0),v===!0&&(r.fromBufferAttribute(Z,z),A[O+V+8]=r.x,A[O+V+9]=r.y,A[O+V+10]=r.z,A[O+V+11]=Z.itemSize===4?r.w:1)}}f={count:h,texture:L,size:new me(x,P)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function Lp(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==l&&(e.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return h}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}const tc=new Tt,qa=new kl(1,1),nc=new Nl,ic=new yu,rc=new zl,Za=[],$a=[],Ka=new Float32Array(16),Ja=new Float32Array(9),Qa=new Float32Array(4);function Si(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Za[r];if(s===void 0&&(s=new Float32Array(r),Za[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function _t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Yr(i,e){let t=$a[e];t===void 0&&(t=new Int32Array(e),$a[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Np(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2fv(this.addr,e),vt(t,e)}}function Up(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;i.uniform3fv(this.addr,e),vt(t,e)}}function Fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4fv(this.addr,e),vt(t,e)}}function Op(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Qa.set(n),i.uniformMatrix2fv(this.addr,!1,Qa),vt(t,n)}}function Bp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Ja.set(n),i.uniformMatrix3fv(this.addr,!1,Ja),vt(t,n)}}function zp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Ka.set(n),i.uniformMatrix4fv(this.addr,!1,Ka),vt(t,n)}}function Hp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2iv(this.addr,e),vt(t,e)}}function Vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3iv(this.addr,e),vt(t,e)}}function Gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4iv(this.addr,e),vt(t,e)}}function Wp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Xp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2uiv(this.addr,e),vt(t,e)}}function jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3uiv(this.addr,e),vt(t,e)}}function Yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4uiv(this.addr,e),vt(t,e)}}function qp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(qa.compareFunction=Dl,s=qa):s=tc,t.setTexture2D(e||s,r)}function Zp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||ic,r)}function $p(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||rc,r)}function Kp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||nc,r)}function Jp(i){switch(i){case 5126:return Np;case 35664:return Ip;case 35665:return Up;case 35666:return Fp;case 35674:return Op;case 35675:return Bp;case 35676:return zp;case 5124:case 35670:return Hp;case 35667:case 35671:return kp;case 35668:case 35672:return Vp;case 35669:case 35673:return Gp;case 5125:return Wp;case 36294:return Xp;case 36295:return jp;case 36296:return Yp;case 35678:case 36198:case 36298:case 36306:case 35682:return qp;case 35679:case 36299:case 36307:return Zp;case 35680:case 36300:case 36308:case 36293:return $p;case 36289:case 36303:case 36311:case 36292:return Kp}}function Qp(i,e){i.uniform1fv(this.addr,e)}function e0(i,e){const t=Si(e,this.size,2);i.uniform2fv(this.addr,t)}function t0(i,e){const t=Si(e,this.size,3);i.uniform3fv(this.addr,t)}function n0(i,e){const t=Si(e,this.size,4);i.uniform4fv(this.addr,t)}function i0(i,e){const t=Si(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function r0(i,e){const t=Si(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function s0(i,e){const t=Si(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function o0(i,e){i.uniform1iv(this.addr,e)}function a0(i,e){i.uniform2iv(this.addr,e)}function l0(i,e){i.uniform3iv(this.addr,e)}function c0(i,e){i.uniform4iv(this.addr,e)}function u0(i,e){i.uniform1uiv(this.addr,e)}function h0(i,e){i.uniform2uiv(this.addr,e)}function d0(i,e){i.uniform3uiv(this.addr,e)}function f0(i,e){i.uniform4uiv(this.addr,e)}function p0(i,e,t){const n=this.cache,r=e.length,s=Yr(t,r);_t(n,s)||(i.uniform1iv(this.addr,s),vt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||tc,s[o])}function m0(i,e,t){const n=this.cache,r=e.length,s=Yr(t,r);_t(n,s)||(i.uniform1iv(this.addr,s),vt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||ic,s[o])}function g0(i,e,t){const n=this.cache,r=e.length,s=Yr(t,r);_t(n,s)||(i.uniform1iv(this.addr,s),vt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||rc,s[o])}function _0(i,e,t){const n=this.cache,r=e.length,s=Yr(t,r);_t(n,s)||(i.uniform1iv(this.addr,s),vt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||nc,s[o])}function v0(i){switch(i){case 5126:return Qp;case 35664:return e0;case 35665:return t0;case 35666:return n0;case 35674:return i0;case 35675:return r0;case 35676:return s0;case 5124:case 35670:return o0;case 35667:case 35671:return a0;case 35668:case 35672:return l0;case 35669:case 35673:return c0;case 5125:return u0;case 36294:return h0;case 36295:return d0;case 36296:return f0;case 35678:case 36198:case 36298:case 36306:case 35682:return p0;case 35679:case 36299:case 36307:return m0;case 35680:case 36300:case 36308:case 36293:return g0;case 36289:case 36303:case 36311:case 36292:return _0}}class x0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Jp(t.type)}}class y0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=v0(t.type)}}class S0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Ls=/(\w+)(\])?(\[|\.)?/g;function el(i,e){i.seq.push(e),i.map[e.id]=e}function M0(i,e,t){const n=i.name,r=n.length;for(Ls.lastIndex=0;;){const s=Ls.exec(n),o=Ls.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){el(t,l===void 0?new x0(a,i,e):new y0(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new S0(a),el(t,h)),t=h}}}class Dr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);M0(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function tl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const E0=37297;let b0=0;function T0(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const nl=new Ye;function A0(i){tt._getMatrix(nl,tt.workingColorSpace,i);const e=`mat3( ${nl.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case Ir:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function il(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+T0(i.getShaderSource(e),a)}else return s}function w0(i,e){const t=A0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function R0(i,e){let t;switch(e){case Yc:t="Linear";break;case qc:t="Reinhard";break;case Zc:t="Cineon";break;case $c:t="ACESFilmic";break;case Jc:t="AgX";break;case Qc:t="Neutral";break;case Kc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Mr=new I;function C0(){tt.getLuminanceCoefficients(Mr);const i=Mr.x.toFixed(4),e=Mr.y.toFixed(4),t=Mr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Di).join(`
`)}function D0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function L0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Di(i){return i!==""}function rl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const N0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Do(i){return i.replace(N0,U0)}const I0=new Map;function U0(i,e){let t=qe[e];if(t===void 0){const n=I0.get(e);if(n!==void 0)t=qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Do(t)}const F0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ol(i){return i.replace(F0,O0)}function O0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function al(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function B0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===vl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===xl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ln&&(e="SHADOWMAP_TYPE_VSM"),e}function z0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case pi:case mi:e="ENVMAP_TYPE_CUBE";break;case Gr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function H0(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===mi&&(e="ENVMAP_MODE_REFRACTION"),e}function k0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case yl:e="ENVMAP_BLENDING_MULTIPLY";break;case Xc:e="ENVMAP_BLENDING_MIX";break;case jc:e="ENVMAP_BLENDING_ADD";break}return e}function V0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function G0(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=B0(t),l=z0(t),u=H0(t),h=k0(t),f=V0(t),p=P0(t),g=D0(s),v=r.createProgram();let m,d,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Di).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Di).join(`
`),d.length>0&&(d+=`
`)):(m=[al(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Di).join(`
`),d=[al(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bn?"#define TONE_MAPPING":"",t.toneMapping!==bn?qe.tonemapping_pars_fragment:"",t.toneMapping!==bn?R0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,w0("linearToOutputTexel",t.outputColorSpace),C0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Di).join(`
`)),o=Do(o),o=rl(o,t),o=sl(o,t),a=Do(a),a=rl(a,t),a=sl(a,t),o=ol(o),a=ol(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===ua?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ua?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=T+m+o,x=T+d+a,P=tl(r,r.VERTEX_SHADER,E),A=tl(r,r.FRAGMENT_SHADER,x);r.attachShader(v,P),r.attachShader(v,A),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function L(w){if(i.debug.checkShaderErrors){const k=r.getProgramInfoLog(v)||"",Z=r.getShaderInfoLog(P)||"",O=r.getShaderInfoLog(A)||"",z=k.trim(),V=Z.trim(),Y=O.trim();let B=!0,$=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,P,A);else{const le=il(r,P,"vertex"),j=il(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+z+`
`+le+`
`+j)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(V===""||Y==="")&&($=!1);$&&(w.diagnostics={runnable:B,programLog:z,vertexShader:{log:V,prefix:m},fragmentShader:{log:Y,prefix:d}})}r.deleteShader(P),r.deleteShader(A),N=new Dr(r,v),S=L0(r,v)}let N;this.getUniforms=function(){return N===void 0&&L(this),N};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(v,E0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=b0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=A,this}let W0=0;class X0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new j0(e),t.set(e,n)),n}}class j0{constructor(e){this.id=W0++,this.code=e,this.usedTimes=0}}function Y0(i,e,t,n,r,s,o){const a=new Ho,c=new X0,l=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,y,w,k,Z){const O=k.fog,z=Z.geometry,V=S.isMeshStandardMaterial?k.environment:null,Y=(S.isMeshStandardMaterial?t:e).get(S.envMap||V),B=Y&&Y.mapping===Gr?Y.image.height:null,$=g[S.type];S.precision!==null&&(p=r.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const le=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,j=le!==void 0?le.length:0;let De=0;z.morphAttributes.position!==void 0&&(De=1),z.morphAttributes.normal!==void 0&&(De=2),z.morphAttributes.color!==void 0&&(De=3);let Be,we,Ve,X;if($){const Qe=Zt[$];Be=Qe.vertexShader,we=Qe.fragmentShader}else Be=S.vertexShader,we=S.fragmentShader,c.update(S),Ve=c.getVertexShaderID(S),X=c.getFragmentShaderID(S);const te=i.getRenderTarget(),oe=i.state.buffers.depth.getReversed(),ve=Z.isInstancedMesh===!0,Me=Z.isBatchedMesh===!0,Le=!!S.map,je=!!S.matcap,C=!!Y,ce=!!S.aoMap,ie=!!S.lightMap,se=!!S.bumpMap,re=!!S.normalMap,de=!!S.displacementMap,ue=!!S.emissiveMap,Q=!!S.metalnessMap,ye=!!S.roughnessMap,ge=S.anisotropy>0,b=S.clearcoat>0,_=S.dispersion>0,F=S.iridescence>0,q=S.sheen>0,ae=S.transmission>0,ne=ge&&!!S.anisotropyMap,Ce=b&&!!S.clearcoatMap,_e=b&&!!S.clearcoatNormalMap,Ne=b&&!!S.clearcoatRoughnessMap,Ie=F&&!!S.iridescenceMap,he=F&&!!S.iridescenceThicknessMap,Te=q&&!!S.sheenColorMap,He=q&&!!S.sheenRoughnessMap,Fe=!!S.specularMap,Ee=!!S.specularColorMap,Xe=!!S.specularIntensityMap,U=ae&&!!S.transmissionMap,fe=ae&&!!S.thicknessMap,xe=!!S.gradientMap,D=!!S.alphaMap,G=S.alphaTest>0,K=!!S.alphaHash,Se=!!S.extensions;let Ge=bn;S.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Ge=i.toneMapping);const Je={shaderID:$,shaderType:S.type,shaderName:S.name,vertexShader:Be,fragmentShader:we,defines:S.defines,customVertexShaderID:Ve,customFragmentShaderID:X,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Me,batchingColor:Me&&Z._colorsTexture!==null,instancing:ve,instancingColor:ve&&Z.instanceColor!==null,instancingMorph:ve&&Z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:gi,alphaToCoverage:!!S.alphaToCoverage,map:Le,matcap:je,envMap:C,envMapMode:C&&Y.mapping,envMapCubeUVHeight:B,aoMap:ce,lightMap:ie,bumpMap:se,normalMap:re,displacementMap:f&&de,emissiveMap:ue,normalMapObjectSpace:re&&S.normalMapType===iu,normalMapTangentSpace:re&&S.normalMapType===Pl,metalnessMap:Q,roughnessMap:ye,anisotropy:ge,anisotropyMap:ne,clearcoat:b,clearcoatMap:Ce,clearcoatNormalMap:_e,clearcoatRoughnessMap:Ne,dispersion:_,iridescence:F,iridescenceMap:Ie,iridescenceThicknessMap:he,sheen:q,sheenColorMap:Te,sheenRoughnessMap:He,specularMap:Fe,specularColorMap:Ee,specularIntensityMap:Xe,transmission:ae,transmissionMap:U,thicknessMap:fe,gradientMap:xe,opaque:S.transparent===!1&&S.blending===hi&&S.alphaToCoverage===!1,alphaMap:D,alphaTest:G,alphaHash:K,combine:S.combine,mapUv:Le&&v(S.map.channel),aoMapUv:ce&&v(S.aoMap.channel),lightMapUv:ie&&v(S.lightMap.channel),bumpMapUv:se&&v(S.bumpMap.channel),normalMapUv:re&&v(S.normalMap.channel),displacementMapUv:de&&v(S.displacementMap.channel),emissiveMapUv:ue&&v(S.emissiveMap.channel),metalnessMapUv:Q&&v(S.metalnessMap.channel),roughnessMapUv:ye&&v(S.roughnessMap.channel),anisotropyMapUv:ne&&v(S.anisotropyMap.channel),clearcoatMapUv:Ce&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:_e&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:he&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:He&&v(S.sheenRoughnessMap.channel),specularMapUv:Fe&&v(S.specularMap.channel),specularColorMapUv:Ee&&v(S.specularColorMap.channel),specularIntensityMapUv:Xe&&v(S.specularIntensityMap.channel),transmissionMapUv:U&&v(S.transmissionMap.channel),thicknessMapUv:fe&&v(S.thicknessMap.channel),alphaMapUv:D&&v(S.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(re||ge),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:Z.isPoints===!0&&!!z.attributes.uv&&(Le||D),fog:!!O,useFog:S.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:oe,skinning:Z.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:De,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ge,decodeVideoTexture:Le&&S.map.isVideoTexture===!0&&tt.getTransfer(S.map.colorSpace)===it,decodeVideoTextureEmissive:ue&&S.emissiveMap.isVideoTexture===!0&&tt.getTransfer(S.emissiveMap.colorSpace)===it,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===cn,flipSided:S.side===Pt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Se&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&S.extensions.multiDraw===!0||Me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Je.vertexUv1s=l.has(1),Je.vertexUv2s=l.has(2),Je.vertexUv3s=l.has(3),l.clear(),Je}function d(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const w in S.defines)y.push(w),y.push(S.defines[w]);return S.isRawShaderMaterial===!1&&(T(y,S),E(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function T(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function E(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function x(S){const y=g[S.type];let w;if(y){const k=Zt[y];w=Nu.clone(k.uniforms)}else w=S.uniforms;return w}function P(S,y){let w;for(let k=0,Z=u.length;k<Z;k++){const O=u[k];if(O.cacheKey===y){w=O,++w.usedTimes;break}}return w===void 0&&(w=new G0(i,y,S,s),u.push(w)),w}function A(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),S.destroy()}}function L(S){c.remove(S)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:P,releaseProgram:A,releaseShaderCache:L,programs:u,dispose:N}}function q0(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Z0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ll(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function cl(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,f,p,g,v,m){let d=i[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},i[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=v,d.group=m),e++,d}function a(h,f,p,g,v,m){const d=o(h,f,p,g,v,m);p.transmission>0?n.push(d):p.transparent===!0?r.push(d):t.push(d)}function c(h,f,p,g,v,m){const d=o(h,f,p,g,v,m);p.transmission>0?n.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function l(h,f){t.length>1&&t.sort(h||Z0),n.length>1&&n.sort(f||ll),r.length>1&&r.sort(f||ll)}function u(){for(let h=e,f=i.length;h<f;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function $0(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new cl,i.set(n,[o])):r>=s.length?(o=new cl,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function K0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new $e};break;case"SpotLight":t={position:new I,direction:new I,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function J0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Q0=0;function em(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function tm(i){const e=new K0,t=J0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const r=new I,s=new at,o=new at;function a(l){let u=0,h=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,v=0,m=0,d=0,T=0,E=0,x=0,P=0,A=0,L=0;l.sort(em);for(let S=0,y=l.length;S<y;S++){const w=l[S],k=w.color,Z=w.intensity,O=w.distance,z=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)u+=k.r*Z,h+=k.g*Z,f+=k.b*Z;else if(w.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(w.sh.coefficients[V],Z);L++}else if(w.isDirectionalLight){const V=e.get(w);if(V.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const Y=w.shadow,B=t.get(w);B.shadowIntensity=Y.intensity,B.shadowBias=Y.bias,B.shadowNormalBias=Y.normalBias,B.shadowRadius=Y.radius,B.shadowMapSize=Y.mapSize,n.directionalShadow[p]=B,n.directionalShadowMap[p]=z,n.directionalShadowMatrix[p]=w.shadow.matrix,T++}n.directional[p]=V,p++}else if(w.isSpotLight){const V=e.get(w);V.position.setFromMatrixPosition(w.matrixWorld),V.color.copy(k).multiplyScalar(Z),V.distance=O,V.coneCos=Math.cos(w.angle),V.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),V.decay=w.decay,n.spot[v]=V;const Y=w.shadow;if(w.map&&(n.spotLightMap[P]=w.map,P++,Y.updateMatrices(w),w.castShadow&&A++),n.spotLightMatrix[v]=Y.matrix,w.castShadow){const B=t.get(w);B.shadowIntensity=Y.intensity,B.shadowBias=Y.bias,B.shadowNormalBias=Y.normalBias,B.shadowRadius=Y.radius,B.shadowMapSize=Y.mapSize,n.spotShadow[v]=B,n.spotShadowMap[v]=z,x++}v++}else if(w.isRectAreaLight){const V=e.get(w);V.color.copy(k).multiplyScalar(Z),V.halfWidth.set(w.width*.5,0,0),V.halfHeight.set(0,w.height*.5,0),n.rectArea[m]=V,m++}else if(w.isPointLight){const V=e.get(w);if(V.color.copy(w.color).multiplyScalar(w.intensity),V.distance=w.distance,V.decay=w.decay,w.castShadow){const Y=w.shadow,B=t.get(w);B.shadowIntensity=Y.intensity,B.shadowBias=Y.bias,B.shadowNormalBias=Y.normalBias,B.shadowRadius=Y.radius,B.shadowMapSize=Y.mapSize,B.shadowCameraNear=Y.camera.near,B.shadowCameraFar=Y.camera.far,n.pointShadow[g]=B,n.pointShadowMap[g]=z,n.pointShadowMatrix[g]=w.shadow.matrix,E++}n.point[g]=V,g++}else if(w.isHemisphereLight){const V=e.get(w);V.skyColor.copy(w.color).multiplyScalar(Z),V.groundColor.copy(w.groundColor).multiplyScalar(Z),n.hemi[d]=V,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=be.LTC_FLOAT_1,n.rectAreaLTC2=be.LTC_FLOAT_2):(n.rectAreaLTC1=be.LTC_HALF_1,n.rectAreaLTC2=be.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const N=n.hash;(N.directionalLength!==p||N.pointLength!==g||N.spotLength!==v||N.rectAreaLength!==m||N.hemiLength!==d||N.numDirectionalShadows!==T||N.numPointShadows!==E||N.numSpotShadows!==x||N.numSpotMaps!==P||N.numLightProbes!==L)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=x+P-A,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=L,N.directionalLength=p,N.pointLength=g,N.spotLength=v,N.rectAreaLength=m,N.hemiLength=d,N.numDirectionalShadows=T,N.numPointShadows=E,N.numSpotShadows=x,N.numSpotMaps=P,N.numLightProbes=L,n.version=Q0++)}function c(l,u){let h=0,f=0,p=0,g=0,v=0;const m=u.matrixWorldInverse;for(let d=0,T=l.length;d<T;d++){const E=l[d];if(E.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),h++}else if(E.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(E.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),f++}else if(E.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:n}}function ul(i){const e=new tm(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function nm(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new ul(i),e.set(r,[a])):s>=o.length?(a=new ul(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const im=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function sm(i,e,t){let n=new ko;const r=new me,s=new me,o=new ft,a=new bh({depthPacking:nu}),c=new Th,l={},u=t.maxTextureSize,h={[An]:Pt,[Pt]:An,[cn]:cn},f=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:im,fragmentShader:rm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Dt;g.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ut(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vl;let d=this.type;this.render=function(A,L,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),k=i.state;k.setBlending(En),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const Z=d!==ln&&this.type===ln,O=d===ln&&this.type!==ln;for(let z=0,V=A.length;z<V;z++){const Y=A[z],B=Y.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const $=B.getFrameExtents();if(r.multiply($),s.copy(B.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/$.x),r.x=s.x*$.x,B.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/$.y),r.y=s.y*$.y,B.mapSize.y=s.y)),B.map===null||Z===!0||O===!0){const j=this.type!==ln?{minFilter:qt,magFilter:qt}:{};B.map!==null&&B.map.dispose(),B.map=new Gn(r.x,r.y,j),B.map.texture.name=Y.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const le=B.getViewportCount();for(let j=0;j<le;j++){const De=B.getViewport(j);o.set(s.x*De.x,s.y*De.y,s.x*De.z,s.y*De.w),k.viewport(o),B.updateMatrices(Y,j),n=B.getFrustum(),x(L,N,B.camera,Y,this.type)}B.isPointLightShadow!==!0&&this.type===ln&&T(B,N),B.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(S,y,w)};function T(A,L){const N=e.update(v);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Gn(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(L,null,N,f,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(L,null,N,p,v,null)}function E(A,L,N,S){let y=null;const w=N.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(w!==void 0)y=w;else if(y=N.isPointLight===!0?c:a,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const k=y.uuid,Z=L.uuid;let O=l[k];O===void 0&&(O={},l[k]=O);let z=O[Z];z===void 0&&(z=y.clone(),O[Z]=z,L.addEventListener("dispose",P)),y=z}if(y.visible=L.visible,y.wireframe=L.wireframe,S===ln?y.side=L.shadowSide!==null?L.shadowSide:L.side:y.side=L.shadowSide!==null?L.shadowSide:h[L.side],y.alphaMap=L.alphaMap,y.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,y.map=L.map,y.clipShadows=L.clipShadows,y.clippingPlanes=L.clippingPlanes,y.clipIntersection=L.clipIntersection,y.displacementMap=L.displacementMap,y.displacementScale=L.displacementScale,y.displacementBias=L.displacementBias,y.wireframeLinewidth=L.wireframeLinewidth,y.linewidth=L.linewidth,N.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const k=i.properties.get(y);k.light=N}return y}function x(A,L,N,S,y){if(A.visible===!1)return;if(A.layers.test(L.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===ln)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,A.matrixWorld);const Z=e.update(A),O=A.material;if(Array.isArray(O)){const z=Z.groups;for(let V=0,Y=z.length;V<Y;V++){const B=z[V],$=O[B.materialIndex];if($&&$.visible){const le=E(A,$,S,y);A.onBeforeShadow(i,A,L,N,Z,le,B),i.renderBufferDirect(N,null,Z,le,A,B),A.onAfterShadow(i,A,L,N,Z,le,B)}}}else if(O.visible){const z=E(A,O,S,y);A.onBeforeShadow(i,A,L,N,Z,z,null),i.renderBufferDirect(N,null,Z,z,A,null),A.onAfterShadow(i,A,L,N,Z,z,null)}}const k=A.children;for(let Z=0,O=k.length;Z<O;Z++)x(k[Z],L,N,S,y)}function P(A){A.target.removeEventListener("dispose",P);for(const N in l){const S=l[N],y=A.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const om={[Bs]:zs,[Hs]:Gs,[ks]:Ws,[fi]:Vs,[zs]:Bs,[Gs]:Hs,[Ws]:ks,[Vs]:fi};function am(i,e){function t(){let U=!1;const fe=new ft;let xe=null;const D=new ft(0,0,0,0);return{setMask:function(G){xe!==G&&!U&&(i.colorMask(G,G,G,G),xe=G)},setLocked:function(G){U=G},setClear:function(G,K,Se,Ge,Je){Je===!0&&(G*=Ge,K*=Ge,Se*=Ge),fe.set(G,K,Se,Ge),D.equals(fe)===!1&&(i.clearColor(G,K,Se,Ge),D.copy(fe))},reset:function(){U=!1,xe=null,D.set(-1,0,0,0)}}}function n(){let U=!1,fe=!1,xe=null,D=null,G=null;return{setReversed:function(K){if(fe!==K){const Se=e.get("EXT_clip_control");K?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT),fe=K;const Ge=G;G=null,this.setClear(Ge)}},getReversed:function(){return fe},setTest:function(K){K?te(i.DEPTH_TEST):oe(i.DEPTH_TEST)},setMask:function(K){xe!==K&&!U&&(i.depthMask(K),xe=K)},setFunc:function(K){if(fe&&(K=om[K]),D!==K){switch(K){case Bs:i.depthFunc(i.NEVER);break;case zs:i.depthFunc(i.ALWAYS);break;case Hs:i.depthFunc(i.LESS);break;case fi:i.depthFunc(i.LEQUAL);break;case ks:i.depthFunc(i.EQUAL);break;case Vs:i.depthFunc(i.GEQUAL);break;case Gs:i.depthFunc(i.GREATER);break;case Ws:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}D=K}},setLocked:function(K){U=K},setClear:function(K){G!==K&&(fe&&(K=1-K),i.clearDepth(K),G=K)},reset:function(){U=!1,xe=null,D=null,G=null,fe=!1}}}function r(){let U=!1,fe=null,xe=null,D=null,G=null,K=null,Se=null,Ge=null,Je=null;return{setTest:function(Qe){U||(Qe?te(i.STENCIL_TEST):oe(i.STENCIL_TEST))},setMask:function(Qe){fe!==Qe&&!U&&(i.stencilMask(Qe),fe=Qe)},setFunc:function(Qe,Lt,Ot){(xe!==Qe||D!==Lt||G!==Ot)&&(i.stencilFunc(Qe,Lt,Ot),xe=Qe,D=Lt,G=Ot)},setOp:function(Qe,Lt,Ot){(K!==Qe||Se!==Lt||Ge!==Ot)&&(i.stencilOp(Qe,Lt,Ot),K=Qe,Se=Lt,Ge=Ot)},setLocked:function(Qe){U=Qe},setClear:function(Qe){Je!==Qe&&(i.clearStencil(Qe),Je=Qe)},reset:function(){U=!1,fe=null,xe=null,D=null,G=null,K=null,Se=null,Ge=null,Je=null}}}const s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,T=null,E=null,x=null,P=null,A=null,L=new $e(0,0,0),N=0,S=!1,y=null,w=null,k=null,Z=null,O=null;const z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Y=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(B)[1]),V=Y>=1):B.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),V=Y>=2);let $=null,le={};const j=i.getParameter(i.SCISSOR_BOX),De=i.getParameter(i.VIEWPORT),Be=new ft().fromArray(j),we=new ft().fromArray(De);function Ve(U,fe,xe,D){const G=new Uint8Array(4),K=i.createTexture();i.bindTexture(U,K),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Se=0;Se<xe;Se++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(fe,0,i.RGBA,1,1,D,0,i.RGBA,i.UNSIGNED_BYTE,G):i.texImage2D(fe+Se,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,G);return K}const X={};X[i.TEXTURE_2D]=Ve(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=Ve(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=Ve(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=Ve(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),te(i.DEPTH_TEST),o.setFunc(fi),se(!1),re(ra),te(i.CULL_FACE),ce(En);function te(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function oe(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function ve(U,fe){return h[U]!==fe?(i.bindFramebuffer(U,fe),h[U]=fe,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=fe),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=fe),!0):!1}function Me(U,fe){let xe=p,D=!1;if(U){xe=f.get(fe),xe===void 0&&(xe=[],f.set(fe,xe));const G=U.textures;if(xe.length!==G.length||xe[0]!==i.COLOR_ATTACHMENT0){for(let K=0,Se=G.length;K<Se;K++)xe[K]=i.COLOR_ATTACHMENT0+K;xe.length=G.length,D=!0}}else xe[0]!==i.BACK&&(xe[0]=i.BACK,D=!0);D&&i.drawBuffers(xe)}function Le(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const je={[On]:i.FUNC_ADD,[Rc]:i.FUNC_SUBTRACT,[Cc]:i.FUNC_REVERSE_SUBTRACT};je[Pc]=i.MIN,je[Dc]=i.MAX;const C={[Lc]:i.ZERO,[Nc]:i.ONE,[Ic]:i.SRC_COLOR,[Fs]:i.SRC_ALPHA,[Hc]:i.SRC_ALPHA_SATURATE,[Bc]:i.DST_COLOR,[Fc]:i.DST_ALPHA,[Uc]:i.ONE_MINUS_SRC_COLOR,[Os]:i.ONE_MINUS_SRC_ALPHA,[zc]:i.ONE_MINUS_DST_COLOR,[Oc]:i.ONE_MINUS_DST_ALPHA,[kc]:i.CONSTANT_COLOR,[Vc]:i.ONE_MINUS_CONSTANT_COLOR,[Gc]:i.CONSTANT_ALPHA,[Wc]:i.ONE_MINUS_CONSTANT_ALPHA};function ce(U,fe,xe,D,G,K,Se,Ge,Je,Qe){if(U===En){v===!0&&(oe(i.BLEND),v=!1);return}if(v===!1&&(te(i.BLEND),v=!0),U!==wc){if(U!==m||Qe!==S){if((d!==On||x!==On)&&(i.blendEquation(i.FUNC_ADD),d=On,x=On),Qe)switch(U){case hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sa:i.blendFunc(i.ONE,i.ONE);break;case oa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case aa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case oa:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case aa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}T=null,E=null,P=null,A=null,L.set(0,0,0),N=0,m=U,S=Qe}return}G=G||fe,K=K||xe,Se=Se||D,(fe!==d||G!==x)&&(i.blendEquationSeparate(je[fe],je[G]),d=fe,x=G),(xe!==T||D!==E||K!==P||Se!==A)&&(i.blendFuncSeparate(C[xe],C[D],C[K],C[Se]),T=xe,E=D,P=K,A=Se),(Ge.equals(L)===!1||Je!==N)&&(i.blendColor(Ge.r,Ge.g,Ge.b,Je),L.copy(Ge),N=Je),m=U,S=!1}function ie(U,fe){U.side===cn?oe(i.CULL_FACE):te(i.CULL_FACE);let xe=U.side===Pt;fe&&(xe=!xe),se(xe),U.blending===hi&&U.transparent===!1?ce(En):ce(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const D=U.stencilWrite;a.setTest(D),D&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ue(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):oe(i.SAMPLE_ALPHA_TO_COVERAGE)}function se(U){y!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),y=U)}function re(U){U!==Tc?(te(i.CULL_FACE),U!==w&&(U===ra?i.cullFace(i.BACK):U===Ac?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):oe(i.CULL_FACE),w=U}function de(U){U!==k&&(V&&i.lineWidth(U),k=U)}function ue(U,fe,xe){U?(te(i.POLYGON_OFFSET_FILL),(Z!==fe||O!==xe)&&(i.polygonOffset(fe,xe),Z=fe,O=xe)):oe(i.POLYGON_OFFSET_FILL)}function Q(U){U?te(i.SCISSOR_TEST):oe(i.SCISSOR_TEST)}function ye(U){U===void 0&&(U=i.TEXTURE0+z-1),$!==U&&(i.activeTexture(U),$=U)}function ge(U,fe,xe){xe===void 0&&($===null?xe=i.TEXTURE0+z-1:xe=$);let D=le[xe];D===void 0&&(D={type:void 0,texture:void 0},le[xe]=D),(D.type!==U||D.texture!==fe)&&($!==xe&&(i.activeTexture(xe),$=xe),i.bindTexture(U,fe||X[U]),D.type=U,D.texture=fe)}function b(){const U=le[$];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ae(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _e(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ne(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ie(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function he(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(U){Be.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Be.copy(U))}function He(U){we.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),we.copy(U))}function Fe(U,fe){let xe=l.get(fe);xe===void 0&&(xe=new WeakMap,l.set(fe,xe));let D=xe.get(U);D===void 0&&(D=i.getUniformBlockIndex(fe,U.name),xe.set(U,D))}function Ee(U,fe){const D=l.get(fe).get(U);c.get(fe)!==D&&(i.uniformBlockBinding(fe,D,U.__bindingPointIndex),c.set(fe,D))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},$=null,le={},h={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,T=null,E=null,x=null,P=null,A=null,L=new $e(0,0,0),N=0,S=!1,y=null,w=null,k=null,Z=null,O=null,Be.set(0,0,i.canvas.width,i.canvas.height),we.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:te,disable:oe,bindFramebuffer:ve,drawBuffers:Me,useProgram:Le,setBlending:ce,setMaterial:ie,setFlipSided:se,setCullFace:re,setLineWidth:de,setPolygonOffset:ue,setScissorTest:Q,activeTexture:ye,bindTexture:ge,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:F,texImage2D:Ie,texImage3D:he,updateUBOMapping:Fe,uniformBlockBinding:Ee,texStorage2D:_e,texStorage3D:Ne,texSubImage2D:q,texSubImage3D:ae,compressedTexSubImage2D:ne,compressedTexSubImage3D:Ce,scissor:Te,viewport:He,reset:Xe}}function lm(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new me,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return p?new OffscreenCanvas(b,_):Fr("canvas")}function v(b,_,F){let q=1;const ae=ge(b);if((ae.width>F||ae.height>F)&&(q=F/Math.max(ae.width,ae.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const ne=Math.floor(q*ae.width),Ce=Math.floor(q*ae.height);h===void 0&&(h=g(ne,Ce));const _e=_?g(ne,Ce):h;return _e.width=ne,_e.height=Ce,_e.getContext("2d").drawImage(b,0,0,ne,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ne+"x"+Ce+")."),_e}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),b;return b}function m(b){return b.generateMipmaps}function d(b){i.generateMipmap(b)}function T(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(b,_,F,q,ae=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ne=_;if(_===i.RED&&(F===i.FLOAT&&(ne=i.R32F),F===i.HALF_FLOAT&&(ne=i.R16F),F===i.UNSIGNED_BYTE&&(ne=i.R8)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(ne=i.R8UI),F===i.UNSIGNED_SHORT&&(ne=i.R16UI),F===i.UNSIGNED_INT&&(ne=i.R32UI),F===i.BYTE&&(ne=i.R8I),F===i.SHORT&&(ne=i.R16I),F===i.INT&&(ne=i.R32I)),_===i.RG&&(F===i.FLOAT&&(ne=i.RG32F),F===i.HALF_FLOAT&&(ne=i.RG16F),F===i.UNSIGNED_BYTE&&(ne=i.RG8)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(ne=i.RG8UI),F===i.UNSIGNED_SHORT&&(ne=i.RG16UI),F===i.UNSIGNED_INT&&(ne=i.RG32UI),F===i.BYTE&&(ne=i.RG8I),F===i.SHORT&&(ne=i.RG16I),F===i.INT&&(ne=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(ne=i.RGB8UI),F===i.UNSIGNED_SHORT&&(ne=i.RGB16UI),F===i.UNSIGNED_INT&&(ne=i.RGB32UI),F===i.BYTE&&(ne=i.RGB8I),F===i.SHORT&&(ne=i.RGB16I),F===i.INT&&(ne=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(ne=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(ne=i.RGBA16UI),F===i.UNSIGNED_INT&&(ne=i.RGBA32UI),F===i.BYTE&&(ne=i.RGBA8I),F===i.SHORT&&(ne=i.RGBA16I),F===i.INT&&(ne=i.RGBA32I)),_===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(ne=i.R11F_G11F_B10F)),_===i.RGBA){const Ce=ae?Ir:tt.getTransfer(q);F===i.FLOAT&&(ne=i.RGBA32F),F===i.HALF_FLOAT&&(ne=i.RGBA16F),F===i.UNSIGNED_BYTE&&(ne=Ce===it?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function x(b,_){let F;return b?_===null||_===kn||_===zi?F=i.DEPTH24_STENCIL8:_===hn?F=i.DEPTH32F_STENCIL8:_===Bi&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===kn||_===zi?F=i.DEPTH_COMPONENT24:_===hn?F=i.DEPTH_COMPONENT32F:_===Bi&&(F=i.DEPTH_COMPONENT16),F}function P(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==qt&&b.minFilter!==$t?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function A(b){const _=b.target;_.removeEventListener("dispose",A),N(_),_.isVideoTexture&&u.delete(_)}function L(b){const _=b.target;_.removeEventListener("dispose",L),y(_)}function N(b){const _=n.get(b);if(_.__webglInit===void 0)return;const F=b.source,q=f.get(F);if(q){const ae=q[_.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&S(b),Object.keys(q).length===0&&f.delete(F)}n.remove(b)}function S(b){const _=n.get(b);i.deleteTexture(_.__webglTexture);const F=b.source,q=f.get(F);delete q[_.__cacheKey],o.memory.textures--}function y(b){const _=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let ae=0;ae<_.__webglFramebuffer[q].length;ae++)i.deleteFramebuffer(_.__webglFramebuffer[q][ae]);else i.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)i.deleteFramebuffer(_.__webglFramebuffer[q]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=b.textures;for(let q=0,ae=F.length;q<ae;q++){const ne=n.get(F[q]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),o.memory.textures--),n.remove(F[q])}n.remove(b)}let w=0;function k(){w=0}function Z(){const b=w;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),w+=1,b}function O(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function z(b,_){const F=n.get(b);if(b.isVideoTexture&&Q(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&F.__version!==b.version){const q=b.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(F,b,_);return}}else b.isExternalTexture&&(F.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function V(b,_){const F=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){X(F,b,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function Y(b,_){const F=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){X(F,b,_);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function B(b,_){const F=n.get(b);if(b.version>0&&F.__version!==b.version){te(F,b,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}const $={[Ys]:i.REPEAT,[zn]:i.CLAMP_TO_EDGE,[qs]:i.MIRRORED_REPEAT},le={[qt]:i.NEAREST,[eu]:i.NEAREST_MIPMAP_NEAREST,[Ki]:i.NEAREST_MIPMAP_LINEAR,[$t]:i.LINEAR,[Jr]:i.LINEAR_MIPMAP_NEAREST,[Hn]:i.LINEAR_MIPMAP_LINEAR},j={[ru]:i.NEVER,[uu]:i.ALWAYS,[su]:i.LESS,[Dl]:i.LEQUAL,[ou]:i.EQUAL,[cu]:i.GEQUAL,[au]:i.GREATER,[lu]:i.NOTEQUAL};function De(b,_){if(_.type===hn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===$t||_.magFilter===Jr||_.magFilter===Ki||_.magFilter===Hn||_.minFilter===$t||_.minFilter===Jr||_.minFilter===Ki||_.minFilter===Hn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,$[_.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,$[_.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,$[_.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,le[_.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,le[_.minFilter]),_.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,j[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===qt||_.minFilter!==Ki&&_.minFilter!==Hn||_.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Be(b,_){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",A));const q=_.source;let ae=f.get(q);ae===void 0&&(ae={},f.set(q,ae));const ne=O(_);if(ne!==b.__cacheKey){ae[ne]===void 0&&(ae[ne]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),ae[ne].usedTimes++;const Ce=ae[b.__cacheKey];Ce!==void 0&&(ae[b.__cacheKey].usedTimes--,Ce.usedTimes===0&&S(_)),b.__cacheKey=ne,b.__webglTexture=ae[ne].texture}return F}function we(b,_,F){return Math.floor(Math.floor(b/F)/_)}function Ve(b,_,F,q){const ne=b.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,F,q,_.data);else{ne.sort((he,Te)=>he.start-Te.start);let Ce=0;for(let he=1;he<ne.length;he++){const Te=ne[Ce],He=ne[he],Fe=Te.start+Te.count,Ee=we(He.start,_.width,4),Xe=we(Te.start,_.width,4);He.start<=Fe+1&&Ee===Xe&&we(He.start+He.count-1,_.width,4)===Ee?Te.count=Math.max(Te.count,He.start+He.count-Te.start):(++Ce,ne[Ce]=He)}ne.length=Ce+1;const _e=i.getParameter(i.UNPACK_ROW_LENGTH),Ne=i.getParameter(i.UNPACK_SKIP_PIXELS),Ie=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let he=0,Te=ne.length;he<Te;he++){const He=ne[he],Fe=Math.floor(He.start/4),Ee=Math.ceil(He.count/4),Xe=Fe%_.width,U=Math.floor(Fe/_.width),fe=Ee,xe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Xe),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,Xe,U,fe,xe,F,q,_.data)}b.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,_e),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ie)}}function X(b,_,F){let q=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=i.TEXTURE_3D);const ae=Be(b,_),ne=_.source;t.bindTexture(q,b.__webglTexture,i.TEXTURE0+F);const Ce=n.get(ne);if(ne.version!==Ce.__version||ae===!0){t.activeTexture(i.TEXTURE0+F);const _e=tt.getPrimaries(tt.workingColorSpace),Ne=_.colorSpace===Sn?null:tt.getPrimaries(_.colorSpace),Ie=_.colorSpace===Sn||_e===Ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let he=v(_.image,!1,r.maxTextureSize);he=ye(_,he);const Te=s.convert(_.format,_.colorSpace),He=s.convert(_.type);let Fe=E(_.internalFormat,Te,He,_.colorSpace,_.isVideoTexture);De(q,_);let Ee;const Xe=_.mipmaps,U=_.isVideoTexture!==!0,fe=Ce.__version===void 0||ae===!0,xe=ne.dataReady,D=P(_,he);if(_.isDepthTexture)Fe=x(_.format===ki,_.type),fe&&(U?t.texStorage2D(i.TEXTURE_2D,1,Fe,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,Fe,he.width,he.height,0,Te,He,null));else if(_.isDataTexture)if(Xe.length>0){U&&fe&&t.texStorage2D(i.TEXTURE_2D,D,Fe,Xe[0].width,Xe[0].height);for(let G=0,K=Xe.length;G<K;G++)Ee=Xe[G],U?xe&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,Ee.width,Ee.height,Te,He,Ee.data):t.texImage2D(i.TEXTURE_2D,G,Fe,Ee.width,Ee.height,0,Te,He,Ee.data);_.generateMipmaps=!1}else U?(fe&&t.texStorage2D(i.TEXTURE_2D,D,Fe,he.width,he.height),xe&&Ve(_,he,Te,He)):t.texImage2D(i.TEXTURE_2D,0,Fe,he.width,he.height,0,Te,He,he.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){U&&fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,D,Fe,Xe[0].width,Xe[0].height,he.depth);for(let G=0,K=Xe.length;G<K;G++)if(Ee=Xe[G],_.format!==Yt)if(Te!==null)if(U){if(xe)if(_.layerUpdates.size>0){const Se=Ha(Ee.width,Ee.height,_.format,_.type);for(const Ge of _.layerUpdates){const Je=Ee.data.subarray(Ge*Se/Ee.data.BYTES_PER_ELEMENT,(Ge+1)*Se/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,Ge,Ee.width,Ee.height,1,Te,Je)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,Ee.width,Ee.height,he.depth,Te,Ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,G,Fe,Ee.width,Ee.height,he.depth,0,Ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?xe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,Ee.width,Ee.height,he.depth,Te,He,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,G,Fe,Ee.width,Ee.height,he.depth,0,Te,He,Ee.data)}else{U&&fe&&t.texStorage2D(i.TEXTURE_2D,D,Fe,Xe[0].width,Xe[0].height);for(let G=0,K=Xe.length;G<K;G++)Ee=Xe[G],_.format!==Yt?Te!==null?U?xe&&t.compressedTexSubImage2D(i.TEXTURE_2D,G,0,0,Ee.width,Ee.height,Te,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,G,Fe,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?xe&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,Ee.width,Ee.height,Te,He,Ee.data):t.texImage2D(i.TEXTURE_2D,G,Fe,Ee.width,Ee.height,0,Te,He,Ee.data)}else if(_.isDataArrayTexture)if(U){if(fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,D,Fe,he.width,he.height,he.depth),xe)if(_.layerUpdates.size>0){const G=Ha(he.width,he.height,_.format,_.type);for(const K of _.layerUpdates){const Se=he.data.subarray(K*G/he.data.BYTES_PER_ELEMENT,(K+1)*G/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,he.width,he.height,1,Te,He,Se)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Te,He,he.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Fe,he.width,he.height,he.depth,0,Te,He,he.data);else if(_.isData3DTexture)U?(fe&&t.texStorage3D(i.TEXTURE_3D,D,Fe,he.width,he.height,he.depth),xe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Te,He,he.data)):t.texImage3D(i.TEXTURE_3D,0,Fe,he.width,he.height,he.depth,0,Te,He,he.data);else if(_.isFramebufferTexture){if(fe)if(U)t.texStorage2D(i.TEXTURE_2D,D,Fe,he.width,he.height);else{let G=he.width,K=he.height;for(let Se=0;Se<D;Se++)t.texImage2D(i.TEXTURE_2D,Se,Fe,G,K,0,Te,He,null),G>>=1,K>>=1}}else if(Xe.length>0){if(U&&fe){const G=ge(Xe[0]);t.texStorage2D(i.TEXTURE_2D,D,Fe,G.width,G.height)}for(let G=0,K=Xe.length;G<K;G++)Ee=Xe[G],U?xe&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,Te,He,Ee):t.texImage2D(i.TEXTURE_2D,G,Fe,Te,He,Ee);_.generateMipmaps=!1}else if(U){if(fe){const G=ge(he);t.texStorage2D(i.TEXTURE_2D,D,Fe,G.width,G.height)}xe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Te,He,he)}else t.texImage2D(i.TEXTURE_2D,0,Fe,Te,He,he);m(_)&&d(q),Ce.__version=ne.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function te(b,_,F){if(_.image.length!==6)return;const q=Be(b,_),ae=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+F);const ne=n.get(ae);if(ae.version!==ne.__version||q===!0){t.activeTexture(i.TEXTURE0+F);const Ce=tt.getPrimaries(tt.workingColorSpace),_e=_.colorSpace===Sn?null:tt.getPrimaries(_.colorSpace),Ne=_.colorSpace===Sn||Ce===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);const Ie=_.isCompressedTexture||_.image[0].isCompressedTexture,he=_.image[0]&&_.image[0].isDataTexture,Te=[];for(let K=0;K<6;K++)!Ie&&!he?Te[K]=v(_.image[K],!0,r.maxCubemapSize):Te[K]=he?_.image[K].image:_.image[K],Te[K]=ye(_,Te[K]);const He=Te[0],Fe=s.convert(_.format,_.colorSpace),Ee=s.convert(_.type),Xe=E(_.internalFormat,Fe,Ee,_.colorSpace),U=_.isVideoTexture!==!0,fe=ne.__version===void 0||q===!0,xe=ae.dataReady;let D=P(_,He);De(i.TEXTURE_CUBE_MAP,_);let G;if(Ie){U&&fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,D,Xe,He.width,He.height);for(let K=0;K<6;K++){G=Te[K].mipmaps;for(let Se=0;Se<G.length;Se++){const Ge=G[Se];_.format!==Yt?Fe!==null?U?xe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Se,0,0,Ge.width,Ge.height,Fe,Ge.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Se,Xe,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Se,0,0,Ge.width,Ge.height,Fe,Ee,Ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Se,Xe,Ge.width,Ge.height,0,Fe,Ee,Ge.data)}}}else{if(G=_.mipmaps,U&&fe){G.length>0&&D++;const K=ge(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,D,Xe,K.width,K.height)}for(let K=0;K<6;K++)if(he){U?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Te[K].width,Te[K].height,Fe,Ee,Te[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Xe,Te[K].width,Te[K].height,0,Fe,Ee,Te[K].data);for(let Se=0;Se<G.length;Se++){const Je=G[Se].image[K].image;U?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Se+1,0,0,Je.width,Je.height,Fe,Ee,Je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Se+1,Xe,Je.width,Je.height,0,Fe,Ee,Je.data)}}else{U?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Fe,Ee,Te[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Xe,Fe,Ee,Te[K]);for(let Se=0;Se<G.length;Se++){const Ge=G[Se];U?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Se+1,0,0,Fe,Ee,Ge.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Se+1,Xe,Fe,Ee,Ge.image[K])}}}m(_)&&d(i.TEXTURE_CUBE_MAP),ne.__version=ae.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function oe(b,_,F,q,ae,ne){const Ce=s.convert(F.format,F.colorSpace),_e=s.convert(F.type),Ne=E(F.internalFormat,Ce,_e,F.colorSpace),Ie=n.get(_),he=n.get(F);if(he.__renderTarget=_,!Ie.__hasExternalTextures){const Te=Math.max(1,_.width>>ne),He=Math.max(1,_.height>>ne);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,ne,Ne,Te,He,_.depth,0,Ce,_e,null):t.texImage2D(ae,ne,Ne,Te,He,0,Ce,_e,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),ue(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,ae,he.__webglTexture,0,de(_)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,ae,he.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ve(b,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,b),_.depthBuffer){const q=_.depthTexture,ae=q&&q.isDepthTexture?q.type:null,ne=x(_.stencilBuffer,ae),Ce=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=de(_);ue(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,ne,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,ne,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ne,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ce,i.RENDERBUFFER,b)}else{const q=_.textures;for(let ae=0;ae<q.length;ae++){const ne=q[ae],Ce=s.convert(ne.format,ne.colorSpace),_e=s.convert(ne.type),Ne=E(ne.internalFormat,Ce,_e,ne.colorSpace),Ie=de(_);F&&ue(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,Ne,_.width,_.height):ue(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ie,Ne,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Ne,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(_.depthTexture);q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),z(_.depthTexture,0);const ae=q.__webglTexture,ne=de(_);if(_.depthTexture.format===Hi)ue(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(_.depthTexture.format===ki)ue(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function Le(b){const _=n.get(b),F=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const q=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const ae=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",ae)};q.addEventListener("dispose",ae),_.__depthDisposeCallback=ae}_.__boundDepthTexture=q}if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const q=b.texture.mipmaps;q&&q.length>0?Me(_.__webglFramebuffer[0],b):Me(_.__webglFramebuffer,b)}else if(F){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=i.createRenderbuffer(),ve(_.__webglDepthbuffer[q],b,!1);else{const ae=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=_.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,ne)}}else{const q=b.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ve(_.__webglDepthbuffer,b,!1);else{const ae=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(b,_,F){const q=n.get(b);_!==void 0&&oe(q.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Le(b)}function C(b){const _=b.texture,F=n.get(b),q=n.get(_);b.addEventListener("dispose",L);const ae=b.textures,ne=b.isWebGLCubeRenderTarget===!0,Ce=ae.length>1;if(Ce||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=_.version,o.memory.textures++),ne){F.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[_e]=[];for(let Ne=0;Ne<_.mipmaps.length;Ne++)F.__webglFramebuffer[_e][Ne]=i.createFramebuffer()}else F.__webglFramebuffer[_e]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let _e=0;_e<_.mipmaps.length;_e++)F.__webglFramebuffer[_e]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Ce)for(let _e=0,Ne=ae.length;_e<Ne;_e++){const Ie=n.get(ae[_e]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=i.createTexture(),o.memory.textures++)}if(b.samples>0&&ue(b)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let _e=0;_e<ae.length;_e++){const Ne=ae[_e];F.__webglColorRenderbuffer[_e]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[_e]);const Ie=s.convert(Ne.format,Ne.colorSpace),he=s.convert(Ne.type),Te=E(Ne.internalFormat,Ie,he,Ne.colorSpace,b.isXRRenderTarget===!0),He=de(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,He,Te,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,F.__webglColorRenderbuffer[_e])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),ve(F.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),De(i.TEXTURE_CUBE_MAP,_);for(let _e=0;_e<6;_e++)if(_.mipmaps&&_.mipmaps.length>0)for(let Ne=0;Ne<_.mipmaps.length;Ne++)oe(F.__webglFramebuffer[_e][Ne],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ne);else oe(F.__webglFramebuffer[_e],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(_)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let _e=0,Ne=ae.length;_e<Ne;_e++){const Ie=ae[_e],he=n.get(Ie);let Te=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Te=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Te,he.__webglTexture),De(Te,Ie),oe(F.__webglFramebuffer,b,Ie,i.COLOR_ATTACHMENT0+_e,Te,0),m(Ie)&&d(Te)}t.unbindTexture()}else{let _e=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(_e=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,q.__webglTexture),De(_e,_),_.mipmaps&&_.mipmaps.length>0)for(let Ne=0;Ne<_.mipmaps.length;Ne++)oe(F.__webglFramebuffer[Ne],b,_,i.COLOR_ATTACHMENT0,_e,Ne);else oe(F.__webglFramebuffer,b,_,i.COLOR_ATTACHMENT0,_e,0);m(_)&&d(_e),t.unbindTexture()}b.depthBuffer&&Le(b)}function ce(b){const _=b.textures;for(let F=0,q=_.length;F<q;F++){const ae=_[F];if(m(ae)){const ne=T(b),Ce=n.get(ae).__webglTexture;t.bindTexture(ne,Ce),d(ne),t.unbindTexture()}}}const ie=[],se=[];function re(b){if(b.samples>0){if(ue(b)===!1){const _=b.textures,F=b.width,q=b.height;let ae=i.COLOR_BUFFER_BIT;const ne=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ce=n.get(b),_e=_.length>1;if(_e)for(let Ie=0;Ie<_.length;Ie++)t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer);const Ne=b.texture.mipmaps;Ne&&Ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Ie=0;Ie<_.length;Ie++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),_e){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ie]);const he=n.get(_[Ie]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,he,0)}i.blitFramebuffer(0,0,F,q,0,0,F,q,ae,i.NEAREST),c===!0&&(ie.length=0,se.length=0,ie.push(i.COLOR_ATTACHMENT0+Ie),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ie.push(ne),se.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,se)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),_e)for(let Ie=0;Ie<_.length;Ie++){t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ie]);const he=n.get(_[Ie]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.TEXTURE_2D,he,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const _=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function de(b){return Math.min(r.maxSamples,b.samples)}function ue(b){const _=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Q(b){const _=o.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function ye(b,_){const F=b.colorSpace,q=b.format,ae=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||F!==gi&&F!==Sn&&(tt.getTransfer(F)===it?(q!==Yt||ae!==Qt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function ge(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=Z,this.resetTextureUnits=k,this.setTexture2D=z,this.setTexture2DArray=V,this.setTexture3D=Y,this.setTextureCube=B,this.rebindTextures=je,this.setupRenderTarget=C,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=re,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=ue}function cm(i,e){function t(n,r=Sn){let s;const o=tt.getTransfer(r);if(n===Qt)return i.UNSIGNED_BYTE;if(n===Io)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Uo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===bl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Tl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ml)return i.BYTE;if(n===El)return i.SHORT;if(n===Bi)return i.UNSIGNED_SHORT;if(n===No)return i.INT;if(n===kn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===ji)return i.HALF_FLOAT;if(n===Al)return i.ALPHA;if(n===wl)return i.RGB;if(n===Yt)return i.RGBA;if(n===Hi)return i.DEPTH_COMPONENT;if(n===ki)return i.DEPTH_STENCIL;if(n===Rl)return i.RED;if(n===Fo)return i.RED_INTEGER;if(n===Cl)return i.RG;if(n===Oo)return i.RG_INTEGER;if(n===Bo)return i.RGBA_INTEGER;if(n===Ar||n===wr||n===Rr||n===Cr)if(o===it)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ar)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Cr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ar)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Cr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Zs||n===$s||n===Ks||n===Js)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Zs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===$s)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ks)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Js)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qs||n===eo||n===to)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Qs||n===eo)return o===it?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===to)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===no||n===io||n===ro||n===so||n===oo||n===ao||n===lo||n===co||n===uo||n===ho||n===fo||n===po||n===mo||n===go)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===no)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===io)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ro)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===so)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oo)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ao)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lo)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===co)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===uo)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ho)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fo)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===po)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===mo)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===go)return o===it?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_o||n===vo||n===xo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===_o)return o===it?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===vo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yo||n===So||n===Mo||n===Eo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===yo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===So)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Mo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Eo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const um=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class dm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Vl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new wn({vertexShader:um,fragmentShader:hm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new jr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fm extends Xn{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",m=new dm,d={},T=t.getContextAttributes();let E=null,x=null;const P=[],A=[],L=new me;let N=null;const S=new kt;S.viewport=new ft;const y=new kt;y.viewport=new ft;const w=[S,y],k=new Ph;let Z=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let te=P[X];return te===void 0&&(te=new ys,P[X]=te),te.getTargetRaySpace()},this.getControllerGrip=function(X){let te=P[X];return te===void 0&&(te=new ys,P[X]=te),te.getGripSpace()},this.getHand=function(X){let te=P[X];return te===void 0&&(te=new ys,P[X]=te),te.getHandSpace()};function z(X){const te=A.indexOf(X.inputSource);if(te===-1)return;const oe=P[te];oe!==void 0&&(oe.update(X.inputSource,X.frame,l||o),oe.dispatchEvent({type:X.type,data:X.inputSource}))}function V(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",Y);for(let X=0;X<P.length;X++){const te=A[X];te!==null&&(A[X]=null,P[X].disconnect(te))}Z=null,O=null,m.reset();for(const X in d)delete d[X];e.setRenderTarget(E),p=null,f=null,h=null,r=null,x=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",V),r.addEventListener("inputsourceschange",Y),T.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,ve=null,Me=null;T.depth&&(Me=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=T.stencil?ki:Hi,ve=T.stencil?zi:kn);const Le={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(Le),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Gn(f.textureWidth,f.textureHeight,{format:Yt,type:Qt,depthTexture:new kl(f.textureWidth,f.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const oe={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,oe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Gn(p.framebufferWidth,p.framebufferHeight,{format:Yt,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),Ve.setContext(r),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Y(X){for(let te=0;te<X.removed.length;te++){const oe=X.removed[te],ve=A.indexOf(oe);ve>=0&&(A[ve]=null,P[ve].disconnect(oe))}for(let te=0;te<X.added.length;te++){const oe=X.added[te];let ve=A.indexOf(oe);if(ve===-1){for(let Le=0;Le<P.length;Le++)if(Le>=A.length){A.push(oe),ve=Le;break}else if(A[Le]===null){A[Le]=oe,ve=Le;break}if(ve===-1)break}const Me=P[ve];Me&&Me.connect(oe)}}const B=new I,$=new I;function le(X,te,oe){B.setFromMatrixPosition(te.matrixWorld),$.setFromMatrixPosition(oe.matrixWorld);const ve=B.distanceTo($),Me=te.projectionMatrix.elements,Le=oe.projectionMatrix.elements,je=Me[14]/(Me[10]-1),C=Me[14]/(Me[10]+1),ce=(Me[9]+1)/Me[5],ie=(Me[9]-1)/Me[5],se=(Me[8]-1)/Me[0],re=(Le[8]+1)/Le[0],de=je*se,ue=je*re,Q=ve/(-se+re),ye=Q*-se;if(te.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(ye),X.translateZ(Q),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Me[10]===-1)X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const ge=je+Q,b=C+Q,_=de-ye,F=ue+(ve-ye),q=ce*C/b*ge,ae=ie*C/b*ge;X.projectionMatrix.makePerspective(_,F,q,ae,ge,b),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function j(X,te){te===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(te.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let te=X.near,oe=X.far;m.texture!==null&&(m.depthNear>0&&(te=m.depthNear),m.depthFar>0&&(oe=m.depthFar)),k.near=y.near=S.near=te,k.far=y.far=S.far=oe,(Z!==k.near||O!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),Z=k.near,O=k.far),k.layers.mask=X.layers.mask|6,S.layers.mask=k.layers.mask&3,y.layers.mask=k.layers.mask&5;const ve=X.parent,Me=k.cameras;j(k,ve);for(let Le=0;Le<Me.length;Le++)j(Me[Le],ve);Me.length===2?le(k,S,y):k.projectionMatrix.copy(S.projectionMatrix),De(X,k,ve)};function De(X,te,oe){oe===null?X.matrix.copy(te.matrixWorld):(X.matrix.copy(oe.matrixWorld),X.matrix.invert(),X.matrix.multiply(te.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=bo*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(X){return d[X]};let Be=null;function we(X,te){if(u=te.getViewerPose(l||o),g=te,u!==null){const oe=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let ve=!1;oe.length!==k.cameras.length&&(k.cameras.length=0,ve=!0);for(let C=0;C<oe.length;C++){const ce=oe[C];let ie=null;if(p!==null)ie=p.getViewport(ce);else{const re=h.getViewSubImage(f,ce);ie=re.viewport,C===0&&(e.setRenderTargetTextures(x,re.colorTexture,re.depthStencilTexture),e.setRenderTarget(x))}let se=w[C];se===void 0&&(se=new kt,se.layers.enable(C),se.viewport=new ft,w[C]=se),se.matrix.fromArray(ce.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(ce.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(ie.x,ie.y,ie.width,ie.height),C===0&&(k.matrix.copy(se.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),ve===!0&&k.cameras.push(se)}const Me=r.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=n.getBinding();const C=h.getDepthInformation(oe[0]);C&&C.isValid&&C.texture&&m.init(C,r.renderState)}if(Me&&Me.includes("camera-access")&&v){e.state.unbindTexture(),h=n.getBinding();for(let C=0;C<oe.length;C++){const ce=oe[C].camera;if(ce){let ie=d[ce];ie||(ie=new Vl,d[ce]=ie);const se=h.getCameraImage(ce);ie.sourceTexture=se}}}}for(let oe=0;oe<P.length;oe++){const ve=A[oe],Me=P[oe];ve!==null&&Me!==void 0&&Me.update(ve,te,l||o)}Be&&Be(X,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),g=null}const Ve=new ec;Ve.setAnimationLoop(we),this.setAnimationLoop=function(X){Be=X},this.dispose=function(){}}}const Un=new en,pm=new at;function mm(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Ol(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,T,E,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,x)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),v(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,T,E):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Pt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Pt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const T=e.get(d),E=T.envMap,x=T.envMapRotation;E&&(m.envMap.value=E,Un.copy(x),Un.x*=-1,Un.y*=-1,Un.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Un.y*=-1,Un.z*=-1),m.envMapRotation.value.setFromMatrix4(pm.makeRotationFromEuler(Un)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,T,E){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*T,m.scale.value=E*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,T){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Pt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const T=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function gm(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,E){const x=E.program;n.uniformBlockBinding(T,x)}function l(T,E){let x=r[T.id];x===void 0&&(g(T),x=u(T),r[T.id]=x,T.addEventListener("dispose",m));const P=E.program;n.updateUBOMapping(T,P);const A=e.render.frame;s[T.id]!==A&&(f(T),s[T.id]=A)}function u(T){const E=h();T.__bindingPointIndex=E;const x=i.createBuffer(),P=T.__size,A=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,P,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,x),x}function h(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const E=r[T.id],x=T.uniforms,P=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let A=0,L=x.length;A<L;A++){const N=Array.isArray(x[A])?x[A]:[x[A]];for(let S=0,y=N.length;S<y;S++){const w=N[S];if(p(w,A,S,P)===!0){const k=w.__offset,Z=Array.isArray(w.value)?w.value:[w.value];let O=0;for(let z=0;z<Z.length;z++){const V=Z[z],Y=v(V);typeof V=="number"||typeof V=="boolean"?(w.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,k+O,w.__data)):V.isMatrix3?(w.__data[0]=V.elements[0],w.__data[1]=V.elements[1],w.__data[2]=V.elements[2],w.__data[3]=0,w.__data[4]=V.elements[3],w.__data[5]=V.elements[4],w.__data[6]=V.elements[5],w.__data[7]=0,w.__data[8]=V.elements[6],w.__data[9]=V.elements[7],w.__data[10]=V.elements[8],w.__data[11]=0):(V.toArray(w.__data,O),O+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,E,x,P){const A=T.value,L=E+"_"+x;if(P[L]===void 0)return typeof A=="number"||typeof A=="boolean"?P[L]=A:P[L]=A.clone(),!0;{const N=P[L];if(typeof A=="number"||typeof A=="boolean"){if(N!==A)return P[L]=A,!0}else if(N.equals(A)===!1)return N.copy(A),!0}return!1}function g(T){const E=T.uniforms;let x=0;const P=16;for(let L=0,N=E.length;L<N;L++){const S=Array.isArray(E[L])?E[L]:[E[L]];for(let y=0,w=S.length;y<w;y++){const k=S[y],Z=Array.isArray(k.value)?k.value:[k.value];for(let O=0,z=Z.length;O<z;O++){const V=Z[O],Y=v(V),B=x%P,$=B%Y.boundary,le=B+$;x+=$,le!==0&&P-le<Y.storage&&(x+=P-le),k.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=Y.storage}}}const A=x%P;return A>0&&(x+=P-A),T.__size=x,T.__cache={},this}function v(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function m(T){const E=T.target;E.removeEventListener("dispose",m);const x=o.indexOf(E.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function d(){for(const T in r)i.deleteBuffer(r[T]);o=[],r={},s={}}return{bind:c,update:l,dispose:d}}class _m{constructor(e={}){const{canvas:t=fu(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,d=null;const T=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let P=!1;this._outputColorSpace=Ct;let A=0,L=0,N=null,S=-1,y=null;const w=new ft,k=new ft;let Z=null;const O=new $e(0);let z=0,V=t.width,Y=t.height,B=1,$=null,le=null;const j=new ft(0,0,V,Y),De=new ft(0,0,V,Y);let Be=!1;const we=new ko;let Ve=!1,X=!1;const te=new at,oe=new I,ve=new ft,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Le=!1;function je(){return N===null?B:1}let C=n;function ce(M,H){return t.getContext(M,H)}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Lo}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",G,!1),C===null){const H="webgl2";if(C=ce(H,M),C===null)throw ce(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let ie,se,re,de,ue,Q,ye,ge,b,_,F,q,ae,ne,Ce,_e,Ne,Ie,he,Te,He,Fe,Ee,Xe;function U(){ie=new wp(C),ie.init(),Fe=new cm(C,ie),se=new yp(C,ie,e,Fe),re=new am(C,ie),se.reversedDepthBuffer&&f&&re.buffers.depth.setReversed(!0),de=new Pp(C),ue=new q0,Q=new lm(C,ie,re,ue,se,Fe,de),ye=new Mp(x),ge=new Ap(x),b=new Uh(C),Ee=new vp(C,b),_=new Rp(C,b,de,Ee),F=new Lp(C,_,b,de),he=new Dp(C,se,Q),_e=new Sp(ue),q=new Y0(x,ye,ge,ie,se,Ee,_e),ae=new mm(x,ue),ne=new $0,Ce=new nm(ie),Ie=new _p(x,ye,ge,re,F,p,c),Ne=new sm(x,F,se),Xe=new gm(C,de,se,re),Te=new xp(C,ie,de),He=new Cp(C,ie,de),de.programs=q.programs,x.capabilities=se,x.extensions=ie,x.properties=ue,x.renderLists=ne,x.shadowMap=Ne,x.state=re,x.info=de}U();const fe=new fm(x,C);this.xr=fe,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const M=ie.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ie.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(M){M!==void 0&&(B=M,this.setSize(V,Y,!1))},this.getSize=function(M){return M.set(V,Y)},this.setSize=function(M,H,J=!0){if(fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=M,Y=H,t.width=Math.floor(M*B),t.height=Math.floor(H*B),J===!0&&(t.style.width=M+"px",t.style.height=H+"px"),this.setViewport(0,0,M,H)},this.getDrawingBufferSize=function(M){return M.set(V*B,Y*B).floor()},this.setDrawingBufferSize=function(M,H,J){V=M,Y=H,B=J,t.width=Math.floor(M*J),t.height=Math.floor(H*J),this.setViewport(0,0,M,H)},this.getCurrentViewport=function(M){return M.copy(w)},this.getViewport=function(M){return M.copy(j)},this.setViewport=function(M,H,J,ee){M.isVector4?j.set(M.x,M.y,M.z,M.w):j.set(M,H,J,ee),re.viewport(w.copy(j).multiplyScalar(B).round())},this.getScissor=function(M){return M.copy(De)},this.setScissor=function(M,H,J,ee){M.isVector4?De.set(M.x,M.y,M.z,M.w):De.set(M,H,J,ee),re.scissor(k.copy(De).multiplyScalar(B).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(M){re.setScissorTest(Be=M)},this.setOpaqueSort=function(M){$=M},this.setTransparentSort=function(M){le=M},this.getClearColor=function(M){return M.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(M=!0,H=!0,J=!0){let ee=0;if(M){let W=!1;if(N!==null){const pe=N.texture.format;W=pe===Bo||pe===Oo||pe===Fo}if(W){const pe=N.texture.type,Ae=pe===Qt||pe===kn||pe===Bi||pe===zi||pe===Io||pe===Uo,Ue=Ie.getClearColor(),Pe=Ie.getClearAlpha(),ke=Ue.r,We=Ue.g,Oe=Ue.b;Ae?(g[0]=ke,g[1]=We,g[2]=Oe,g[3]=Pe,C.clearBufferuiv(C.COLOR,0,g)):(v[0]=ke,v[1]=We,v[2]=Oe,v[3]=Pe,C.clearBufferiv(C.COLOR,0,v))}else ee|=C.COLOR_BUFFER_BIT}H&&(ee|=C.DEPTH_BUFFER_BIT),J&&(ee|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",G,!1),Ie.dispose(),ne.dispose(),Ce.dispose(),ue.dispose(),ye.dispose(),ge.dispose(),F.dispose(),Ee.dispose(),Xe.dispose(),q.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",Ot),fe.removeEventListener("sessionend",qi),Rn.stop()};function xe(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const M=de.autoReset,H=Ne.enabled,J=Ne.autoUpdate,ee=Ne.needsUpdate,W=Ne.type;U(),de.autoReset=M,Ne.enabled=H,Ne.autoUpdate=J,Ne.needsUpdate=ee,Ne.type=W}function G(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function K(M){const H=M.target;H.removeEventListener("dispose",K),Se(H)}function Se(M){Ge(M),ue.remove(M)}function Ge(M){const H=ue.get(M).programs;H!==void 0&&(H.forEach(function(J){q.releaseProgram(J)}),M.isShaderMaterial&&q.releaseShaderCache(M))}this.renderBufferDirect=function(M,H,J,ee,W,pe){H===null&&(H=Me);const Ae=W.isMesh&&W.matrixWorld.determinant()<0,Ue=ac(M,H,J,ee,W);re.setMaterial(ee,Ae);let Pe=J.index,ke=1;if(ee.wireframe===!0){if(Pe=_.getWireframeAttribute(J),Pe===void 0)return;ke=2}const We=J.drawRange,Oe=J.attributes.position;let Ke=We.start*ke,nt=(We.start+We.count)*ke;pe!==null&&(Ke=Math.max(Ke,pe.start*ke),nt=Math.min(nt,(pe.start+pe.count)*ke)),Pe!==null?(Ke=Math.max(Ke,0),nt=Math.min(nt,Pe.count)):Oe!=null&&(Ke=Math.max(Ke,0),nt=Math.min(nt,Oe.count));const dt=nt-Ke;if(dt<0||dt===1/0)return;Ee.setup(W,ee,Ue,J,Pe);let ot,st=Te;if(Pe!==null&&(ot=b.get(Pe),st=He,st.setIndex(ot)),W.isMesh)ee.wireframe===!0?(re.setLineWidth(ee.wireframeLinewidth*je()),st.setMode(C.LINES)):st.setMode(C.TRIANGLES);else if(W.isLine){let ze=ee.linewidth;ze===void 0&&(ze=1),re.setLineWidth(ze*je()),W.isLineSegments?st.setMode(C.LINES):W.isLineLoop?st.setMode(C.LINE_LOOP):st.setMode(C.LINE_STRIP)}else W.isPoints?st.setMode(C.POINTS):W.isSprite&&st.setMode(C.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Vi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(ie.get("WEBGL_multi_draw"))st.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const ze=W._multiDrawStarts,lt=W._multiDrawCounts,et=W._multiDrawCount,Nt=Pe?b.get(Pe).bytesPerElement:1,jn=ue.get(ee).currentProgram.getUniforms();for(let It=0;It<et;It++)jn.setValue(C,"_gl_DrawID",It),st.render(ze[It]/Nt,lt[It])}else if(W.isInstancedMesh)st.renderInstances(Ke,dt,W.count);else if(J.isInstancedBufferGeometry){const ze=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,lt=Math.min(J.instanceCount,ze);st.renderInstances(Ke,dt,lt)}else st.render(Ke,dt)};function Je(M,H,J){M.transparent===!0&&M.side===cn&&M.forceSinglePass===!1?(M.side=Pt,M.needsUpdate=!0,$i(M,H,J),M.side=An,M.needsUpdate=!0,$i(M,H,J),M.side=cn):$i(M,H,J)}this.compile=function(M,H,J=null){J===null&&(J=M),d=Ce.get(J),d.init(H),E.push(d),J.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(d.pushLight(W),W.castShadow&&d.pushShadow(W))}),M!==J&&M.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(d.pushLight(W),W.castShadow&&d.pushShadow(W))}),d.setupLights();const ee=new Set;return M.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const pe=W.material;if(pe)if(Array.isArray(pe))for(let Ae=0;Ae<pe.length;Ae++){const Ue=pe[Ae];Je(Ue,J,W),ee.add(Ue)}else Je(pe,J,W),ee.add(pe)}),d=E.pop(),ee},this.compileAsync=function(M,H,J=null){const ee=this.compile(M,H,J);return new Promise(W=>{function pe(){if(ee.forEach(function(Ae){ue.get(Ae).currentProgram.isReady()&&ee.delete(Ae)}),ee.size===0){W(M);return}setTimeout(pe,10)}ie.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Qe=null;function Lt(M){Qe&&Qe(M)}function Ot(){Rn.stop()}function qi(){Rn.start()}const Rn=new ec;Rn.setAnimationLoop(Lt),typeof self<"u"&&Rn.setContext(self),this.setAnimationLoop=function(M){Qe=M,fe.setAnimationLoop(M),M===null?Rn.stop():Rn.start()},fe.addEventListener("sessionstart",Ot),fe.addEventListener("sessionend",qi),this.render=function(M,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(H),H=fe.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,H,N),d=Ce.get(M,E.length),d.init(H),E.push(d),te.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),we.setFromProjectionMatrix(te,Kt,H.reversedDepth),X=this.localClippingEnabled,Ve=_e.init(this.clippingPlanes,X),m=ne.get(M,T.length),m.init(),T.push(m),fe.enabled===!0&&fe.isPresenting===!0){const pe=x.xr.getDepthSensingMesh();pe!==null&&Zr(pe,H,-1/0,x.sortObjects)}Zr(M,H,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort($,le),Le=fe.enabled===!1||fe.isPresenting===!1||fe.hasDepthSensing()===!1,Le&&Ie.addToRenderList(m,M),this.info.render.frame++,Ve===!0&&_e.beginShadows();const J=d.state.shadowsArray;Ne.render(J,M,H),Ve===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset();const ee=m.opaque,W=m.transmissive;if(d.setupLights(),H.isArrayCamera){const pe=H.cameras;if(W.length>0)for(let Ae=0,Ue=pe.length;Ae<Ue;Ae++){const Pe=pe[Ae];Jo(ee,W,M,Pe)}Le&&Ie.render(M);for(let Ae=0,Ue=pe.length;Ae<Ue;Ae++){const Pe=pe[Ae];Ko(m,M,Pe,Pe.viewport)}}else W.length>0&&Jo(ee,W,M,H),Le&&Ie.render(M),Ko(m,M,H);N!==null&&L===0&&(Q.updateMultisampleRenderTarget(N),Q.updateRenderTargetMipmap(N)),M.isScene===!0&&M.onAfterRender(x,M,H),Ee.resetDefaultState(),S=-1,y=null,E.pop(),E.length>0?(d=E[E.length-1],Ve===!0&&_e.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Zr(M,H,J,ee){if(M.visible===!1)return;if(M.layers.test(H.layers)){if(M.isGroup)J=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(H);else if(M.isLight)d.pushLight(M),M.castShadow&&d.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||we.intersectsSprite(M)){ee&&ve.setFromMatrixPosition(M.matrixWorld).applyMatrix4(te);const Ae=F.update(M),Ue=M.material;Ue.visible&&m.push(M,Ae,Ue,J,ve.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||we.intersectsObject(M))){const Ae=F.update(M),Ue=M.material;if(ee&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ve.copy(M.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),ve.copy(Ae.boundingSphere.center)),ve.applyMatrix4(M.matrixWorld).applyMatrix4(te)),Array.isArray(Ue)){const Pe=Ae.groups;for(let ke=0,We=Pe.length;ke<We;ke++){const Oe=Pe[ke],Ke=Ue[Oe.materialIndex];Ke&&Ke.visible&&m.push(M,Ae,Ke,J,ve.z,Oe)}}else Ue.visible&&m.push(M,Ae,Ue,J,ve.z,null)}}const pe=M.children;for(let Ae=0,Ue=pe.length;Ae<Ue;Ae++)Zr(pe[Ae],H,J,ee)}function Ko(M,H,J,ee){const W=M.opaque,pe=M.transmissive,Ae=M.transparent;d.setupLightsView(J),Ve===!0&&_e.setGlobalState(x.clippingPlanes,J),ee&&re.viewport(w.copy(ee)),W.length>0&&Zi(W,H,J),pe.length>0&&Zi(pe,H,J),Ae.length>0&&Zi(Ae,H,J),re.buffers.depth.setTest(!0),re.buffers.depth.setMask(!0),re.buffers.color.setMask(!0),re.setPolygonOffset(!1)}function Jo(M,H,J,ee){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[ee.id]===void 0&&(d.state.transmissionRenderTarget[ee.id]=new Gn(1,1,{generateMipmaps:!0,type:ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float")?ji:Qt,minFilter:Hn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const pe=d.state.transmissionRenderTarget[ee.id],Ae=ee.viewport||w;pe.setSize(Ae.z*x.transmissionResolutionScale,Ae.w*x.transmissionResolutionScale);const Ue=x.getRenderTarget(),Pe=x.getActiveCubeFace(),ke=x.getActiveMipmapLevel();x.setRenderTarget(pe),x.getClearColor(O),z=x.getClearAlpha(),z<1&&x.setClearColor(16777215,.5),x.clear(),Le&&Ie.render(J);const We=x.toneMapping;x.toneMapping=bn;const Oe=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),d.setupLightsView(ee),Ve===!0&&_e.setGlobalState(x.clippingPlanes,ee),Zi(M,J,ee),Q.updateMultisampleRenderTarget(pe),Q.updateRenderTargetMipmap(pe),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let nt=0,dt=H.length;nt<dt;nt++){const ot=H[nt],st=ot.object,ze=ot.geometry,lt=ot.material,et=ot.group;if(lt.side===cn&&st.layers.test(ee.layers)){const Nt=lt.side;lt.side=Pt,lt.needsUpdate=!0,Qo(st,J,ee,ze,lt,et),lt.side=Nt,lt.needsUpdate=!0,Ke=!0}}Ke===!0&&(Q.updateMultisampleRenderTarget(pe),Q.updateRenderTargetMipmap(pe))}x.setRenderTarget(Ue,Pe,ke),x.setClearColor(O,z),Oe!==void 0&&(ee.viewport=Oe),x.toneMapping=We}function Zi(M,H,J){const ee=H.isScene===!0?H.overrideMaterial:null;for(let W=0,pe=M.length;W<pe;W++){const Ae=M[W],Ue=Ae.object,Pe=Ae.geometry,ke=Ae.group;let We=Ae.material;We.allowOverride===!0&&ee!==null&&(We=ee),Ue.layers.test(J.layers)&&Qo(Ue,H,J,Pe,We,ke)}}function Qo(M,H,J,ee,W,pe){M.onBeforeRender(x,H,J,ee,W,pe),M.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),W.onBeforeRender(x,H,J,ee,M,pe),W.transparent===!0&&W.side===cn&&W.forceSinglePass===!1?(W.side=Pt,W.needsUpdate=!0,x.renderBufferDirect(J,H,ee,W,M,pe),W.side=An,W.needsUpdate=!0,x.renderBufferDirect(J,H,ee,W,M,pe),W.side=cn):x.renderBufferDirect(J,H,ee,W,M,pe),M.onAfterRender(x,H,J,ee,W,pe)}function $i(M,H,J){H.isScene!==!0&&(H=Me);const ee=ue.get(M),W=d.state.lights,pe=d.state.shadowsArray,Ae=W.state.version,Ue=q.getParameters(M,W.state,pe,H,J),Pe=q.getProgramCacheKey(Ue);let ke=ee.programs;ee.environment=M.isMeshStandardMaterial?H.environment:null,ee.fog=H.fog,ee.envMap=(M.isMeshStandardMaterial?ge:ye).get(M.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&M.envMap===null?H.environmentRotation:M.envMapRotation,ke===void 0&&(M.addEventListener("dispose",K),ke=new Map,ee.programs=ke);let We=ke.get(Pe);if(We!==void 0){if(ee.currentProgram===We&&ee.lightsStateVersion===Ae)return ta(M,Ue),We}else Ue.uniforms=q.getUniforms(M),M.onBeforeCompile(Ue,x),We=q.acquireProgram(Ue,Pe),ke.set(Pe,We),ee.uniforms=Ue.uniforms;const Oe=ee.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Oe.clippingPlanes=_e.uniform),ta(M,Ue),ee.needsLights=cc(M),ee.lightsStateVersion=Ae,ee.needsLights&&(Oe.ambientLightColor.value=W.state.ambient,Oe.lightProbe.value=W.state.probe,Oe.directionalLights.value=W.state.directional,Oe.directionalLightShadows.value=W.state.directionalShadow,Oe.spotLights.value=W.state.spot,Oe.spotLightShadows.value=W.state.spotShadow,Oe.rectAreaLights.value=W.state.rectArea,Oe.ltc_1.value=W.state.rectAreaLTC1,Oe.ltc_2.value=W.state.rectAreaLTC2,Oe.pointLights.value=W.state.point,Oe.pointLightShadows.value=W.state.pointShadow,Oe.hemisphereLights.value=W.state.hemi,Oe.directionalShadowMap.value=W.state.directionalShadowMap,Oe.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Oe.spotShadowMap.value=W.state.spotShadowMap,Oe.spotLightMatrix.value=W.state.spotLightMatrix,Oe.spotLightMap.value=W.state.spotLightMap,Oe.pointShadowMap.value=W.state.pointShadowMap,Oe.pointShadowMatrix.value=W.state.pointShadowMatrix),ee.currentProgram=We,ee.uniformsList=null,We}function ea(M){if(M.uniformsList===null){const H=M.currentProgram.getUniforms();M.uniformsList=Dr.seqWithValue(H.seq,M.uniforms)}return M.uniformsList}function ta(M,H){const J=ue.get(M);J.outputColorSpace=H.outputColorSpace,J.batching=H.batching,J.batchingColor=H.batchingColor,J.instancing=H.instancing,J.instancingColor=H.instancingColor,J.instancingMorph=H.instancingMorph,J.skinning=H.skinning,J.morphTargets=H.morphTargets,J.morphNormals=H.morphNormals,J.morphColors=H.morphColors,J.morphTargetsCount=H.morphTargetsCount,J.numClippingPlanes=H.numClippingPlanes,J.numIntersection=H.numClipIntersection,J.vertexAlphas=H.vertexAlphas,J.vertexTangents=H.vertexTangents,J.toneMapping=H.toneMapping}function ac(M,H,J,ee,W){H.isScene!==!0&&(H=Me),Q.resetTextureUnits();const pe=H.fog,Ae=ee.isMeshStandardMaterial?H.environment:null,Ue=N===null?x.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:gi,Pe=(ee.isMeshStandardMaterial?ge:ye).get(ee.envMap||Ae),ke=ee.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,We=!!J.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Oe=!!J.morphAttributes.position,Ke=!!J.morphAttributes.normal,nt=!!J.morphAttributes.color;let dt=bn;ee.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(dt=x.toneMapping);const ot=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,st=ot!==void 0?ot.length:0,ze=ue.get(ee),lt=d.state.lights;if(Ve===!0&&(X===!0||M!==y)){const Et=M===y&&ee.id===S;_e.setState(ee,M,Et)}let et=!1;ee.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==lt.state.version||ze.outputColorSpace!==Ue||W.isBatchedMesh&&ze.batching===!1||!W.isBatchedMesh&&ze.batching===!0||W.isBatchedMesh&&ze.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&ze.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&ze.instancing===!1||!W.isInstancedMesh&&ze.instancing===!0||W.isSkinnedMesh&&ze.skinning===!1||!W.isSkinnedMesh&&ze.skinning===!0||W.isInstancedMesh&&ze.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&ze.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&ze.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&ze.instancingMorph===!1&&W.morphTexture!==null||ze.envMap!==Pe||ee.fog===!0&&ze.fog!==pe||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==_e.numPlanes||ze.numIntersection!==_e.numIntersection)||ze.vertexAlphas!==ke||ze.vertexTangents!==We||ze.morphTargets!==Oe||ze.morphNormals!==Ke||ze.morphColors!==nt||ze.toneMapping!==dt||ze.morphTargetsCount!==st)&&(et=!0):(et=!0,ze.__version=ee.version);let Nt=ze.currentProgram;et===!0&&(Nt=$i(ee,H,W));let jn=!1,It=!1,Mi=!1;const ct=Nt.getUniforms(),Bt=ze.uniforms;if(re.useProgram(Nt.program)&&(jn=!0,It=!0,Mi=!0),ee.id!==S&&(S=ee.id,It=!0),jn||y!==M){re.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ct.setValue(C,"projectionMatrix",M.projectionMatrix),ct.setValue(C,"viewMatrix",M.matrixWorldInverse);const At=ct.map.cameraPosition;At!==void 0&&At.setValue(C,oe.setFromMatrixPosition(M.matrixWorld)),se.logarithmicDepthBuffer&&ct.setValue(C,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&ct.setValue(C,"isOrthographic",M.isOrthographicCamera===!0),y!==M&&(y=M,It=!0,Mi=!0)}if(W.isSkinnedMesh){ct.setOptional(C,W,"bindMatrix"),ct.setOptional(C,W,"bindMatrixInverse");const Et=W.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),ct.setValue(C,"boneTexture",Et.boneTexture,Q))}W.isBatchedMesh&&(ct.setOptional(C,W,"batchingTexture"),ct.setValue(C,"batchingTexture",W._matricesTexture,Q),ct.setOptional(C,W,"batchingIdTexture"),ct.setValue(C,"batchingIdTexture",W._indirectTexture,Q),ct.setOptional(C,W,"batchingColorTexture"),W._colorsTexture!==null&&ct.setValue(C,"batchingColorTexture",W._colorsTexture,Q));const zt=J.morphAttributes;if((zt.position!==void 0||zt.normal!==void 0||zt.color!==void 0)&&he.update(W,J,Nt),(It||ze.receiveShadow!==W.receiveShadow)&&(ze.receiveShadow=W.receiveShadow,ct.setValue(C,"receiveShadow",W.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(Bt.envMap.value=Pe,Bt.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&H.environment!==null&&(Bt.envMapIntensity.value=H.environmentIntensity),It&&(ct.setValue(C,"toneMappingExposure",x.toneMappingExposure),ze.needsLights&&lc(Bt,Mi),pe&&ee.fog===!0&&ae.refreshFogUniforms(Bt,pe),ae.refreshMaterialUniforms(Bt,ee,B,Y,d.state.transmissionRenderTarget[M.id]),Dr.upload(C,ea(ze),Bt,Q)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Dr.upload(C,ea(ze),Bt,Q),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&ct.setValue(C,"center",W.center),ct.setValue(C,"modelViewMatrix",W.modelViewMatrix),ct.setValue(C,"normalMatrix",W.normalMatrix),ct.setValue(C,"modelMatrix",W.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const Et=ee.uniformsGroups;for(let At=0,$r=Et.length;At<$r;At++){const Cn=Et[At];Xe.update(Cn,Nt),Xe.bind(Cn,Nt)}}return Nt}function lc(M,H){M.ambientLightColor.needsUpdate=H,M.lightProbe.needsUpdate=H,M.directionalLights.needsUpdate=H,M.directionalLightShadows.needsUpdate=H,M.pointLights.needsUpdate=H,M.pointLightShadows.needsUpdate=H,M.spotLights.needsUpdate=H,M.spotLightShadows.needsUpdate=H,M.rectAreaLights.needsUpdate=H,M.hemisphereLights.needsUpdate=H}function cc(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(M,H,J){const ee=ue.get(M);ee.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),ue.get(M.texture).__webglTexture=H,ue.get(M.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:J,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,H){const J=ue.get(M);J.__webglFramebuffer=H,J.__useDefaultFramebuffer=H===void 0};const uc=C.createFramebuffer();this.setRenderTarget=function(M,H=0,J=0){N=M,A=H,L=J;let ee=!0,W=null,pe=!1,Ae=!1;if(M){const Pe=ue.get(M);if(Pe.__useDefaultFramebuffer!==void 0)re.bindFramebuffer(C.FRAMEBUFFER,null),ee=!1;else if(Pe.__webglFramebuffer===void 0)Q.setupRenderTarget(M);else if(Pe.__hasExternalTextures)Q.rebindTextures(M,ue.get(M.texture).__webglTexture,ue.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Oe=M.depthTexture;if(Pe.__boundDepthTexture!==Oe){if(Oe!==null&&ue.has(Oe)&&(M.width!==Oe.image.width||M.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(M)}}const ke=M.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Ae=!0);const We=ue.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(We[H])?W=We[H][J]:W=We[H],pe=!0):M.samples>0&&Q.useMultisampledRTT(M)===!1?W=ue.get(M).__webglMultisampledFramebuffer:Array.isArray(We)?W=We[J]:W=We,w.copy(M.viewport),k.copy(M.scissor),Z=M.scissorTest}else w.copy(j).multiplyScalar(B).floor(),k.copy(De).multiplyScalar(B).floor(),Z=Be;if(J!==0&&(W=uc),re.bindFramebuffer(C.FRAMEBUFFER,W)&&ee&&re.drawBuffers(M,W),re.viewport(w),re.scissor(k),re.setScissorTest(Z),pe){const Pe=ue.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+H,Pe.__webglTexture,J)}else if(Ae){const Pe=H;for(let ke=0;ke<M.textures.length;ke++){const We=ue.get(M.textures[ke]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+ke,We.__webglTexture,J,Pe)}}else if(M!==null&&J!==0){const Pe=ue.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Pe.__webglTexture,J)}S=-1},this.readRenderTargetPixels=function(M,H,J,ee,W,pe,Ae,Ue=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=ue.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ae!==void 0&&(Pe=Pe[Ae]),Pe){re.bindFramebuffer(C.FRAMEBUFFER,Pe);try{const ke=M.textures[Ue],We=ke.format,Oe=ke.type;if(!se.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!se.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=M.width-ee&&J>=0&&J<=M.height-W&&(M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ue),C.readPixels(H,J,ee,W,Fe.convert(We),Fe.convert(Oe),pe))}finally{const ke=N!==null?ue.get(N).__webglFramebuffer:null;re.bindFramebuffer(C.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(M,H,J,ee,W,pe,Ae,Ue=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=ue.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ae!==void 0&&(Pe=Pe[Ae]),Pe)if(H>=0&&H<=M.width-ee&&J>=0&&J<=M.height-W){re.bindFramebuffer(C.FRAMEBUFFER,Pe);const ke=M.textures[Ue],We=ke.format,Oe=ke.type;if(!se.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!se.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Ke),C.bufferData(C.PIXEL_PACK_BUFFER,pe.byteLength,C.STREAM_READ),M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ue),C.readPixels(H,J,ee,W,Fe.convert(We),Fe.convert(Oe),0);const nt=N!==null?ue.get(N).__webglFramebuffer:null;re.bindFramebuffer(C.FRAMEBUFFER,nt);const dt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await pu(C,dt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Ke),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,pe),C.deleteBuffer(Ke),C.deleteSync(dt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,H=null,J=0){const ee=Math.pow(2,-J),W=Math.floor(M.image.width*ee),pe=Math.floor(M.image.height*ee),Ae=H!==null?H.x:0,Ue=H!==null?H.y:0;Q.setTexture2D(M,0),C.copyTexSubImage2D(C.TEXTURE_2D,J,0,0,Ae,Ue,W,pe),re.unbindTexture()};const hc=C.createFramebuffer(),dc=C.createFramebuffer();this.copyTextureToTexture=function(M,H,J=null,ee=null,W=0,pe=null){pe===null&&(W!==0?(Vi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=W,W=0):pe=0);let Ae,Ue,Pe,ke,We,Oe,Ke,nt,dt;const ot=M.isCompressedTexture?M.mipmaps[pe]:M.image;if(J!==null)Ae=J.max.x-J.min.x,Ue=J.max.y-J.min.y,Pe=J.isBox3?J.max.z-J.min.z:1,ke=J.min.x,We=J.min.y,Oe=J.isBox3?J.min.z:0;else{const zt=Math.pow(2,-W);Ae=Math.floor(ot.width*zt),Ue=Math.floor(ot.height*zt),M.isDataArrayTexture?Pe=ot.depth:M.isData3DTexture?Pe=Math.floor(ot.depth*zt):Pe=1,ke=0,We=0,Oe=0}ee!==null?(Ke=ee.x,nt=ee.y,dt=ee.z):(Ke=0,nt=0,dt=0);const st=Fe.convert(H.format),ze=Fe.convert(H.type);let lt;H.isData3DTexture?(Q.setTexture3D(H,0),lt=C.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(Q.setTexture2DArray(H,0),lt=C.TEXTURE_2D_ARRAY):(Q.setTexture2D(H,0),lt=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,H.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,H.unpackAlignment);const et=C.getParameter(C.UNPACK_ROW_LENGTH),Nt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),jn=C.getParameter(C.UNPACK_SKIP_PIXELS),It=C.getParameter(C.UNPACK_SKIP_ROWS),Mi=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ot.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ot.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,ke),C.pixelStorei(C.UNPACK_SKIP_ROWS,We),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Oe);const ct=M.isDataArrayTexture||M.isData3DTexture,Bt=H.isDataArrayTexture||H.isData3DTexture;if(M.isDepthTexture){const zt=ue.get(M),Et=ue.get(H),At=ue.get(zt.__renderTarget),$r=ue.get(Et.__renderTarget);re.bindFramebuffer(C.READ_FRAMEBUFFER,At.__webglFramebuffer),re.bindFramebuffer(C.DRAW_FRAMEBUFFER,$r.__webglFramebuffer);for(let Cn=0;Cn<Pe;Cn++)ct&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ue.get(M).__webglTexture,W,Oe+Cn),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ue.get(H).__webglTexture,pe,dt+Cn)),C.blitFramebuffer(ke,We,Ae,Ue,Ke,nt,Ae,Ue,C.DEPTH_BUFFER_BIT,C.NEAREST);re.bindFramebuffer(C.READ_FRAMEBUFFER,null),re.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(W!==0||M.isRenderTargetTexture||ue.has(M)){const zt=ue.get(M),Et=ue.get(H);re.bindFramebuffer(C.READ_FRAMEBUFFER,hc),re.bindFramebuffer(C.DRAW_FRAMEBUFFER,dc);for(let At=0;At<Pe;At++)ct?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,zt.__webglTexture,W,Oe+At):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,zt.__webglTexture,W),Bt?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Et.__webglTexture,pe,dt+At):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Et.__webglTexture,pe),W!==0?C.blitFramebuffer(ke,We,Ae,Ue,Ke,nt,Ae,Ue,C.COLOR_BUFFER_BIT,C.NEAREST):Bt?C.copyTexSubImage3D(lt,pe,Ke,nt,dt+At,ke,We,Ae,Ue):C.copyTexSubImage2D(lt,pe,Ke,nt,ke,We,Ae,Ue);re.bindFramebuffer(C.READ_FRAMEBUFFER,null),re.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Bt?M.isDataTexture||M.isData3DTexture?C.texSubImage3D(lt,pe,Ke,nt,dt,Ae,Ue,Pe,st,ze,ot.data):H.isCompressedArrayTexture?C.compressedTexSubImage3D(lt,pe,Ke,nt,dt,Ae,Ue,Pe,st,ot.data):C.texSubImage3D(lt,pe,Ke,nt,dt,Ae,Ue,Pe,st,ze,ot):M.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,pe,Ke,nt,Ae,Ue,st,ze,ot.data):M.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,pe,Ke,nt,ot.width,ot.height,st,ot.data):C.texSubImage2D(C.TEXTURE_2D,pe,Ke,nt,Ae,Ue,st,ze,ot);C.pixelStorei(C.UNPACK_ROW_LENGTH,et),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Nt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,jn),C.pixelStorei(C.UNPACK_SKIP_ROWS,It),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Mi),pe===0&&H.generateMipmaps&&C.generateMipmap(lt),re.unbindTexture()},this.initRenderTarget=function(M){ue.get(M).__webglFramebuffer===void 0&&Q.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Q.setTextureCube(M,0):M.isData3DTexture?Q.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Q.setTexture2DArray(M,0):Q.setTexture2D(M,0),re.unbindTexture()},this.resetState=function(){A=0,L=0,N=null,re.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Kt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const hl={type:"change"},Zo={type:"start"},sc={type:"end"},Er=new Xr,dl=new yn,vm=Math.cos(70*du.DEG2RAD),gt=new I,Rt=2*Math.PI,rt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ns=1e-6;class xm extends Nh{constructor(e,t=null){super(e,t),this.state=rt.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ui.ROTATE,MIDDLE:ui.DOLLY,RIGHT:ui.PAN},this.touches={ONE:ai.ROTATE,TWO:ai.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new Vn,this._lastTargetPosition=new I,this._quat=new Vn().setFromUnitVectors(e.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Po,this._sphericalDelta=new Po,this._scale=1,this._panOffset=new I,this._rotateStart=new me,this._rotateEnd=new me,this._rotateDelta=new me,this._panStart=new me,this._panEnd=new me,this._panDelta=new me,this._dollyStart=new me,this._dollyEnd=new me,this._dollyDelta=new me,this._dollyDirection=new I,this._mouse=new me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Sm.bind(this),this._onPointerDown=ym.bind(this),this._onPointerUp=Mm.bind(this),this._onContextMenu=Cm.bind(this),this._onMouseWheel=Tm.bind(this),this._onKeyDown=Am.bind(this),this._onTouchStart=wm.bind(this),this._onTouchMove=Rm.bind(this),this._onMouseDown=Em.bind(this),this._onMouseMove=bm.bind(this),this._interceptControlDown=Pm.bind(this),this._interceptControlUp=Dm.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(hl),this.update(),this.state=rt.NONE}update(e=null){const t=this.object.position;gt.copy(t).sub(this.target),gt.applyQuaternion(this._quat),this._spherical.setFromVector3(gt),this.autoRotate&&this.state===rt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Rt:n>Math.PI&&(n-=Rt),r<-Math.PI?r+=Rt:r>Math.PI&&(r-=Rt),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(gt.setFromSpherical(this._spherical),gt.applyQuaternion(this._quatInverse),t.copy(this.target).add(gt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=gt.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const l=new I(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=gt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Er.origin.copy(this.object.position),Er.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Er.direction))<vm?this.object.lookAt(this.target):(dl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Er.intersectPlane(dl,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Ns||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ns||this._lastTargetPosition.distanceToSquared(this.target)>Ns?(this.dispatchEvent(hl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Rt/60*this.autoRotateSpeed*e:Rt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){gt.setFromMatrixColumn(t,0),gt.multiplyScalar(-e),this._panOffset.add(gt)}_panUp(e,t){this.screenSpacePanning===!0?gt.setFromMatrixColumn(t,1):(gt.setFromMatrixColumn(t,0),gt.crossVectors(this.object.up,gt)),gt.multiplyScalar(e),this._panOffset.add(gt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;gt.copy(r).sub(this.target);let s=gt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),r=e-n.left,s=t-n.top,o=n.width,a=n.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Rt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Rt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Rt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Rt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Rt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Rt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Rt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Rt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new me,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function ym(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Sm(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Mm(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(sc),this.state=rt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Em(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ui.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=rt.DOLLY;break;case ui.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=rt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=rt.ROTATE}break;case ui.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=rt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=rt.PAN}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(Zo)}function bm(i){switch(this.state){case rt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case rt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case rt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Tm(i){this.enabled===!1||this.enableZoom===!1||this.state!==rt.NONE||(i.preventDefault(),this.dispatchEvent(Zo),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(sc))}function Am(i){this.enabled!==!1&&this._handleKeyDown(i)}function wm(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ai.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=rt.TOUCH_ROTATE;break;case ai.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=rt.TOUCH_PAN;break;default:this.state=rt.NONE}break;case 2:switch(this.touches.TWO){case ai.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=rt.TOUCH_DOLLY_PAN;break;case ai.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=rt.TOUCH_DOLLY_ROTATE;break;default:this.state=rt.NONE}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(Zo)}function Rm(i){switch(this._trackPointer(i),this.state){case rt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case rt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case rt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case rt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=rt.NONE}}function Cm(i){this.enabled!==!1&&i.preventDefault()}function Pm(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Dm(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Lm="23cfc1346cddc0233be6bb421385a71c68554df11143e0c3714c34553a244f23",Nm="Downtown Toronto · City Hall",Im=[-79.38395,43.65343],Um=320,Fm="EPSG:26917",Om=JSON.parse('[{"id":"2025-141781","height":21.4,"height_source":"3D Model","geometry":{"type":"Polygon","coordinates":[[[-151.2063926155679,-76.81946404092014],[-150.975562962587,-76.11058628372848],[-152.11990693071857,-75.73787532374263],[-152.82718748191837,-77.90824431274086],[-151.68284351809416,-78.28095527924597],[-151.48588517843746,-77.67547259200364],[-151.2063926155679,-76.81946404092014]]]}},{"id":"2025-141784","height":12,"height_source":"3D Model","geometry":{"type":"Polygon","coordinates":[[[-159.24800053529907,-101.49585201311857],[-158.43585363961756,-99.00135572440922],[-160,-98.49171629268676],[-160,-103.8030865881592],[-159.24800053529907,-101.49585201311857]]]}},{"id":"2025-141785","height":89.35,"height_source":"3D Model","geometry":{"type":"Polygon","coordinates":[[[-158.43585363961756,-99.00135572440922],[-151.68284351809416,-78.28095527924597],[-152.82718748191837,-77.90824431274086],[-152.11990693071857,-75.73787532374263],[-150.975562962587,-76.11058628372848],[-149.43187654332723,-71.37615443114191],[-142.7065419940045,-50.74825919885188],[-151.28760441055056,-47.951955002732575],[-160,-45.113255659118295],[-160,-98.49171629268676],[-158.43585363961756,-99.00135572440922]]]}},{"id":"2025-141964","height":13.351,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-100.57254473783541,-151.92811915371567],[-98.85648720548488,-146.28873851988465],[-101.87335924291983,-145.22423095162958],[-103.55279996606987,-150.94027884770185],[-100.57254473783541,-151.92811915371567]]]}},{"id":"2025-141967","height":11.027,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-89.55439833481796,-138.5640328694135],[-90.38743940682616,-138.29195577837527],[-89.81260831048712,-136.5332215745002],[-103.04199140006676,-132.20948495157063],[-112.12847779213917,-160],[-96.56287284032442,-160],[-89.55439833481796,-138.5640328694135]]]}},{"id":"2025-141969","height":41.513,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-25.581962189869955,-157.72814153321087],[-27.84453593660146,-157.01519313454628],[-27.279987390036695,-155.2222703313455],[-25.423124392866157,-155.80697608180344],[-22.497358368360437,-146.52060128562152],[-25.128582239733078,-145.62087606918067],[-24.90247218683362,-144.90201206784695],[-31.347115785698406,-142.82107263989747],[-31.099189391825348,-142.05159940198064],[-65.8128074305132,-130.85163140669465],[-70.51857541874051,-145.41450470406562],[-71.0610855607083,-146.32576309982687],[-75.45163862907793,-160],[-26.298059056396596,-160],[-25.581962189869955,-157.72814153321087]]]}},{"id":"2025-141970","height":7.9929,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-38.471517443307675,-101.00212303362787],[-28.97430509480182,-103.98750287294388],[-26.044929531752132,-94.72819492127746],[-26.215447506052442,-92.77007352933288],[-26.108382983133197,-92.4349849615246],[-24.055008867871948,-85.77802763599902],[-23.856206544092856,-85.35269085876644],[-23.125548749580048,-82.96792836394161],[-22.33969736797735,-80.74417495820671],[-47.39358209515922,-72.5178286563605],[-51.189893920207396,-84.23214018531144],[-54.9168147117598,-95.79229479376227],[-38.471517443307675,-101.00212303362787]]]}},{"id":"2025-141971","height":12.056,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[31.566798063693568,-155.875216296874],[31.96301962120924,-156.03048936184496],[41.34089719422627,-127.23994921054691],[31.332357402774505,-124.17651998437941],[21.31154782581143,-121.1777737531811],[9.221839058212936,-117.5954894926399],[6.384947039070539,-116.67104507703334],[4.47001801582519,-122.82256934884936],[7.302853733883239,-123.63393244054168],[4.350121643510647,-133.39965493697673],[1.4960229503922164,-132.54190412256867],[-0.7050929808756337,-139.74823024403304],[2.1623238051543012,-140.63822414260358],[0.6524324782658368,-145.6329872366041],[-4.058564106933773,-160],[30.240001210710034,-160],[31.566798063693568,-155.875216296874]]]}},{"id":"2025-141972","height":13.77,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[151.88797215069644,-141.6915950430557],[152.4232938576024,-142.50022926274687],[153.5313206287101,-142.94018912687898],[154.33865809172858,-143.19580062571913],[157.1514870810788,-144.09050856530666],[156.7706851795083,-145.28961119055748],[160,-146.3155430033803],[160,-131.69118308182806],[159.0500112469308,-131.38901587948203],[159.21799393196125,-130.1790656093508],[158.9243186118547,-129.4518051352352],[157.7990935005946,-129.07253878284246],[156.64584490016568,-129.57962937653065],[156.16321915423032,-130.49197094421834],[156.21550335991196,-131.40588147286326],[157.04542377835605,-132.40385431889445],[154.8134641093202,-139.09238918777555],[154.16935049486347,-138.87483081035316],[153.15138674678747,-138.9794379081577],[152.21222736034542,-139.64840986020863],[151.782537582214,-140.66961605101824],[151.88797215069644,-141.6915950430557]]]}},{"id":"2025-141973","height":26.863,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[148.99475100834388,138.36415289528668],[142.79953864077106,119.23436136730015],[146.02270388009492,118.17402701452374],[142.6445328189293,107.42271770350635],[140.34059729846194,108.09930965676904],[139.767893191427,107.8966467557475],[138.4556768835755,103.530252546072],[138.70797470293473,103.10866210330278],[138.7268794970587,103.10332001652569],[136.6292068560142,96.6179713299498],[134.66605500329752,90.38220911473036],[134.51297980570234,90.4339796518907],[134.03274016140494,90.25664730090648],[132.6946000898024,85.72861023806036],[132.82968434493523,85.2901372211054],[135.41204657801427,84.52540624793619],[132.0076538391877,73.25853467732668],[128.79143668839242,74.36574718821794],[122.8851493622642,56.021991797722876],[138.4022495674435,51.169471262954175],[139.241246637539,53.86029885429889],[157.10839714924805,48.17134062759578],[156.02823871024884,44.92483213637024],[160,43.648242375813425],[160,76.97039261553437],[159.199924200424,77.22111664991826],[159.53199774899986,78.21418553218246],[160,79.6580405831337],[160,134.80086892843246],[148.99475100834388,138.36415289528668]]]}},{"id":"2025-141974","height":4.3304,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[159.199924200424,77.22111664991826],[156.5258038463071,69.22507885936648],[155.36624810786452,65.61387930158526],[160,63.99918999616057],[160,76.97039261553437],[159.199924200424,77.22111664991826]]]}},{"id":"2025-141976","height":4.379,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[6.510025111725554,129.6307237977162],[14.485679983976297,154.8639609934762],[-1.7681968457764015,160],[-4.088590757572092,160],[-11.82166111015249,135.4242791160941],[6.510025111725554,129.6307237977162]]]}},{"id":"2025-141977","height":4.3216,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-146.66616045683622,139.59927289374173],[-143.7524034846574,138.74454665835947],[-142.09510700323153,143.93845856003463],[-160,149.58901587314904],[-160,132.3307213606313],[-150.0519799501635,129.20473626814783],[-146.66616045683622,139.59927289374173]]]}},{"id":"2025-141978","height":16.095,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-93.54612543340772,92.30588340386748],[-87.75556584389415,90.43308621365577],[-77.39633902406786,122.44931351114064],[-79.21382372069638,123.0382061637938],[-78.3705671451753,125.64384914375842],[-77.60995539580472,125.39808372501284],[-75.51329827320296,131.87714633531868],[-76.23215570405591,132.10915605910122],[-75.37514351145364,134.75655341427773],[-72.03543368622195,133.67621191684157],[-63.51743902510498,160],[-160,160],[-160,110.14719802420586],[-153.31786664237734,107.94016365334392],[-154.06577246671077,105.74082656018436],[-139.48078449233435,101.15197868924588],[-138.79246071144007,103.2584862485528],[-129.33872540667653,100.16949156858027],[-125.52052663185168,111.8502043504268],[-126.3128951434046,112.1095447326079],[-120.18514181429055,130.76630656328052],[-119.8411640013801,130.6530811842531],[-115.5746417499613,144.67365690972656],[-115.833165648859,144.7563355481252],[-115.63196279853582,145.0987230753526],[-114.89470666309353,144.83337848819792],[-110.48479488724843,158.59834474977106],[-110.70363624230959,158.6633048709482],[-110.6498120680917,158.8193430537358],[-102.90266341087408,156.25223292876035],[-104.73569347057492,150.68647038005292],[-104.16834361117799,150.4823011578992],[-104.17045152653009,150.4763388345018],[-105.6475835184101,146.17603316530585],[-105.64970950852148,146.16907109878957],[-106.1985864918679,146.34400436189026],[-110.79726523871068,132.2054235553369],[-108.9894522044342,131.8007188681513],[-110.19854280212894,128.10471130907536],[-113.36262900265865,129.05286900606006],[-119.80213955335785,109.47577667422593],[-119.8805591200944,109.5081964014098],[-123.36977042967919,98.76050303597003],[-94.4798638933571,89.40285500884056],[-93.54612543340772,92.30588340386748]]]}},{"id":"2025-141979","height":18.045,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-157.0168076843256,114.52498731203377],[-155.97249629930593,117.84104582294822],[-160,119.09239874780178],[-160,115.48091448191553],[-157.0168076843256,114.52498731203377]]]}},{"id":"2025-141980","height":4.3216,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-150.0519799501635,129.20473626814783],[-146.66616045683622,139.59927289374173],[-143.7524034846574,138.74454665835947],[-142.09510700323153,143.93845856003463],[-160,149.58901587314904],[-160,132.33138385321945],[-150.0519799501635,129.20473626814783]]]}},{"id":"2025-141981","height":20.125,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-139.48448004189413,109.93786693084985],[-133.17959857580718,128.92744996212423],[-142.72789988666773,132.09615870099515],[-149.03176317864563,113.10755782295018],[-139.48448004189413,109.93786693084985]]]}},{"id":"2025-141982","height":25.817,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-122.79080808989238,19.95165986008942],[-118.14078048290685,18.507607308216393],[-117.99204182613175,18.984952619299293],[-117.52165677386802,18.83843992650509],[-116.25413676875178,22.917518031783402],[-116.9621137403883,23.137330435216427],[-112.43903652625158,37.69080545101315],[-111.46145657275338,37.38711401261389],[-110.1652172410395,41.55567948613316],[-110.23481982399244,41.577939143404365],[-110.62367767363321,41.6979763135314],[-110.43452714255545,42.308600632473826],[-114.8558246177854,43.68151351530105],[-114.83623379853088,43.548149964772165],[-116.23359785368666,43.865430005826056],[-123.71892487560399,20.225455162115395],[-122.79080808989238,19.95165986008942]]]}},{"id":"2025-141984","height":36.912,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-143.53012863639742,48.18632470443845],[-144.12166323675774,46.18397516850382],[-138.87507827568334,44.442019128240645],[-137.0885990409879,50.48085543885827],[-137.05879902781453,50.58032383676618],[-145.00932175223716,53.00020176637918],[-146.1746438778937,48.93717780057341],[-143.53012863639742,48.18632470443845]]]}},{"id":"2025-141987","height":31.812,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-125.67042793892324,11.823634364642203],[-125.54713069170248,12.221333883702755],[-124.9425831696717,12.033493239432573],[-124.66954751545563,12.908519987016916],[-124.12158001598436,12.738603310659528],[-122.52151282329578,17.886746116913855],[-123.35180771595333,18.144772158004344],[-122.79080808989238,19.95165986008942],[-123.71892487560399,20.225455162115395],[-116.23359785368666,43.865430005826056],[-114.83623379853088,43.548149964772165],[-114.8558246177854,43.68151351530105],[-114.93836965889204,43.70700733549893],[-114.51864735374693,45.056516346521676],[-113.92006392101757,44.87068370077759],[-112.25183960911818,50.23751034680754],[-112.85648534400389,50.42545271106064],[-112.66735290386714,51.03507728688419],[-113.18150985823013,51.19438202586025],[-113.02323319937568,51.70145705901086],[-160,66.67718088068068],[-160,22.770101208239794],[-125.67042793892324,11.823634364642203]]]}},{"id":"2025-141988","height":35.607,"height_source":"Lidar-Derived","geometry":{"type":"MultiPolygon","coordinates":[[[[-154.08863412204664,29.632759642787278],[-155.32684884616174,25.244030386209488],[-153.5889259368414,24.740581465885043],[-151.69447697349824,32.099559172056615],[-153.67464629141614,32.75629754271358],[-153.87251513963565,32.27193981874734],[-160,34.21673016715795],[-160,31.533922686241567],[-154.08863412204664,29.632759642787278]]],[[[-156.73528166813776,45.60712747089565],[-156.0442677049432,47.90669983159751],[-156.42931952199433,47.960663515143096],[-155.26836744567845,52.00876528955996],[-148.88779807300307,49.7082729768008],[-146.1746438778937,48.93717780057341],[-145.00932175223716,53.00020176637918],[-137.05879902781453,50.58032383676618],[-136.48647064482793,52.51601585838944],[-151.93125898845028,57.42352941352874],[-151.84341442678124,57.90697579458356],[-154.70368065766525,58.89374519512057],[-154.38712041976396,60.290022034198046],[-159.1611141889589,61.581503776833415],[-160,58.89324703346938],[-160,46.69095158018172],[-156.73528166813776,45.60712747089565]]]]}},{"id":"2025-141989","height":35.701,"height_source":"Lidar-Derived","geometry":{"type":"MultiPolygon","coordinates":[[[[-154.08863412204664,29.632759642787278],[-155.32684884616174,25.244030386209488],[-153.5889259368414,24.740581465885043],[-151.69447697349824,32.099559172056615],[-153.67464629141614,32.75629754271358],[-153.87251513963565,32.27193981874734],[-160,34.21673016715795],[-160,31.533922686241567],[-154.08863412204664,29.632759642787278]]],[[[-156.73528166813776,45.60712747089565],[-156.0442677049432,47.90669983159751],[-156.42931952199433,47.960663515143096],[-155.26836744567845,52.00876528955996],[-148.88779807300307,49.7082729768008],[-146.1746438778937,48.93717780057341],[-143.53012863639742,48.18632470443845],[-144.12166323675774,46.18397516850382],[-138.87507827568334,44.442019128240645],[-137.0885990409879,50.48085543885827],[-137.05879902781453,50.58032383676618],[-136.48647064482793,52.51601585838944],[-151.93125898845028,57.42352941352874],[-151.84341442678124,57.90697579458356],[-154.70368065766525,58.89374519512057],[-154.38712041976396,60.290022034198046],[-159.1611141889589,61.581503776833415],[-160,58.89324703346938],[-160,46.69095158018172],[-156.73528166813776,45.60712747089565]]]]}},{"id":"2025-141990","height":37.083,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-133.96691400709096,-121.51183892879635],[-142.49672659428325,-147.5971021661535],[-145.50724406877998,-157.0243516312912],[-143.4968116696691,-157.66663714777678],[-144.2455847748788,-160],[-112.8925719835097,-160],[-105.92619582975749,-138.79291739035398],[-106.69994659908116,-137.61984820105135],[-104.62693950999528,-131.42588042188436],[-133.96691400709096,-121.51183892879635]]]}},{"id":"2025-142156","height":37.083,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-104.62714668817353,-131.42627670336515],[-95.17200744897127,-134.49840250145644],[-94.91573798912577,-133.70997886639088],[-92.3271511408966,-134.57283050566912],[-89.95646477281116,-127.35217040870339],[-90.40581902733538,-127.20403752941638],[-90.16136001807172,-126.46040357183665],[-88.76754396047909,-126.91863021068275],[-84.95963277062401,-115.32063836790621],[-85.35432640695944,-115.1914948746562],[-85.09502160537522,-114.40112593211234],[-83.60079158062581,-114.89216989744455],[-76.83591507328674,-94.28998799156398],[-78.23409742314834,-93.79668006580323],[-77.02953507390339,-90.50621982570738],[-75.47978917823639,-91.02426909096539],[-67.24472986895125,-66.43437755852938],[-107.31104307936039,-53.07221301551908],[-109.07627222826704,-58.49969014432281],[-112.83556383126415,-57.22864919900894],[-118.92979606811423,-76.58086333423853],[-133.94901351095177,-121.45655858051032],[-133.9670212090714,-121.51223702076823],[-104.62714668817353,-131.42627670336515]]]}},{"id":"2025-142157","height":9.4,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-109.07629030023236,-58.50068989209831],[-112.83456408663187,-57.2286672713235],[-118.92879632336553,-76.58088140748441],[-80.09295221825596,-89.57678094692528],[-81.14570954511873,-92.76797807775438],[-78.23409742314834,-93.79668006580323],[-77.02953507390339,-90.50621982570738],[-75.47980725113302,-91.02526883222163],[-67.24474794208072,-66.4353773035109],[-107.31104307936039,-53.07221301551908],[-109.07629030023236,-58.50068989209831]]]}},{"id":"2025-142158","height":11.5,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-81.14570954511873,-92.76797807775438],[-87.52549173356965,-112.09403009247035],[-88.9392304137582,-111.63144309539348],[-89.04675251280423,-111.93652119394392],[-87.98594161041547,-112.393728422001],[-94.91573798912577,-133.70997886639088],[-92.3271511408966,-134.57283050566912],[-89.95646477281116,-127.35217040870339],[-90.40581902733538,-127.20403752941638],[-90.16136001807172,-126.46040357183665],[-88.76754396047909,-126.91863021068275],[-84.9596508423565,-115.32163811195642],[-85.35432640695944,-115.1914948746562],[-85.09502160537522,-114.40112593211234],[-83.60079158062581,-114.89216989744455],[-76.83591507328674,-94.28998799156398],[-81.14570954511873,-92.76797807775438]]]}},{"id":"2025-142159","height":74.3,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-133.94901351095177,-121.45655858051032],[-115.28219319251366,-127.84642599336803],[-108.7923434053082,-108.73838085029274],[-103.46068439923692,-107.67167826835066],[-103.2586665051058,-106.9522788953036],[-87.52549173356965,-112.09403009247035],[-80.09295221825596,-89.57678094692528],[-118.92879632336553,-76.58088140748441],[-133.94901351095177,-121.45655858051032]]]}},{"id":"2025-142160","height":78.9,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-122.43132022488862,-115.82034936454147],[-112.98220441839658,-119.00437361188233],[-108.15947899327148,-104.32250745780766],[-95.82559926446993,-108.52674767654389],[-91.52883667510469,-95.33447914104909],[-113.12780282623135,-88.16655785404146],[-122.43132022488862,-115.82034936454147]]]}},{"id":"2025-142182","height":8.1,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-48.892668676096946,33.910025333054364],[-49.853044381481595,30.850167042575777],[-52.62044012208935,22.042562959715724],[-52.91081548016518,21.137747320346534],[-73.83511441550218,-44.189675226807594],[-64.41510262328666,-47.15815652254969],[-57.430398279917426,-49.35956429224461],[36.48318151733838,-78.96320229023695],[58.487865894450806,-10.134038770571351],[63.96086232562084,7.27127687074244],[61.91062377742492,7.985386403277516],[69.3752595235128,30.674080233089626],[70.13086585584097,33.083594450727105],[76.32642644864973,52.84101881738752],[75.91391513543203,52.31643756758422],[74.53904245526064,50.66917099058628],[73.09347124991473,49.09418747294694],[71.5700406706892,47.582615811377764],[69.9819823257858,46.14721775241196],[68.3221715023974,44.78112159483135],[66.60689326911233,43.50003409385681],[64.83204021898564,42.29802907258272],[63.00270143162925,41.18001489434391],[61.12193036219105,40.14893657527864],[59.19776111131068,39.20664903242141],[57.22923008131329,38.355169823393226],[55.22537111793645,37.59633578918874],[53.1841847342439,36.93018307443708],[51.91398357774597,36.59211806487292],[49.85143603605684,36.127365831285715],[47.76964683982078,35.75996833387762],[45.678667648578994,35.492744096554816],[43.56846487428993,35.32387434411794],[41.46306853322312,35.25492483749986],[39.349500015378,35.28713025338948],[37.241719598299824,35.41823809593916],[35.142726524034515,35.64819414913654],[37.933179524959996,45.06742747593671],[1.8148977678501979,47.46244115475565],[-43.6867921667872,50.480104977265],[-48.892668676096946,33.910025333054364]]]}},{"id":"2025-142183","height":17.3,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[10.773191832588054,-26.635755902156234],[12.074134137947112,-25.814212418161333],[13.324625853565522,-24.90675089880824],[14.51152572373394,-23.921134361065924],[15.630726336268708,-22.863288990221918],[16.679228456458077,-21.733160562813282],[17.65494223171845,-20.53571166098118],[18.54870731558185,-19.27977733500302],[19.36048756132368,-17.967357081361115],[20.08413992426358,-16.6063404167071],[20.71857429679949,-15.201707996428013],[21.261736975284293,-13.756422909907997],[21.708412370528094,-12.282391734421253],[22.060636118636467,-10.777651126496494],[22.312048307736404,-9.262087542563677],[22.466882851091214,-7.722776592709124],[22.52072511834558,-6.1826401213184],[22.47455677902326,-4.642695938237011],[22.329287217813544,-3.107960846275091],[22.08384440559894,-1.5824157483875751],[21.741956238052808,-0.08112910576164722],[21.30167744413484,1.3989344630390406],[20.767735672183335,2.8426884254440665],[20.140167057863437,4.252132268622518],[19.423789612716064,5.617178189568222],[18.61756744631566,6.935844766907394],[17.732244744664058,8.193936787545681],[16.763912890455686,9.396525263786316],[15.68215810356196,10.576162243261933],[14.528174494276755,11.688099950551987],[14.091137180104852,12.07502705603838],[10.514525231905282,14.544851006008685],[9.12208273273427,15.245069578289986],[7.688987588859163,15.854016453959048],[6.219202633248642,16.369619856588542],[4.718708261614665,16.790771611966193],[3.1924489819211885,17.114382133819163],[1.6554028914542869,17.339180591516197],[0.09757254528813064,17.46534771192819],[-1.4570843346882612,17.490450279787183],[-3.014530067681335,17.416596216149628],[-4.562767724739388,17.243568658828735],[-6.096798579324968,16.971277249976993],[-7.611605840967968,16.60063138231635],[-9.09613810281735,16.134431490674615],[-10.547359991702251,15.57462285272777],[-11.969324698671699,14.918278522789478],[-13.332786632352509,14.178870840929449],[-14.652850387617946,13.350672418251634],[-15.918446496361867,12.437483447603881],[-16.50493714993354,11.970051172189415],[-17.641807652427815,10.930526478216052],[-18.714050414040685,9.814828213304281],[-19.712505091214553,8.63179142959416],[-20.627975196228363,7.392250665463507],[-21.46455006452743,6.091279490850866],[-22.21506884053815,4.737749096937478],[-22.874297867296264,3.344565805979073],[-23.445344812818803,1.9057853668928146],[-23.919958713580854,0.4352596178650856],[-24.299048956483603,-1.0619946448132396],[-24.58054376486689,-2.5820145877078176],[-24.763280746527016,-4.115820586681366],[-24.846169800614007,-5.658431991003454],[-24.829084418946877,-7.202850587666035],[-24.71289784531109,-8.742060104385018],[-24.49555637384765,-10.273097445257008],[-24.180914405733347,-11.78789237048477],[-23.768791221547872,-13.276447436772287],[-23.26211376558058,-14.734709457494318],[-22.659846148919314,-16.160697006620467],[-21.969733315054327,-17.540269100107253],[-21.191775265615433,-18.873425725847483],[-20.324918040190823,-20.15718572959304],[-19.381905303918757,-21.377317757345736],[-18.3597739697434,-22.535875507630408],[-17.2644140656339,-23.626752085983753],[-16.09875254041981,-24.64589429553598],[-14.875605345587246,-25.583069758489728],[-13.590046050259843,-26.44236781448126],[-12.25094584573526,-27.216627599671483],[-11.445346281048842,-27.62921844702214],[-10.028355639777146,-28.243874786421657],[-8.57963774597738,-28.763097825460136],[-7.094230016460642,-29.188977411016822],[-5.589055824442767,-29.51720734219998],[-4.063115419470705,-29.74780568201095],[-2.5273698496166617,-29.8785741571337],[-0.9858180885203183,-29.90944047551602],[0.5565411379793659,-29.840314271859825],[2.087692823843099,-29.67197842989117],[3.609636461478658,-29.404469083994627],[5.106339990277775,-29.03949657920748],[6.578785081976093,-28.578078729100525],[8.015920334379189,-28.0230159657076],[9.418763560359366,-27.37332662474364],[10.773191832588054,-26.635755902156234]]]}},{"id":"2025-142184","height":79.8,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-41.35474477568641,2.8945729844272137],[-41.86586195533164,1.2856972925364971],[-42.281455482705496,-0.3499069083482027],[-42.59939936758019,-2.005277555435896],[-42.81974782317411,-3.683413882739842],[-42.93917632475495,-5.366374711506069],[-42.959666284848936,-7.053124148398638],[-42.880127605749294,-8.738681553862989],[-42.70052414003294,-10.421047434210777],[-42.42356596747413,-12.084171668626368],[-42.04728974390309,-13.730089889839292],[-41.57455012679566,-15.350749923847616],[-41.322955004521646,-16.093350336886942],[-40.310338249080814,-18.386816633865237],[-39.20891269145068,-20.635885042138398],[-38.01769665372558,-22.84157337807119],[-36.743525699013844,-24.994757435284555],[-35.38149146514479,-27.100526307709515],[-33.93839336570818,-29.147756291553378],[-32.41523114696611,-31.1364293275401],[-30.812968401471153,-33.06452784501016],[-29.134568218141794,-34.92999814264476],[-28.761659233714454,-35.32376660127193],[-27.129012360004708,-37.17540893238038],[-25.421245862497017,-38.96540471352637],[-24.767927739885636,-39.61425982322544],[-24.450714560924098,-39.82500855997205],[-24.093830392695963,-39.94346780516207],[-23.71519834268838,-39.96531328372657],[-23.34575627488084,-39.886985530145466],[-23.01066044799518,-39.71703044138849],[-22.852369022672065,-39.590882655233145],[-22.527125335065648,-39.246737100183964],[-22.284920427016914,-38.849086781963706],[-22.261022703372873,-38.79951521940529],[-19.87797816307284,-35.37634632922709],[-21.265910346759483,-33.48612453695387],[-18.892316101002507,-31.636896683834493],[-22.087124031852,-27.021821247413754],[-23.238390078069642,-25.64891410060227],[-24.312500870553777,-24.21239705197513],[-25.305547789903358,-22.71734110917896],[-26.211695025675,-21.172852402552962],[-27.032869774615392,-19.57489581592381],[-27.76232683949638,-17.93759426381439],[-28.39908454089891,-16.26196556724608],[-28.94126990577206,-14.555044081062078],[-29.388846785062924,-12.81483031064272],[-29.738123428309336,-11.058392204344273],[-29.98808201693464,-9.284748082049191],[-30.09160513104871,-8.206800264306366],[-30.163657664787024,-6.494376204907894],[-30.135735764866695,-4.783759337849915],[-30.008875324507244,-3.076931086368859],[-29.78111299860757,-1.3759270757436752],[-29.456700767972507,0.30532855819910765],[-29.033675290877,1.9648001864552498],[-28.515162302996032,3.5955438120290637],[-27.901125655625947,5.1995589304715395],[-27.19792525784578,6.756959082558751],[-26.402435369207524,8.274688262492418],[-25.520835174014792,9.742857462726533],[-25.153715786756948,10.301261374726892],[-20.41655613889452,18.09218988288194],[-22.973101583193056,19.51050085015595],[-21.702633495791815,21.799699584022164],[-24.453318378771655,25.53468429390341],[-24.754107756889425,25.82414169795811],[-25.11434612981975,26.0336679732427],[-25.517218563589267,26.15295845642686],[-25.93489486328326,26.1725094281137],[-26.343345015193336,26.09388666320592],[-26.722501847310923,25.920727693475783],[-27.0491724453168,25.663614057935774],[-34.28513518627733,15.901712003163993],[-35.61835660634097,14.01367615815252],[-36.86955706169829,12.07115390803665],[-38.0336836182978,10.077054127119482],[-39.112699616816826,8.033412444405258],[-40.10049816570245,5.946118892170489],[-40.996988905943,3.8201721971854568],[-41.35474477568641,2.8945729844272137]]]}},{"id":"2025-142185","height":99.9,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-5.542486379155889,-48.019365310668945],[-2.718122954131104,-47.8444044329226],[0.09403320925775915,-47.57021583802998],[2.8949999272590503,-47.19581785798073],[5.681741820299067,-46.7231557527557],[8.451277727843262,-46.15117556788027],[11.193537914310582,-45.48369555454701],[13.91455698851496,-44.71882465109229],[15.218960481346585,-44.31437348853797],[17.16392409184482,-43.715486866422],[19.028318283497356,-43.037138250656426],[20.85636675124988,-42.26712613925338],[22.643070767982863,-41.40536016412079],[24.38641277467832,-40.45280392561108],[26.078286381438375,-39.415311318822205],[27.713638644083403,-38.29579120874405],[29.3056650350336,-37.083481348119676],[29.616249463171698,-36.83107730001211],[30.87463803763967,-35.652739215642214],[32.05822070513386,-34.40804424509406],[33.16494376456831,-33.099955482408404],[34.19586117414292,-31.725491765886545],[35.14479374012444,-30.29454210959375],[36.009687759913504,-28.810069603845477],[36.784400186967105,-27.279963774606586],[37.471930255996995,-25.70427883695811],[38.064081214834005,-24.09386740811169],[38.107438177918084,-23.96364182140678],[38.701874148333445,-21.78423113655299],[39.198768864851445,-19.579055515117943],[39.597959678969346,-17.35711266193539],[39.89842876885086,-15.119384252466261],[40.099086032947525,-12.870850939303637],[40.199895327561535,-10.613512211479247],[40.20071207662113,-8.355366030707955],[40.13327295624185,-6.6090225810185075],[39.687797184684314,-2.207656783051789],[39.144021091167815,2.177484651096165],[38.499180375016294,6.55945261567831],[37.75967688194942,10.905129024758935],[37.44965467089787,12.564851032570004],[37.145765485591255,13.291395679116249],[36.75608477171045,13.974487932398915],[36.27866725786589,14.617163164541125],[36.1630648158025,14.750262188725173],[35.89008103101514,14.91820840165019],[35.584388333023526,14.991739109158516],[35.26892663235776,14.96743942424655],[34.975687754456885,14.844731043092906],[34.783952953177504,14.69418596662581],[30.47761598112993,12.534870188683271],[30.74465213646181,10.156874031759799],[27.59943045815453,9.935708946548402],[28.07782932196278,4.97670850623399],[28.260350508382544,2.5152340410277247],[28.343589743366465,0.038553038612008095],[28.32698100747075,-2.429322556592524],[28.210361651144922,-4.89739044662565],[27.99380396644119,-7.36165164783597],[27.678488414385356,-9.812126783654094],[27.262343221809715,-12.25277868937701],[26.966045158100314,-13.706526565365493],[26.443135436042212,-15.359192526899278],[25.826846095267683,-16.977168142795563],[25.11508728726767,-18.565415994264185],[24.316272626048885,-20.101086529903114],[23.429293935070746,-21.590160149149597],[22.457240807940252,-23.027692332863808],[21.406292437692173,-24.40379407722503],[20.27441318926867,-25.720428721047938],[19.068727780948393,-26.970724559389055],[17.795397332753055,-28.145792326889932],[16.45438569819089,-29.247631506063044],[15.966659278259613,-29.61784202978015],[14.221485563321039,-30.782380280084908],[12.423861772171222,-31.860964343883097],[10.576805212767795,-32.85264869593084],[8.685368825565092,-33.75452445913106],[6.753569664317183,-34.56566418707371],[4.781425801222213,-35.28506812546402],[2.78202427260112,-35.907972496934235],[0.752347779343836,-36.43532282765955],[-1.300569326034747,-36.86524613853544],[-2.581580308964476,-37.08210679050535],[-9.053250814322382,-38.200208333320916],[-8.455481816781685,-40.926207141019404],[-10.594100031652488,-41.39458406995982],[-11.610433401889168,-46.11154890060425],[-11.652978588710539,-46.52880955301225],[-11.595422828686424,-46.940879203379154],[-11.442385328467935,-47.32667285948992],[-11.203465945087373,-47.664015422575176],[-10.885409882524982,-47.93878396227956],[-10.499942991300486,-48.135765451937914],[-10.01769390143454,-48.400501139461994],[-5.542486379155889,-48.019365310668945]]]}},{"id":"2025-142186","height":9.4,"height_source":"Lidar-Derived","geometry":{"type":"MultiPolygon","coordinates":[[[[138.4720273107523,-152.17994316108525],[129.80763217166532,-156.64864762872458],[136.7866362782661,-158.88895863760263],[136.48672039189842,-159.8236043266952],[137.0237524450058,-160],[138.75810995383654,-160],[138.32828660472296,-159.85489425528795],[140.60729851934593,-152.8925907537341],[138.4720273107523,-152.17994316108525]]],[[[145.0796565845376,-159.47390306275338],[144.91391286056023,-160],[146.76133984164335,-160],[145.0796565845376,-159.47390306275338]]]]}},{"id":"2025-142187","height":9.6,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[139.96924091049004,-144.70547138899565],[139.4871936046984,-143.7656907811761],[136.5676799567882,-141.07172571960837],[136.19513686792925,-142.26207693386823],[137.7771932806354,-145.6399154625833],[139.5885715530021,-148.834886088036],[140.46634023275692,-149.127773351036],[139.96924091049004,-144.70547138899565]]]}},{"id":"2025-142188","height":9.7,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[139.5885715530021,-148.834886088036],[137.7771932806354,-145.6399154625833],[129.17810696491506,-150.09179938398302],[129.39613359118812,-150.53377199545503],[129.80763217166532,-156.64864762872458],[138.4720273107523,-152.17994316108525],[139.5885715530021,-148.834886088036]]]}},{"id":"2025-142189","height":9.7,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[123.72961404349189,-145.72700173035264],[129.00442401587497,-149.74163488671184],[129.17810696491506,-150.09179938398302],[137.7771932806354,-145.6399154625833],[136.19513686792925,-142.26207693386823],[132.63300866575446,-141.14860930014402],[123.72961404349189,-145.72700173035264]]]}},{"id":"2025-142190","height":9.7,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[123.72961404349189,-145.72700173035264],[129.00442401587497,-149.74163488671184],[129.17810696491506,-150.09179938398302],[137.7771932806354,-145.6399154625833],[136.19513686792925,-142.26207693386823],[132.63300866575446,-141.14860930014402],[123.72961404349189,-145.72700173035264]]]}},{"id":"2025-142191","height":10,"height_source":"Lidar-Derived","geometry":{"type":"MultiPolygon","coordinates":[[[[144.59152048069518,-158.53901270776987],[144.1314144777134,-160],[144.91391286056023,-160],[145.0796565845376,-159.47390306275338],[146.76138513174374,-160],[149.2615405889228,-160],[144.59152048069518,-158.53901270776987]]],[[[139.26686869119294,-159.38382611609995],[141.31508673226926,-153.12840142380446],[140.60729851934593,-152.8925907537341],[138.32828660472296,-159.85489425528795],[138.75810995383654,-160],[141.09189755364787,-160],[139.26686869119294,-159.38382611609995]]]]}},{"id":"2025-142192","height":11.7,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[136.19513686792925,-142.26207693386823],[137.2597427230794,-138.85807680804282],[133.6976144980872,-137.74460920877755],[132.63300866575446,-141.14860930014402],[136.19513686792925,-142.26207693386823]]]}},{"id":"2025-142193","height":12,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[142.05168682162184,-153.3747336389497],[143.16923083318397,-150.02969460841268],[139.5885715530021,-148.834886088036],[138.4720273107523,-152.17994316108525],[142.05168682162184,-153.3747336389497]]]}},{"id":"2025-142194","height":13.5,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[139.14616416406352,-151.84310456551611],[141.7158479737118,-152.70061485562474],[142.49409423070028,-150.36651513632387],[139.92541015485767,-149.5090229390189],[139.14616416406352,-151.84310456551611]]]}},{"id":"2025-142205","height":53.3,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[127.06087627925444,-156.40298040118068],[125.68533161864616,-155.98508651647717],[121.92159061983693,-148.8745455434546],[122.36078633891884,-147.48238474875689],[113.87337443919387,-144.76077411789447],[116.70643533836119,-135.640331517905],[124.86186058586463,-138.19392903707922],[126.26502962072846,-133.7089714501053],[116.96069449430797,-130.7585783433169],[108.64573600271251,-135.0385858779773],[106.82983457820956,-134.47272178344429],[105.11637206666637,-140.07915049046278],[106.97603960998822,-140.6028027050197],[111.3906566677615,-148.99519995972514],[110.96921068115626,-150.1246627671644],[115.97927452041768,-160],[125.91198785300367,-160],[127.06087627925444,-156.40298040118068]]]}},{"id":"2025-142206","height":58.7,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[125.9119485541014,-160],[136.0717349605402,-160],[136.46730278641917,-158.7401757966727],[127.23897204175591,-155.84515970852226],[125.9119485541014,-160]]]}},{"id":"2025-142421","height":75,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-156.71663518121932,-116.9206983493641],[-158.26114700327162,-116.38974278140813],[-160,-115.82570209912956],[-160,-127.27750054839998],[-156.71663518121932,-116.9206983493641]]]}},{"id":"2025-142423","height":76.1,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[-156.3936556528788,-126.88124055601656],[-158.15204615087714,-126.2874144949019],[-154.67574969446287,-115.9945231769234],[-157.310421269387,-112.64666315633804],[-160,-111.87940859142691],[-160,-137.5583620397374],[-156.3936556528788,-126.88124055601656]]]}},{"id":"2025-142430","height":32,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[159.40877646405715,-33.38688078708947],[158.6504348673625,-33.126154804602265],[158.04971320193727,-33.44031903799623],[157.7566700859461,-34.21607773471624],[156.4499159535626,-34.91650782804936],[155.6344262540806,-34.66374943964183],[155.1420327067608,-34.90486650913954],[154.85595743986778,-35.737755238078535],[153.62323287699837,-36.381519372574985],[152.79829367808998,-36.15359195973724],[152.07584385899827,-36.507558749988675],[148.64922297990415,-29.834143466316164],[149.322492273408,-29.545292374677956],[149.59215016302187,-28.680104590021074],[150.87459086277522,-28.052240214310586],[151.64983196812682,-28.26326808426529],[152.2157729008468,-28.047482216730714],[152.4923986401409,-27.239424465224147],[153.81557009823155,-26.57129341363907],[154.64794125244953,-26.775353428907692],[155.13290284678806,-26.558103722520173],[155.39411097299308,-25.717764970846474],[156.68400170188397,-25.06503344886005],[157.49949141358957,-25.317791812121868],[158.18966024217661,-24.979242608882487],[159.01833964895923,-26.549333738163114],[160,-26.039258216507733],[160,-22.054053821600974],[140.47582877113018,15.652849165722728],[118.67733515403233,4.149039352312684],[142.84673854371067,-42.34115669876337],[143.68748632527422,-44.07347755599767],[160,-35.71322054974735],[160,-33.079206112772226],[159.40877646405715,-33.38688078708947]]]}},{"id":"2025-142431","height":39.3,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[154.8905668728985,6.950676291249692],[159.7787492723437,7.273344265297055],[150.95220618508756,10.321104490198195],[154.8905668728985,6.950676291249692]]]}},{"id":"2025-142432","height":39.3,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[154.8905668728985,6.950676291249692],[154.0155141473515,4.406310886144638],[159.7787492723437,7.273344265297055],[154.8905668728985,6.950676291249692]]]}},{"id":"2025-142433","height":39.3,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[159.7797490170924,7.273326193913817],[160,6.823426789604127],[160,7.090354843996465],[159.7797490170924,7.273326193913817]]]}},{"id":"2025-142436","height":39.5,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[160,-22.05399986822158],[160,17.372820178978145],[135.5533294210909,25.160504790954292],[160,-22.05399986822158]]]}},{"id":"2025-142437","height":40.3,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[154.0155141473515,4.406310886144638],[154.8905668728985,6.950676291249692],[150.95220618508756,10.321104490198195],[154.0155141473515,4.406310886144638]]]}},{"id":"2025-142439","height":40.4,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[160,7.090354843996465],[160,7.20276905875653],[159.7797490170924,7.273326193913817],[160,7.090354843996465]]]}},{"id":"2025-142441","height":46.4,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[159.01833964895923,-26.549333738163114],[158.18966024217661,-24.979242608882487],[157.49949141358957,-25.317791812121868],[156.68400170188397,-25.06503344886005],[155.39412904612254,-25.716765225864947],[155.13290284678806,-26.558103722520173],[154.64894099498633,-26.775371502153575],[153.81557009823155,-26.57129341363907],[152.4923986401409,-27.239424465224147],[152.21579097153153,-28.04648246988654],[151.64883222267963,-28.26325001101941],[150.87459086277522,-28.052240214310586],[149.59215016302187,-28.680104590021074],[149.322492273408,-29.545292374677956],[148.64922297990415,-29.834143466316164],[152.07584385899827,-36.507558749988675],[152.79929342342075,-36.1536100320518],[153.62323287699837,-36.381519372574985],[154.85595743986778,-35.737755238078535],[155.1410148901632,-34.90584818273783],[155.6344262540806,-34.66374943964183],[156.4499159535626,-34.91650782804936],[157.75668815756217,-34.21507799066603],[158.04971320193727,-33.44031903799623],[158.6504348673625,-33.126154804602265],[159.40777672140393,-33.38686271477491],[160,-33.07890701293945],[160,-26.03910102788359],[159.01833964895923,-26.549333738163114]]]}},{"id":"2025-142442","height":60.5,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[143.7046446367167,-44.06478707678616],[160,-35.71324654854834],[160,17.372820178978145],[135.5533294210909,25.160504790954292],[140.47582877113018,15.652849165722728],[118.67733515403233,4.149039352312684],[113.88275746954605,14.094413617625833],[85.75576562376227,-73.15041448827833],[103.36811422312167,-107.50122128706425],[121.36506779724732,-113.21793581917882],[143.7046446367167,-44.06478707678616]]]}},{"id":"2025-142443","height":60.6,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[113.88275746954605,14.094413617625833],[85.75576562376227,-73.15041448827833],[103.36811422312167,-107.50122128706425],[121.36506779724732,-113.21793581917882],[143.696158732404,-44.09163560997695],[143.40851776918862,-43.51739528030157],[142.84770214313176,-42.34317425824702],[118.6773532256484,4.150039096362889],[113.88275746954605,14.094413617625833]]]}},{"id":"2025-142444","height":62.3,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[103.18964757514186,-65.03796079568565],[113.27387095312588,-84.76064792554826],[126.27704016072676,-88.95198690146208],[136.54039079823997,-56.996215670369565],[126.61528644571081,-37.43341562524438],[113.46700322034303,-33.192452111281455],[103.18964757514186,-65.03796079568565]]]}},{"id":"2025-142445","height":67,"height_source":"Lidar-Derived","geometry":{"type":"Polygon","coordinates":[[[124.27112669532653,-77.7639286853373],[130.00244361627847,-59.84424311853945],[125.75915198342409,-51.876973795704544],[119.67554428731091,-49.894868223927915],[113.86795476905536,-67.27613624278456],[118.31973273248877,-75.7152077164501],[124.27112669532653,-77.7639286853373]]]}},{"id":"2025-142511","height":45.8,"height_source":"Lidar-Derived","geometry":{"type":"MultiPolygon","coordinates":[[[[76.40522565564606,-117.84458932746202],[74.77298169268761,-122.60942561272532],[74.36452484561596,-122.7990560233593],[73.39621519460343,-123.3655936382711],[72.66624814097304,-123.96944211423397],[72.04536092060152,-124.73527383897454],[71.60952913260553,-125.44344643875957],[71.31595024769194,-126.13818939216435],[71.10922763170674,-127.0625187177211],[71.05709246604238,-127.89963608421385],[71.1757140676491,-128.91685284674168],[71.41969557642005,-129.8593302424997],[71.72167535463814,-130.58084022253752],[72.13592146232259,-131.34338242094964],[70.64827309374232,-136.07582993712276],[68.15844861837104,-135.2817679895088],[65.28344653372187,-144.50945879612118],[81.74292468465865,-149.7483496060595],[79.0184464053018,-158.44972392730415],[83.42009342915844,-159.81438444927335],[83.99768738495186,-160],[93.8040515842149,-160],[95.65011910710018,-154.16304761730134],[108.7208726053359,-158.21160051319748],[108.75519499287475,-158.24922360666096],[109.71770185872447,-160],[141.09189755364787,-160],[139.26686869119294,-159.38382611609995],[141.31608647538815,-153.12841949611902],[142.05168682162184,-153.3747336389497],[143.16923083318397,-150.02969460841268],[140.46634023275692,-149.127773351036],[139.96924091049004,-144.70547138899565],[139.4871936046984,-143.7656907811761],[136.5676799567882,-141.07172571960837],[137.2597427230794,-138.85807680804282],[133.6976144980872,-137.74460920877755],[133.53096776560415,-138.27763509750366],[125.68341028143186,-135.56659117154777],[126.26502962072846,-133.7089714501053],[116.9597128223395,-130.75756052695215],[116.92539619549643,-130.77494147606194],[86.04419586376753,-121.09305176511407],[86.08687266183551,-120.88980866037309],[84.48616946255788,-120.31383379828185],[80.42495879472699,-119.09233761951327],[76.40522565564606,-117.84458932746202]]],[[[144.59152048069518,-158.53901270776987],[144.1314144777134,-160],[149.2615405889228,-160],[144.59152048069518,-158.53901270776987]]]]}}]'),Bm=[{type:"LineString",coordinates:[[-72.75380383327138,-123.3998395614326],[-84.90831995254848,-160]]},{type:"LineString",coordinates:[[-160,-13.90393181797117],[-118.9000323904911,-42.736005051992834]]},{type:"LineString",coordinates:[[-15.515643321559764,-141.92777420021594],[-72.75380383327138,-123.3998395614326]]},{type:"LineString",coordinates:[[-53.94693387195002,-68.37887969333678],[-72.75380383327138,-123.3998395614326]]},{type:"LineString",coordinates:[[160,32.1832283930853],[106.51479569543153,48.9800844732672]]},{type:"LineString",coordinates:[[-118.9000323904911,-42.736005051992834],[-156.43916122976225,-160]]},{type:"LineString",coordinates:[[132.82190052373335,131.0394509397447],[106.51479569543153,48.9800844732672]]},{type:"LineString",coordinates:[[160,157.30464358534664],[143.83746682980563,150.5017388407141],[132.82190052373335,131.0394509397447]]},{type:"LineString",coordinates:[[132.54021797224414,160],[132.82190052373335,131.0394509397447]]},{type:"LineString",coordinates:[[61.386373943299986,-102.00998446997255],[42.943073717993684,-160]]},{type:"LineString",coordinates:[[106.51479569543153,48.9800844732672],[61.386373943299986,-102.00998446997255]]},{type:"LineString",coordinates:[[61.386373943299986,-102.00998446997255],[-49.878227320848964,-67.08333155326545],[-53.94693387195002,-68.37887969333678]]}],zm=["0,0","0,1","0,10","0,11","0,13","0,14","0,15","0,2","0,3","0,4","0,5","0,8","0,9","1,0","1,1","1,10","1,11","1,12","1,13","1,14","1,15","1,2","1,3","1,8","1,9","10,1","10,4","10,5","10,6","10,7","10,8","10,9","11,0","11,1","11,10","11,2","11,7","11,8","11,9","12,0","12,1","12,2","12,3","12,4","12,5","12,6","13,0","13,1","13,2","13,3","13,4","13,5","13,6","13,7","13,8","14,0","14,1","14,10","14,11","14,12","14,13","14,2","14,3","14,4","14,5","14,6","14,7","14,8","14,9","15,0","15,1","15,10","15,11","15,12","15,13","15,14","15,5","15,6","15,7","15,8","15,9","2,0","2,1","2,10","2,12","2,13","2,14","2,15","2,2","2,3","2,4","2,5","2,8","2,9","3,0","3,1","3,12","3,13","3,14","3,15","3,2","3,3","3,4","3,5","4,0","4,1","4,13","4,14","4,15","4,2","4,3","4,4","4,5","4,6","4,7","5,0","5,1","5,10","5,2","5,3","5,4","5,5","5,6","5,7","5,8","5,9","6,0","6,1","6,10","6,2","6,3","6,4","6,5","6,6","6,7","6,8","6,9","7,0","7,1","7,10","7,14","7,15","7,4","7,5","7,6","7,7","7,8","7,9","8,0","8,1","8,10","8,14","8,15","8,2","8,4","8,5","8,6","8,7","8,8","8,9","9,0","9,1","9,10","9,4","9,5","9,6","9,7","9,8","9,9"],Hm={id:"toronto-massing-2025",name:"Toronto 3D massing · 2025",publisher:"City of Toronto / City Planning",page:"https://open.toronto.ca/dataset/3d-massing/",url:"https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/387b2e3b-2a76-4199-8b3b-0b7d22e2ec10/resource/667237d6-4d3c-4cf3-8cb7-e91c48d59375/download/3dmassingshapefile_2025_wgs84.zip",sha256:"9617089710518f1a24f70ca11b4a7c20ae45ab8e52a6fbed1bc088192efe6285",retrieved_at:"2026-09-08T20:28:39.589956+00:00",vintage:"2025",status:"reference",source_crs:"EPSG:3857 (from .prj; archive filename is misleading)",storage_crs:"EPSG:4326",height_field:"AVG_HEIGHT",height_unit:"metres",height_method:"Uniform extrusion using source AVG_HEIGHT. No fallback heights, no vertical exaggeration.",ground_method:"Flat reference ground; SURF_ELEV and HEIGHT_MSL are not used as terrain.",records_in:428184,records_out:428167,rejected_count:17,rejection_reasons:{"Invalid or empty footprint; no silent repair":17},height_sources:{"Site Plan":8218,"Lidar-Derived":413021,"3D Model":5871,"Oblique Aerials":66,Photogrammetrics:990,"Site plan":1},duration_seconds:31.81,limitation:"2025 illustrative context model, not current surveyed buildings. Heights include LiDAR-derived, site-plan and other source methods. Roof shapes and terrain are not reconstructed. City requires user verification for legal or official use.",licence:"Open Government Licence – Toronto; additional City Planning illustrative-use notice applies."},km={key:"streets",name:"Centreline - Version 2 - 4326.geojson",publisher:"City of Toronto",slug:"toronto-centreline-tcl",page:"https://open.toronto.ca/dataset/toronto-centreline-tcl/",url:"https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/1d079757-377b-4564-82df-eb5638583bfb/resource/7bc94ccf-7bcf-4a7d-88b1-bdfc8ec5aaf1/download/centreline-version-2-4326.geojson",resource_id:"7bc94ccf-7bcf-4a7d-88b1-bdfc8ec5aaf1",sha256:"bea69def1245863f3dbe140d3aeb3525634cf33b8337a4cc598f9ec23a5d27ec",metadata_sha256:"c1b1a3902336e0fdc89e4434d36fb47dbf997a96a4f3a3faff1a1c994b5406a9",licence_evidence_sha256:"9c85bdf1dbe6a6e447840e7c57d21bfeec1bfa7a5a7d4787d57e7aeb1fb47614",licence:"Open Government Licence – Toronto",api_licence:"open-government-licence-toronto",licence_basis:"Publisher dataset page explicitly links Open Government Licence – Toronto; API metadata may be unspecified.",retrieved_at:"2026-11-13T22:59:45.067381+00:00",source_modified_at:"2026-11-13T18:18:32.057952",refresh_rate:"Daily",expected_records:64395,notes:`The Toronto Centreline is a data set of linear features representing streets/roads, walkways, rivers, railways, highways and administrative boundaries within the City of Toronto. Each line segment is described with a series of attributes including a unique identifier, name, feature code, and address ranges (where applicable).\r
In addition to retaining historical archives, threaded archives are also retained that record splits and merges of address points, of linear features and of area features. All features are linked and integrated.\r
`,schema:["_id","CENTRELINE_ID","LINEAR_NAME_ID","LINEAR_NAME_FULL","LINEAR_NAME_FULL_LEGAL","ADDRESS_L","ADDRESS_R","PARITY_L","PARITY_R","LO_NUM_L","HI_NUM_L","LO_NUM_R","HI_NUM_R","BEGIN_ADDR_POINT_ID_L","END_ADDR_POINT_ID_L","BEGIN_ADDR_POINT_ID_R","END_ADDR_POINT_ID_R","BEGIN_ADDR_L","END_ADDR_L","BEGIN_ADDR_R","END_ADDR_R","LOW_NUM_ODD","HIGH_NUM_ODD","LOW_NUM_EVEN","HIGH_NUM_EVEN","LINEAR_NAME","LINEAR_NAME_TYPE","LINEAR_NAME_DIR","LINEAR_NAME_DESC","LINEAR_NAME_LABEL","FROM_INTERSECTION_ID","TO_INTERSECTION_ID","ONEWAY_DIR_CODE","ONEWAY_DIR_CODE_DESC","FEATURE_CODE","FEATURE_CODE_DESC","JURISDICTION","CENTRELINE_STATUS","OBJECTID","MI_PRINX"],records_in:64395,records_out:64395,geometry_rejected:0},Vm="2025 source-height massing on flat ground; not current surveyed buildings or photorealistic reconstruction. Clipped at study edge. Source IDs are snapshot references, not established building identities.",Gm={id:Lm,name:Nm,centre:Im,extent_m:Um,crs:Fm,buildings:Om,roads:Bm,occupied_cells:zm,building_source:Hm,street_source:km,limitation:Vm},Is=16;function $o(i){const e=i.rotation*Math.PI/180,t=Math.cos(e),n=Math.sin(e);return[[-1,-1],[1,-1],[1,1],[-1,1]].map(([r,s])=>{const o=r*i.width/2,a=s*i.depth/2;return[i.x+o*t-a*n,i.z+o*n+a*t]})}const Li=(i,e,t)=>(e[0]-i[0])*(t[1]-i[1])-(e[1]-i[1])*(t[0]-i[0]);function Ni(i,e,t){return Math.abs(Li(i,e,t))<1e-7&&t[0]>=Math.min(i[0],e[0])-1e-7&&t[0]<=Math.max(i[0],e[0])+1e-7&&t[1]>=Math.min(i[1],e[1])-1e-7&&t[1]<=Math.max(i[1],e[1])+1e-7}function Wm(i,e,t,n){const r=Li(i,e,t),s=Li(i,e,n),o=Li(t,n,i),a=Li(t,n,e);return r*s<0&&o*a<0||Ni(i,e,t)||Ni(i,e,n)||Ni(t,n,i)||Ni(t,n,e)}function Oi(i,e){let t=!1;for(let n=0,r=e.length-1;n<e.length;r=n++){const s=e[r],o=e[n];if(Ni(s,o,i))return!0;s[1]>i[1]!=o[1]>i[1]&&i[0]<(o[0]-s[0])*(i[1]-s[1])/(o[1]-s[1])+s[0]&&(t=!t)}return t}function Xm(i,e){return i.some(t=>Oi(t,e[0])&&!e.slice(1).some(n=>Oi(t,n)))||e[0].some(t=>Oi(t,i))?!0:e.some(t=>t.some((n,r)=>i.some((s,o)=>Wm(n,t[(r+1)%t.length],s,i[(o+1)%i.length]))))}const fl=20;function jm(i,e,t,n,r){if(typeof document>"u")return null;const s=2048,o=document.createElement("canvas");o.width=s,o.height=s;const a=o.getContext("2d");if(!a)return null;const c=v=>(v+i/2)/i*s,l=v=>(v+i/2)/i*s;a.fillStyle="#ebe7de",a.fillRect(0,0,s,s),a.strokeStyle="#ded9cc",a.lineWidth=1.5;for(let v=-i/2;v<=i/2;v+=50){const m=c(v);a.beginPath(),a.moveTo(m,0),a.lineTo(m,s),a.stroke(),a.beginPath(),a.moveTo(0,m),a.lineTo(s,m),a.stroke()}const u=(v,m)=>{a.strokeStyle=v,a.lineWidth=m,a.lineCap="round",a.lineJoin="round";for(const d of e){const T=d.type==="LineString"?[d.coordinates]:d.coordinates;for(const E of T)if(!(E.length<2)){a.beginPath(),a.moveTo(c(E[0][0]),l(E[0][1]));for(let x=1;x<E.length;x++)a.lineTo(c(E[x][0]),l(E[x][1]));a.stroke()}}};u("#c2beb1",24),u("#ffffff",18),a.save(),a.setLineDash([14,14]),u("#d9d4c7",2),a.restore();const h=t.toLowerCase().includes("midtown")||n.toLowerCase().includes("midtown")||n.toLowerCase().includes("eglinton")?"midtown":"downtown",f=fc[h]||[],p=[];a.font="700 22px system-ui, -apple-system, sans-serif",a.textAlign="center",a.textBaseline="middle";for(const v of f){if(v.points.length<2)continue;let m=0,d=v.points[0],T=v.points[1];for(let A=0;A<v.points.length-1;A++){const[L,N]=v.points[A],[S,y]=v.points[A+1],w=Math.hypot(S-L,y-N);w>m&&(m=w,d=v.points[A],T=v.points[A+1])}if(m<45)continue;const E=c((d[0]+T[0])/2),x=l((d[1]+T[1])/2);if(E<70||E>s-70||x<70||x>s-70||p.some(A=>Math.hypot(A.x-E,A.y-x)<130))continue;p.push({x:E,y:x});let P=Math.atan2(l(T[1])-l(d[1]),c(T[0])-c(d[0]));P>Math.PI/2&&(P-=Math.PI),P<-Math.PI/2&&(P+=Math.PI),a.save(),a.translate(E,x),a.rotate(P),a.lineWidth=6,a.strokeStyle="rgba(255,255,255,0.95)",a.strokeText(v.name,0,0),a.fillStyle="#243b37",a.fillText(v.name,0,0),a.restore()}a.strokeStyle="#c9c4b6",a.lineWidth=4,a.strokeRect(0,0,s,s);const g=new Wu(o);return g.colorSpace=Ct,g.anisotropy=Math.min(8,Math.max(1,r)),g}function Ym({plots:i,selected:e,onCell:t,onBaseline:n,onSelectVolume:r,running:s,night:o,reset:a,capture:c,cameraControl:l,onCameraAction:u,reference:h=Gm,viewerOnly:f=!1,highlight:p="",conflict:g="",hiddenSourceIds:v=[],proposals:m=[],selectedProposal:d=null,showProposals:T=!0,onSelectProposal:E}){const x=Re.useRef(null),P=Re.useRef({onCell:t,onBaseline:n,onSelectVolume:r,onSelectProposal:E,running:s,onCameraAction:u}),A=Re.useRef(null),L=Re.useRef(null),N=Re.useRef(null),S=Re.useRef(null),y=Re.useRef(null),w=Re.useRef(null),[k,Z]=Re.useState(""),[O,z]=Re.useState(!1);return P.current={onCell:t,onBaseline:n,onSelectVolume:r,onSelectProposal:E,running:s,onCameraAction:u},Re.useEffect(()=>{const V=x.current;let Y;try{Y=new _m({antialias:!0,preserveDrawingBuffer:!0})}catch{Z("3D graphics are unavailable in this browser. You can still inspect and compare all buildings using the recorded building list.");return}const B=h.extent_m/320,$=new zu;N.current=$,$.background=new $e("#edf0ee"),$.fog=new Br("#edf0ee",420*B,1200*B);const le=new kt(40,1,.1,1800);le.position.set(280*B,290*B,340*B),S.current=le,Y.setPixelRatio(Math.min(devicePixelRatio,2)),Y.shadowMap.enabled=!0,Y.shadowMap.type=xl,Y.outputColorSpace=Ct,V.appendChild(Y.domElement),c&&(c.current=()=>(Y.render($,le),Y.domElement.toDataURL("image/png"))),Y.domElement.tabIndex=0,Y.domElement.setAttribute("role","application"),Y.domElement.setAttribute("aria-label","3D neighbourhood model. Mouse: drag to rotate, right-drag to pan, scroll to zoom, click a building to inspect. Keyboard: arrow keys to rotate and tilt, plus and minus to zoom, 0 to reset view.");const j=new xm(le,Y.domElement);y.current=j,j.enableDamping=!0,j.maxPolarAngle=Math.PI/2.15,j.minDistance=25,j.maxDistance=750*B,j.target.set(0,0,0);const De=Q=>{if(Q==="reset"){le.position.set(280*B,290*B,340*B),j.target.set(0,0,0),j.update();return}const ye=le.position.clone().sub(j.target),ge=new Po().setFromVector3(ye),b=Math.PI/12,_=Math.PI/18;Q==="orbit-left"?ge.theta+=b:Q==="orbit-right"?ge.theta-=b:Q==="tilt-up"?ge.phi=Math.max(.15,ge.phi-_):Q==="tilt-down"?ge.phi=Math.min(Math.PI/2.15,ge.phi+_):Q==="zoom-in"?ge.radius=Math.max(j.minDistance,ge.radius*.8):Q==="zoom-out"&&(ge.radius=Math.min(j.maxDistance,ge.radius*1.25)),ye.setFromSpherical(ge),le.position.copy(j.target).add(ye),j.update()};l&&(l.current=De);const Be=Q=>{let ye=null;Q.key==="ArrowLeft"?ye="orbit-left":Q.key==="ArrowRight"?ye="orbit-right":Q.key==="ArrowUp"?ye="tilt-up":Q.key==="ArrowDown"?ye="tilt-down":Q.key==="+"||Q.key==="="?ye="zoom-in":Q.key==="-"||Q.key==="_"?ye="zoom-out":(Q.key==="0"||Q.key==="Home"||Q.key==="r"||Q.key==="R")&&(ye="reset"),ye&&(Q.preventDefault(),De(ye),P.current.onCameraAction?.(ye))};Y.domElement.addEventListener("keydown",Be),$.add(new Ah(16777215,5535313,2));const we=new Ch(16771782,3);we.position.set(-140,260,140),we.castShadow=!0,we.shadow.mapSize.set(2048,2048),Object.assign(we.shadow.camera,{left:-220,right:220,top:220,bottom:-220,near:1,far:750}),$.add(we),w.current=we;const Ve=f?jm(h.extent_m,h.roads,h.id,h.name,Y.capabilities.getMaxAnisotropy()):null,X=new ut(new Tn(h.extent_m,2,h.extent_m),new xn(Ve?{map:Ve,roughness:.92}:{color:f?15001570:12108982,roughness:.95}));X.position.y=-1,X.receiveShadow=!0,$.add(X);const te=new Lh(320,Is,7444075,8562555);te.position.y=.03,f||$.add(te);const oe=new un;$.add(oe);for(const Q of h.buildings){const ye=Q.geometry.type==="Polygon"?[Q.geometry.coordinates]:Q.geometry.coordinates;for(const ge of ye){const b=ge[0];if(!b)continue;const _=new Yl(b.map(([q,ae])=>new me(q,-ae)));for(const q of ge.slice(1))_.holes.push(new Ao(q.map(([ae,ne])=>new me(ae,-ne))));const F=new ut(new jo(_,{depth:Q.height,bevelEnabled:!1}),new xn({color:f?13028816:10137265,roughness:.8}));F.userData.sourceId=Q.id,F.rotation.x=-Math.PI/2,F.castShadow=!0,F.receiveShadow=!0,F.userData.baseline=`Recorded massing ${Q.id}: ${Q.height.toFixed(1)} m; height source ${Q.height_source}. 2025 context, not verified current conditions.`,oe.add(F)}}for(const Q of h.roads){const ye=Q.type==="LineString"?[Q.coordinates]:Q.coordinates;for(const ge of ye){const b=new Dt().setFromPoints(ge.map(([_,F])=>new I(_,.2,F)));oe.add(new Hl(b,new Vo({color:16777215})))}}const ve=new un;A.current=ve,$.add(ve);const Me=new un;L.current=Me,$.add(Me);const Le=new Dh,je=new me;let C=[0,0];const ce=Q=>{for(let ye=Q;ye;ye=ye.parent)if(!ye.visible)return!1;return!0},ie=Q=>{C=[Q.clientX,Q.clientY]},se=Q=>{if(Q.button!==0||Math.hypot(Q.clientX-C[0],Q.clientY-C[1])>5)return;const ye=Y.domElement.getBoundingClientRect();je.set((Q.clientX-ye.left)/ye.width*2-1,-(Q.clientY-ye.top)/ye.height*2+1),Le.setFromCamera(je,le);const ge=Le.intersectObjects([...Me.children,...ve.children,...oe.children],!0),b=ge.filter(F=>ce(F.object));if(b.length){ge.splice(0,ge.length,...b);let F=ge[0].object;for(;F&&!F.userData.proposalNumber;)F=F.parent;if(F?.userData.proposalNumber){P.current.onSelectProposal?.(F.userData.proposalNumber);return}if(ge[0].object.userData.baseline){P.current.onBaseline(ge[0].object.userData.baseline);return}let q=ge[0].object;for(;q&&!q.userData.plot;)q=q.parent;if(q?.userData.plot){const ae=q.userData.plot;P.current.onSelectVolume?P.current.onSelectVolume(ae.id):P.current.onCell((ae.x+150)/20,(ae.z+150)/20);return}}const _=Le.intersectObject(X)[0];if(_){const F=Math.floor((_.point.x+160)/fl),q=Math.floor((_.point.z+160)/fl);F>=0&&F<Is&&q>=0&&q<Is&&P.current.onCell(F,q)}};Y.domElement.addEventListener("pointerdown",ie),Y.domElement.addEventListener("pointerup",se);const re=new ResizeObserver(()=>{const Q=V.clientWidth,ye=V.clientHeight;!Q||!ye||(Y.setSize(Q,ye),le.aspect=Q/ye,le.updateProjectionMatrix())});re.observe(V);let de=0;const ue=()=>{de=requestAnimationFrame(ue),j.update(),Y.render($,le)};return de=requestAnimationFrame(ue),z(!0),()=>{cancelAnimationFrame(de),re.disconnect(),j.dispose(),Y.domElement.removeEventListener("pointerdown",ie),Y.domElement.removeEventListener("pointerup",se),Y.domElement.removeEventListener("keydown",Be),$.traverse(Q=>{if(Q instanceof ut){Q.geometry.dispose();for(const ye of Array.isArray(Q.material)?Q.material:[Q.material])ye.dispose()}}),Ve?.dispose(),te.geometry.dispose(),te.material.dispose(),Y.dispose(),V.removeChild(Y.domElement),A.current=null,L.current=null,N.current=null,z(!1),c&&(c.current=null),l&&(l.current=null)}},[h.id]),Re.useEffect(()=>{const V=A.current;if(!V)return;for(const B of[...V.children])B.traverse($=>{if($ instanceof ut){$.geometry.dispose();for(const le of Array.isArray($.material)?$.material:[$.material])le.dispose()}}),V.remove(B);const Y=(B,$,le,j,De,Be=0,we=0,Ve=0)=>{const X=new ut(new Tn($,le,j),new xn({color:De,roughness:.75}));return X.position.set(Be,we+le/2,Ve),X.castShadow=!0,X.receiveShadow=!0,B.add(X),X};for(const B of i){const $=new un;if($.position.set(B.x,0,B.z),$.rotation.y=B.rotation*Math.PI/180,$.userData.plot=B,Y($,B.width,B.height,B.depth,14064187),B.id===e){const le=new ut(new Tn(B.width+.2,.12,B.depth+.2),new Or({color:16764516,wireframe:!0}));le.position.y=.4,$.add(le)}V.add($)}},[i,e,O]),Re.useEffect(()=>{const V=L.current;if(!V)return;for(const B of[...V.children])B.traverse($=>{if($ instanceof ut){$.geometry.dispose();for(const le of Array.isArray($.material)?$.material:[$.material])le.dispose()}}),V.remove(B);if(V.visible=T,!T||!m.length)return;const Y=new Map(h.buildings.map(B=>[B.id,B.height]));for(const B of m){const $=B.number===d,le=B.stage==="Built",j=Y.get(B.nearestBuildingId)??0,Be=v.includes(B.nearestBuildingId)&&i.length?Math.max(i[0].height,j):j,we=Math.max(Be+34,$?108:92),Ve=Math.max(8,we-Be),X=$?15079787:le?10177908:14037868,te=$?7209005:3541018,oe=new un;oe.position.set(B.x,0,B.z),oe.userData.proposalNumber=B.number;const ve=new ut(new Ii($?7.5:5.2,$?7.5:5.2,1.2,24),new xn({color:X,emissive:te,roughness:.55}));ve.position.y=Be+.6,oe.add(ve);const Me=new ut(new Ii($?1.5:.9,$?1.5:.9,Ve,12),new xn({color:X,emissive:te,roughness:.5}));Me.position.y=Be+Ve/2,Me.castShadow=!0,oe.add(Me);const Le=new ut(new Yo($?9:6.2,0),new xn({color:X,emissive:te,roughness:.35}));if(Le.position.y=we,Le.castShadow=!0,oe.add(Le),$){const C=new ut(new kr(12.5,1.1,12,32),new xn({color:16766011,emissive:8019712,roughness:.3}));C.rotation.x=Math.PI/2,C.position.y=we,oe.add(C);const ce=new ut(new kr(9.5,.8,10,32),new xn({color:16766011,emissive:8019712,roughness:.3}));ce.rotation.x=Math.PI/2,ce.position.y=Be+1.1,oe.add(ce)}const je=new ut(new Ii(8.5,8.5,we+14,10),new Or({colorWrite:!1,depthWrite:!1,transparent:!0,opacity:0}));je.position.y=(we+14)/2,oe.add(je),V.add(oe)}},[m,d,T,v,i,h,O]),Re.useEffect(()=>{N.current?.traverse(V=>{V.userData.sourceId&&(V.visible=!v.includes(V.userData.sourceId))})},[v,O]),Re.useEffect(()=>{N.current?.traverse(V=>{V instanceof ut&&V.userData.sourceId&&V.material.color.set(V.userData.sourceId===g?12663858:V.userData.sourceId===p?f?1797493:5014673:f?13028816:10137265)})},[p,g,O,f]),Re.useEffect(()=>{N.current&&(N.current.background=new $e(o?"#142c39":f?"#edf0ee":"#dbe7e5"),N.current.fog=new Br(o?"#142c39":f?"#edf0ee":"#dbe7e5",420*h.extent_m/320,1200*h.extent_m/320),w.current&&(w.current.intensity=o?.35:3))},[o,O]),Re.useEffect(()=>{!S.current||!y.current||(S.current.position.set(280*h.extent_m/320,290*h.extent_m/320,340*h.extent_m/320),y.current.target.set(0,0,0),y.current.update())},[a]),R.jsx("div",{className:"scene",ref:x,children:k&&R.jsx("p",{role:"alert",className:"graphics-error",children:k})})}Ec(bc);function qm(i,e,t){const n=document.createElement("div");return n.className=`a-map-dom-label a-map-street-label is-${t}`,n.setAttribute("aria-hidden","true"),n.textContent=i,n.style.transform=`rotate(${e}deg)`,n}function Zm(i,e){const t=document.createElement("div");t.className="a-map-dom-label a-map-station-label",t.setAttribute("aria-hidden","true");const n=e.includes("2")&&!e.includes("1")?"#16803c":e.includes("5")&&!e.includes("1")?"#d97724":"#d49000",r=document.createElement("span");r.className="a-map-station-dot",r.style.background=n;const s=document.createElement("span");return s.textContent=i,t.append(r,s),t}function pl(i){return i>=1e3?`${(i/1e3).toFixed(1).replace(/\.0$/,"")}k`:`${i}`}function $m({region:i,view:e,basemapMode:t,highlight:n,conflict:r="",plots:s,hiddenSourceIds:o,proposals:a,selectedProposal:c,showProposals:l,onSelectBuilding:u,onSelectProposal:h,cameraControl:f,onCameraAction:p,reset:g}){const v=Re.useRef(null),m=Re.useRef(null),d=Re.useRef([]),T=Re.useRef([]),E=Re.useRef({onSelectBuilding:u,onSelectProposal:h,onCameraAction:p,basemapMode:t});E.current={onSelectBuilding:u,onSelectProposal:h,onCameraAction:p,basemapMode:t};const[x,P]=Re.useState(!1),[A,L]=Re.useState(""),[N,S]=Re.useState(""),y=Re.useMemo(()=>pc(i,e.buildings),[i,e]),w=Re.useMemo(()=>{const O=e.extent_m/2,z=Vt(i,-O,-O),V=Vt(i,O,-O),Y=Vt(i,O,O),B=Vt(i,-O,O);return{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[[z,V,Y,B,z]]},properties:{name:e.name}}]}},[i,e.extent_m,e.name]),k=Re.useMemo(()=>({type:"FeatureCollection",features:a.map(z=>{const Y=Vt(i,z.x-11,z.z-11),B=Vt(i,z.x+11,z.z-11),$=Vt(i,z.x+11,z.z+11),le=Vt(i,z.x-11,z.z+11),[j,De]=Vt(i,z.x,z.z);return{type:"Feature",geometry:{type:"Polygon",coordinates:[[Y,B,$,le,Y]]},properties:{number:z.number,label:z.label,units:z.units,stage:z.stage,height:Math.max(18,Math.min(180,Math.round(18+Math.sqrt(Math.max(0,z.units))*2.2))),lon:j,lat:De}}})}),[i,a]),Z=Re.useMemo(()=>({type:"FeatureCollection",features:s.map(z=>{const V=$o(z).map(([B,$])=>Vt(i,B,$));return{type:"Feature",geometry:{type:"Polygon",coordinates:[[...V,V[0]]]},properties:{id:z.id,height:z.height}}})}),[i,s]);return Re.useEffect(()=>{const O=v.current;if(!O)return;const z=na[i],[V,Y,B,$]=z.boundsWgs84,le=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;let j;try{j=new Sc({container:O,center:z.centre,zoom:15.65,pitch:56,bearing:-18,minZoom:13.2,maxZoom:18.6,maxBounds:[[V-.015,Y-.012],[B+.015,$+.012]],attributionControl:!1,dragRotate:!0,pitchWithRotate:!0,style:{version:8,sources:{"osm-raster":{type:"raster",tiles:["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],tileSize:256,maxzoom:19,attribution:"© OpenStreetMap contributors"},"satellite-raster":{type:"raster",tiles:["https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],tileSize:256,maxzoom:19,attribution:"Esri World Imagery"}},layers:[{id:"background",type:"background",paint:{"background-color":"#ebe7de"}},{id:"osm-tiles",type:"raster",source:"osm-raster",layout:{visibility:"none"}},{id:"satellite-tiles",type:"raster",source:"satellite-raster",layout:{visibility:"none"}}]}})}catch{L("Interactive 3D map graphics are unavailable in this browser. You can still inspect all recorded buildings and proposals from the left panel.");return}m.current=j,j.addControl(new Mc({visualizePitch:!0,showCompass:!0}),"top-right");const De=j.getCanvas();De.tabIndex=0,De.setAttribute("role","application"),De.setAttribute("aria-label",`Toronto 3D street map of ${e.name}. Drag to pan, right-drag to rotate and tilt, scroll to zoom, click any building or proposal tower to inspect. Keyboard: arrow keys to rotate and tilt, plus and minus to zoom, 0 to reset view.`);const Be=X=>{const te=le()?0:240;if(X==="reset"){j.easeTo({center:z.centre,zoom:15.65,pitch:56,bearing:-18,duration:le()?0:420});return}X==="orbit-left"?j.easeTo({bearing:j.getBearing()-22,duration:te}):X==="orbit-right"?j.easeTo({bearing:j.getBearing()+22,duration:te}):X==="tilt-up"?j.easeTo({pitch:Math.max(0,j.getPitch()-10),duration:te}):X==="tilt-down"?j.easeTo({pitch:Math.min(72,j.getPitch()+10),duration:te}):X==="zoom-in"?j.easeTo({zoom:Math.min(18.5,j.getZoom()+.65),duration:te}):X==="zoom-out"&&j.easeTo({zoom:Math.max(13.2,j.getZoom()-.65),duration:te})};f&&(f.current=Be);const we=X=>{let te=null;X.key==="ArrowLeft"?te="orbit-left":X.key==="ArrowRight"?te="orbit-right":X.key==="ArrowUp"?te="tilt-up":X.key==="ArrowDown"?te="tilt-down":X.key==="+"||X.key==="="?te="zoom-in":X.key==="-"||X.key==="_"?te="zoom-out":(X.key==="0"||X.key==="Home"||X.key==="r"||X.key==="R")&&(te="reset"),te&&(X.preventDefault(),Be(te),E.current.onCameraAction?.(te))};De.addEventListener("keydown",we),j.on("error",X=>{if(E.current.basemapMode==="vector")return;const te=X?.error;(te?.status||te?.message?.toLowerCase().includes("tile")||te?.message?.toLowerCase().includes("fetch"))&&S("External web tiles are unreachable right now. Switch back to 3D Street Map for offline City of Toronto vector streets.")}),j.on("load",()=>{j.addSource("water",{type:"geojson",data:mc}),j.addSource("parks",{type:"geojson",data:gc}),j.addSource("streets",{type:"geojson",data:_c}),j.addSource("subway-lines",{type:"geojson",data:vc}),j.addSource("window-boundary",{type:"geojson",data:w}),j.addSource("buildings",{type:"geojson",data:y}),j.addSource("proposals",{type:"geojson",data:{type:"FeatureCollection",features:[]}}),j.addSource("replacement",{type:"geojson",data:{type:"FeatureCollection",features:[]}}),j.addLayer({id:"water-fill",type:"fill",source:"water",paint:{"fill-color":"#c2dced","fill-opacity":.95}}),j.addLayer({id:"water-outline",type:"line",source:"water",paint:{"line-color":"#9abbd0","line-width":1.2}}),j.addLayer({id:"parks-fill",type:"fill",source:"parks",paint:{"fill-color":"#d5e8ce","fill-opacity":.9}}),j.addLayer({id:"parks-outline",type:"line",source:"parks",paint:{"line-color":"#b1cca7","line-width":1}}),j.addLayer({id:"streets-rail",type:"line",source:"streets",filter:["==",["get","cls"],"rail"],paint:{"line-color":"#9a958c","line-width":1.4,"line-dasharray":[3,2]}}),j.addLayer({id:"streets-local",type:"line",source:"streets",filter:["==",["get","cls"],"local"],paint:{"line-color":"#ffffff","line-width":["interpolate",["linear"],["zoom"],13.5,1.2,15.5,2.8,17.5,5.5]}}),j.addLayer({id:"streets-collector",type:"line",source:"streets",filter:["==",["get","cls"],"collector"],paint:{"line-color":"#ffffff","line-width":["interpolate",["linear"],["zoom"],13.5,1.8,15.5,4,17.5,7.5]}}),j.addLayer({id:"streets-minor-casing",type:"line",source:"streets",filter:["==",["get","cls"],"minor"],paint:{"line-color":"#c5c3b6","line-width":["interpolate",["linear"],["zoom"],13.5,3,15.5,6.2,17.5,11]}}),j.addLayer({id:"streets-minor",type:"line",source:"streets",filter:["==",["get","cls"],"minor"],paint:{"line-color":"#ffffff","line-width":["interpolate",["linear"],["zoom"],13.5,2,15.5,4.6,17.5,8.6]}}),j.addLayer({id:"streets-major-casing",type:"line",source:"streets",filter:["==",["get","cls"],"major"],paint:{"line-color":"#b8b5a4","line-width":["interpolate",["linear"],["zoom"],13.5,4.5,15.5,8.5,17.5,15]}}),j.addLayer({id:"streets-major",type:"line",source:"streets",filter:["==",["get","cls"],"major"],paint:{"line-color":"#fff6da","line-width":["interpolate",["linear"],["zoom"],13.5,3,15.5,6.5,17.5,12]}}),j.addLayer({id:"streets-expressway-casing",type:"line",source:"streets",filter:["==",["get","cls"],"expressway"],paint:{"line-color":"#b98e5d","line-width":["interpolate",["linear"],["zoom"],13.5,5,15.5,9.5,17.5,16]}}),j.addLayer({id:"streets-expressway",type:"line",source:"streets",filter:["==",["get","cls"],"expressway"],paint:{"line-color":"#f6d59c","line-width":["interpolate",["linear"],["zoom"],13.5,3.4,15.5,7.2,17.5,13]}}),j.addLayer({id:"ttc-subway-lines",type:"line",source:"subway-lines",paint:{"line-color":["get","color"],"line-width":3.2,"line-dasharray":[2.5,1.5],"line-opacity":.82}}),j.addLayer({id:"window-boundary-fill",type:"fill",source:"window-boundary",paint:{"fill-color":"#1b6d75","fill-opacity":.04}}),j.addLayer({id:"window-boundary-line",type:"line",source:"window-boundary",paint:{"line-color":"#25535c","line-width":2,"line-dasharray":[4,2],"line-opacity":.85}}),j.addLayer({id:"buildings-3d",type:"fill-extrusion",source:"buildings",paint:{"fill-extrusion-color":"#c6cdd0","fill-extrusion-height":["get","height"],"fill-extrusion-base":0,"fill-extrusion-opacity":.9}}),j.addLayer({id:"proposals-3d",type:"fill-extrusion",source:"proposals",paint:{"fill-extrusion-color":"#e05235","fill-extrusion-height":["get","height"],"fill-extrusion-base":0,"fill-extrusion-opacity":.86}}),j.addLayer({id:"replacement-3d",type:"fill-extrusion",source:"replacement",paint:{"fill-extrusion-color":"#d97706","fill-extrusion-height":["get","height"],"fill-extrusion-base":0,"fill-extrusion-opacity":.94}});const X=[],[te,oe]=z.centre;for(const ve of xc)ve.in3d&&(Math.abs(ve.lon-te)>.014||Math.abs(ve.lat-oe)>.011||X.push(new Kr({element:qm(ve.name,ve.angle,ve.cls),anchor:"center"}).setLngLat([ve.lon,ve.lat]).addTo(j)));for(const ve of yc){if(Math.abs(ve.lon-te)>.0056||Math.abs(ve.lat-oe)>.0046)continue;const Me=ve.name==="St Patrick"?[-14,18]:[0,0];X.push(new Kr({element:Zm(ve.name,ve.lines),anchor:"left",offset:Me}).setLngLat([ve.lon,ve.lat]).addTo(j))}d.current=X,j.on("mouseenter","buildings-3d",()=>{j.getCanvas().style.cursor="pointer"}),j.on("mouseleave","buildings-3d",()=>{j.getCanvas().style.cursor=""}),j.on("mouseenter","proposals-3d",()=>{j.getCanvas().style.cursor="pointer"}),j.on("mouseleave","proposals-3d",()=>{j.getCanvas().style.cursor=""}),j.on("click","proposals-3d",ve=>{const Le=ve.features?.[0]?.properties?.number;Le&&E.current.onSelectProposal(String(Le))}),j.on("click","buildings-3d",ve=>{if(j.queryRenderedFeatures(ve.point,{layers:["proposals-3d"]}).length)return;const je=ve.features?.[0]?.properties?.id;je&&E.current.onSelectBuilding(String(je))}),P(!0)});const Ve=new ResizeObserver(()=>j.resize());return Ve.observe(O),()=>{De.removeEventListener("keydown",we),d.current.forEach(X=>X.remove()),d.current=[],T.current.forEach(X=>X.remove()),T.current=[],Ve.disconnect(),j.remove(),m.current=null}},[i,e.name,y,w]),Re.useEffect(()=>{const O=m.current;if(!x||!O)return;S(""),O.setLayoutProperty("osm-tiles","visibility",t==="osm"?"visible":"none"),O.setLayoutProperty("satellite-tiles","visibility",t==="satellite"?"visible":"none");const z=t==="vector";O.setPaintProperty("water-fill","fill-opacity",z?.95:.12),O.setPaintProperty("water-outline","line-opacity",z?1:.25),O.setPaintProperty("parks-fill","fill-opacity",z?.9:.22),O.setPaintProperty("parks-outline","line-opacity",z?1:.25),O.setPaintProperty("streets-local","line-opacity",z?1:.18),O.setPaintProperty("streets-collector","line-opacity",z?1:.22),O.setPaintProperty("streets-minor","line-opacity",z?1:.25),O.setPaintProperty("streets-minor-casing","line-opacity",z?1:.2),O.setPaintProperty("streets-major","line-opacity",z?1:.35),O.setPaintProperty("streets-major-casing","line-opacity",z?1:.25),O.setPaintProperty("streets-expressway","line-opacity",z?1:.4),O.setPaintProperty("buildings-3d","fill-extrusion-opacity",z?.92:.8)},[x,t]),Re.useEffect(()=>{const O=m.current;!x||!O||(O.setFilter("buildings-3d",o.length?["!",["in",["get","id"],["literal",o]]]:["all"]),O.setPaintProperty("buildings-3d","fill-extrusion-color",["case",["==",["get","id"],r||""],"#c13c32",["==",["get","id"],n||""],"#1b6d75","#c6cdd0"]))},[x,n,r,o]),Re.useEffect(()=>{const O=m.current;!x||!O||O.getSource("replacement")?.setData(Z)},[x,Z]),Re.useEffect(()=>{const O=m.current;if(!x||!O||(O.getSource("proposals")?.setData(k),O.setLayoutProperty("proposals-3d","visibility",l?"visible":"none"),O.setPaintProperty("proposals-3d","fill-extrusion-color",["case",["==",["get","number"],c||""],"#9e1b10","#e05235"]),T.current.forEach(Y=>Y.remove()),T.current=[],!l))return;const z=[],V=[];for(const Y of a){const B=Y.number===c,$=document.createElement("button");$.type="button",$.className=B?"a-map-proposal-pin is-selected":"a-map-proposal-pin",$.setAttribute("aria-pressed",B?"true":"false"),$.setAttribute("aria-label",`Proposal ${Y.label} — ${Y.units.toLocaleString()} units (${Y.stage})`),$.title=`${Y.label} · ${Y.units.toLocaleString()} units (${Y.stage})`,$.textContent=B?`${Y.label.split(",")[0].slice(0,18)} · ${pl(Y.units)}`:pl(Y.units),$.addEventListener("click",we=>{we.stopPropagation(),E.current.onSelectProposal(Y.number)});const le=V.filter(we=>Math.hypot(Y.x-we.x,Y.z-we.z)<65).length;V.push({x:Y.x,z:Y.z});const j=[0,-28*le],[De,Be]=Vt(i,Y.x,Y.z);z.push(new Kr({element:$,anchor:"bottom",offset:j}).setLngLat([De,Be]).addTo(O))}T.current=z},[x,i,k,a,l,c]),Re.useEffect(()=>{const O=m.current;if(!x||!O||g===0)return;const z=na[i];O.easeTo({center:z.centre,zoom:15.65,pitch:56,bearing:-18,duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:420})},[x,i,g]),A?R.jsx("div",{className:"scene",children:R.jsx("div",{className:"graphics-error",role:"alert",children:A})}):R.jsxs("div",{className:"scene a-map3d-wrap",children:[N&&R.jsx("p",{role:"status",className:"a-map3d-notice",children:N}),R.jsx("div",{ref:v,className:"a-map3d-host"})]})}function qr(i){return i.geometry.type==="Polygon"?[i.geometry.coordinates]:i.geometry.coordinates}function oc(i){const e=t=>Math.abs(t.reduce((n,r,s)=>{const o=t[(s+1)%t.length];return n+r[0]*o[1]-o[0]*r[1]},0)/2);return qr(i).reduce((t,n)=>t+e(n[0])-n.slice(1).reduce((r,s)=>r+e(s),0),0)}function Vr(i){const e=qr(i).flatMap(o=>o[0]),t=e.map(o=>o[0]),n=e.map(o=>o[1]),r=Math.min(150,Math.max(2,Math.max(...t)-Math.min(...t))),s=Math.min(150,Math.max(2,Math.max(...n)-Math.min(...n)));return{id:"replacement-volume",kind:"volume",x:Math.round((Math.min(...t)+Math.max(...t))*50)/100,z:Math.round((Math.min(...n)+Math.max(...n))*50)/100,width:Math.round(r*100)/100,depth:Math.round(s*100)/100,height:Math.round(Math.min(400,i.height)*100)/100,rotation:0}}function Lr(i,e){const t=e,n=t?.volume;if(!t||t.schema!==1||t.baseline!==i.id||!i.buildings.some(o=>o.id===t.removed)||!n||n.kind!=="volume"||![n.x,n.z,n.width,n.depth,n.height,n.rotation].every(Number.isFinite)||n.width<2||n.width>150||n.depth<2||n.depth>150||n.height<1||n.height>400||n.rotation<0||n.rotation>=360)throw Error("Invalid replacement or incompatible source version.");const r=$o(n);if(r.some(([o,a])=>Math.abs(o)>i.extent_m/2||Math.abs(a)>i.extent_m/2))throw Error("Replacement crosses the local study boundary.");const s=i.buildings.find(o=>o.id!==t.removed&&qr(o).some(a=>Xm(r,a)));if(s)throw Error(`Replacement footprint intersects source feature ${s.id}. Adjust size, position or rotation.`);return{schema:1,baseline:i.id,removed:t.removed,volume:{id:"replacement-volume",kind:"volume",x:n.x,z:n.z,width:n.width,depth:n.depth,height:n.height,rotation:n.rotation}}}function Km(i,e){const t=i.buildings.find(s=>s.id===e.removed),n=oc(t),r=e.volume.width*e.volume.depth;return{oldHeight:t.height,newHeight:e.volume.height,heightChange:e.volume.height-t.height,oldArea:n,newArea:r,areaChange:r-n,oldVolume:n*t.height,newVolume:r*e.volume.height,volumeChange:r*e.volume.height-n*t.height}}function Nr(i,e){const t=Vr(e),n=qr(e),r=n.flatMap(c=>c[0]),s=r.map(c=>c[0]),o=r.map(c=>c[1]),a=[{x:t.x,z:t.z}];for(const c of[.25,.5,.75])for(const l of[.25,.5,.75])a.push({x:Math.min(...s)+(Math.max(...s)-Math.min(...s))*c,z:Math.min(...o)+(Math.max(...o)-Math.min(...o))*l});for(const c of[.9,.7,.5,.25,.1])for(const l of a){const u={...t,x:Math.round(l.x*100)/100,z:Math.round(l.z*100)/100,width:Math.max(2,Math.floor(t.width*c*100)/100),depth:Math.max(2,Math.floor(t.depth*c*100)/100)};if(n.some(h=>$o(u).every(f=>Oi(f,h[0])&&!h.slice(1).some(p=>Oi(f,p)))))try{return Lr(i,{schema:1,baseline:i.id,removed:e.id,volume:u}).volume}catch{}}return null}function ml(i,e){const t=e?Vr(e):null,n=i.buildings.filter(r=>!e||r.id!==e.id).map(r=>{const s=Vr(r),o=t?Math.hypot(s.x-t.x,s.z-t.z):0;return{b:r,dist:o,area:oc(r)}}).sort((r,s)=>t?r.dist-s.dist:s.area-r.area);for(const r of n){const s=Nr(i,r.b);if(s)return{building:r.b,volume:s,distance_m:Math.round(r.dist)}}return null}const Mn=[{number:"22 162242 STE 11 OZ",label:"180 DUNDAS ST W",units:1551,stage:"Active",cellId:"1260_9669",region:"downtown",x:-221.09,z:-199.17,nearestStop:{name:"Dundas St West at Chestnut St",distance_m:43.7},serviceSummary:{morning:{stopName:"Dundas St West at Chestnut St",distance_m:43.7,routes:["505"],minHourlyDepartures:6,maxHourlyDepartures:12,status:"Route 505, direction 0: 07:00–08:00: 6 scheduled departures, 08:00–09:00: 12 scheduled departures at Dundas St West at Chestnut St (44 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[6,12],route:"505",route_name:"505"}]},evening:{stopName:"Dundas St West at Chestnut St",distance_m:43.7,routes:["505"],minHourlyDepartures:12,maxHourlyDepartures:12,status:"Route 505, direction 0: 16:00–17:00: 12 scheduled departures, 17:00–18:00: 12 scheduled departures at Dundas St West at Chestnut St (44 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[12,12],route:"505",route_name:"505"}]},saturday:{stopName:"Dundas St West at Chestnut St",distance_m:43.7,routes:["505"],minHourlyDepartures:10,maxHourlyDepartures:12,status:"Route 505, direction 0: 12:00–13:00: 10 scheduled departures, 13:00–14:00: 12 scheduled departures at Dundas St West at Chestnut St (44 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[10,12],route:"505",route_name:"505"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=5CN%2FsNeGg8zFKjMCnywAog%3D%3D",nearestBuildingId:"2025-142244",nearestBuildingDistM:0},{number:"19 239929 STE 13 OZ",label:"483 BAY ST",units:538,stage:"Active",cellId:"1260_9669",region:"downtown",x:152.76,z:-38.55,nearestStop:{name:"Bay St at Hagerman St",distance_m:90.6},serviceSummary:{morning:{stopName:"Queen Station - Northbound Platform",distance_m:203.3,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Queen Station - Northbound Platform (203 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Queen Station - Northbound Platform",distance_m:203.3,routes:["1"],minHourlyDepartures:19,maxHourlyDepartures:23,status:"Route 1, direction 1: 16:00–17:00: 19 scheduled departures, 17:00–18:00: 23 scheduled departures at Queen Station - Northbound Platform (203 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[19,23],route:"1",route_name:"1"}]},saturday:{stopName:"Queen Station - Northbound Platform",distance_m:203.3,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Queen Station - Northbound Platform (203 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=mc3RN9CEVoQu%2FxoMWib7Yw%3D%3D",nearestBuildingId:"2025-142430",nearestBuildingDistM:0},{number:"22 204655 STE 10 OZ",label:"191 DUNDAS ST W",units:135,stage:"Under Review",cellId:"1260_9669",region:"downtown",x:-235.04,z:-162.14,nearestStop:{name:"Dundas St West at Chestnut St",distance_m:60.6},serviceSummary:{morning:{stopName:"Dundas St West at Chestnut St",distance_m:60.6,routes:["505"],minHourlyDepartures:6,maxHourlyDepartures:12,status:"Route 505, direction 0: 07:00–08:00: 6 scheduled departures, 08:00–09:00: 12 scheduled departures at Dundas St West at Chestnut St (61 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[6,12],route:"505",route_name:"505"}]},evening:{stopName:"Dundas St West at Chestnut St",distance_m:60.6,routes:["505"],minHourlyDepartures:12,maxHourlyDepartures:12,status:"Route 505, direction 0: 16:00–17:00: 12 scheduled departures, 17:00–18:00: 12 scheduled departures at Dundas St West at Chestnut St (61 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[12,12],route:"505",route_name:"505"}]},saturday:{stopName:"Dundas St West at Chestnut St",distance_m:60.6,routes:["505"],minHourlyDepartures:10,maxHourlyDepartures:12,status:"Route 505, direction 0: 12:00–13:00: 10 scheduled departures, 13:00–14:00: 12 scheduled departures at Dundas St West at Chestnut St (61 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[10,12],route:"505",route_name:"505"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=mCS12vKAw9E6iIyFMWYVlg%3D%3D",nearestBuildingId:"2025-141959",nearestBuildingDistM:0},{number:"20 232714 STE 12 OZ",label:"2180 YONGE ST",units:2892,stage:"Under Review",cellId:"1258_9680",region:"midtown",x:23.72,z:173.04,nearestStop:{name:"Eglinton Station at Bus Bay 2",distance_m:18.3},serviceSummary:{morning:{stopName:"Yonge St at Berwick Ave",distance_m:32.1,routes:["97"],minHourlyDepartures:5,maxHourlyDepartures:5,status:"Route 97, direction 0: 07:00–08:00: 5 scheduled departures, 08:00–09:00: 5 scheduled departures at Yonge St at Berwick Ave (32 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[5,5],route:"97",route_name:"97"}]},evening:{stopName:"Yonge St at Berwick Ave",distance_m:32.1,routes:["97"],minHourlyDepartures:4,maxHourlyDepartures:4,status:"Route 97, direction 0: 16:00–17:00: 4 scheduled departures, 17:00–18:00: 4 scheduled departures at Yonge St at Berwick Ave (32 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[4,4],route:"97",route_name:"97"}]},saturday:{stopName:"Yonge St at Berwick Ave",distance_m:32.1,routes:["97"],minHourlyDepartures:4,maxHourlyDepartures:5,status:"Route 97, direction 0: 12:00–13:00: 5 scheduled departures, 13:00–14:00: 4 scheduled departures at Yonge St at Berwick Ave (32 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[5,4],route:"97",route_name:"97"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=N59s8Qf2JU22pCem2v3syQ%3D%3D",nearestBuildingId:"2025-145569",nearestBuildingDistM:0},{number:"20 229115 NNY 08 OZ",label:"50-60 EGLINTON AVE W",units:1559,stage:"Under Review",cellId:"1257_9681",region:"midtown",x:-160.26,z:-32.97,nearestStop:{name:"Eglinton Ave West at Duplex Ave",distance_m:41.3},serviceSummary:{morning:{stopName:"Eglinton Station - Westbound Platform",distance_m:104.4,routes:["5"],minHourlyDepartures:10,maxHourlyDepartures:17,status:"Route 5, direction 1: 07:00–08:00: 10 scheduled departures, 08:00–09:00: 17 scheduled departures at Eglinton Station - Westbound Platform (104 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[10,17],route:"5",route_name:"5"}]},evening:{stopName:"Eglinton Station - Westbound Platform",distance_m:104.4,routes:["5"],minHourlyDepartures:16,maxHourlyDepartures:16,status:"Route 5, direction 1: 16:00–17:00: 16 scheduled departures, 17:00–18:00: 16 scheduled departures at Eglinton Station - Westbound Platform (104 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,16],route:"5",route_name:"5"}]},saturday:{stopName:"Eglinton Station - Westbound Platform",distance_m:104.4,routes:["5"],minHourlyDepartures:9,maxHourlyDepartures:9,status:"Route 5, direction 1: 12:00–13:00: 9 scheduled departures, 13:00–14:00: 9 scheduled departures at Eglinton Station - Westbound Platform (104 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[9,9],route:"5",route_name:"5"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=2vCFK%2Bw2tAsTHYuXenqFrQ%3D%3D",nearestBuildingId:"2025-148872",nearestBuildingDistM:0},{number:"21 220609 STE 12 OZ",label:"2345 YONGE ST",units:1370,stage:"Under Review",cellId:"1258_9681",region:"midtown",x:2.03,z:-294.69,nearestStop:{name:"Yonge St at Orchard View Blvd",distance_m:68.9},serviceSummary:{morning:{stopName:"Eglinton Station - Northbound Platform",distance_m:255.9,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Northbound Platform (256 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Northbound Platform",distance_m:255.9,routes:["1"],minHourlyDepartures:17,maxHourlyDepartures:22,status:"Route 1, direction 1: 16:00–17:00: 17 scheduled departures, 17:00–18:00: 22 scheduled departures at Eglinton Station - Northbound Platform (256 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[17,22],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Northbound Platform",distance_m:255.9,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Northbound Platform (256 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=NmXho3vDTsKOh%2BA3NkVYzQ%3D%3D",nearestBuildingId:"2025-184879",nearestBuildingDistM:0},{number:"18 128310 STE 22 OZ",label:"90 EGLINTON AVE E",units:1035,stage:"Active",cellId:"1258_9681",region:"midtown",x:206.45,z:-161.87,nearestStop:{name:"Eglinton Ave East at Dunfield Ave",distance_m:51.7},serviceSummary:{morning:{stopName:"Eglinton Station - Northbound Platform",distance_m:233.4,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Northbound Platform (233 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Northbound Platform",distance_m:233.4,routes:["1"],minHourlyDepartures:17,maxHourlyDepartures:22,status:"Route 1, direction 1: 16:00–17:00: 17 scheduled departures, 17:00–18:00: 22 scheduled departures at Eglinton Station - Northbound Platform (233 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[17,22],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Northbound Platform",distance_m:233.4,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Northbound Platform (233 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=g2YHzlFFnXMQJNyXXOkUig%3D%3D",nearestBuildingId:"2025-185020",nearestBuildingDistM:0},{number:"24 166703 STE 12 OZ",label:"2323 YONGE ST",units:784,stage:"Active",cellId:"1258_9681",region:"midtown",x:14.27,z:-234.13,nearestStop:{name:"Yonge St at Orchard View Blvd",distance_m:43},serviceSummary:{morning:{stopName:"Eglinton Station - Northbound Platform",distance_m:195.4,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Northbound Platform (195 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Northbound Platform",distance_m:195.4,routes:["1"],minHourlyDepartures:17,maxHourlyDepartures:22,status:"Route 1, direction 1: 16:00–17:00: 17 scheduled departures, 17:00–18:00: 22 scheduled departures at Eglinton Station - Northbound Platform (195 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[17,22],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Northbound Platform",distance_m:195.4,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Northbound Platform (195 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=XMqnMmlIb%2FOMbxovRXcsxA%3D%3D",nearestBuildingId:"2025-184876",nearestBuildingDistM:0},{number:"14 268618 STE 22 OZ",label:"55 EGLINTON AVE E",units:664,stage:"Active",cellId:"1258_9681",region:"midtown",x:193.64,z:-82.29,nearestStop:{name:"Eglinton Ave East at Dunfield Ave",distance_m:50.7},serviceSummary:{morning:{stopName:"Eglinton Station - Northbound Platform",distance_m:190.5,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Northbound Platform (191 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Northbound Platform",distance_m:190.5,routes:["1"],minHourlyDepartures:17,maxHourlyDepartures:22,status:"Route 1, direction 1: 16:00–17:00: 17 scheduled departures, 17:00–18:00: 22 scheduled departures at Eglinton Station - Northbound Platform (191 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[17,22],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Northbound Platform",distance_m:190.5,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Northbound Platform (191 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=CFMmMJ%2FMhj%2BqP0GA56waNQ%3D%3D",nearestBuildingId:"2025-178720",nearestBuildingDistM:0},{number:"22 139084 STE 12 OZ",label:"77 ROEHAMPTON AVE",units:624,stage:"Active",cellId:"1258_9681",region:"midtown",x:184.27,z:-218.63,nearestStop:{name:"Eglinton Ave East at Dunfield Ave",distance_m:112.4},serviceSummary:{morning:{stopName:"Eglinton Station - Northbound Platform",distance_m:251.7,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Northbound Platform (252 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Northbound Platform",distance_m:251.7,routes:["1"],minHourlyDepartures:17,maxHourlyDepartures:22,status:"Route 1, direction 1: 16:00–17:00: 17 scheduled departures, 17:00–18:00: 22 scheduled departures at Eglinton Station - Northbound Platform (252 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[17,22],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Northbound Platform",distance_m:251.7,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Northbound Platform (252 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=XyjZkSCKJztXIH%2BUZuQJtw%3D%3D",nearestBuildingId:"2025-183942",nearestBuildingDistM:0},{number:"21 101581 NNY 08 OZ",label:"36 EGLINTON AVE W",units:613,stage:"Active",cellId:"1257_9681",region:"midtown",x:-118.54,z:-41.6,nearestStop:{name:"Duplex Ave at Eglinton Ave West",distance_m:42.2},serviceSummary:{morning:{stopName:"Eglinton Station - Westbound Platform",distance_m:63.5,routes:["5"],minHourlyDepartures:10,maxHourlyDepartures:17,status:"Route 5, direction 1: 07:00–08:00: 10 scheduled departures, 08:00–09:00: 17 scheduled departures at Eglinton Station - Westbound Platform (64 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[10,17],route:"5",route_name:"5"}]},evening:{stopName:"Eglinton Station - Westbound Platform",distance_m:63.5,routes:["5"],minHourlyDepartures:16,maxHourlyDepartures:16,status:"Route 5, direction 1: 16:00–17:00: 16 scheduled departures, 17:00–18:00: 16 scheduled departures at Eglinton Station - Westbound Platform (64 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,16],route:"5",route_name:"5"}]},saturday:{stopName:"Eglinton Station - Westbound Platform",distance_m:63.5,routes:["5"],minHourlyDepartures:9,maxHourlyDepartures:9,status:"Route 5, direction 1: 12:00–13:00: 9 scheduled departures, 13:00–14:00: 9 scheduled departures at Eglinton Station - Westbound Platform (64 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[9,9],route:"5",route_name:"5"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=u7RJXMff%2Foavp5A9O6OjOg%3D%3D",nearestBuildingId:"2025-152228",nearestBuildingDistM:0},{number:"14 266776 STE 22 OZ",label:"1 EGLINTON AVE E",units:600,stage:"Active",cellId:"1258_9681",region:"midtown",x:57.95,z:-43.32,nearestStop:{name:"Yonge St at Eglinton Ave East (Eglinton Station)",distance_m:38.4},serviceSummary:{morning:{stopName:"Eglinton Station - Northbound Platform",distance_m:50,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Northbound Platform (50 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Northbound Platform",distance_m:50,routes:["1"],minHourlyDepartures:17,maxHourlyDepartures:22,status:"Route 1, direction 1: 16:00–17:00: 17 scheduled departures, 17:00–18:00: 22 scheduled departures at Eglinton Station - Northbound Platform (50 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[17,22],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Northbound Platform",distance_m:50,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Northbound Platform (50 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=46yvaEcr9boRV19lCe5jBw%3D%3D",nearestBuildingId:"2025-180179",nearestBuildingDistM:0},{number:"25 151892 STE 12 OZ",label:"120 EGLINTON AVE E",units:555,stage:"Under Review",cellId:"1258_9681",region:"midtown",x:282.82,z:-170.82,nearestStop:{name:"Eglinton Ave East at Dunfield Ave",distance_m:20.5},serviceSummary:{morning:{stopName:"Eglinton Station - Northbound Platform",distance_m:304.8,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Northbound Platform (305 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Northbound Platform",distance_m:304.8,routes:["1"],minHourlyDepartures:17,maxHourlyDepartures:22,status:"Route 1, direction 1: 16:00–17:00: 17 scheduled departures, 17:00–18:00: 22 scheduled departures at Eglinton Station - Northbound Platform (305 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[17,22],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Northbound Platform",distance_m:304.8,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Northbound Platform (305 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=B063XRkddEsQB533QusSPQ%3D%3D",nearestBuildingId:"2025-183937",nearestBuildingDistM:0},{number:"25 191657 STE 12 OZ",label:"41 BERWICK AVE",units:552,stage:"Under Review",cellId:"1258_9680",region:"midtown",x:-26.53,z:274.26,nearestStop:{name:"Eglinton Station at Bus Bay 1",distance_m:79.7},serviceSummary:{morning:{stopName:"Eglinton Station - Southbound Platform",distance_m:101.3,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 0: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Southbound Platform (101 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Southbound Platform",distance_m:101.3,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:21,status:"Route 1, direction 0: 16:00–17:00: 15 scheduled departures, 17:00–18:00: 21 scheduled departures at Eglinton Station - Southbound Platform (101 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[15,21],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Southbound Platform",distance_m:101.3,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 0: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Southbound Platform (101 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=XfdoWtSZaHdOIxpD1Ex8Cg%3D%3D",nearestBuildingId:"2025-143189",nearestBuildingDistM:0},{number:"24 146664 NNY 08 OZ",label:"2346 YONGE ST",units:391,stage:"Under Review",cellId:"1257_9681",region:"midtown",x:-51.31,z:-235.96,nearestStop:{name:"Yonge St at Orchard View Blvd",distance_m:22.8},serviceSummary:{morning:{stopName:"Eglinton Station - Westbound Platform",distance_m:204.9,routes:["5"],minHourlyDepartures:10,maxHourlyDepartures:17,status:"Route 5, direction 1: 07:00–08:00: 10 scheduled departures, 08:00–09:00: 17 scheduled departures at Eglinton Station - Westbound Platform (205 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[10,17],route:"5",route_name:"5"}]},evening:{stopName:"Eglinton Station - Westbound Platform",distance_m:204.9,routes:["5"],minHourlyDepartures:16,maxHourlyDepartures:16,status:"Route 5, direction 1: 16:00–17:00: 16 scheduled departures, 17:00–18:00: 16 scheduled departures at Eglinton Station - Westbound Platform (205 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,16],route:"5",route_name:"5"}]},saturday:{stopName:"Eglinton Station - Westbound Platform",distance_m:204.9,routes:["5"],minHourlyDepartures:9,maxHourlyDepartures:9,status:"Route 5, direction 1: 12:00–13:00: 9 scheduled departures, 13:00–14:00: 9 scheduled departures at Eglinton Station - Westbound Platform (205 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[9,9],route:"5",route_name:"5"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=WkLBPzXnQBoelGEqSk5R4g%3D%3D",nearestBuildingId:"2025-152193",nearestBuildingDistM:0},{number:"22 176294 NNY 08 OZ",label:"2350 YONGE ST",units:323,stage:"Under Review",cellId:"1257_9681",region:"midtown",x:-44.94,z:-250.22,nearestStop:{name:"Yonge St at Orchard View Blvd",distance_m:23.7},serviceSummary:{morning:{stopName:"Eglinton Station - Northbound Platform",distance_m:218,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Northbound Platform (218 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Northbound Platform",distance_m:218,routes:["1"],minHourlyDepartures:17,maxHourlyDepartures:22,status:"Route 1, direction 1: 16:00–17:00: 17 scheduled departures, 17:00–18:00: 22 scheduled departures at Eglinton Station - Northbound Platform (218 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[17,22],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Northbound Platform",distance_m:218,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Northbound Platform (218 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=BuBb%2BiSh9FbMNoZqFpWPjQ%3D%3D",nearestBuildingId:"2025-152117",nearestBuildingDistM:0},{number:"13 105888 STE 22 OZ",label:"2131 YONGE ST",units:624,stage:"Built",cellId:"1258_9680",region:"midtown",x:91.63,z:275.24,nearestStop:{name:"Yonge St at Soudan Ave",distance_m:40.5},serviceSummary:{morning:{stopName:"Yonge St at Berwick Ave",distance_m:91.7,routes:["97"],minHourlyDepartures:5,maxHourlyDepartures:5,status:"Route 97, direction 0: 07:00–08:00: 5 scheduled departures, 08:00–09:00: 5 scheduled departures at Yonge St at Berwick Ave (92 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[5,5],route:"97",route_name:"97"}]},evening:{stopName:"Yonge St at Berwick Ave",distance_m:91.7,routes:["97"],minHourlyDepartures:4,maxHourlyDepartures:4,status:"Route 97, direction 0: 16:00–17:00: 4 scheduled departures, 17:00–18:00: 4 scheduled departures at Yonge St at Berwick Ave (92 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[4,4],route:"97",route_name:"97"}]},saturday:{stopName:"Yonge St at Berwick Ave",distance_m:91.7,routes:["97"],minHourlyDepartures:4,maxHourlyDepartures:5,status:"Route 97, direction 0: 12:00–13:00: 5 scheduled departures, 13:00–14:00: 4 scheduled departures at Yonge St at Berwick Ave (92 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[5,4],route:"97",route_name:"97"}]}},sourceUrl:"",nearestBuildingId:"2025-180533",nearestBuildingDistM:0},{number:"12 296517 STE 22 OZ",label:"2221 YONGE ST",units:605,stage:"Built",cellId:"1258_9680",region:"midtown",x:54.18,z:20.08,nearestStop:{name:"Yonge St at Eglinton Ave East (Eglinton Station)",distance_m:42.2},serviceSummary:{morning:{stopName:"Eglinton Station - Northbound Platform",distance_m:74.8,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Northbound Platform (75 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Northbound Platform",distance_m:74.8,routes:["1"],minHourlyDepartures:17,maxHourlyDepartures:22,status:"Route 1, direction 1: 16:00–17:00: 17 scheduled departures, 17:00–18:00: 22 scheduled departures at Eglinton Station - Northbound Platform (75 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[17,22],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Northbound Platform",distance_m:74.8,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Northbound Platform (75 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"",nearestBuildingId:"2025-180189",nearestBuildingDistM:0},{number:"13 211324 STE 22 OZ",label:"33 HOLLY ST",units:545,stage:"Built",cellId:"1258_9680",region:"midtown",x:210.77,z:38.57,nearestStop:{name:"Eglinton Ave East at Dunfield Ave",distance_m:156.4},serviceSummary:{morning:{stopName:"2190 Yonge St",distance_m:195.1,routes:["97"],minHourlyDepartures:5,maxHourlyDepartures:5,status:"Route 97, direction 0: 07:00–08:00: 5 scheduled departures, 08:00–09:00: 5 scheduled departures at 2190 Yonge St (195 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[5,5],route:"97",route_name:"97"}]},evening:{stopName:"2190 Yonge St",distance_m:195.1,routes:["97"],minHourlyDepartures:4,maxHourlyDepartures:4,status:"Route 97, direction 0: 16:00–17:00: 4 scheduled departures, 17:00–18:00: 4 scheduled departures at 2190 Yonge St (195 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[4,4],route:"97",route_name:"97"}]},saturday:{stopName:"2190 Yonge St",distance_m:195.1,routes:["97"],minHourlyDepartures:4,maxHourlyDepartures:5,status:"Route 97, direction 0: 12:00–13:00: 5 scheduled departures, 13:00–14:00: 4 scheduled departures at 2190 Yonge St (195 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[5,4],route:"97",route_name:"97"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=OhVy0ObGHW0mD0DHsb559g%3D%3D",nearestBuildingId:"2025-178723",nearestBuildingDistM:0},{number:"16 269637 STE 22 OZ",label:"41 ROEHAMPTON AVE",units:440,stage:"Built",cellId:"1258_9681",region:"midtown",x:105.96,z:-212.88,nearestStop:{name:"Yonge St at Eglinton Ave East North Side - Eglinton Station",distance_m:109.6},serviceSummary:{morning:{stopName:"Eglinton Station - Northbound Platform",distance_m:199.7,routes:["1"],minHourlyDepartures:24,maxHourlyDepartures:24,status:"Route 1, direction 1: 07:00–08:00: 24 scheduled departures, 08:00–09:00: 24 scheduled departures at Eglinton Station - Northbound Platform (200 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[24,24],route:"1",route_name:"1"}]},evening:{stopName:"Eglinton Station - Northbound Platform",distance_m:199.7,routes:["1"],minHourlyDepartures:17,maxHourlyDepartures:22,status:"Route 1, direction 1: 16:00–17:00: 17 scheduled departures, 17:00–18:00: 22 scheduled departures at Eglinton Station - Northbound Platform (200 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[17,22],route:"1",route_name:"1"}]},saturday:{stopName:"Eglinton Station - Northbound Platform",distance_m:199.7,routes:["1"],minHourlyDepartures:15,maxHourlyDepartures:16,status:"Route 1, direction 1: 12:00–13:00: 16 scheduled departures, 13:00–14:00: 15 scheduled departures at Eglinton Station - Northbound Platform (200 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,15],route:"1",route_name:"1"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=tgMudgx%2BYEHHyyvwuHFlhg%3D%3D",nearestBuildingId:"2025-185449",nearestBuildingDistM:0},{number:"12 168197 NNY 16 OZ",label:"2360 YONGE ST",units:404,stage:"Built",cellId:"1257_9681",region:"midtown",x:-55.25,z:-282.19,nearestStop:{name:"Yonge St at Orchard View Blvd",distance_m:55.9},serviceSummary:{morning:{stopName:"Eglinton Station - Westbound Platform",distance_m:251.1,routes:["5"],minHourlyDepartures:10,maxHourlyDepartures:17,status:"Route 5, direction 1: 07:00–08:00: 10 scheduled departures, 08:00–09:00: 17 scheduled departures at Eglinton Station - Westbound Platform (251 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[10,17],route:"5",route_name:"5"}]},evening:{stopName:"Eglinton Station - Westbound Platform",distance_m:251.1,routes:["5"],minHourlyDepartures:16,maxHourlyDepartures:16,status:"Route 5, direction 1: 16:00–17:00: 16 scheduled departures, 17:00–18:00: 16 scheduled departures at Eglinton Station - Westbound Platform (251 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[16,16],route:"5",route_name:"5"}]},saturday:{stopName:"Eglinton Station - Westbound Platform",distance_m:251.1,routes:["5"],minHourlyDepartures:9,maxHourlyDepartures:9,status:"Route 5, direction 1: 12:00–13:00: 9 scheduled departures, 13:00–14:00: 9 scheduled departures at Eglinton Station - Westbound Platform (251 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"1",hourly_departures:[9,9],route:"5",route_name:"5"}]}},sourceUrl:"http://app.toronto.ca/DevelopmentApplications/associatedApplicationsList.do?action=init&folderRsn=3127406&isCofASearch=false",nearestBuildingId:"2025-152141",nearestBuildingDistM:0},{number:"17 186503 STE 22 OZ",label:"2161 YONGE ST",units:335,stage:"Built",cellId:"1258_9680",region:"midtown",x:71.87,z:164.37,nearestStop:{name:"Yonge St at Berwick Ave",distance_m:39.3},serviceSummary:{morning:{stopName:"Yonge St at Berwick Ave",distance_m:39.3,routes:["97"],minHourlyDepartures:5,maxHourlyDepartures:5,status:"Route 97, direction 0: 07:00–08:00: 5 scheduled departures, 08:00–09:00: 5 scheduled departures at Yonge St at Berwick Ave (39 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[5,5],route:"97",route_name:"97"}]},evening:{stopName:"Yonge St at Berwick Ave",distance_m:39.3,routes:["97"],minHourlyDepartures:4,maxHourlyDepartures:4,status:"Route 97, direction 0: 16:00–17:00: 4 scheduled departures, 17:00–18:00: 4 scheduled departures at Yonge St at Berwick Ave (39 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[4,4],route:"97",route_name:"97"}]},saturday:{stopName:"Yonge St at Berwick Ave",distance_m:39.3,routes:["97"],minHourlyDepartures:4,maxHourlyDepartures:5,status:"Route 97, direction 0: 12:00–13:00: 5 scheduled departures, 13:00–14:00: 4 scheduled departures at Yonge St at Berwick Ave (39 m). Counts do not establish even spacing.",hourlyEvidence:[{direction:"0",hourly_departures:[5,4],route:"97",route_name:"97"}]}},sourceUrl:"http://app.toronto.ca/AIC/index.do?folderRsn=posVYQ4tBndTjlsV%2FmOikQ%3D%3D",nearestBuildingId:"2025-178721",nearestBuildingDistM:0}],Jm=[{key:"x",label:"Position East / West (m from centre)",hint:"+ moves east, − moves west (within ±300 m)",min:-300,max:300,step:"0.5"},{key:"z",label:"Position South / North (m from centre)",hint:"+ moves south, − moves north (within ±300 m)",min:-300,max:300,step:"0.5"},{key:"width",label:"Width — East–West (m)",hint:"2 to 150 m",min:2,max:150,step:"0.5"},{key:"depth",label:"Depth — North–South (m)",hint:"2 to 150 m",min:2,max:150,step:"0.5"},{key:"height",label:"Height (m)",hint:"1 to 400 m",min:1,max:400,step:"0.5"},{key:"rotation",label:"Rotation (degrees)",hint:"0° to 359° clockwise",min:0,max:359,step:"1"}],Us={"orbit-left":"Rotated 3D view left.","orbit-right":"Rotated 3D view right.","tilt-up":"Raised 3D camera to a higher angle.","tilt-down":"Lowered 3D camera closer to street angle.","zoom-in":"Zoomed in on 3D view.","zoom-out":"Zoomed out on 3D view.",reset:"Reset 3D camera to default view."};function Ci(i){return Math.max(1,Math.round(i/3))}function br(i){const e=i.trim().toLowerCase();return e==="lidar-derived"?"aerial laser scanning":e==="3d model"?"existing City 3D model":e==="site plan"?"submitted site-plan drawings":"published City records"}function Qm(i){try{const e=new URL(i);return e.protocol==="https:"||e.protocol==="http:"?e.href:void 0}catch{return}}function Tr(i){return{x:String(i.x),z:String(i.z),width:String(i.width),depth:String(i.depth),height:String(i.height),rotation:String(i.rotation)}}function gl(){const i=new URLSearchParams(location.hash.slice(1));return i.delete("view"),i.delete("model_region"),i.delete("proposal"),i.delete("cell"),i.toString()}function _l(i){const e=new URLSearchParams(i.replace(/^#/,"")),t=e.get("proposal")?.trim()||"",n=e.get("cell")?.trim()||"",r=(e.get("areas")||"").split(",").map(c=>c.trim()).filter(Boolean),s=e.get("model_region")||e.get("region")||"";let o;if(t){const c=t.toLowerCase();o=Mn.find(l=>l.number===t)||Mn.find(l=>l.number.toLowerCase()===c||l.label.toLowerCase()===c)}if(!o&&n){const c=Mn.filter(l=>l.cellId===n);o=c.find(l=>l.stage!=="Built")||c[0]}if(!o&&!s&&r.length)for(const c of r){const l=Mn.filter(u=>u.cellId===c);if(l.length){o=l.find(u=>u.stage!=="Built")||l[0];break}}const a=o?o.region:s==="midtown"||n.startsWith("1257_")||n.startsWith("1258_")?"midtown":"downtown";return{region:a,proposalNumber:o?.number||"",buildingId:o?.nearestBuildingId||"",cellId:n&&Mn.some(c=>c.cellId===n&&c.region===a)?n:"",matchedProposal:o}}function e1(i){return i==="Active"?"a-stage-badge is-active":i==="Under Review"?"a-stage-badge is-review":"a-stage-badge is-built"}function o1(){Re.useEffect(()=>{document.title="ASTER — Toronto 3D Building & Proposal Explorer"},[]);const i=Re.useMemo(()=>_l(location.hash),[]),[e,t]=Re.useState(i.region),[n,r]=Re.useState(i.buildingId),[s,o]=Re.useState(i.proposalNumber),[a,c]=Re.useState(i.cellId),[l,u]=Re.useState(!1),[h,f]=Re.useState(!0),[p,g]=Re.useState("map-vector"),[v,m]=Re.useState("all"),[d,T]=Re.useState(""),[E,x]=Re.useState(0),[P,A]=Re.useState(10),[L,N]=Re.useState(null),[S,y]=Re.useState(null),[w,k]=Re.useState(null),[Z,O]=Re.useState(!1),[z,V]=Re.useState(""),[Y,B]=Re.useState(!1),[$,le]=Re.useState(""),[j,De]=Re.useState(null),[Be,we]=Re.useState(()=>i.matchedProposal?`Highlighted proposal ${i.matchedProposal.label}: ${i.matchedProposal.units.toLocaleString()} units, ${i.matchedProposal.stage}.`:""),Ve=Re.useRef(null),X=Re.useRef(null),te=Re.useRef(null);Re.useEffect(()=>{const D=()=>{const G=_l(location.hash);G.region!==e&&(t(G.region),N(null),y(null),k(null),O(!1),V(""),B(!1),T(""),A(30),m("all"),u(!1)),c(G.cellId),G.proposalNumber?(o(G.proposalNumber),r(G.buildingId),f(!0),G.matchedProposal&&we(`Selected proposal ${G.matchedProposal.label}: ${G.matchedProposal.units.toLocaleString()} units, ${G.matchedProposal.stage}.`)):G.region!==e&&(o(""),r(""))};return window.addEventListener("hashchange",D),()=>window.removeEventListener("hashchange",D)},[e]);const oe=ia.find(D=>D.region===e),Me=(new URLSearchParams(location.hash.slice(1)).get("areas")||"").split(",").filter(Boolean).filter(D=>!Mn.some(G=>G.cellId===D)),Le=Re.useMemo(()=>Mn.filter(D=>D.region===e),[e]),je=Re.useMemo(()=>Le.filter(D=>l&&a&&D.cellId!==a?!1:v==="unbuilt"?D.stage!=="Built":v==="Built"?D.stage==="Built":!0),[Le,l,a,v]),C=Re.useMemo(()=>Le.filter(D=>D.stage!=="Built").length,[Le]),ce=Le.length-C,ie=Re.useMemo(()=>Le.find(D=>D.number===s)||null,[Le,s]),se=Re.useMemo(()=>{const D=Le.find(K=>{const Se=oe.buildings.find(Ge=>Ge.id===K.nearestBuildingId);return Se&&Nr(oe,Se)!==null});if(D)return{proposal:D,buildingId:D.nearestBuildingId,label:D.label};const G=ml(oe);return G?{proposal:null,buildingId:G.building.id,label:`building ${G.building.id}`}:null},[oe,Le]),re=oe.buildings.find(D=>D.id===n),de=oe.buildings.filter(D=>!d||D.id.toLowerCase().includes(d.toLowerCase())||D.height_source.toLowerCase().includes(d.toLowerCase())||br(D.height_source).toLowerCase().includes(d.toLowerCase())),ue=w?Km(oe,w):null,Q=gl(),ye=Q?`#${Q}`:"./";function ge(D,G=!1){V(D),B(G),we(D)}function b(D){const G=new URLSearchParams(location.hash.slice(1));for(const[K,Se]of Object.entries(D))Se===null||Se===""?G.delete(K):G.set(K,Se);history.replaceState(null,"","#"+G.toString())}function _(D){r(D),ie&&ie.nearestBuildingId!==D&&(o(""),b({proposal:null})),L&&!w&&(N(null),y(null),V(""),B(!1));const G=oe.buildings.find(K=>K.id===D);G&&we(`Selected building ${G.id}: ${G.height.toFixed(1)} metres, roughly ${Ci(G.height)} storeys estimated, from ${br(G.height_source)}.`)}function F(D){o(D.number),r(D.nearestBuildingId),f(!0),L&&!w&&L.id&&n!==D.nearestBuildingId&&(N(null),y(null),V(""),B(!1)),b({model_region:D.region,proposal:D.number,cell:D.cellId}),we(`Selected proposal ${D.label}, ${D.units.toLocaleString()} proposed units, ${D.stage}. Closest 2025 building ${D.nearestBuildingId} highlighted.`)}function q(D){const G=Le.find(K=>K.number===D);G&&F(G)}function ae(D){t(D),r(""),o(""),c(""),u(!1),m("all"),N(null),y(null),k(null),O(!1),V(""),B(!1),le(""),De(null),T(""),A(10),b({model_region:D,proposal:null,cell:null});const G=ia.find(Se=>Se.region===D),K=Mn.filter(Se=>Se.region===D).length;G&&we(`Switched 3D view to ${G.name}, showing ${G.buildings.length} recorded 2025 buildings and ${K} housing proposals.`)}function ne(D){D==="reset"?x(G=>G+1):te.current?.(D),we(Us[D])}function Ce(D,G){const K=oe.buildings.find(Je=>Je.id===D);if(!K)return;r(K.id);const Se=Nr(oe,K);if(!Se){N(null),y(null),k(null),O(!1);let Je="";try{Lr(oe,{schema:1,baseline:oe.id,removed:K.id,volume:Vr(K)})}catch(Lt){const Ot=Lt instanceof Error?Lt.message:String(Lt);Je=oe.buildings.find(qi=>Ot.includes(`source feature ${qi.id}.`))?.id||""}const Qe=ml(oe,K);le(Je),De({blockedId:K.id,conflictId:Je,nearest:Qe?{buildingId:Qe.building.id,distance_m:Qe.distance_m}:null}),ge("No collision-free starting box fits this source feature because it overlaps adjacent recorded massing components. "+(Je?`Conflicting feature ${Je} is highlighted red. `:"")+"No invalid replacement has been applied. Use a recovery option below to switch to a verified editable site.",!0);return}const Ge=Se;le(""),De(null),N(Ge),y(Tr(Ge)),k(null),O(!1),ge(`Started with a collision-free box (it may be smaller than the existing footprint). Editing a hypothetical box for building ${K.id}${G?` at ${G}`:""}. Adjust dimensions below, then select Apply replacement to 3D view.`),requestAnimationFrame(()=>{X.current?.scrollIntoView({behavior:"smooth",block:"nearest"}),X.current?.focus()})}function _e(){se&&(se.proposal?(F(se.proposal),Ce(se.buildingId,se.label)):Ce(se.buildingId))}function Ne(){re&&Ce(re.id)}function Ie(D){o(D.number),Ce(D.nearestBuildingId,D.label)}function he(D,G){if(!L||!S)return;y({...S,[D]:G});const K=Number(G);G.trim()!==""&&Number.isFinite(K)&&N({...L,[D]:K})}function Te(){if(!S||!re)return;const D={id:"replacement-volume",kind:"volume",x:Number(S.x),z:Number(S.z),width:Number(S.width),depth:Number(S.depth),height:Number(S.height),rotation:Number(S.rotation)};if(Object.values(S).some(G=>G.trim()==="")||![D.x,D.z,D.width,D.depth,D.height,D.rotation].every(Number.isFinite)){ge("Please enter a valid number for all six building dimensions.",!0);return}if(D.width<2||D.width>150||D.depth<2||D.depth>150){ge("Width and depth must each be between 2 and 150 metres.",!0);return}if(D.height<1||D.height>400){ge("Height must be between 1 and 400 metres.",!0);return}if(D.rotation<0||D.rotation>=360){ge("Rotation must be between 0 and 359 degrees.",!0);return}try{const G=Lr(oe,{schema:1,baseline:oe.id,removed:re.id,volume:D});N(G.volume),y(Tr(G.volume)),k(G),O(!1),le(""),ge("Replacement applied to the 3D view. Footprint check passed against nearby 2025 buildings.")}catch(G){const K=G instanceof Error?G.message:String(G);le(oe.buildings.find(Se=>K.includes(`source feature ${Se.id}.`))?.id||""),ge(K+(K.includes("intersects")?" The conflicting building is highlighted red. Reduce width/depth, adjust rotation, or use Fit a valid starting box.":""),!0)}}function He(){if(w)try{localStorage.setItem("aster-replacement-"+oe.region,JSON.stringify(w)),ge("Replacement saved in this browser for this neighbourhood view.")}catch{ge("Browser storage is unavailable here. Use Export comparison (JSON) instead.",!0)}}function Fe(){try{const D=localStorage.getItem("aster-replacement-"+oe.region);if(!D)throw Error("No saved replacement found for this neighbourhood view.");const G=Lr(oe,JSON.parse(D));k(G),N(G.volume),y(Tr(G.volume)),r(G.removed),O(!1),ge(`Restored your saved replacement for building ${G.removed}.`)}catch(D){ge(D instanceof Error?D.message:String(D),!0)}}function Ee(){if(!w)return;const D={scenario:w,geometryEffects:ue,relatedProposal:ie,unmodelled:["sunlight/shadow duration","wind","energy","traffic/demand","transit capacity","construction feasibility","cost","planning permission"],source:oe.building_source,limitation:oe.limitation},G=URL.createObjectURL(new Blob([JSON.stringify(D,null,2)],{type:"application/json"})),K=document.createElement("a");K.href=G,K.download="aster-building-replacement.json",K.click(),setTimeout(()=>URL.revokeObjectURL(G),1e3),ge("Exported comparison file (aster-building-replacement.json).")}function Xe(){k(null),N(null),y(null),O(!1),le(""),De(null),ge("Original 2025 building restored in the 3D view.")}function U(){const D=gl();location.hash=D}const fe=S&&S.height.trim()!==""&&Number.isFinite(Number(S.height))?Number(S.height):L?.height??0,xe=ie?Qm(ie.sourceUrl):void 0;return R.jsxs("div",{className:"architecture",children:[R.jsx("a",{className:"a-skip",href:"#a-main-view",onClick:D=>{D.preventDefault(),Ve.current?.focus()},children:"Skip to 3D view and controls"}),R.jsxs("header",{children:[R.jsxs("a",{className:"a-brand",href:ye,onClick:D=>{D.preventDefault(),U()},children:["ASTER ",R.jsx("span",{children:"HOUSING & TRANSIT"})]}),R.jsx("strong",{children:"Toronto · 3D Building & Proposal Explorer"}),R.jsx("button",{type:"button",className:"a-back-btn",onClick:U,children:"← Back to planning & transit"})]}),R.jsxs("div",{className:"a-topbar",children:[R.jsxs("div",{className:"a-topbar-copy",children:[R.jsx("p",{className:"a-eyebrow",children:"TORONTO 2025 3D MASSING · HOUSING PIPELINE"}),R.jsx("h1",{children:"Explore Toronto buildings & proposals in 3D."})]}),R.jsxs("div",{className:"a-regions",role:"group","aria-label":"3D neighbourhood study area",children:[R.jsx("button",{type:"button","aria-pressed":e==="downtown",onClick:()=>ae("downtown"),children:"Downtown · City Hall"}),R.jsx("button",{type:"button","aria-pressed":e==="midtown",onClick:()=>ae("midtown"),children:"Midtown · Yonge–Eglinton"})]})]}),R.jsxs("div",{className:"a-workspace",children:[R.jsxs("aside",{"aria-label":"Neighbourhood area, housing proposals, and recorded buildings",children:[R.jsx("p",{children:"Inspect real City housing proposals alongside recorded 2025 building footprints around City Hall or Yonge–Eglinton, then test what a replacement massing might look like."}),R.jsxs("section",{className:"a-guide","aria-labelledby":"a-guide-heading",children:[R.jsx("h2",{id:"a-guide-heading",children:"What you can do here"}),R.jsxs("ol",{children:[R.jsxs("li",{children:["Pick ",R.jsx("strong",{children:"City Hall"})," or ",R.jsx("strong",{children:"Yonge–Eglinton"})," above."]}),R.jsxs("li",{children:["Select any ",R.jsx("strong",{children:"red proposal pin"})," or ",R.jsx("strong",{children:"2025 building"})," to check height and TTC service."]}),R.jsxs("li",{children:["Click ",R.jsx("strong",{children:"Test 3D replacement at this site"})," or compare transit on Page 1."]})]})]}),R.jsxs("dl",{className:"a-facts",children:[R.jsx("dt",{children:"Area shown"}),R.jsx("dd",{children:"600 × 600 m local neighbourhood"}),R.jsx("dt",{children:"Housing proposals in view"}),R.jsxs("dd",{children:[Le.length," (",C," unbuilt · ",ce," built)"]}),R.jsx("dt",{children:"Recorded 2025 buildings"}),R.jsx("dd",{children:oe.buildings.length})]}),R.jsxs("section",{className:"a-proposals-panel","aria-labelledby":"a-proposals-heading",children:[R.jsx("h2",{id:"a-proposals-heading",children:"Housing Proposals in this 600 m View"}),R.jsxs("div",{className:"a-proposals-controls",children:[R.jsxs("label",{className:"a-checkbox-label",htmlFor:"a-show-proposals",children:[R.jsx("input",{id:"a-show-proposals",type:"checkbox",checked:h,onChange:D=>{const G=D.target.checked;f(G),we(G?`Showing ${je.length} proposal pins on the 3D model.`:"Hidden proposal pins on the 3D model.")}}),R.jsx("span",{children:"Show proposal pins on 3D model"})]}),R.jsxs("div",{className:"a-proposal-filters",role:"group","aria-label":"Filter housing proposals by stage",children:[R.jsxs("button",{type:"button","aria-pressed":v==="all",onClick:()=>m("all"),children:["All (",Le.length,")"]}),R.jsxs("button",{type:"button","aria-pressed":v==="unbuilt",onClick:()=>m("unbuilt"),children:["Unbuilt (",C,")"]}),R.jsxs("button",{type:"button","aria-pressed":v==="Built",onClick:()=>m("Built"),children:["Built (",ce,")"]})]}),a&&R.jsxs("div",{className:"a-cell-banner",children:[R.jsxs("span",{children:["Linked area cell: ",R.jsx("code",{children:a})]}),R.jsx("button",{type:"button","aria-pressed":l,onClick:()=>u(D=>!D),children:l?"Show all in 600 m view":"Only this cell"})]})]}),R.jsxs("p",{className:"a-count",children:["Showing ",je.length," of ",Le.length," pipeline proposals in ",oe.name,"."]}),R.jsx("ul",{className:"a-proposal-list","aria-label":"Housing proposals in this 600 m view",children:je.map(D=>{const G=a&&D.cellId===a;return R.jsx("li",{children:R.jsxs("button",{type:"button","aria-pressed":s===D.number,"aria-label":`${D.label}, ${D.units.toLocaleString()} units, ${D.stage}, application ${D.number}, nearest TTC stop ${D.nearestStop.name} at ${Math.round(D.nearestStop.distance_m)} metres`,onClick:()=>F(D),children:[R.jsxs("span",{className:"a-proposal-row-title",children:[D.label," · ",D.units.toLocaleString()," units · ",D.stage]}),R.jsxs("span",{className:"a-proposal-row-meta",children:["App ",D.number," · ",D.nearestStop.name," (",Math.round(D.nearestStop.distance_m)," m)",G?" · Linked cell":""]})]})},D.number)})}),je.length===0&&R.jsx("p",{className:"a-hint",children:"No proposals match the current filter. Choose “All” above to see every proposal in this 600 m view."})]}),R.jsxs("section",{className:"a-buildings-panel","aria-labelledby":"a-buildings-heading",children:[R.jsx("h2",{id:"a-buildings-heading",children:"Recorded 2025 buildings"}),R.jsxs("div",{className:"a-search-group",children:[R.jsx("label",{htmlFor:"a-building-search",children:"Find a building record"}),R.jsx("input",{id:"a-building-search",type:"search",value:d,onChange:D=>{T(D.target.value),A(30)},placeholder:"Record ID or method (e.g. Lidar)"}),R.jsxs("p",{className:"a-count",children:["Showing ",Math.min(P,de.length)," of ",de.length," recorded buildings",d?` matching "${d}"`:"","."]})]}),R.jsx("ul",{className:"a-list","aria-label":"Recorded 2025 buildings",children:de.slice(0,P).map(D=>{const G=Ci(D.height);return R.jsx("li",{children:R.jsxs("button",{type:"button","aria-pressed":n===D.id,"aria-label":`Building record ${D.id}, ${D.height.toFixed(1)} metres, roughly ${G} storeys estimated, ${D.height_source}`,onClick:()=>_(D.id),children:[D.id,R.jsxs("span",{children:[D.height.toFixed(1)," m (~",G," storeys est.) · ",D.height_source]})]})},D.id)})}),de.length===0&&R.jsxs("p",{className:"a-hint",children:["No building records match “",d,"”. Clear the search box to see all ",oe.buildings.length," buildings."]}),de.length>P&&R.jsxs("button",{type:"button",className:"a-more-btn",onClick:()=>A(D=>D+30),children:["Show more buildings (",de.length-P," remaining)"]})]})]}),R.jsxs("main",{id:"a-main-view",tabIndex:-1,ref:Ve,children:[R.jsx("p",{className:"sr-only",role:"status","aria-live":"polite",children:Be}),R.jsxs("section",{className:"a-world","aria-labelledby":"a-view-heading",children:[R.jsxs("div",{className:"a-world-heading",children:[R.jsxs("div",{children:[R.jsx("h2",{id:"a-view-heading",children:oe.name}),R.jsxs("p",{className:"a-world-sub",children:["600 × 600 m local neighbourhood · ",oe.buildings.length," recorded 2025 buildings · ",Le.length," housing proposals"]})]}),R.jsxs("div",{className:"a-world-actions",children:[R.jsxs("div",{className:"a-view-modes",role:"group","aria-label":"3D basemap and rendering mode",children:[R.jsx("button",{type:"button",className:"a-mode-btn","aria-pressed":p==="map-vector",onClick:()=>{g("map-vector"),we("Switched to interactive 3D Toronto Street Map.")},children:"3D Street Map"}),R.jsx("button",{type:"button",className:"a-mode-btn","aria-pressed":p==="map-osm",onClick:()=>{g("map-osm"),we("Switched to OpenStreetMap 3D tiles overlay.")},children:"OSM Tiles"}),R.jsx("button",{type:"button",className:"a-mode-btn","aria-pressed":p==="map-satellite",onClick:()=>{g("map-satellite"),we("Switched to aerial satellite 3D overlay.")},children:"Satellite"}),R.jsx("button",{type:"button",className:"a-mode-btn","aria-pressed":p==="cad",onClick:()=>{g("cad"),we("Switched to offline 3D Massing Studio.")},children:"3D Massing Studio"})]}),R.jsx("button",{type:"button",className:"a-mode-btn",onClick:()=>ne("reset"),children:"Reset camera"})]})]}),Me.length>0&&R.jsxs("div",{className:"a-coverage-notice",role:"note",children:[R.jsx("strong",{children:"Selected analysis area outside available 3D coverage"}),R.jsxs("p",{children:[Me.join(", ")," cannot be displayed in this 3D model. You are viewing ",oe.name,", a separate 600 × 600 m example. Your original area selection is preserved."]}),R.jsx("button",{type:"button",onClick:U,children:"Return to selected areas"}),R.jsxs("p",{children:["Available example views: ",R.jsx("button",{type:"button",onClick:()=>ae("downtown"),children:"City Hall example"})," ",R.jsx("button",{type:"button",onClick:()=>ae("midtown"),children:"Yonge–Eglinton example"})]})]}),p==="cad"?R.jsx(Ym,{reference:oe,viewerOnly:!0,highlight:n,conflict:$,plots:w&&!Z?[w.volume]:[],selected:w&&!Z?w.volume.id:null,hiddenSourceIds:w&&!Z?[w.removed]:[],proposals:je,selectedProposal:s||null,showProposals:h,onSelectProposal:q,onCell:()=>{},onBaseline:D=>_(D.split(":")[0].replace("Recorded massing ","")),cameraControl:te,onCameraAction:D=>we(Us[D]),running:!1,night:!1,reset:E},oe.id):R.jsx($m,{region:e,view:oe,basemapMode:p==="map-osm"?"osm":p==="map-satellite"?"satellite":"vector",highlight:n,conflict:$,plots:w&&!Z?[w.volume]:[],hiddenSourceIds:w&&!Z?[w.removed]:[],proposals:je,selectedProposal:s||null,showProposals:h,onSelectBuilding:_,onSelectProposal:q,cameraControl:te,onCameraAction:D=>we(Us[D]),reset:E},oe.id),R.jsxs("div",{className:"a-camera-bar",role:"toolbar","aria-label":"Keyboard-accessible 3D camera controls",children:[R.jsx("button",{type:"button",onClick:()=>ne("orbit-left"),"aria-label":"Rotate 3D view left",children:"⟲ Rotate left"}),R.jsx("button",{type:"button",onClick:()=>ne("orbit-right"),"aria-label":"Rotate 3D view right",children:"⟳ Rotate right"}),R.jsx("button",{type:"button",onClick:()=>ne("tilt-up"),"aria-label":"Raise camera angle",children:"↑ Higher angle"}),R.jsx("button",{type:"button",onClick:()=>ne("tilt-down"),"aria-label":"Lower camera angle",children:"↓ Lower angle"}),R.jsx("button",{type:"button",onClick:()=>ne("zoom-in"),"aria-label":"Zoom in on 3D view",children:"+ Zoom in"}),R.jsx("button",{type:"button",onClick:()=>ne("zoom-out"),"aria-label":"Zoom out on 3D view",children:"− Zoom out"})]}),R.jsxs("p",{className:"a-navigation",children:[R.jsx("strong",{children:"Controls:"})," ",p==="cad"?"Drag to rotate · Right-drag to pan":"Drag to pan · Right-drag to rotate and tilt"," · Scroll to zoom · Click a red pin or building to inspect. ",R.jsx("strong",{children:"Keyboard:"})," use the camera buttons above, or focus the 3D view and press Arrow keys, + / −, and 0 to reset. North is toward the back at reset."]}),R.jsxs("ul",{className:"a-legend","aria-label":"3D view colour key",children:[R.jsxs("li",{children:[R.jsx("span",{className:"a-swatch a-swatch-baseline","aria-hidden":"true"}),"Recorded 2025 building"]}),R.jsxs("li",{children:[R.jsx("span",{className:"a-swatch a-swatch-selected","aria-hidden":"true"}),"Selected building footprint"]}),R.jsxs("li",{children:[R.jsx("span",{className:"a-swatch a-swatch-proposal","aria-hidden":"true"}),"Housing proposal pin"]}),R.jsxs("li",{children:[R.jsx("span",{className:"a-swatch a-swatch-proposal-selected","aria-hidden":"true"}),"Selected proposal pin"]}),R.jsxs("li",{children:[R.jsx("span",{className:"a-swatch a-swatch-replacement","aria-hidden":"true"}),"Your hypothetical box"]}),R.jsxs("li",{children:[R.jsx("span",{className:"a-swatch a-swatch-road","aria-hidden":"true"}),"Street centrelines"]})]})]}),R.jsx("section",{className:"a-inspection","aria-labelledby":"a-inspect-heading",children:ie?R.jsxs(R.Fragment,{children:[R.jsxs("div",{className:"a-inspect-header",children:[R.jsxs("div",{children:[R.jsx("p",{className:"a-eyebrow",children:"DEVELOPMENT PIPELINE PROPOSAL"}),R.jsx("h2",{id:"a-inspect-heading",children:ie.label})]}),R.jsx("span",{className:e1(ie.stage),children:ie.stage})]}),R.jsxs("p",{className:"a-metric-lead",children:[R.jsxs("strong",{children:[ie.units.toLocaleString()," proposed residential units"]})," · Application ",R.jsx("code",{children:ie.number})," · Screening cell ",R.jsx("code",{children:ie.cellId})]}),R.jsxs("dl",{className:"a-proposal-facts",children:[R.jsxs("div",{children:[R.jsx("dt",{children:"Nearest TTC stop"}),R.jsxs("dd",{children:[ie.nearestStop.name," (",Math.round(ie.nearestStop.distance_m)," m straight-line)"]})]}),R.jsxs("div",{children:[R.jsx("dt",{children:"Closest 2025 building footprint"}),R.jsxs("dd",{children:[R.jsx("code",{children:ie.nearestBuildingId}),re?` · ${re.height.toFixed(1)} m (~${Ci(re.height)} storeys est.) · ${br(re.height_source)}`:""," · ",ie.nearestBuildingDistM===0?"proposal pin sits inside footprint":`${ie.nearestBuildingDistM.toFixed(1)} m away`]})]}),R.jsxs("div",{children:[R.jsx("dt",{children:"Weekday morning (07–09)"}),R.jsx("dd",{children:ie.serviceSummary.morning?.status??"No frequent TTC stop recorded within screening range"})]}),R.jsxs("div",{children:[R.jsx("dt",{children:"Weekday evening (16–18)"}),R.jsx("dd",{children:ie.serviceSummary.evening?.status??"No frequent TTC stop recorded within screening range"})]}),R.jsxs("div",{children:[R.jsx("dt",{children:"Saturday midday (12–14)"}),R.jsx("dd",{children:ie.serviceSummary.saturday?.status??"No frequent TTC stop recorded within screening range"})]})]}),R.jsxs("div",{className:"a-proposal-actions",children:[R.jsx("button",{type:"button",className:"a-primary-btn",onClick:()=>Ie(ie),children:"Test 3D replacement at this site"}),R.jsx("a",{className:"a-link-btn",href:`#region=${ie.region}&areas=${ie.cellId}`,children:"Compare transit for this area on Page 1"}),xe&&R.jsx("a",{className:"a-link-btn",href:xe,target:"_blank",rel:"noreferrer",children:"View City application record ↗"})]})]}):re?R.jsxs(R.Fragment,{children:[R.jsxs("h2",{id:"a-inspect-heading",children:["Selected building: ",re.id]}),R.jsxs("p",{className:"a-metric-lead",children:[R.jsxs("strong",{children:["Recorded height: ",re.height.toFixed(2)," m"]})," (~",Ci(re.height)," storeys est.)"]}),R.jsxs("p",{children:["Measurement source: ",R.jsx("strong",{children:re.height_source})," (",br(re.height_source),") · 2025 City massing snapshot."]}),R.jsxs("p",{children:[R.jsx("strong",{children:"Energy evidence unavailable for this footprint."})," Municipal facility records and Toronto-wide reporting-property comparisons do not establish this building’s use or predict a replacement’s performance."]}),R.jsx("button",{type:"button",className:"a-primary-btn",onClick:Ne,children:"What if this building were taller or wider?"})]}):R.jsxs(R.Fragment,{children:[R.jsx("h2",{id:"a-inspect-heading",children:"Select a proposal or building to inspect"}),R.jsx("p",{children:"Click any red proposal pin or 2025 building in the 3D view above, or pick one from the sidebar lists to inspect nearby TTC service and test a replacement box."})]})}),R.jsxs("section",{className:"a-replacement","aria-labelledby":"a-replace-heading",children:[R.jsx("h2",{id:"a-replace-heading",children:"Test a “what-if” building replacement"}),R.jsx("p",{children:"Replace the selected 2025 building with a simple rectangular box to compare height, footprint area, and 3D volume while nearby 2025 buildings remain as recorded."}),!L&&se&&R.jsxs("div",{className:"a-demo-row",children:[R.jsxs("button",{type:"button",className:"a-primary-btn",onClick:_e,children:["Try editable example: ",se.label]}),R.jsxs("span",{className:"a-demo-hint",children:["Starts with a verified collision-free footprint in ",oe.name,"."]})]}),L&&S&&R.jsxs("div",{className:"a-editor",children:[R.jsxs("h3",{ref:X,tabIndex:-1,children:["Adjust your hypothetical building box",re?` (replacing ${re.id})`:""]}),R.jsx("div",{className:"a-dimensions",children:Jm.map(D=>R.jsxs("div",{className:"a-field",children:[R.jsx("label",{htmlFor:`a-dim-${D.key}`,children:D.label}),R.jsx("input",{id:`a-dim-${D.key}`,type:"number",min:D.min,max:D.max,step:D.step,value:S[D.key],"aria-describedby":`a-dim-hint-${D.key}`,onChange:G=>he(D.key,G.target.value)}),R.jsx("small",{id:`a-dim-hint-${D.key}`,children:D.key==="height"?`${D.hint} (~${Ci(Math.max(1,fe))} storeys est.)`:D.hint})]},D.key))}),R.jsx("button",{type:"button",className:"a-primary-btn",onClick:Te,children:"Apply replacement to 3D view"})]}),L&&R.jsx("button",{type:"button",onClick:()=>{if(!re)return;const D=Nr(oe,re);D?(N(D),y(Tr(D)),le(""),ge("A collision-free starting box is ready. Review dimensions, then apply.")):ge("No collision-free starting box found in this footprint. Select another source feature or adjust manually.",!0)},children:"Fit a valid starting box"}),R.jsxs("div",{className:"a-scenario-actions",children:[R.jsx("button",{type:"button",disabled:!w,"aria-pressed":Z,onClick:()=>{const D=!Z;O(D),we(D?"Showing original 2025 building for comparison.":"Showing your hypothetical replacement box.")},children:Z?"Show my replacement":"Compare with original 2025 building"}),R.jsx("button",{type:"button",disabled:!w,onClick:He,children:"Save in browser"}),R.jsx("button",{type:"button",onClick:Fe,children:"Load saved"}),R.jsx("button",{type:"button",disabled:!w,onClick:Ee,children:"Export comparison (JSON)"}),R.jsx("button",{type:"button",disabled:!L&&!w,onClick:Xe,children:"Reset to original"})]}),z&&R.jsx("p",{className:`a-message${Y?" is-error":""}`,children:z}),j&&R.jsxs("div",{className:"a-recovery-box",role:"region","aria-label":"Replacement recovery options",children:[R.jsxs("p",{children:[R.jsxs("strong",{children:["Why replacement could not start for ",j.blockedId,":"]})," City 3D massing records complex podium/tower buildings as overlapping parts, so removing one component leaves overlapping geometry",j.conflictId?` (${j.conflictId} highlighted red)`:"",". Collision checks stay active—choose a verified editable site to continue:"]}),R.jsxs("div",{className:"a-recovery-actions",children:[j.nearest&&R.jsxs("button",{type:"button",className:"a-primary-btn",onClick:()=>{o(""),b({proposal:null}),Ce(j.nearest.buildingId)},children:["Switch to nearest editable building (",j.nearest.buildingId,", ~",j.nearest.distance_m," m away)"]}),se&&se.buildingId!==j.nearest?.buildingId&&R.jsxs("button",{type:"button",onClick:_e,children:["Open editable example (",se.label,")"]}),R.jsx("button",{type:"button",onClick:()=>{De(null),le(""),V(""),B(!1)},children:"Dismiss"})]})]}),ue&&R.jsxs(R.Fragment,{children:[R.jsx("div",{className:"a-table-wrap",children:R.jsxs("table",{children:[R.jsx("caption",{children:"Comparison: recorded 2025 building vs. your hypothetical box"}),R.jsx("thead",{children:R.jsxs("tr",{children:[R.jsx("th",{scope:"col",children:"Measure"}),R.jsx("th",{scope:"col",children:"Recorded 2025"}),R.jsx("th",{scope:"col",children:"Your box"}),R.jsx("th",{scope:"col",children:"Difference"})]})}),R.jsx("tbody",{children:[["Height (m)",ue.oldHeight,ue.newHeight],["Ground footprint (m²)",ue.oldArea,ue.newArea],["3D box volume (m³)",ue.oldVolume,ue.newVolume]].map(([D,G,K])=>{const Se=K-G;return R.jsxs("tr",{children:[R.jsx("th",{scope:"row",children:D}),R.jsx("td",{children:G.toFixed(1)}),R.jsx("td",{children:K.toFixed(1)}),R.jsxs("td",{children:[Se>0?"+":"",Se.toFixed(1)]})]},D)})})]})}),R.jsxs("p",{className:"a-conflict-ok",children:[R.jsx("strong",{children:"Overlap check passed:"})," your box fits inside the 600 × 600 m area without intersecting nearby 2025 building footprints (zoning, streets, and approvals are not assessed)."]})]})]}),R.jsxs("details",{className:"a-sources",children:[R.jsx("summary",{children:"Coverage, data sources, and model scope"}),R.jsx("h3",{children:"What this 3D model measures and what it omits"}),R.jsxs("ul",{children:[R.jsxs("li",{children:[R.jsx("strong",{children:"2025 building massing only:"})," Recorded buildings come from outer footprints and average heights (",R.jsx("code",{children:"AVG_HEIGHT"}),"); roof shapes, façades, ground slope, and internal wings are not modelled. Snapshot IDs may represent one wing of a larger complex."]}),R.jsxs("li",{children:[R.jsx("strong",{children:"Illustrative storey estimates:"})," Storey figures use a rough ~3 m/storey rule of thumb and are not actual floor counts. Hypothetical box volume is not usable floor area or housing yield."]}),R.jsxs("li",{children:[R.jsx("strong",{children:"Proposal pipeline data:"})," Development Pipeline entries reflect City-reported residential unit counts at the screening snapshot date; proposals are not completed homes and may change or never be built."]}),R.jsxs("li",{children:[R.jsx("strong",{children:"Transit proximity:"})," Stop distances are straight-line metres to TTC stops; frequent service flags stops with at least 4 scheduled departures per hour in the screening window, without modelling walking routes, crowding, or reliability."]}),R.jsxs("li",{children:[R.jsx("strong",{children:"Unmodelled factors:"})," Sunlight/shadow duration, wind and pedestrian comfort, energy/emissions, traffic and transit demand, construction cost, property lines, zoning, and planning permission are not calculated. The shaded 3D view uses illustrative lighting, not a solar study."]}),R.jsxs("li",{children:[R.jsx("strong",{children:"Reported energy evidence:"})," No qualified energy-to-building relationship is established for these source footprints. The housing explorer offers separate Toronto-wide reporting-property comparisons and municipal facility records; neither predicts energy use for a replacement building."]})]}),R.jsx("h3",{children:"Sources and coordinates"}),R.jsx("p",{children:oe.limitation}),R.jsxs("p",{children:["Study centre: ",oe.centre.join(", ")," · Metric coordinates: EPSG:26917 · Features crossing the 600 × 600 m study edge are clipped."]}),R.jsxs("p",{children:[R.jsx("a",{href:oe.building_source.page,target:"_blank",rel:"noreferrer",children:"City of Toronto 3D massing"})," · Retrieved ",oe.building_source.retrieved_at," · source SHA256 ",R.jsx("code",{children:oe.building_source.sha256})]}),R.jsxs("p",{children:[R.jsx("a",{href:oe.street_source.page,target:"_blank",rel:"noreferrer",children:"Toronto Centreline"})," · Retrieved ",oe.street_source.retrieved_at]}),R.jsx("p",{children:"Housing proposals & transit schedule linkage derived from City of Toronto Development Applications / One Address Repository and TTC GTFS Schedule (Open Government Licence – Toronto). Informational and illustrative use only; verify for legal or official use. The City of Toronto does not endorse ASTER."})]})]})]})]})}export{o1 as default};
