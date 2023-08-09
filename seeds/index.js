const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64ba39e632f6172a9c4b8030',
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem similique suscipit minus necessitatibus voluptatem illo fugiat excepturi earum labore obcaecati praesentium facere exercitationem, error ut laboriosam at reiciendis assumenda deserunt.',
            price,
            geometry:
            {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxddi8buf/image/upload/v1690297904/YelpCamp/pwvd0fmmpqb4vt0q6ld8.jpg',
                    filename: 'YelpCamp/pwvd0fmmpqb4vt0q6ld8'
                },
                {
                    url: 'https://res.cloudinary.com/dxddi8buf/image/upload/v1690297905/YelpCamp/t47mjvfhunmu5yvmv2u5.jpg',
                    filename: 'YelpCamp/t47mjvfhunmu5yvmv2u5'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
