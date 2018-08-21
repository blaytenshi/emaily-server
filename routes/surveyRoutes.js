import requireLogin from '../middlewares/requireLogin';

module.exports = app => {
    app.post('/api/surveys', requireLogin, (req, res) => {
        
    });
};