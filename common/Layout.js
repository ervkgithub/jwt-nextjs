import Header from "./header";
import Footer from "./footer";

const Layout = (props) => {
  const { children, footerstatus } = props;
  return (
    <>
      {true ? (
        <>
        <Header />
        <div className="container">
          {children}
        </div>
        {!footerstatus && <Footer />}
        </>
      ) : (
        <>
        <Header />
        <div className="container">
          {children}
        </div>
        {!footerstatus && <Footer />}
        </>
      )}
    </>
  );
};

export default Layout;
