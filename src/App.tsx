import Alert from 'layout/Alert';
import Dashboard from 'layout/Dashboard';
import Home from 'layout/Home';
import { ControlProvider } from 'provider/ControlProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ControlProvider>
        <Alert />
        <Dashboard />
        <Home />
      </ControlProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
