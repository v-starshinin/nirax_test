import { useState } from 'react';
import './App.css';
import AlertSnackbar from './components/AlertSnackbar';
import SearchComponent from './components/SearchComponent';

function App() {
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertCode, setAlertCode] = useState<number>(500);
    const [alertMessage, setAlertMessage] = useState<string>('');

  const handleError = (message: string, status: number) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  return (
    <div className="App">
      <AlertSnackbar open={alertOpen} message={alertMessage} code={alertCode} onClose={handleCloseAlert} />
      <SearchComponent onError={handleError}></SearchComponent>
    </div>
  );
}

export default App;
