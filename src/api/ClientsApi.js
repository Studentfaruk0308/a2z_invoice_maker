import Config from '../config'

export function getClientsList(){
    return (
        fetch(`${Config.baseURL}/clients`)
        .then(response => response.json())
        .then(data => data)
    )
}

async function getClient(id){
    const response = await fetch(`${Config.baseURL}/clients/${id}`);
    return response.json();
  }
    
  export {getClient}
  
  async function createClient(clientData){
      const response = await fetch(`${Config.baseURL}/clients`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(clientData)
      })
      return response.json()
  }
  
  export {createClient}