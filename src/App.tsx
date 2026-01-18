import './App.css';
import Providers from './providers/providers.js';
import { MainRoutes } from './routes/routes.js';

export function AppContent() {
  // if (loading || isSigningOut) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
  //       <div className="text-center">
  //         <IconLoading />
  //       </div>
  //     </div>
  //   );
  // }

  return <MainRoutes />;
}

export default function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}