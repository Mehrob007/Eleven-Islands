import{r,j as e,L as u}from"./index-IytR3YjZ.js";import{S as v}from"./index-BqX_ZGt1.js";const V="/assets/elementBox1Logo-ZBlNvlOE.svg",C="data:image/svg+xml,%3csvg%20width='34'%20height='50'%20viewBox='0%200%2034%2050'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.4591%2049.3067H23.5728V48.8442H21.7731C19.3064%2048.8442%2018.996%2048.638%2018.996%2046.1698V3.96578C18.996%201.49708%2019.3046%201.29181%2021.7731%201.29181H23.5728V0.725708H10.4591V1.18868H12.2588C14.7273%201.18868%2014.9848%201.39619%2014.9848%203.86315V46.1698C14.9848%2048.6362%2014.7256%2048.8442%2012.2588%2048.8442H10.4591V49.3067Z'%20fill='white'/%3e%3cpath%20d='M25.9833%2032.9105V16.4025H25.5206V18.2027C25.5206%2022.6037%2023.3935%2023.4904%2020.8918%2023.6308V24.6044C23.3945%2024.7535%2025.5206%2025.681%2025.5206%2030.0817V32.9105H25.9833Z'%20fill='white'/%3e%3cpath%20d='M13.0892%2023.654H8.88742V10.1805C8.88742%209.04902%208.37275%208.12332%207.7557%207.50602V7.45457H13.0892V6.52888H0.350586V6.99186H2.15005C4.6185%206.99186%204.87621%207.24907%204.87621%209.71777V40.3159C4.87621%2042.7841%204.6185%2043.041%202.15005%2043.041H0.350586V43.504H13.0892V42.5783H7.7557V42.5264C8.37275%2041.9096%208.88742%2040.9839%208.88742%2039.8529V24.5797H13.0892V23.654Z'%20fill='white'/%3e%3cpath%20d='M20.8918%207.45457H21.9042C26.8411%207.45457%2029.5073%209.35868%2029.8237%2014.9114L30.0292%2018.5111H30.9547L30.0292%204.57459L29.5665%204.6093L29.7206%206.99186H29.6696C29.3095%206.63201%2028.5891%206.52888%2027.7665%206.52888H20.8918V7.45457Z'%20fill='white'/%3e%3cpath%20d='M20.8918%2043.504H30.5436C31.3667%2043.504%2032.0864%2043.4014%2032.4465%2043.041H32.4982L32.3438%2045.4238L32.8068%2045.4581L33.6808%2031.5221H32.8578L32.5491%2035.6359C32.1793%2040.5716%2029.8232%2042.5783%2024.887%2042.5783H20.8918V43.504Z'%20fill='white'/%3e%3c/svg%3e",w="data:image/svg+xml,%3csvg%20width='6'%20height='10'%20viewBox='0%200%206%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1.19995%209.20005L5.39995%205.00005L1.19995%200.800049'%20stroke='white'%20stroke-width='1.2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",f="data:image/svg+xml,%3csvg%20width='6'%20height='10'%20viewBox='0%200%206%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4.80005%209.20005L0.600049%205.00005L4.80005%200.800049'%20stroke='white'%20stroke-width='1.2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",p=l=>{const[o,c]=r.useState(window.matchMedia(l).matches);return r.useEffect(()=>{const n=window.matchMedia(l),a=()=>c(n.matches);return n.addEventListener("change",a),()=>n.removeEventListener("change",a)},[l]),o},j="1020px";function S({images:l,title:o}){const[c,n]=r.useState(!0),[a,m]=r.useState(!1);r.useEffect(()=>{d();const t=i.current;return t&&t.addEventListener("scroll",d),()=>{t&&t.removeEventListener("scroll",d)}},[]);const d=()=>{if(i.current){const{scrollLeft:t,scrollWidth:s,clientWidth:g}=i.current;n(t===0),m(t+g>=s-10)}},i=r.useRef(null),h=t=>{if(i.current){const s=i.current.clientWidth*t;i.current.scrollBy({left:s,behavior:"smooth"})}},x={className:"slider Gelary variable-width",infinite:!0,centerMode:!0,slidesToShow:1,slidesToScroll:1,variableWidth:!0};return e.jsxs("div",{children:[e.jsx("div",{className:"box3",children:e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"headerCom1",children:e.jsx("h1",{children:o})}),e.jsxs("div",{className:"headerCom2 buttonSlider",children:[e.jsx("button",{id:"prev-slide",className:`slider-button material-symbols-rounded ${c?"offButtonSlider":""}`,onClick:()=>h(-1),children:e.jsx("img",{src:f,alt:"StrelkaLeft"})}),e.jsx("button",{id:"next-slide",className:`slider-button material-symbols-rounded ${a?"offButtonSlider":""}`,onClick:()=>h(1),children:e.jsx("img",{src:w,alt:"StrelkaRight"})})]})]})}),e.jsx("div",{className:"contentBox3",children:p(`(min-width: ${j})`)?e.jsx("div",{className:"containerBox3",children:e.jsx("div",{className:"slider-wrapper",children:e.jsx("div",{className:"image-list",ref:i,children:l.map((t,s)=>e.jsx("div",{className:"bg",children:e.jsx("img",{src:t,alt:`img-${s}`,className:"image-item"})},s))})})}):e.jsx(v,{...x,children:l.map((t,s)=>e.jsx("div",{className:"bg-phone",children:e.jsx("img",{src:t,alt:`img-${s}`,className:"image-item"})},s))})}),e.jsx("div",{className:"allPhotoButton",children:e.jsx(u,{to:"/com-gelary-all/1",children:e.jsx("h3",{style:{cursor:"pointer"},children:"Вся фотогалерея"})})})]})}export{S as B,V as a,C as e};