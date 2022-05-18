var f=Object.defineProperty;var m=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var d=(n,t,e)=>t in n?f(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,p=(n,t)=>{for(var e in t||(t={}))y.call(t,e)&&d(n,e,t[e]);if(m)for(var e of m(t))b.call(t,e)&&d(n,e,t[e]);return n};var i=(n,t,e)=>(d(n,typeof t!="symbol"?t+"":t,e),e);const v=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}};v();class P{constructor(){i(this,"events",{})}subscribe(t,e){return this.events.hasOwnProperty(t)||(this.events[t]=[]),this.events[t].push(e)}publish(t,e={}){return this.events.hasOwnProperty(t)?this.events[t].map(s=>s(e)):[]}}class w{constructor(){i(this,"preventPublish",!1);i(this,"actions");i(this,"eventManager");i(this,"state");this.actions={},this.state={},this.eventManager=new P,this.setStateProxy()}setStateProxy(){const t=(e,s,r)=>(e[s]=r,this.preventPublish||this.eventManager.publish("stateChange",this.state),!0);this.state=new Proxy({},{set:t})}setDefaultState(t,e){this.preventPublish=!0,this.state[t]=e,this.preventPublish=!1}setAction(t,e){const s=r=>{const o=e({state:p({},this.state),payload:r});return this.mergeState(o)};this.actions[t]=s}dispatch(t,e){if(!this.actions.hasOwnProperty(t))throw Error(`Invalid action type: ${t}.`);this.state=this.actions[t](e)}mergeState(t){return Object.assign(this.state,t)}getState(t){if(!this.state.hasOwnProperty(t))throw Error(`Invalid state key: ${t}.`);return this.state[t]}}class g{constructor({tagName:t="div",id:e="",classNames:s=[]}={}){i(this,"store");i(this,"container");i(this,"id");i(this,"classNames");this.id=e,this.classNames=s,this.container=this.createContainer(t),this.store=new w,this.store.eventManager.subscribe("stateChange",()=>this.render())}createContainer(t){const e=document.createElement(t);return e.id=this.id,this.classNames.forEach(s=>{e.classList.add(s)}),e}render(){throw Error("You must implement render method in component instance.")}}const l=()=>{throw Error("Please set view action to routes.")};class a{static setViewTo(t,e,s=document.getElementById("app")){const r=()=>{s&&(s.innerHTML=""),e()};this.INFO[t].view=r}static view(t){const e=t||"#";if(!this.INFO.hasOwnProperty(e)){this.view404();return}this.INFO[e].view()}static splitProxyPath(t){const e=new RegExp("(\\/proxy\\/\\d+)+"),s=t.match(e);return{proxy:s?s[0]:"",path:t.replace(e,"")}}static view404(){const t=document.getElementById("app");t.innerHTML="404 Page not found."}}i(a,"ROOT_PATH",""),i(a,"INFO",{"#":{name:"home",view:l},"#signin":{name:"signin",view:l},"#dummy":{name:"dummy",view:l}});const c=class{constructor(t,e="click"){i(this,"targetRoute");this.target=t,this.targetRoute=this.getRouterDataFromElement(this.target),this.target.addEventListener(e,this.execute.bind(this)),this.addGlobalRouterEvents()}addGlobalRouterEvents(){c.globalEventSetted||(c.globalEventSetted=!0,window.addEventListener("popstate",this.renderViewWhenPopState.bind(this)),window.addEventListener("routetrigger",this.renderViewWhenRouteTriggered.bind(this)))}getRouterDataFromElement(t){const e=t.getAttribute("href");if(e==="")throw Error("Router must be setted html attribute 'href'.");return e}execute(t){t.preventDefault();const e=new CustomEvent("routetrigger",{composed:!0,detail:{href:this.targetRoute}});window.dispatchEvent(e)}renderViewWhenPopState(){a.view(window.location.hash)}renderViewWhenRouteTriggered(t){const{href:e}=t.detail;window.history.pushState(null,"",`${a.ROOT_PATH}${e}`),a.view(e)}};let u=c;i(u,"globalEventSetted",!1);class E{constructor(t){i(this,"globalStore");i(this,"dummyComponent");i(this,"routerComponent");this.target=t,this.globalStore=new w,this.dummyComponent=new O,this.routerComponent=new S,this.setViews(),this.dispatchInitialRoute()}setViews(){a.setViewTo("#",()=>{this.target.appendChild(this.dummyComponent.container),this.target.appendChild(this.routerComponent.container)}),a.setViewTo("#signin",()=>{this.target.innerHTML="wow",this.target.innerHTML="<a class='router' href='#dummy'>Dummy!</a>",new u(this.target.querySelector(".router"))}),a.setViewTo("#dummy",()=>{this.target.innerHTML="Dummy reached!"})}dispatchInitialRoute(){const{proxy:t}=a.splitProxyPath(window.location.pathname);t!==""&&(a.ROOT_PATH=`${t}/`),a.view(window.location.hash)}}class S extends g{constructor(){super({classNames:["router-wrapper"]}),this.render()}render(){this.container.innerHTML=`
      <a class="route" href="#signin">Go sign in -></a>
    `,new u(this.container.querySelector(".route"))}}class O extends g{constructor(){super({classNames:["dummy-container"]}),this.store.setDefaultState("dummy-number",0),this.store.setAction("increaseNumber",({state:t})=>({"dummy-number":t["dummy-number"]+1})),this.render()}render(){const t=this.store.getState("dummy-number");this.container.innerHTML=`
      <span class="dummy-text">main: ${t}</span>
      <button class="dummy-button">click!</button>
    `,this.container.querySelector("button").addEventListener("click",()=>{this.store.dispatch("increaseNumber",{})})}}window.onload=()=>{new E(document.querySelector("#app"))};
