import { NavLink } from "react-router-dom";
import Logo from "../Components/Logo";
import styles from "./PageNav.module.css";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/login"}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
// as Link is fine but NavLink addes the active class to the page in which we are currently in
// so changing the Link with NavLink
// so we can style it using css
