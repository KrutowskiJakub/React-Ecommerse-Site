const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
});