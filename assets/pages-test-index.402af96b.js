var a=Object.defineProperty,s=(s,e)=>a(s,"name",{value:e,configurable:!0});import{d as e,b as t,c as n,w as i,e as o,a as c,r,j as l,i as d}from"./index.f5b75289.js";import{a as m}from"./sys.921d55e8.js";const u=e({__name:"index",setup(a){const e=s((a=>d({title:JSON.stringify(a),icon:"none"})),"toast"),u=s((()=>c.to("page",{a:1.225,b:"大海星"}).then(e)),"page1"),p=s((()=>c.to("page",{a:[Math.PI,"喵喵喵",!0]}).then(e)),"page2"),v=s((()=>c.to("page",{a:[NaN,"草www",{c:!1}],b:{d:[1/0,2]}}).then(e)),"page3");return(a,s)=>{const e=r(l("sys"),m);return t(),n(e,null,{default:i((()=>[o("div",{ma:"",w750:"",pt:""},[o("div",{"text-sm":"","text-bluegray":"",plsm:""},"页面传值与返回"),o("div",{class:"cu-list menu sm-border"},[o("div",{class:"cu-item arrow",onClick:u},[o("div",{class:"content"},"传递对象")]),o("div",{class:"cu-item arrow",onClick:p},[o("div",{class:"content"},"传递数组")]),o("div",{class:"cu-item arrow",onClick:v},[o("div",{class:"content"},"传递复杂嵌套内容")])])])])),_:1})}}});export{u as default};