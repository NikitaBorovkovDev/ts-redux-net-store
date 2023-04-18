export default function addProductToLocalStorage(
    key: string,
    productId: string | number,
    selectedProductParams?: {[key: string]: string | number}
) {
    let localStorageData = localStorage.getItem(key);
    let newLocalStorageData: any = [];

    if (localStorageData) {
        newLocalStorageData = JSON.parse(localStorageData);

        let thisProductInLocalStorageData = newLocalStorageData.find(
            (obj: any) => obj.hasOwnProperty("id") && obj.id === productId
        );

        if (thisProductInLocalStorageData) {
            newLocalStorageData = newLocalStorageData.filter(
                (item: any) => item.id !== thisProductInLocalStorageData.id
            );
        } else {
            newLocalStorageData.push({id: productId, selectedProductParams});
        }
    } else {
        newLocalStorageData = [
            {
                id: productId,
                selectedProductParams,
            },
        ];
    }

    localStorage.setItem(key, JSON.stringify(newLocalStorageData));
}
