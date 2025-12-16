const app = require('./app');
const connectDB = require('./config/db');
const initSeats = require('./utils/initSeats');


require('dotenv').config(); 
// connectDB();
connectDB().then(() => {
  initSeats(67);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
