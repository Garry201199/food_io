export const fetchLocalStorageData =()=>{
    const userInfo = localStorage.getItem('user') !== 'undefined' ?
    JSON.parse(localStorage.getItem('user')) : localStorage.clear()

    return userInfo
}