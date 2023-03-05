async function getClientsData(){
let apiResponse = await fetch(`./clients.json`);//Async
    data = await  apiResponse.json();
      console.log(data.length);
      displayClientsData(data);
}

document.getElementById("displayData").addEventListener("click",()=>{
    getClientsData();
})
function displayClientsData(data){
    document.getElementById("clientsData").innerHTML=``;                
    for (let i = 0; i < data.length; i++) {
        document.getElementById("clientsData").innerHTML+=`                  
        <tr>
        <td class="border border-dark">${data[i].name}</td>
        <td class="border border-dark">${data[i].mobile}</td>
        <td class="border border-dark">${data[i].email}</td>
        <td class="border border-dark">${data[i].address}</td>
      </tr>`        
    }
}