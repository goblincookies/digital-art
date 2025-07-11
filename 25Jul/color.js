class Coloring {

    CSV;
    
    constructor(){
        console.log( 'now youre cookin with color!' );
        this.CSV = loadCSV()
        console.log( 'testcolor!', this.JSON.palette );
    };

    load(){

        fetch('./palette.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log( data );
            return data;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    }

};