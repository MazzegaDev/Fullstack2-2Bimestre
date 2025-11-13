import '../public/template/css/sb-admin-2.min.css';
import '../public/template/css/fontawesome-free/css/all.min.css'
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/userContext';

const nunito = Nunito({subsets: ['latin']})

export const metadata = {
  title: "Locação de Imóveis - PFS2",
  description: "Aplicação frontend para a aula de PFS2",
};

export default function RootLayout({ children }) {
  return (
      //Prove o contexto
      <UserProvider>
          <html lang="en">
              <head>
                  <script src="/template/js/jquery.min.js"></script>
                  <script src="/template/js/bootstrap.bundle.min.js"></script>
                  <script src="/template/js/sb-admin-2.min.js"></script>
              </head>
              <body className={nunito.className}>
                  <Toaster />
                  {children}
              </body>
          </html>
      </UserProvider>
  );
}
