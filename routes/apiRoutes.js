// LOAD DATA
const fs = require("fs");

// Using 'uuid' npm for unique id
const { v4: uuidv4 } = require('uuid');

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => {
    console.log("Getting notes");

        // Read 'db.json' file 
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        
        console.log("Returning notes data: " + JSON.stringify(data));
        
        // Send read data to response of 'GET' request
        res.json(data);
    });

  app.post('/api/notes', (req, res) => {
            
       const newNote = req.body;
        
       console.log("Post new note : " + JSON.stringify(newNote));

       // Assigned unique id obtained from 'uuid' package
       newNote.id = uuidv4();

       // Read data from 'db.json' file
       let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
   
       // Pushed new note in notes file 'db.json'
       data.push(newNote);

       // Written notes data to 'db.json' file
       fs.writeFileSync('./db/db.json', JSON.stringify(data));
       
       console.log("Successfully added new note to 'db.json' file!");

       // Send response
       res.json(data);


  });

      // API DELETE request
      app.delete("/api/notes/:id", (req, res) => {

      // Fetched id to delete
        let noteId = req.params.id.toString();
          
        console.log(`DELETE note request for noteId: ${noteId}`);
  
      // Read data from 'db.json' file
       let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  
      // filter data to get notes except the one to delete
        const newData = data.filter( note => noteId.toString() !== noteId );
  
      // Write new data to 'db.json' file
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
          
        console.log(`Successfully deleted note with id : ${noteId}`);
  
       // Send response
        res.json(newData);
      });


  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    data.length = 0;
  
    res.json({ ok: true });
  });
};