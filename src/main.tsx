
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set initial RTL direction (will be managed by LanguageContext after mount)
document.documentElement.dir = 'rtl'; 
document.documentElement.lang = 'ar';

createRoot(document.getElementById("root")!).render(<App />);
