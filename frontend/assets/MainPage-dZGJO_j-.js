import{r as l,j as s,L as c}from"./index-IytR3YjZ.js";import{B as m,S as r}from"./SendEmail-DRORWpjB.js";import{e as M,a as _,B as d}from"./Box3-BF5sURpU.js";import{u as I}from"./store-BCBQ6itN.js";import"./index-BqX_ZGt1.js";import{I as G,a as h,b as x,c as j,d as g,e as f,f as p,g as u,h as w,i as N,j as v,k as L,l as B,m as E,n as C,o as S,p as y,q as $,r as b,s as P,t as R,u as k,v as A,w as D,x as F,y as Q,z as T,A as z,B as H,C as J,D as K,E as O,F as U,G as V,H as W,J as X,K as Y,L as Z,M as q,N as ss,O as as,P as es,Q as os,R as ts,S as is,T as ls,U as ns,V as cs,W as rs,X as ms}from"./IMG_1586-Br0_mo4Y.js";const Ms=[G,h,x,j,g,f,p,u,w,N,v,L,B,E,C,S,y,$,b,P,R,k,A,D,F,Q,T,z,H,J,K,O,U,V,W,X,Y,Z,q,ss,as,es,os,ts,is,ls,ns,cs,rs,ms],t=a=>{const[i,o]=l.useState(window.matchMedia(a).matches);return l.useEffect(()=>{const e=window.matchMedia(a),n=()=>o(e.matches);return e.addEventListener("change",n),()=>e.removeEventListener("change",n)},[a]),i};function js(){const a="1020px",{photos:i}=I();return l.useEffect(()=>{window.scroll(0,0)},[]),s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"box1",children:s.jsx("div",{className:"box1newCollection",children:s.jsxs("div",{className:"newCollection",children:[s.jsxs("div",{className:"comLeftColl",children:[s.jsx("img",{src:M,alt:"element2Box1Logo",className:"element2Box1Logo"}),s.jsx("img",{src:_,className:"elementBox1Logo",alt:"elementBox1Logo"})]}),s.jsxs("div",{className:"comRightColl",children:[s.jsx("h1",{children:"New collection"}),s.jsx("h1",{children:"ESSENTIAL"})]})]})})}),s.jsxs("div",{className:"header headerBox2 ",children:[s.jsx("div",{className:"headerCom1",children:s.jsx("h1",{children:"Essential collection"})}),t(`(min-width: ${a})`)&&s.jsx("div",{className:"headerCom2",children:s.jsx(c,{to:"products/all",children:"Смотреть все"})})]}),s.jsx(m,{arrDataImg:i.filter((o,e)=>o.show_on_home_page&&e<32)}),t(`(max-width: ${a})`)&&s.jsx("div",{className:"header headerBox2 ",style:{display:"flex",justifyContent:"center"},children:s.jsx("div",{className:"headerCom2",children:s.jsx(c,{to:"products/all",style:{margin:"0 auto"},children:"Смотреть все"})})}),t(`(min-width: ${a})`)&&s.jsx(r,{}),s.jsx(d,{images:Ms.filter((o,e)=>e<10),title:"Фотогалерея"}),t(`(max-width: ${a})`)&&s.jsx(r,{})]})}export{js as default};