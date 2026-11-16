import { useState, type ComponentType } from 'react';
import Login from './components/Login';
import Register from './components/Register';

const LoginWithRegisterSwitch = Login as ComponentType<{
  onSwitchToRegister: () => void;
}>;

const RegisterWithLoginSwitch = Register as ComponentType<{
  onSwitchToLogin: () => void;
}>;

export function App() {
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');

  return (
    <div>
      {currentView === 'login' ? (
        <LoginWithRegisterSwitch onSwitchToRegister={() => setCurrentView('register')} />
      ) : (
        <RegisterWithLoginSwitch onSwitchToLogin={() => setCurrentView('login')} />
      )}
    </div>
  );
}

export default App;
