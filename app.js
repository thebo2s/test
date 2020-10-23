const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
let frenchMovies = [];

app.use('/publics',express.static('publics'))
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
                            // Les Routes

// Création des routes
app.get('/movies',(req,res)=>{
    //res.send("À venir")
    const title = "Films français des trentes dernières années"
    frenchMovies =  [
        {
            title: `Le fabuleux destin d'Amelie Poulain`,
            year: 2001
        },
        {
            title: `Buffet froid`,
            year: 1972
        },
        {
            title: `Le dîner de cons`,
            year: 1997
        },
        {
            title: `De rouille et D'os`,
            year: 2012
        }
    ];
    res.render('movies', {movies : frenchMovies, title:title});
})

// racine de mon api
app.get('/', (req,res)=>{
    //res.send('Hello Word the boss');
    res.render('index');
});

// route pour la fonction ajouter de mon api rest
app.get('/movies/add',(req,res)=>{
    res.send(`Fourmulaire d'ajout ici prochainement`)
});

// routes avec paramètres
app.get('/movies/:id', (req, res)=>{
    const id = req.params.id;
    //res.send(`Le numéro du film est ${id}`);
   /// const title = req.params.title;
    let data ={
        movieId: id,
        //movieTitle: title
    }
    res.render('movie-details',{
        movieId: id
       // movieTitle: title
    });

});
                // Route pour récupérer les informations d'un formulaire
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/movies',urlencodedParser, (req,res)=>{
    console.log(req.body.movieTitle);
    console.log(req.body.movieYear);
    //res.sendStatus(201);
    const newMovie = {title: req.body.movieTitle, year: req.body.movieYear};
    frenchMovies = [...frenchMovies,newMovie];

    //frenchMovies.push(newMovie);
    console.log(frenchMovies);
})
// route pour movies-details
// app.get('/movie-details',(req,res)=>{
//     //res.send('ce sont les détails que tu veux voir?')
//     res.render('movie-details');
// })

// Écoutes du serveur
app.listen(port, ()=>{
    console.log(`listnong on port ${port}`);
});