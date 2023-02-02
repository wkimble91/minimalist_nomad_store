import Layout from '../components/Layout';
import { AppWrapper } from '../context/CartContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppWrapper>
    );
}
