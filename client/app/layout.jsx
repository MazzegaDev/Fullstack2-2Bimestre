//Importando o layout bootstrap
import "../public/template/css/sb-admin-2.min.css";
import "../public/template/css/fontawesome-free/css/all.min.css";
import "./globals.css";

export const metadata = {
  title: "Locação de imoveis - PFS2",
  description: "Aplicação frontend para a aula de fullstack2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*Deve se importar o JS na tag head */}
        {/*Importanto o JS do layout */}
        <script src="/template/js/jquery.min.js"></script>
        <script src="/template/js/bootstrap.bundle.min.js"></script>
        <script src="/template/js/sb-admin-2.min.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
