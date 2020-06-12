(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"K+nK":function(e,n){function t(e){return e&&e.__esModule?e:{default:e}}e.exports=t},bnru:function(e,n,t){"use strict";t.r(n);var r=t("0Owb"),o=t("q1tI"),a=t.n(o),l=(t("B2uJ"),t("+su7"),t("qOys"),t("5Yjd")),u=t.n(l),m=a.a.memo((function(){var e=t("K+nK"),n=e(t("q1tI")),r=e(t("4GN+")),o=function(){return n["default"].createElement(r["default"],null)};return n["default"].createElement(o)}));n["default"]=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"markdown"},a.a.createElement("h1",{id:"\u81ea\u5b9a\u4e49\u6269\u5c55\u7ec4\u4ef6"},a.a.createElement("a",{"aria-hidden":"true",href:"#\u81ea\u5b9a\u4e49\u6269\u5c55\u7ec4\u4ef6"},a.a.createElement("span",{className:"icon icon-link"})),"\u81ea\u5b9a\u4e49\u6269\u5c55\u7ec4\u4ef6"),a.a.createElement("p",null,"Formular \u5177\u6709\u7ade\u4e89\u529b\u7684\u7279\u6027\u4e4b\u4e00\u5c31\u662f\u53ef\u4ee5\u7075\u6d3b\u5730\u5b9a\u5236\u6216\u63a5\u5165\u7b2c\u4e09\u65b9\u5404\u79cd\u8868\u5355\u63a7\u4ef6\uff0c\u5305\u62ec\u4e0b\u9762\u4e09\u79cd\u7ec4\u4ef6\uff1a"),a.a.createElement("ol",null,a.a.createElement("li",null,"\u8868\u5355\u5bb9\u5668\u3002\u7c7b\u6bd4 ",a.a.createElement("code",null,"<form>")),a.a.createElement("li",null,"\u8868\u5355\u9879\u63a7\u4ef6\u3002\u7528\u4e8e\u63d0\u4f9b\u6807\u7b7e label\u3001\u6821\u9a8c\u3001\u5e03\u5c40\u7b49\uff0c\u7c7b\u6bd4\u4e00\u4e9b\u5178\u578b UI \u5e93\u7684 form control \u6982\u5ff5"),a.a.createElement("li",null,"\u8868\u5355\u90e8\u4ef6\u3002\u7528\u4e8e\u6536\u96c6\u6570\u636e\u7684\u6700\u76f4\u63a5\u7684\u7ec4\u4ef6\uff0c\u4f8b\u5982 ",a.a.createElement("code",null,"<input>"),"\u3001",a.a.createElement("code",null,"<select>"),"\u3001",a.a.createElement("code",null,"<textarea>"))),a.a.createElement("p",null,"\u5bf9\u4e8e\u4e0a\u9762\u4e09\u79cd\u7ec4\u4ef6\uff0cFormular \u4f7f\u7528",a.a.createElement("a",{href:"https://reactjs.org/docs/higher-order-components.html",target:"_blank",rel:"noopener noreferrer"},"\u9ad8\u9636\u7ec4\u4ef6",a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",className:"__dumi-default-external-link-icon"},a.a.createElement("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),a.a.createElement("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"}))),"\u7684\u8bbe\u8ba1\u6a21\u5f0f\u8f7b\u677e\u5730\u5bf9\u5176\u8fdb\u884c\u81ea\u5b9a\u4e49\u6269\u5c55"),a.a.createElement("h2",{id:"\u6269\u5c55\u8868\u5355\u5bb9\u5668"},a.a.createElement("a",{"aria-hidden":"true",href:"#\u6269\u5c55\u8868\u5355\u5bb9\u5668"},a.a.createElement("span",{className:"icon icon-link"})),"\u6269\u5c55\u8868\u5355\u5bb9\u5668"),a.a.createElement("p",null,"\u8fd9\u91cc\u6709\u4e00\u4e2a Formular \u81ea\u5b9a\u4e49\u6269\u5c55\u7ec4\u4ef6\u7684\u793a\u4f8b\uff1a")),a.a.createElement(u.a,Object(r["a"])({source:{tsx:"import React from 'react';\nimport { connect, useForm } from '@formular/react';\nimport { Form, Field } from '@formular/antd';\nimport { Observer } from 'mobx-react';\n\ninterface ButtonCounterProps {\n  value: number;\n  onChange: (value: number) => void;\n}\n\nconst ButtonCounter: React.FC<ButtonCounterProps> = ({ value, onChange }) => {\n  return (\n    <button onClick={() => onChange(value + 1)}>\n      You clicked me {value} times.\n    </button>\n  );\n};\n\nconst XButtonCounter = connect<ButtonCounterProps>({\n  getValueFromEvent: (val) => val\n})(ButtonCounter);\n\nconst App: React.FC = () => {\n  const [form] = useForm();\n  return (\n    <Form form={form}>\n      <Field name=\"times\" initialValue={0} component={XButtonCounter} />\n      <Observer>\n        {() => <pre>{JSON.stringify(form.values, null, 2)}</pre>}\n      </Observer>\n    </Form>\n  );\n};\n\nexport default App;\n",jsx:"import React from 'react';\nimport { connect, useForm } from '@formular/react';\nimport { Form, Field } from '@formular/antd';\nimport { Observer } from 'mobx-react';\n\nconst ButtonCounter = ({ value, onChange }) => (\n  <button onClick={() => onChange(value + 1)}>You clicked me {value} times.</button>\n);\n\nconst XButtonCounter = connect({\n  getValueFromEvent: val => val,\n})(ButtonCounter);\n\nconst App = () => {\n  const [form] = useForm();\n  return (\n    <Form form={form}>\n      <Field name=\"times\" initialValue={0} component={XButtonCounter} />\n      <Observer>{() => <pre>{JSON.stringify(form.values, null, 2)}</pre>}</Observer>\n    </Form>\n  );\n};\n\nexport default App;\n"}},{defaultShowCode:!0,path:"/_demos/basic",dependencies:{"@formular/react":"0.0.9","@formular/antd":"0.0.11","mobx-react":"6.2.2"},files:{}}),a.a.createElement(m,null)))}}}]);