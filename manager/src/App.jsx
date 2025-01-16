import { GuestsProvider } from './context/GuestsContext';
import Layout from './pages/Layout';

function App() {
  return (
    <GuestsProvider>
      <Layout />
    </GuestsProvider>
  );
}

export default App;
