import { BrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';

function App() {
  console.log('App rendering'); // Debug log
  
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
