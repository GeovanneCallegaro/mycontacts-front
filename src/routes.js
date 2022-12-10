import { Switch, Route } from 'react-router-dom';
import EditContact from './pages/EditContact';
import HomePage from './pages/Home';
import NewContact from './pages/NewContact';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
  );
}
