const setToken = (token = null) => {
    if(token){
        localStorage.setItem('Token', token)
    }
    else{
        localStorage.clear();
    }
}
export default setToken;