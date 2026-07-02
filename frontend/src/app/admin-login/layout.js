 import { ToastContainer } from 'react-toastify';
 import "../globals.css";
export default function RootLayout({ children }) {
 
  return (
    <html
      lang="en"
    
    >
      <body className="min-h-full flex flex-col">
        <div className="flex">
         <ToastContainer
          position="top-center"
          autoClose={1200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
         
            {children}
         
        </div>
      </body>
    </html>
  );
}

