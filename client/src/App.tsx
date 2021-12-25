import React, { useEffect, useState } from 'react';
import { getExample } from './services/example';

function App() {
  const [state, setState] = useState<{ example: string }>();

  useEffect(() => {
    getExample().then((response) => setState(response));
  }, []);

  return <div className="App">{state?.example}</div>;
}

export default App;
