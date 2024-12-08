import{r as d,j as e,L as p,f as u}from"./index-Do-YQzoz.js";function h(){const[s,c]=d.useState({email:"",password:""}),[t,l]=d.useState({emailError:"",passwordError:""}),m=async o=>{o.preventDefault();let r={};const a=localStorage.getItem("token");if(s.email?!/^\S+@\S+\.\S+$/.test(s.email)&&!/^\d{9,15}$/.test(s.email)?r.emailError="Введите корректный email или телефон!":r.emailError="":r.emailError="Поле не должно быть пустым!",s.password?s.password.length<4?r.passwordError="Пароль должен содержать не менее 4 символов!":r.passwordError="":r.passwordError="Поле не должно быть пустым!",l(r),!r.emailError&&!r.passwordError)try{const i=await u.post("https://elevenislands.ru/token",{guest:!1,username:s.email,password:s.password,remember_me:!0},{headers:{Authorization:`Bearer ${a}`}});localStorage.setItem("token",i.data.access_token)}catch(i){console.error(i),l({emailError:"Неправильный логин или пароль."})}},n=(o,r)=>{c(a=>({...a,[o]:r}))};return e.jsx("div",{className:"login-box",children:e.jsxs("div",{className:"box-login",children:[e.jsx("h1",{children:"Вход"}),e.jsxs("form",{onSubmit:m,className:"input-login",children:[e.jsxs("div",{className:"login-inputs",children:[e.jsx("label",{htmlFor:"input-email-and-tell",children:"Email или телефон"}),e.jsx("input",{onChange:o=>n("email",o.target.value),type:"text",id:"input-email-and-tell"}),t.emailError&&e.jsx("p",{style:{bottom:"-17px",position:"absolute",color:"red"},children:t.emailError})]}),e.jsxs("div",{className:"login-inputs",children:[e.jsx("label",{htmlFor:"input-password",children:"Пароль"}),e.jsx("input",{onChange:o=>n("password",o.target.value),type:"password",id:"input-password"}),t.passwordError&&e.jsx("p",{style:{bottom:"-17px",position:"absolute",color:"red"},children:t.passwordError})]}),e.jsxs("div",{className:"dop-options-login",children:[e.jsx("p",{children:e.jsx(p,{to:"/create-password",children:"Забыли пароль?"})}),e.jsx("p",{children:e.jsx(p,{to:"/registration",children:"Регистрация"})})]}),e.jsx("button",{type:"submit",className:"button-login",children:"Войти"})]})]})})}export{h as default};