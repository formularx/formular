(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{Uyu5:function(e,a,t){"use strict";t.r(a);t("+L6B");var n=t("2/Rp"),r=t("WmNS"),i=t.n(r),l=t("9og8"),o=(t("2qtc"),t("kLXV")),s=t("aHyi"),u=t("tFTa"),c=t("3kSX"),m=t("FF8P");t("sRBo"),t("5NDa"),t("OaEy"),t("y8nQ");s["a"].registerGlobalFields({Checkbox:u["a"],Input:c["a"],Select:m["a"]});var p=t("q1tI"),h=t.n(p),d=t("N4Cn"),f=t("IlHZ"),v=t("U9Df"),b=t("7jk8"),w=t("2vnA");function y(){return k.apply(this,arguments)}function k(){return k=Object(l["a"])(i.a.mark((function e(){return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,x(1e3);case 2:return e.abrupt("return",[{label:"Lion \ud83e\udd81\ufe0f",value:"lion"},{label:"Tiger \ud83d\udc2f",value:"tiger"},{label:"Wolf \ud83d\udc3a",value:"wolf"},{label:"Others",value:"others"}]);case 3:case"end":return e.stop()}}),e)}))),k.apply(this,arguments)}function x(e){return new Promise(a=>setTimeout(a,e))}var A=()=>{var e=Object(v["a"])(()=>Object(b["b"])());return h.a.createElement(d["a"],{form:e,onFinish:e=>o["a"].success({title:"Values",content:h.a.createElement("pre",null,JSON.stringify(e,null,2))}),effects:i.a.mark((function e(a){var t,n,r;return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=a.field,n=a.value,r=a.form,e.next=3,Object(w["k"])(()=>(t("favoriteAnimal").ignored=!(t("favoriteAnimal").show=!!n("isFurry")))&&r.resetFields(["favoriteAnimal"]));case 3:return e.next=5,Object(w["k"])(()=>(t("otherAnimalName").ignored=!(t("otherAnimalName").show="others"===n("favoriteAnimal")))&&r.resetFields(["otherAnimalName"]));case 5:return e.next=7,Object(w["B"])(()=>{var e;return null===(e=t("favoriteAnimal"))||void 0===e?void 0:e.show},function(){var e=Object(l["a"])(i.a.mark((function e(a){var n;return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=7;break}return n=t("favoriteAnimal"),n.loading=n.disabled=!0,e.next=5,y();case 5:n.enum=e.sent,n.loading=n.disabled=!1;case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}());case 7:case"end":return e.stop()}}),e)}))},h.a.createElement(f["a"],{name:"isFurry",initialValue:!1,label:"Do you like animals \ud83d\udc3a",component:"Checkbox",componentProps:e=>{var a=e.field;return{children:(null===a||void 0===a?void 0:a.value)?"Yes":"Nope"}}}),h.a.createElement(f["a"],{name:"favoriteAnimal",label:"What is your favorite animal \u2764\ufe0f",component:"Select",componentProps:{style:{width:"40%"},placeholder:"Choose an animal"},extra:'When you select "Others", the "Other Animals" input box will appear',rules:{required:!0,message:"This field is required"},required:!0}),h.a.createElement(f["a"],{name:"otherAnimalName",label:"Other animals \ud83d\udc97",component:"Input",componentProps:{style:{width:"40%"}},rules:{required:!0,message:"This field is required"},required:!0}),h.a.createElement(n["a"],{type:"primary",htmlType:"submit",onClick:()=>{console.log(e)}},"Submit"))};a["default"]=A}}]);