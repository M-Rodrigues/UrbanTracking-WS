module.exports = {
    states: [
        {id:1, cod_rastreador: 531829, lat: -22.9371670004413, lng: -43.1785575093104, ultima_atualizacao: 1540426111106, idmodal: 1},
        {id:1, cod_rastreador: 531829, lat: -22.9393691201638, lng: -43.1790421523969, ultima_atualizacao: 1540426113106, idmodal: 1},
        {id:1, cod_rastreador: 531829, lat: -22.9412391139108, lng: -43.180929258985, ultima_atualizacao: 1540426115106, idmodal: 1},
        {id:1, cod_rastreador: 531829, lat: -22.9448643766835, lng: -43.183867140996, ultima_atualizacao: 1540426117106, idmodal: 1},
        {id:1, cod_rastreador: 531829, lat: -22.947374725384, lng: -43.1841673624987, ultima_atualizacao: 1540426119106, idmodal: 1},
        {id:1, cod_rastreador: 531829, lat: -22.9511378318007, lng: -43.1841662500492, ultima_atualizacao: 1540426121107, idmodal: 1}
    ],
    start(nextStage, i) {
        nextStage.updateComposicao(this.states[i])
        .then((data) => {
            // console.log(data);
            setTimeout(() => {
                i = (i+1)%6;
                this.start(nextStage,i);
            },6000);
        })
    }
}

