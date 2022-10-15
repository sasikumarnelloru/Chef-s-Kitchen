const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const random = document.querySelector("#random");
const mealsEl = document.querySelector("#meals");
const resultHeading = document.querySelector("#result-heading");
const single_mealEl =document.querySelector("#single-meal");

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`)
    .then((res)=>res.json())  //converts res to js object
    .then((data)=>{
        console.log(data);
        // resultHeading.innerHTML=`<h2>Search result for: '${search.value}'</h2>`;

        if (data.meals === null) {
            resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        }else{
            mealsEl.innerHTML=data.meals.map(meal => `
                <div class="meal">
                
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
               
                <a href="#single-meal">
                <div class="meal-info" meal-ID="${meal.idMeal}">
                    <h4>${meal.strMeal}</h4>
                </div>
                </a>
                </div>
                `
            ).join("");
        }

        // search.value="";
    });
submit.addEventListener("submit",(e)=>{
    e.preventDefault();
    //console.log(search.value);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`)
    .then((res)=>res.json())  //converts res to js object
    .then((data)=>{
        console.log(data);
        resultHeading.innerHTML=`<h2>Search result for: '${search.value}'</h2>`;

        if (data.meals === null) {
            resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        }else{
            mealsEl.innerHTML=data.meals.map(meal => `
                <div class="meal">
                
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
               
                <a href="#single-meal">
                <div class="meal-info" meal-ID="${meal.idMeal}">
                    <h4>${meal.strMeal}</h4>
                </div>
                </a>
                </div>
                `
            ).join("");
        }

        search.value="";
    });
});    

random.addEventListener("click",(e)=>{

    resultHeading.innerHTML="";
    mealsEl.innerHTML="";
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res)=>res.json())  //converts res to js object
    .then((data)=>{
        const meal =data.meals[0];
        addMealToDOM(meal);
    
    });
});
mealsEl.addEventListener("click",(e)=>{
 // console.log(e.path[0].classList.contains("meal-info"));
 //console.log(e.path[0].getAttribute("meal-ID"));
 if(e.path[0].classList){
    
     mealId=e.path[0].getAttribute("meal-ID");

     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res)=>res.json())  //converts res to js object
    .then((data)=>{
        //console.log(data);
        const meal =data.meals[0];
        addMealToDOM(meal);
        console.log(meal);
    });
 }
});

function addMealToDOM(meal){
    const ingredients=[];
    for(let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
            
        }
        else{
            break;
        }
    }
    single_mealEl.innerHTML = `
    <div class="single-meal">
       
       <h1 style="font-family: 'Mea Culpa', cursive;font-weight:bold;font-size:5rem">${meal.strMeal}</h1>
       <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
       <h2>Category</h2>
       <div class="single-meal-info">
         ${meal.strCategory ? `<p>${meal.strCategory}` : ""}
        
       </div>
       <div class="main">
       <h2>Recipe Instructions</h2>
       <p>${meal.strInstructions}</p>
       <h2>Ingredients</h2>
       <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
          
       </ul>
       </div>
    </div>
    `
}

// javascript for chatbot
const btn = document.querySelector(".bot-button");
var f = 0;
btn.addEventListener("click", function(){
  if(f==0){
    document.querySelector("#if").classList.remove("ifr");
    document.querySelector("#if").classList.add("ifr2");
    f=1;
  }
  else{
    document.querySelector("#if").classList.remove("ifr2");
    document.querySelector("#if").classList.add("ifr");
    f=0;
  }
});
