import { GuestsProvider } from './context/GuestsContext';
import Layout from './pages/Layout';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <GuestsProvider>
        <Layout />
      </GuestsProvider>
    </>
  );
}

export default App;
