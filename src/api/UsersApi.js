async function getUsersList(){
    const response = await fetch('http://localhost:3000/users');
    return response.json();
    }
    
export {getUsersList}

// export function getUsersList(){
//     return (
//         fetch('http://localhost:3000/users')
//         .then(response => response.json())
//         .then(data => console.log(data))
//     )
// }