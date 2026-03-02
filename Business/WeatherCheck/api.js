async function  fetchCities(prefCode){
    try{
        const response = await fetch('data/address.json');
    }catch(error){
        console.error(error);
    }
}