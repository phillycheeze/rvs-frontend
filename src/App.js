import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from './components/ui/provider';
import Admin from './components/Admin';
import Home from './components/Home';
import Registration2 from './components/Registration2';
import Registration3 from './components/Registration3';
import UserTable from './components/UserTable';
import UserRegistrationForm from './components/UserRegistration';
import Layout from './components/Layout';

function App(Component, pageProps) {
  return (
    <Provider>
      <Router>
        <Layout></Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/data" element={<UserTable />} />
          <Route path="/registration" element={<UserRegistrationForm />} />
          <Route path="/registration/2" element={<Registration2 />} />
          <Route path="/registration/3" element={<Registration3 />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
