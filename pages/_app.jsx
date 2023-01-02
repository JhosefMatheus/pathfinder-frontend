import '../styles/globals.css';
import "nprogress/nprogress.css";
import UserProvider from '../providers/UserProvider';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
