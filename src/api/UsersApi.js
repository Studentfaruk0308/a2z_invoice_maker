import Config from '../config'

// async function getUsersList(){
//     const response = await fetch(`http://localhost:3000/users`);
//     return response.json();
//     }
    
// export {getUsersList}

export function getUsersList(){
    return (
        fetch(`${Config.baseURL}/users`)
        .then(response => response.json())
        .then(data => data)
    )
}



