// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://tinacollier:rundoggy@cluster0.4au8woi.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// let db;
// client.connect(err => {
//   db = client.db("tieredbadbank-ouoov");
//   // perform actions on the collection object
//   client.close();
// });

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// "mongodb+srv://tinacollier:B1RsnSpltJaEP9mo@badbankinstance.wpy6j.mongodb.net/?retryWrites=true&w=majority"
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tinacollier:B1RsnSpltJaEP9mo@badbankinstance.wpy6j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  client.db("tieredbadbank").collection("Users").find( {} ).toArray( ( err, result ) => {
    if ( err ) {
      console.log('err', err );
    } else {
      console.log('result', result );
    }
  } );
});

let db;
// const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
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


// function create( name, email, password ) {
//     return new Promise ( ( resolve, reject ) => {
//         const doc = {name, email, password, balance: 0};
//         db.collection( 'Users' ).insertOne( doc, { w:1 }, ( err, result ) => {
//             if ( err ) {
//                 console.warn( 'there was an error', err );
//                 reject( err );
//             } else {
//                 console.log( 'no errors, doc appears to have been inserted', doc );
//                 resolve( result );
//             }
//         } );
//     } );
// }

// function create( name, email, password ) {
//     console.log( 'processing request to create account ' + name + ' ' + email + ' ' + password );
//     return new Promise(( resolve, reject ) => {
//         mongoConnect();
//         const collection = db.collection( 'Users' );
//         const doc = {name, email, password, balance: 0};
//         collection.insertOne( doc, { w:1 }, ( err, result ) => {
//             if ( err ) {
//                 console.warn( 'there was an error ', err );
//             } else {
//                 console.log( 'successfully created an account', doc );
//             }

//             err ? reject( err ) : resolve( doc );
//         });
//     });
// };

async function create( name, email, password ){
    const client = new MongoClient( 'mongodb+srv://tinacollier:B1RsnSpltJaEP9mo@badbankinstance.wpy6j.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    await client.connect( async err => {
        if ( err ) {
            console.warn( 'there was an error connecting', err );
        } else {
            const collection = client.db( 'tieredbadbank' ).collection( 'Users' );
            const results = await users.insertOne( doc, { w: 1 } );
            
            client.close();

        }
    } );
}

// async function create( name, email, password ){
//     const doc = { name, email, password, balance: 0 };
//     await mongoConnect();
//     try {
//         const users = db.collection( 'Users' );
//         const results = await users.insertOne( doc, { w:1 } )
//         console.log( 'SUCCESS!!!!!', results );
//         // console.log('users', db.collection( 'Users' ) );
//     } catch ( err ) {
//         console.warn( 'there was an error creating a user', err )
//     }
//     await client.close();
// }

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
function findOne( email ){
    return new Promise(( resolve, reject ) => {    
        const customers = db
            .collection( 'Users' )
            .findOne({ email: email })
            .then(( doc ) => resolve( doc ))
            .catch(( err ) => reject( err ));    
    })
}

// update - deposit/withdraw amount
function update( email, amount ){
    return new Promise(( resolve, reject ) => {    
        const customers = db
            .collection( 'Users' )            
            .findOneAndUpdate(
                { email: email },
                { $set: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject( err ) : resolve( documents );
                }
            );            


    });    
}

// all users
function all(){
    return new Promise(( resolve, reject ) => {
        
        try {
            resolve( db.collection( 'Users' ).find( {} ).toArray() );
        } catch ( err ) {
            reject( err );
        }
    } );
}

function remove( email ){
    return new Promise(( resolve, reject ) => {
        try {
            resolve(db.collection( 'Users' ).deleteMany({ email: email }))
        } catch ( err ) {
            reject( err );
        }
    })
}

module.exports = { create, findOne, find, findById, update, all, remove, mongoConnect };