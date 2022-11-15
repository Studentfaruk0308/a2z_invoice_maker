import Config from '../config'

async function getProfile(id){
    const response = await fetch(`${Config.baseURL}/profiles/${id}`);
    return response.json();
  }
  export {getProfile}
  

async function createProfile(profileData){
    const response = await fetch(`${Config.baseURL}/profiles`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(profileData)
    })
    return response.json()
}

export {createProfile}

async function updateProfile(id, profileData){
    return fetch(`${Config.baseURL}/profiles/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(profileData)
    })
  }
  export {updateProfile}
