const axios = require('axios');
const router = require('express').Router();

const kick = require('./kick-helpers.js')

// Grabs all Kickstarters for a particular User 

router.get('/visualizations', (req, res) => {
    const objectThing = {
        user_id: 1,
        campaignName: "Test_Of_New_End_Point",
        monetaryGoal: 100000,
        description: "Put the decription here and bla bla bla.",
        duration: 30,
        categories: 96,
        country: 0
    }
    axios.post('https://kickstarter-success.herokuapp.com/visualizations', objectThing)
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            res.status(401).json(err)
        })

});

// Adds a kickstarter to the user id passed
router.post('/user/:id', async function (req, res) {

    let kickstarter = req.body;

    const cStrings1 = ["Space Exploration", "Wearables", "Hardware", "Software", "Web", "Sound", "Children's Books", "Calendars", "Art Books", "Fiction", "Nature", "People", "Letterpress", "Literary Journals", "Nonfiction", "Footwear", "Jewelry", "Pet Fashion", "Ready-to-wear", "Apparel", "Animation", "Comedy", "Documentary", "Action", "Textiles", "Sculpture", "Public Art", "Performance Art", "Crafts", "DIY", "Woodworking", "Knitting", "Candles", "Quilts", "Glass", "Embroidery", "Crochet", "Pottery", "Product Design", "Graphic Design", "Design", "Typography", "Interactive Design", "Civic Design", "Architecture", "Shorts", "Narrative Film", "Film & Video", "Webseries", "Thrillers", "Family", "Experimental", "Science Fiction", "Fantasy", "Music Videos", "Horror", "Movie Theaters", "Drama", "Romance", "Television", "Festivals", "Food", "Small Batch", "Farmer's Markets", "Restaurants", "Farms", "Drinks", "Events", "Food Trucks", "Cookbooks", "Vegan", "Spaces", "Community Gardens", "Bacon", "Fashion", "Accessories", "Couture", "Childrenswear", "Places", "Digital Art", "Flight", "Graphic Novels", "Dance", "R&B", "Performances", "Gaming Hardware", "Mobile Games", "Gadgets", "Young Adult", "Illustration", "Translations", "Zines", "Weaving", "Ceramics", "Radio & Podcasts", "Immersive", "Technology", "Blues", "DIY Electronics", "Jazz", "Electronic Music", "Apps", "Camera Equipment", "Robots", "3D Printing", "Workshops", "Poetry", "Photobooks", "Photography", "World Music", "Mixed Media", "Residencies", "Fine Art", "Classical Music", "Printing", "Webcomics", "Animals", "Publishing", "Kids", "Academic", "Periodicals", "Anthologies", "Indie Rock", "Comic Books", "Games", "Tabletop Games", "Installations", "Conceptual Art", "Playing Cards", "Puzzles", "Metal", "Video Games", "Photo", "Pop", "Rock", "Country & Folk", "Print", "Video", "Latin", "Faith", "Art", "Painting", "Video Art", "Makerspaces", "Hip-Hop", "Music", "Stationery", "Punk", "Fabrication Tools", "Chiptune", "Musical", "Theater", "Comics", "Plays", "Journalism", "Audio", "Literary Spaces", "Live Games", "Taxidermy"]

    const cStrings2 = ["United States", "Great Britain", "Australia", "Spain", "France", "Canada", "Germany", "Italy", "Netherlands", "Switzerland", "Denmark", "Norway", "Ireland", "Sweden", "Belgium", "Austria", "New Zealand", "Luxembourg", "Singapore", "Mexico", "Hong Kong", "Japan"]

    let temp1 = cStrings1.indexOf(kickstarter.country)
    let temp2 = cStrings2.indexOf(kickstarter.categories)

    kickstarter.country = temp1
    kickstarter.categories = temp2
    // kickstarter.country = numToStringCountry(kickstarter)
    // kickstarter.categories = numToStringCategories(kickstarter)

    let { campaignName, monetaryGoal, description, duration, categories, country } = kickstarter;
    // Function that translates country into a number value {country}
    // Function that translates categories into a number value {categories}

    let package = { campaignName, monetaryGoal, description, duration, categories, country }
    console.log(package)

    let balls = await axios.post('https://kickstarter-success.herokuapp.com', package)
    let response = balls.data
    // Sends only the required info to DS

    // WRITE THE FUNCTION, WRITE THE ENDPOINT THAT GIVES THE URL, BUG DS FOR A FINISHED ENDPOINT
    kickstarter.prediction_results = response.prediction_results;
    kickstarter.results = response.results;
    kickstarter.raising_more_success = response.custom_stats.raising_more_success;
    kickstarter.category_success = response.custom_stats.category_success;
    kickstarter.category_average = response.custom_stats.category_average;
    kickstarter.average_duration = response.custom_stats.average_duration;
    kickstarter.average_backers = response.custom_stats.average_backers;
    kickstarter.average_over = response.custom_stats.average_over;

    // Adds all custom DS data onto my kickstarter table
    kick.add(kickstarter) // Saves all the info into the Table to be recalled later
        .then(saved => {
            try {
                saved.country = numToStringCountry(kickstarter)
                saved.categories = numToStringCategories(kickstarter)
                res.status(201).json(saved)
            }
            catch (err) {
                console.log(err)
                res.status(500).json({ message: 'It broke' })
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })

})

// Updates a kickstarter
router.put('/:id', (req, res) => {
    let { id } = req.params;
    let updatedKick = req.body;

    updatedKick.country = numToStringCountry(updatedKick)
    updatedKick.categories = numToStringCategories(updatedKick)

    // Add some checks, make sure they can't change the user_id
    kick.update(id, updatedKick)
        .then(updated => {
            updated.country = numToStringCountry(updated)
            updated.categories = numToStringCategories(updated)
            res.status(201).json(updated)
        })
        .catch(error => {
            res.status(400).json(error)
        })
});

// Deletes a kickstarter
router.delete('/:id', (req, res) => {
    let { id } = req.params;

    kick.remove(id)
        .then(event => {
            if (event) {
                res.status(204).json({ message: `Kickstarter ID:${id} removed` })
            } else {
                res.status(404).json({ message: 'Kickstarter not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The Kickstarter could not be removed.' })
        })
});

router.get('/user/:id', (req, res) => {
    const { id } = req.params;

    kick.getKickByUserId(id)
        .then(kicks => {
            if (kicks.length) {
                let newKicks = kicks.map(element => {
                    element.categories = numToStringCategories(element)
                    element.country = numToStringCountry(element)
                })
                res.status(200).json(newKicks)
            } else {
                res.status(404).json({ message: 'Could not find kickstarters with that ID' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
});


function numToStringCategories(object1) {


    const cStrings = ["Space Exploration", "Wearables", "Hardware", "Software", "Web", "Sound", "Children's Books", "Calendars", "Art Books", "Fiction", "Nature", "People", "Letterpress", "Literary Journals", "Nonfiction", "Footwear", "Jewelry", "Pet Fashion", "Ready-to-wear", "Apparel", "Animation", "Comedy", "Documentary", "Action", "Textiles", "Sculpture", "Public Art", "Performance Art", "Crafts", "DIY", "Woodworking", "Knitting", "Candles", "Quilts", "Glass", "Embroidery", "Crochet", "Pottery", "Product Design", "Graphic Design", "Design", "Typography", "Interactive Design", "Civic Design", "Architecture", "Shorts", "Narrative Film", "Film & Video", "Webseries", "Thrillers", "Family", "Experimental", "Science Fiction", "Fantasy", "Music Videos", "Horror", "Movie Theaters", "Drama", "Romance", "Television", "Festivals", "Food", "Small Batch", "Farmer's Markets", "Restaurants", "Farms", "Drinks", "Events", "Food Trucks", "Cookbooks", "Vegan", "Spaces", "Community Gardens", "Bacon", "Fashion", "Accessories", "Couture", "Childrenswear", "Places", "Digital Art", "Flight", "Graphic Novels", "Dance", "R&B", "Performances", "Gaming Hardware", "Mobile Games", "Gadgets", "Young Adult", "Illustration", "Translations", "Zines", "Weaving", "Ceramics", "Radio & Podcasts", "Immersive", "Technology", "Blues", "DIY Electronics", "Jazz", "Electronic Music", "Apps", "Camera Equipment", "Robots", "3D Printing", "Workshops", "Poetry", "Photobooks", "Photography", "World Music", "Mixed Media", "Residencies", "Fine Art", "Classical Music", "Printing", "Webcomics", "Animals", "Publishing", "Kids", "Academic", "Periodicals", "Anthologies", "Indie Rock", "Comic Books", "Games", "Tabletop Games", "Installations", "Conceptual Art", "Playing Cards", "Puzzles", "Metal", "Video Games", "Photo", "Pop", "Rock", "Country & Folk", "Print", "Video", "Latin", "Faith", "Art", "Painting", "Video Art", "Makerspaces", "Hip-Hop", "Music", "Stationery", "Punk", "Fabrication Tools", "Chiptune", "Musical", "Theater", "Comics", "Plays", "Journalism", "Audio", "Literary Spaces", "Live Games", "Taxidermy"]

    const categories = {
        'Space Exploration': 0, 'Wearables': 1, 'Hardware': 2, 'Software': 3,
        'Web': 4,
        'Sound': 5,
        "Children's Books": 6,
        'Calendars': 7,
        'Art Books': 8,
        'Fiction': 9,
        'Nature': 10,
        'People': 11,
        'Letterpress': 12,
        'Literary Journals': 13,
        'Nonfiction': 14,
        'Footwear': 15,
        'Jewelry': 16,
        'Pet Fashion': 17,
        'Ready-to-wear': 18,
        'Apparel': 19,
        'Animation': 20,
        'Comedy': 21,
        'Documentary': 22,
        'Action': 23,
        'Textiles': 24,
        'Sculpture': 25,
        'Public Art': 26,
        'Performance Art': 27,
        'Crafts': 28,
        'DIY': 29,
        'Woodworking': 30,
        'Knitting': 31,
        'Candles': 32,
        'Quilts': 33,
        'Glass': 34,
        'Embroidery': 35,
        'Crochet': 36,
        'Pottery': 37,
        'Product Design': 38,
        'Graphic Design': 39,
        'Design': 40,
        'Typography': 41,
        'Interactive Design': 42,
        'Civic Design': 43,
        'Architecture': 44,
        'Shorts': 45,
        'Narrative Film': 46,
        'Film & Video': 47,
        'Webseries': 48,
        'Thrillers': 49,
        'Family': 50,
        'Experimental': 51,
        'Science Fiction': 52,
        'Fantasy': 53,
        'Music Videos': 54,
        'Horror': 55,
        'Movie Theaters': 56,
        'Drama': 57,
        'Romance': 58,
        'Television': 59,
        'Festivals': 60,
        'Food': 61,
        'Small Batch': 62,
        "Farmer's Markets": 63,
        'Restaurants': 64,
        'Farms': 65,
        'Drinks': 66,
        'Events': 67,
        'Food Trucks': 68,
        'Cookbooks': 69,
        'Vegan': 70,
        'Spaces': 71,
        'Community Gardens': 72,
        'Bacon': 73,
        'Fashion': 74,
        'Accessories': 75,
        'Couture': 76,
        'Childrenswear': 77,
        'Places': 78,
        'Digital Art': 79,
        'Flight': 80,
        'Graphic Novels': 81,
        'Dance': 82,
        'R&B': 83,
        'Performances': 84,
        'Gaming Hardware': 85,
        'Mobile Games': 86,
        'Gadgets': 87,
        'Young Adult': 88,
        'Illustration': 89,
        'Translations': 90,
        'Zines': 91,
        'Weaving': 92,
        'Ceramics': 93,
        'Radio & Podcasts': 94,
        'Immersive': 95,
        'Technology': 96,
        'Blues': 97,
        'DIY Electronics': 98,
        'Jazz': 99,
        'Electronic Music': 100,
        'Apps': 101,
        'Camera Equipment': 102,
        'Robots': 103,
        '3D Printing': 104,
        'Workshops': 105,
        'Poetry': 106,
        'Photobooks': 107,
        'Photography': 108,
        'World Music': 109,
        'Mixed Media': 110,
        'Residencies': 111,
        'Fine Art': 112,
        'Classical Music': 113,
        'Printing': 114,
        'Webcomics': 115,
        'Animals': 116,
        'Publishing': 117,
        'Kids': 118,
        'Academic': 119,
        'Periodicals': 120,
        'Anthologies': 121,
        'Indie Rock': 122,
        'Comic Books': 123,
        'Games': 124,
        'Tabletop Games': 125,
        'Installations': 126,
        'Conceptual Art': 127,
        'Playing Cards': 128,
        'Puzzles': 129,
        'Metal': 130,
        'Video Games': 131,
        'Photo': 132,
        'Pop': 133,
        'Rock': 134,
        'Country & Folk': 135,
        'Print': 136,
        'Video': 137,
        'Latin': 138,
        'Faith': 139,
        'Art': 140,
        'Painting': 141,
        'Video Art': 142,
        'Makerspaces': 143,
        'Hip-Hop': 144,
        'Music': 145,
        'Stationery': 146,
        'Punk': 147,
        'Fabrication Tools': 148,
        'Chiptune': 149,
        'Musical': 150,
        'Theater': 151,
        'Comics': 152,
        'Plays': 153,
        'Journalism': 154,
        'Audio': 155,
        'Literary Spaces': 156,
        'Live Games': 157,
        'Taxidermy': 158
    }

    let temp = ''

    if (!isNaN(object1.categories)) {
        for (let i = 0; i < 158; i++) {
            if (object1.categories === i) {
                temp = cStrings[i]
            }
        }
    } else {
        for (let i = 0; i < 158; i++) {
            if (object1.categories === cStrings[i]) {
                temp = categories[`${cStrings[i]}`]
            }
        }
    }
    return temp;
}

function numToStringCountry(object1) {
    const cStrings = ["United States", "Great Britain", "Australia", "Spain", "France", "Canada", "Germany", "Italy", "Netherlands", "Switzerland", "Denmark", "Norway", "Ireland", "Sweden", "Belgium", "Austria", "New Zealand", "Luxembourg", "Singapore", "Mexico", "Hong Kong", "Japan"]

    const countries = {
        'United States': 0, 'Great Britain': 1, 'Australia': 2, 'Spain': 3, 'France': 4, 'Canada': 5, 'Germany': 6, 'Italiy': 7, 'Netherlands': 8, 'Switzerland': 9, 'Denmark': 10, 'Norway': 11, 'Ireland': 12, 'Sweden': 13, 'Belgium': 14, 'Austria': 15, 'New Zealand': 16, 'Luxembourg': 17, 'Singapore': 18, 'Mexico': 19, 'Hong Kong': 20, 'Japan': 21
    }
    let temp = ''

    if (!isNaN(object1.country)) {

        for (let i = 0; i < 21; i++) {
            if (object1.country === i) {
                temp = cStrings[i]
            }
        }
    } else {
        for (let i = 0; i < 21; i++) {
            if (object1.country === cStrings[i]) {
                temp = countries[`${cStrings[i]}`]
            }
        }
    }
    return temp;
}

module.exports = router;