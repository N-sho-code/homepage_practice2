async function  fetchCities(prefCode){
    try{
        //address.json が project ルートにあるなら ’./address.json’ を参照
        const response = await fetch('data/address.json');

        if(!response.ok){
            throw new Error("データ取得失敗");
        }
        const data =await response.json();
        return data[prefCode]||[];
    }catch(error){
        console.error(error);
        throw error;
    }
}