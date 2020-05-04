/* Global Variables */
const key = "&appid=bed4512ccd969e3f2e58ac04ab1507f6";

const country = ",in";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document
  .getElementById("generate")
  .addEventListener("click", generatesWeatherDetails);

function generatesWeatherDetails(e){
  e.preventDefault();
  const zip = document.getElementById("zip").value;
  const userFeeling =document.getElementById("feelings").value;
  if (zip==='' && userFeeling===''){
    alert('Invalid Input data');
  }else{
    getWeatherDetails(baseUrl, zip, country, key).then(function (userData) {
      // add data to POST request
      postData("/addData", { date: newDate, temp: userData.main.temp,content:userFeeling });
    }).then(function (newData) {
      // call getWeather function to update browser content
     getWeatherUpdate();
      
    })
  }
  
  // reset form
  formReset();
};



/* Function to GET Web API Data*/
const getWeatherDetails = async (baseUrl, zip, country, key) => {
  // res equals to the result of fetch function
  const res = await fetch(baseUrl + zip + country +key);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};

function formReset(){
  document.getElementById('zip').value='';
  document.getElementById('feelings').value='';
}

const getWeatherUpdate= async () => {
  const fetchRequest = await fetch('/allData');
  try {
    const allData = await fetchRequest.json();
    
    // update new entry values
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML =`Today's Temperature 🌡🌡 ${allData.temp - 273.15}°C` ;
    document.getElementById('content').innerHTML = allData.content;
    console.log(allData);
  }
  catch (error) {
    console.log("error", error);
  }
};

