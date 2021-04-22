const genre =Array.from(document.querySelectorAll('.genre')) 
window.addEventListener('DOMContentLoaded', ()=>{
   const btnNames = genre.reduce((value, item)=>{
       if(!value.includes(item.textContent)){
           value.push(item.textContent);
       }
return value  
    }, []);
    console.log(btnNames)
})