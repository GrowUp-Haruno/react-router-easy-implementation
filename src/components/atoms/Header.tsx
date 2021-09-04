import { VFC } from "react";
import { Link } from "react-router-dom";

const LinkStyle = { margin: "0 8px" };

export const Header: VFC = () => {
  return (
    <header
      style={{
        backgroundColor: "darkgray"
      }}
    >
      <Link to="/" style={LinkStyle}>
        HOME
      </Link>
      <Link to="/users" style={LinkStyle}>
        USER
      </Link>
    </header>
  );
};
