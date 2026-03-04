document.addEventListener("DOMContentLoaded", () => {
    // const prefSelect = document.getElementById("prefecture");
    const prefSelect = document.getElementById("prefecture");
    const citySelect = document.getElementById("city");
    const errorDiv = document.getElementById("error");

    prefSelect.addEventListener("change", async function () {
        const prefCode = this.value;
        //初期化
        citySelect.innerHTML = '<option value="">市区町村を選択</option>';
        errorDiv.textContent = "";
        citySelect.disabled = true;
        if (!prefCode || prefCode == "0") return;
        try {
            const cities = await fetchCities(prefCode);

            //cities が配列であることを前提に追加
            cities.forEach(city => {
                const option = document.createElement("option");
                option.value = city.cityCode;
                option.textContent = city.cityName;
                citySelect.appendChild(option);
            });
            citySelect.disabled = false;
        } catch (error) {
            console.error(error);
            errorDiv.textContent = "市区町村の取得に失敗しました";
        }
    })
});
