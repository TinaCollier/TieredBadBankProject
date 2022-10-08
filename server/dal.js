
const uri = process.env.MONGODB_URI;

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://tinacollier:B1RsnSpltJaEP9mo@badbankinstance.wpy6j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  client.db("tieredbadbank").collection("Users").find( {} ).toArray( ( err, result ) => {
    if ( err ) {
      console.log('errrrrr', err );
    } else {
      console.log('resultssss', result );
    }
  } );
});

let db;

async function mongoConnect(){
    try {
        await client.connect().then( async () => {
            console.log( 'connected to mongo server at ' + uri );
            db = await client.db("tieredbadbank");
        });
    } catch (error) {
        console.warn( 'error connecting to mongo server at ' + uri );
        console.warn( 'error: ', error )
    }
}

async function create( name, email, password ){
    const doc = { name, email, password };
    client.connect( async err => {
        const response = await client.db( 'tieredbadbank' ).collection( 'Users' ).insertOne( doc, {w:1} );
        if ( err ) {
            console.warn( 'there was an error connecting', err );
        } else {   
            console.log( 'success adding user doc', doc );
            console.log( 'success adding user response', response );
        }
        //client.close();
    } );
}


function findById( id ) {
    return new Promise(( resolve, reject ) => {    
        const customers = db
            .collection( 'Users' )
            .find({ _id: id })
            .toArray(function( err, docs ) {
                err ? reject( err ) : resolve( docs );
        });    
    })
}


// find user account
function find( email ){
    return new Promise(( resolve, reject ) => {    
        const customers = db
            .collection( 'Users' )
            .find({ email: email })
            .toArray(function( err, docs ) {
                err ? reject( err ) : resolve( docs );
        });    
    })
}

// find user account
// function findOne( email ){
//     return new Promise(( resolve, reject ) => {    
//         const customers = db
//             .collection( 'Users' )
//             .findOne({ email: email })
//             .then(( doc ) => resolve( doc ))
//             .catch(( err ) => reject( err ));    
//     })
// }

async function findOne( email ){
    client.connect( async err => {
        const response = await client.db( 'tieredbadbank' ).collection( 'Users' ).findOne({ email: email });
        if ( err ) {
            console.warn( 'there was an error connecting', err );
        } else {   
            console.log( 'success finding user response', response );
        }
        //client.close();
    } );
}

// update - deposit/withdraw amount
// function update( email, amount ){
//     return new Promise(( resolve, reject ) => {    
//         const customers = db
//             .collection( 'Users' )            
//             .findOneAndUpdate(
//                 { email: email },
//                 { $set: { balance: amount } },
//                 { returnOriginal: false },
//                 function (err, documents) {
//                     err ? reject( err ) : resolve( documents );
//                 }
//             );            


//     });    
// }

async function update( email, amount ){
    client.connect( async err => {
        const response = await client.db( 'tieredbadbank' ).collection( 'Users' ).findOneAndUpdate(
            { email: email },
            { $set: { balance: amount } },
            { returnOriginal: false },
            function (err, documents) {
                err ? reject( err ) : resolve( documents );
            })
        if ( err ) {
            console.warn( 'there was an error connecting', err );
        } else {   
            console.log( 'success updating user doc', doc );
            console.log( 'success updating user response', response );
        }
        //client.close();
    } );
}

// all users
// function all(){
//     return new Promise(( resolve, reject ) => {
        
//         try {
//             resolve( db.collection( 'Users' ).find( {} ).toArray() );
//         } catch ( err ) {
//             reject( err );
//         }
//     } );
// }

async function all(){
    client.connect( async err => {
        const response = await client.db("tieredbadbank").collection("Users").find( {} ).toArray( ( err, result ) => {
            if ( err ) {
            console.log('errrrrr', err );
            } else {
            console.log('resultssss', result );
            }
        } );
        if ( err ) {
            console.warn( 'there was an error connecting', err );
        } else {   
            console.log( 'retrieving all docs');
            console.log( 'success retrieving all docs');
        }
        //client.close();
    } );
}


// function remove( email ){
//     return new Promise(( resolve, reject ) => {
//         try {
//             resolve(db.collection( 'Users' ).deleteMany({ email: email }))
//         } catch ( err ) {
//             reject( err );
//         }
//     })
// }

async function remove( email ){
    client.connect( async err => {
        const response = await client.db("tieredbadbank").collection("Users").find( {} ).deleteMany({ email: email });
        if ( err ) {
            console.warn( 'there was an error connecting', err );
        } else {   
            console.log( 'success removing user doc', doc );
            console.log( 'success removing user response', response );
        }
    } )
}

module.exports = { create, findOne, find, findById, update, all, remove, mongoConnect };