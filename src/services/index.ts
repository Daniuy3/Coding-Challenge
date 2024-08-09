import axios from 'axios';

export async function getBanks() {
    
    
    try {
        const  url = "https://dev.obtenmas.com/catom/api/challenge/banks/get"
        const response = await axios(url)
        console.log(response)
        return response;
        
    } catch (error) {
        console.error(error);
        return error;
    }
}