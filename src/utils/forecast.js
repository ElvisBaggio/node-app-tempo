const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const access_token = 'c6141d7c5b8a24dd768d25edf35bde82'
    const url = 'https://api.darksky.net/forecast/'+ access_token +'/'+ latitude+',' +longitude+ '?lang=pt&units=si'    

    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback(body.error, undefined)
        } else if (body.error) {
            callback('Endereço inválido', undefined)
        } else {        
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                humidity: body.currently.humidity,
                pressure: body.currently.pressure,
                windSpeed:  body.currently.windSpeed,
                msg: body.daily.data[0].summary+ ' A temperatura atual é ' + body.currently.temperature +" . A possibilidade de chuva é de "
                + body.currently.precipProbability + '%'
            })
        }        
    })
}

module.exports = forecast