const searchArray = (nameVal, array) =>{
    for (var i = 0; i < array.length; i++){
        if(array[i].wallet_id === nameVal){
            return array[i];
        }
    }
}

module.exports = searchArray;