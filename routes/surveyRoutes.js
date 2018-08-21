import requireLogin from '../middlewares/requireLogin';
import requireCredits from '../middlewares/requireCredits';

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        
    });
};