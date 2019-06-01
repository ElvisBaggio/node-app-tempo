const request = require('request')

const geocode = (address, callback) => {
    const access_token = 'pk.eyJ1IjoiZWx2aXNiYWdnaW8iLCJhIjoiY2pjajRkdzVnMzdvODJxdWprNGR5cXN4ciJ9.PuCuKQv8inryk614QrwwJA'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token='+access_token    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Não foi possivel se comunicar com o serviço', undefined)
        } else if (body.features.length === 0) {
            callback('Endereço inválido', undefined)
        } else {        
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name                
            })
        }        
    })
}

module.exports = geocode