// Rendering layer control (React Router)
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends React.Component {

    // componentDidMount looks like it might be the place to do async requests in the future
    // replacing componentWillMount... WillMount might be called multiple times. Design changes to
    // React.
    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header // will now show at all times
                        />
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/surveys" component={Dashboard}/>
                        <Route path="/surveys/new" component={SurveyNew}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;