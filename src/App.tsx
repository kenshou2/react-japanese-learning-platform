import { Outlet } from 'react-router';

import Header from './shared/Header.tsx';
import Footer from './shared/Footer.tsx';
import { useScrollToTop } from './hooks/useScrollToTop.ts';
import { ActiveUserProvider } from './context/ActiveUserContext.tsx';
import { NotificationProvider } from './context/NotificationContext.tsx';

import './styles/global.css';

function App() {  
  useScrollToTop();

  return (
    <>
      <ActiveUserProvider>
        <Header />
        <main>
          <NotificationProvider>
            <Outlet />
          </NotificationProvider>
        </main>
        <Footer />
      </ActiveUserProvider>
    </>
  )
}

export default App