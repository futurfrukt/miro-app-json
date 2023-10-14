import * as React from 'react';
import {createRoot} from 'react-dom/client';

import {Selection} from './components';

const App: React.FC = () => {
  return (
    <div className="grid wrapper plugin">
      <Selection/>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<React.StrictMode>
  <App/>
</React.StrictMode>);
