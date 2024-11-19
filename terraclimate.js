var countries = ee.FeatureCollection("FAO/GAUL/2015/level0");
var filter = ['Switzerland']
var filtered_country = countries.filter(ee.Filter.inList('ADM0_NAME', filter));

var dataset = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE");

// change variable name and text in select for a different parameter
var annualMaxTemperature = dataset.first().select('tmmx').multiply(0.1).clip(filtered_country);

// link to other 'bands' : https://developers.google.com/earth-engine/datasets/catalog/IDAHO_EPSCOR_TERRACLIMATE#bands

// visualization
var visParams = {
    min: -100,
    max: 100,
    palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
Map.setCenter(7.7, 46.78, 8);
// name of layer, visParams only matter on the google earth engine map
Map.addLayer(annualMaxTemperature, visParams, 'Annual Max Temperature');

// Export the image.
Export.image.toDrive({
    image: annualMaxTemperature,
    // give the file a good name
    description: 'annual_max_temperature_switzerland',
    scale: 1000,
    maxPixels: 1000000000,
    folder: 'terraclimate'
});