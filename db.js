module.exports = {
    getModais() {
        let modais = [
            {id: 1,nome: 'Metrô'},
            {id: 2,nome: 'BRT'},
            {id: 3,nome: 'VLT'},
            {id: 4,nome: 'Trem'},
            {id: 5,nome: 'Ônibus'}
        ]; 
        return JSON.stringify(modais); 
    }
};