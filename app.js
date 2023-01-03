const form = document.querySelector('form')
form.addEventListener('submit', handelForm)
const inputs = document.querySelectorAll('input')

function  handelForm(e) {
   e.preventDefault()
   const cookieObject = {}
  inputs.forEach( input=>{
   const attribute = input.getAttribute('name')
   cookieObject[attribute] = input.value 
  }
   ) 
form.reset()
   cookieObject.expire= new Date( Date.now()+31536000000).toUTCString()

createCookie(cookieObject)

}

function createCookie(newCookie){

if (cookieExiste(newCookie.name)) {
createToast ({name:newCookie.name, state:"modifié", color:"orangered"})
}
else  {
createToast ({name:newCookie.name, state:"créé", color:"green"})
}


 const cookie =document.cookie= `${newCookie.name}=${newCookie.value}; expires=${newCookie.expire}`

 console.log(cookie[0])

}




function cookieExiste(name){
const cookieformat = document.cookie.replace(/\s/g,"").split(";").map(cookie=>cookie.split("=")[0])
const cookieReturn =cookieformat.find(element=> element === name)

return cookieReturn

}


function createToast({name, state,color}){
const toast = document.createElement('p')
toast.className="toast"
document.querySelector(".parent-toast").appendChild(toast)
 toast.innerHTML=` Cookie ${name} ${state}`
 toast.style.backgroundColor= color



setTimeout(() => {
   toast.remove()
},2500);

}

 const displayButton = document.querySelector(".displayButton")
 const cookieList= document.querySelector(".cookies-list")
  const infoTxt = document.querySelector(".info-txt")

  displayButton.addEventListener("click", handelClick)

 function handelClick(){
   const cookie = document.cookie.replace(/\s/g,"").split(";").map(e=>e.split("=")).reverse()

cookie.forEach( cookie=> {
 var name = cookie[0]
 var value = cookie[1]
 creatCookielist(name , value)
if (!name) {

    infoTxt.textContent="Pas de cookies à afficher, créez-en un!"
    listItem.remove()

   setTimeout(() => {
   infoTxt.textContent=""
},1500);
   }
  
 return
})
  }     

 var listItem
 function creatCookielist (name,value) {
   listItem = document.createElement("li");
 listItem.innerHTML=`
   
  <p>
  nom: ${name}
  </p>
  <p>
  valeur: ${value}
  </p>
  <button type="button" class="remove" >X</button>
  `
  cookieList.appendChild(listItem)

 listItem.querySelector("button").addEventListener("click", e=>{
document.cookie =  `${name}=;expires=${new Date(0)}`
createToast ({name:name, state:"supprimé", color:"#DC143C"})
e.target.parentElement.remove()
 })
}