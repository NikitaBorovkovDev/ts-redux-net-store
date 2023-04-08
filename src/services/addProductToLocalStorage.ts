export default function addProductToLocalStorage(
    key: string,
    productId: string | number,
    productProps: {[key: string]: string | number}
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
            newLocalStorageData.push({id: productId, ...productProps});
        }
    } else {
        newLocalStorageData = [
            {
                id: productId,
                ...productProps,
            },
        ];
    }

    localStorage.setItem(key, JSON.stringify(newLocalStorageData));
}
