import { useState } from 'react';
import './App.css';
import './glass.css';
import { Button } from './components/Button';
import { useApplication } from './hooks/useApplication';
import { Wizard } from './components/Wizard';

function App() {
  const { config, update, reset } = useApplication();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <header></header>
      <main>
        <p>
          <Button className="glass" onClick={() => setOpen(true)}>
            {config.status == 'not-started'
              ? `Start Application`
              : config.status === 'in-progress'
                ? `Continue Application`
                : `View Application`}
          </Button>
        </p>
        <Wizard
          open={open}
          onClose={() => setOpen(false)}
          config={config}
          update={update}
          reset={reset}
        ></Wizard>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
