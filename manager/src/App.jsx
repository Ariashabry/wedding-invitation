import { GuestsProvider } from './context/GuestsContext';
import Layout from './pages/Layout';
import './App.css';

function App() {
  return (
    <GuestsProvider>
      <Layout />
    </GuestsProvider>
  );
}

export default App;
