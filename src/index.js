import dotenv from 'dotenv'
import {getCurrent, getRecipes} from './recipes';
import {sendMessage} from './slack';
import {getCurrentWeek} from './date';
import * as weather from './weather';
import * as random from './randomizer';

dotenv.config();

exports.handler = (event, context, callback) => {
    console.log('Received event:', event.clickType);

    if (event.clickType == 'DOUBLE') {
        console.log("Double click pressed, preparing to request weather....");
        weather.current('germany', 'berlin').then(dayForecast => {
            console.log("Weather retrieved");
            let msg = 'The weather for today: ' + dayForecast.fcttext_metric;
            sendMessage(msg);
        }).catch(console.log);
    } else if (event.clickType == 'LONG') {
        console.log("Long click pressed, preparing to request recipes....");
        getCurrent().then(response => {
            console.log("Recipes retrieved");
            const recipes = response.data.items;
            let msg = "*Here is this week " + getCurrentWeek() + " recipes* \n";

            for (let i = 0; i < recipes.length; i++) {
                const recipe = recipes[i];
                msg += '<https://hellofresh.com' + recipe.websiteUrl + '|' + recipe.name + '> \n';
            }

            sendMessage(msg);
        }).catch(console.log);
    } else {
        console.log("Single click pressed, showing a random message....");
        sendMessage(random.message());
    }
};


