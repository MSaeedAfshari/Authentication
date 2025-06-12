import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faSignOut,
  faSolarPanel,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

function Index() {
  const { status } = useSession();

  const logOut = (event) => {
    event.preventDefault();
    signOut();
    alert("Signed out successfully");
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h3 className="sidebar-title">Sidebar</h3>

        <ul className="sidebar-links">
          <>
            {status === "authenticated" ? (
              <>
                <li>
                  <Link href="/dashboard">
                    <span>
                      <FontAwesomeIcon icon={faBars} />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={logOut}>
                    <span>
                      <FontAwesomeIcon icon={faSignOut} />
                    </span>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signin">
                    <span>
                      <FontAwesomeIcon icon={faSignIn} />
                    </span>
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <span>
                      <FontAwesomeIcon icon={faSignIn} />
                    </span>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </>
          { status === "authenticated" ? (
            <>
              <li>
                <Link href="/p-admin">
                  <span>
                    <FontAwesomeIcon icon={faSolarPanel} />
                  </span>
                  Admin panel
                </Link>
              </li>
            </>
          ) : null}
          {/*  */}
        </ul>
        <img className="wave" src="/Images/wave.svg" alt="wave" />
      </aside>
      <main className="main"></main>
    </div>
  );
}

export default Index;
