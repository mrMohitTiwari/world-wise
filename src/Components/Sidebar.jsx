import Styles from "../Components/Sidebar.module.css";
import AppNav from "./AppNav";
import Logo from "./Logo";
function Sidebar() {
  return (
    <div className={Styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of Cities</p>
      <footer className={Styles.footer}>
        <p className={Styles.copyright}>
          &copy; Copyright {new Date().getFullYear()}
          by WorldWide Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
