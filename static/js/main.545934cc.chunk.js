(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(3),i=n.n(o),l=(n(14),n(4)),c=n(7),s={linear:function(e){return e},easeInQuad:function(e){return e*e},easeInAlot:function(e){return Math.pow(e,20)},easeOutQuad:function(e){return e*(2-e)},easeInOutQuad:function(e){return e<.5?2*e*e:(4-2*e)*e-1},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return--e*e*e+1},easeInOutCubic:function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1- --e*e*e*e},easeInElastic:function(e){return(.04-.04/e)*Math.sin(25*e)+1},easeOutElastic:function(e){return.04*e/--e*Math.sin(25*e)},easeInOutElastic:function(e){return(e-=.5)<0?(.02+.01/e)*Math.sin(50*e):(.02-.01/e)*Math.sin(50*e)+1},easeInOutQuart:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1+--e*e*e*e*e},easeInOutQuint:function(e){return e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e}},u=n(5),m=n(6),d=function(){function e(t){Object(u.a)(this,e),this.seed=t,this.original=t,this._random=this.random.bind(this)}return Object(m.a)(e,[{key:"reset",value:function(){this.seed=this.orignal}},{key:"seededRandom",value:function(e){var t=1e4*Math.sin(e);return t-Math.floor(t)}},{key:"random",value:function(){return this.seededRandom(this.seed++)}}]),e}();function h(e,t,n){return e+(t-e)*n}function f(e,t){return{x:e*Math.cos(t),y:e*Math.sin(t)}}function p(e,t,n){return{x:e*Math.sin(t)*Math.cos(n),y:e*Math.sin(t)*Math.sin(n),z:e*Math.cos(t)}}function g(e,t,n){var a=Math.cos(t),r=Math.sin(t),o=Math.cos(n),i=Math.sin(n),l=Math.cos(e),c=Math.sin(e);return{Axx:a*o,Axy:a*i*c-r*l,Axz:a*i*l+r*c,Ayx:r*o,Ayy:r*i*c+a*l,Ayz:r*i*l-a*c,Azx:-i,Azy:o*c,Azz:o*l}}function v(e,t){var n=e.x,a=e.y,r=e.z;return{x:t.Axx*n+t.Axy*a+t.Axz*r,y:t.Ayx*n+t.Ayy*a+t.Ayz*r,z:t.Azx*n+t.Azy*a+t.Azz*r}}var b=2,y=28,E=1e-4,w=10;function x(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=e.getContext("2d"),o=r.canvas.width,i="spiral"===n.type?function(e,t){var n=new d(e.seed),a=s[e.density];return function(){var r,o,i,l,c,u=(r=b,o=e.armsCurve,i=a(n.random())*(t/y),{x:r*Math.exp(o*i)*Math.cos(i),y:r*Math.exp(o*i)*Math.sin(i)}),m=(l=u.x,c=u.y,{r:Math.sqrt(l*l+c*c),t:Math.atan2(c,l)}),d=Math.floor(n.random()*e.arms),g=2*Math.PI*(d/e.arms),v=f(m.r,m.t+g),E=h(0,e.spread,s[e.spreadShape](n.random())),w=h(0,2*Math.PI,n.random()),x=h(0,2*Math.PI,n.random()),z=p(E,w,x);return{x:v.x+z.x,y:v.y+z.y,z:C(e,n,t,m.r)+z.z*e.heightSpread}}}(n,o/2):function(e,t){var n=new d(e.seed),a=s[e.density];return function(){var r=h(0,t,a(Math.sqrt(n.random()))),o=h(0,2*Math.PI,n.random()),i=f(r,o),l=h(0,e.spread,s[e.spreadShape](n.random())),c=h(0,2*Math.PI,n.random()),u=h(0,2*Math.PI,n.random()),m=p(l,c,u);return{x:i.x+m.x,y:i.y+m.y,z:C(e,n,t,r)+m.z*e.heightSpread}}}(n,o/2),l=function(e){var t=new d(e.seed),n=[e.starColor0,e.starColor1,e.starColor2,e.starColor3,e.starColor4];return function(){return{size:h(e.minStarSize,e.maxStarSize,t.random()),color:n[Math.floor(t.random()*n.length)]}}}(n),c=g(0,a,0),u=g(n.cameraX,n.cameraZ,n.cameraY);r.clearRect(0,0,o,o),r.save(),r.translate(o/2,o/2);for(var m=0;m<n.stars;m++){var E=i(),x=v({x:E.x,y:E.y,z:E.z},c),M=v({x:x.x,y:x.y,z:x.z},u),S=l();z(r,M,S.size,S.color)}r.restore(),function(e,t,n,a){t.globalCompositeOperation="source-over",t.filter="none",t.fillStyle=a.spaceColor,t.fillRect(0,0,n,n),t.filter="blur(".concat(a.backgroundGlow,"px)"),t.drawImage(e,0,0),t.globalCompositeOperation="screen",t.filter="blur(".concat(a.backgroundGlow/w,"px)"),t.drawImage(e,0,0),t.globalCompositeOperation="lighten",t.filter="blur(".concat(a.starGlow,"px)"),t.drawImage(e,0,0),t.globalCompositeOperation="screen",t.filter="none",t.drawImage(e,0,0)}(e,t,o,n)}function C(e,t,n,a){return(1-s[e.sideShape](a/n))*t.random()*e.height*(t.random()>.5?1:-1)}function z(e,t,n,a){var r=t.x,o=t.y;e.fillStyle=a,e.fillRect(r-n/2,o-n/2,n,n)}var M=0;function S(e){var t=e.size,n=e.preset,a=r.a.useRef(null),o=r.a.useRef(null);return r.a.useLayoutEffect(function(){var e=a.current.getContext("2d"),t=o.current,r=null,i=function(){n.animated?(M+=(n.speed||0)*E,x(t,e,n,M)):0===M&&x(t,e,n,M),l()},l=function(){r=window.requestAnimationFrame(i)};return i(),function(){window.cancelAnimationFrame(r)}},[n]),r.a.createElement(r.a.Fragment,null,r.a.createElement("canvas",{className:"offscreen-canvas",ref:o,width:t,height:t}),r.a.createElement("canvas",{className:"canvas",ref:a,width:t,height:t}))}var A=n(1);function k(e,t,n,a){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};return r.a.createElement("tr",null,r.a.createElement("td",{style:{width:108}},r.a.createElement("strong",null,r.a.createElement("label",{htmlFor:n},n))),r.a.createElement("td",null,r.a.createElement("input",Object.assign({id:n,type:e,value:t[n],checked:"checkbox"===e&&t[n],onChange:function(t){return a(Object(A.a)({},n,"checkbox"===e?t.target.checked:"number"===e?parseFloat(t.target.value):t.target.value))}},o))))}function O(e,t,n,a){return r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("strong",null,r.a.createElement("label",{htmlFor:t},t))),r.a.createElement("td",null,r.a.createElement("select",{id:t,value:e[t],onChange:function(e){return a(Object(A.a)({},t,e.target.value))}}," ",n.map(function(e){return r.a.createElement("option",{key:e,value:e},e)}))))}function I(e){var t=e.preset,n=e.onChange;return r.a.createElement("table",{className:"inputs"},r.a.createElement("tbody",{className:"inputs-body"},k("text",t,"name",n),k("number",t,"seed",n,{min:0,step:1}),k("number",t,"stars",n,{min:0,step:5e3}),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("h4",null,"Shape"))),O(t,"type",["spiral","globular"],n),O(t,"density",Object.keys(s),n),k("number",t,"spread",n,{min:0,step:1}),O(t,"spreadShape",Object.keys(s),n),O(t,"sideShape",Object.keys(s),n),k("number",t,"height",n,{min:0,step:1}),k("number",t,"heightSpread",n,{min:0,max:1,step:.1}),"spiral"===t.type&&r.a.createElement(r.a.Fragment,null,k("number",t,"arms",n,{min:1,step:1}),k("number",t,"armsCurve",n,{min:.25,step:.01})),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("h4",null,"Colors"))),k("color",t,"spaceColor",n),k("color",t,"coreColor",n),k("color",t,"starColor0",n),k("color",t,"starColor1",n),k("color",t,"starColor2",n),k("color",t,"starColor3",n),k("color",t,"starColor4",n),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("h4",null,"Sizes"))),k("number",t,"minStarSize",n,{min:0,step:.1}),k("number",t,"maxStarSize",n,{min:0,step:.1}),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("h4",null,"Camera"))),k("number",t,"cameraX",n,{step:.05}),k("number",t,"cameraY",n,{step:.05}),k("number",t,"cameraZ",n,{step:.05}),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("h4",null,"Effects"))),k("number",t,"backgroundGlow",n,{min:0,step:.1}),k("number",t,"starGlow",n,{min:0,max:10,step:.1}),k("number",t,"coreSize",n,{min:0,step:1}),k("number",t,"coreBlur",n,{min:0,step:1}),r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("h4",null,"Animation"))),k("checkbox",t,"animated",n),k("number",t,"speed",n,{min:.1,step:.1})))}var j=[{name:"default",seed:1234,stars:3e4,spaceColor:"#020e26",starColor0:"#EEEDBE",starColor1:"#0388A6",starColor2:"#025059",starColor3:"#E9F2EB",starColor4:"#7CA67B",minStarSize:.8,maxStarSize:2.3,density:"easeInQuad",spread:675,spreadShape:"easeInCubic",sideShape:"easeOutCubic",heightSpread:.1,height:25,cameraX:.5,cameraY:1,cameraZ:2,backgroundGlow:50,starGlow:10,animated:!0,speed:20,coreColor:"#98C0E6",coreSize:600,coreBlur:30,type:"spiral",arms:2,armsCurve:.275}],Q=1500;var R=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function F(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(function(){r.a.useEffect(function(){window.mixpanel.track("app-loaded")});var e=r.a.useState(j[0]),t=Object(c.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{className:"layout"},r.a.createElement(S,{size:Q,preset:n}),r.a.createElement(I,{preset:n,onChange:function(e){window.mixpanel.track("input-changed",e),a(Object(l.a)({},n,e))}}))},null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/create-galaxy",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/create-galaxy","/service-worker.js");R?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):F(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):F(t,e)})}}()},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.545934cc.chunk.js.map