"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  Navbar,
  Nav,
  NavDropdown,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { QuestionCircleFill, PersonCircle } from "react-bootstrap-icons";

// Services
import { getAllGroups } from "@/services/groups";

// Widgets
import TextIcon from "@/components/Widgets/TextIcon";

// Constants
import routes from "@/constants/routes";
import externalLinks from "@/constants/externalLinks";

// Helpers
import { logout, isAuth, getUserName, isAdmin } from "@/shared/authHelper";
import { getLocalStorage, setLocalStorage } from "@/shared/storageHelper";
import { getNameInitials } from "@/shared/helper";

// Styles
import "./Header.module.css";

const Header = () => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const defaultGroup =
      getLocalStorage("currentGroup") ||
      getLocalStorage("user")?.default_group;
    setCurrentGroup(defaultGroup);
  }, []);

  const handleLogin = () => {
    router.push(routes.home);
  };

  const handleGroupChange = (e) => {
    const selected = e.target.innerText;
    setLocalStorage("currentGroup", selected);
    setCurrentGroup(selected);
  };

  return (
    <Navbar
      expand="lg"
      className="bg-primary-color py-0 pl-0 text-white"
      sticky="top"
    >
      <Navbar.Brand as={Link} href={routes.home} className="py-0">
        <Image
          src="/assets/images/logo.svg"
          width={120}
          height={40}
          alt="FOSSology"
          className="img-fluid bg-white py-1 px-2"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            as={Link}
            href={routes.home}
            className={pathname === routes.home ? "active-nav-item" : ""}
          >
            Home
          </Nav.Link>

          {isAuth() && (
            <>
              <Nav.Link
                as={Link}
                href={routes.search}
                className={pathname === routes.search ? "active-nav-item" : ""}
              >
                Search
              </Nav.Link>
              <Nav.Link
                as={Link}
                href={routes.browse}
                className={pathname === routes.browse ? "active-nav-item" : ""}
              >
                Browse
              </Nav.Link>

              {/* Upload Dropdown */}
              <NavDropdown title="Upload" id="uploads">
                <NavDropdown.Item as={Link} href={routes.upload.file}>
                  From File
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href={routes.upload.server}>
                  From Server
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href={routes.upload.url}>
                  From URL
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href={routes.upload.vcs}>
                  From VCS
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href={routes.upload.importReport}>
                  Import Report
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href={routes.upload.instructions}>
                  Instructions
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href={routes.upload.oneShotAnalysis}>
                  One-Shot Analysis
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href={routes.upload.oneShotCopyright}>
                  One-Shot Copyright/Email/URL
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href={routes.upload.oneShotMonk}>
                  One-Shot Monk
                </NavDropdown.Item>
              </NavDropdown>

              {/* Jobs Dropdown */}
              <NavDropdown title="Jobs" id="jobs">
                <NavDropdown.Item as={Link} href={routes.jobs.myRecentJobs}>
                  My Recent Jobs
                </NavDropdown.Item>
                {isAdmin() && (
                  <NavDropdown.Item as={Link} href={routes.jobs.allRecentJobs}>
                    All Recent Jobs
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} href={routes.jobs.scheduleAgents}>
                  Schedule Agents
                </NavDropdown.Item>
              </NavDropdown>

              {/* Organize Dropdown */}
              <NavDropdown title="Organize" id="organize">
                <DropdownButton
                  variant=""
                  drop="right"
                  title="Folders"
                  className="font-regular dropdown-item-bottom w-100"
                >
                  <div className="bg-secondaryColor text-white font-12 py-2">
                    <NavDropdown.Item as={Link} href={routes.organize.folders.create}>
                      Create
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href={routes.organize.folders.delete}>
                      Delete Folder
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href={routes.organize.folders.edit}>
                      Edit Properties
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href={routes.organize.folders.move}>
                      Move or Copy
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href={routes.organize.folders.unlinkContent}>
                      Unlink Content
                    </NavDropdown.Item>
                  </div>
                </DropdownButton>
                <NavDropdown.Item as={Link} href={routes.organize.licenses.candidate}>
                  Licenses
                </NavDropdown.Item>
                <DropdownButton
                  variant=""
                  drop="right"
                  title="Uploads"
                  className="font-regular dropdown-item-bottom w-100"
                >
                  <div className="bg-secondaryColor text-white font-12 py-2">
                    <NavDropdown.Item as={Link} href={routes.organize.uploads.delete}>
                      Delete Uploaded File
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href={routes.organize.uploads.edit}>
                      Edit Properties
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href={routes.organize.uploads.move}>
                      Move or Copy
                    </NavDropdown.Item>
                  </div>
                </DropdownButton>
              </NavDropdown>

              {/* Admin */}
              {isAdmin() && (
                <NavDropdown title="Admin" id="admin">
                  <DropdownButton
                    variant=""
                    drop="right"
                    title="Groups"
                    className="font-regular dropdown-item-bottom w-100"
                  >
                    <div className="bg-secondaryColor text-white font-12 py-2">
                      <NavDropdown.Item as={Link} href={routes.admin.group.create}>
                        Add Group
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} href={routes.admin.group.delete}>
                        Delete Group
                      </NavDropdown.Item>
                    </div>
                  </DropdownButton>
                  <DropdownButton
                    variant=""
                    drop="right"
                    title="Users"
                    className="font-regular dropdown-item-bottom w-100"
                  >
                    <div className="bg-secondaryColor text-white font-12">
                      <NavDropdown.Item as={Link} href={routes.admin.users.add}>
                        Add User
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} href={routes.admin.users.edit}>
                        Edit User Account
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} href={routes.admin.users.delete}>
                        Delete User
                      </NavDropdown.Item>
                    </div>
                  </DropdownButton>
                  <DropdownButton
                    variant=""
                    drop="right"
                    title="License Administration"
                    className="font-regular dropdown-item-bottom w-100"
                  >
                    <div className="bg-secondaryColor text-white font-12 py-2">
                      <NavDropdown.Item as={Link} href={routes.admin.license.create}>
                        Add License
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href={routes.admin.license.licenseCSV}
                        download
                      >
                        CSV Export
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} href={routes.admin.license.selectLicense}>
                        Select License
                      </NavDropdown.Item>
                    </div>
                  </DropdownButton>
                  <NavDropdown.Item as={Link} href={routes.admin.mantainance}>
                    Mantainance
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </>
          )}
        </Nav>

        {/* Right side icons */}
        <div className="navIcons" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Help */}
          <Dropdown drop="down" align="end">
            <Dropdown.Toggle variant="link" bsPrefix="p-0">
              <QuestionCircleFill color="#fff" size={40} className="m-2" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} href={routes.help.about}>About</Dropdown.Item>
              <Dropdown.Item as={Link} href={routes.help.overview}>Getting Started</Dropdown.Item>
              <Dropdown.Item as={Link} href={routes.help.licenseBrowser}>License Browser</Dropdown.Item>
              <Dropdown.Item
                href={externalLinks.fossologyWiki}
                target="_blank"
                rel="noreferrer"
              >
                Documentation
              </Dropdown.Item>
              <Dropdown.Item as={Link} href={routes.help.thirdPartyLicenses}>
                Third Party Licenses
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Group selection */}
          {getAllGroups() && (
            <Dropdown drop="down" align="end">
              <Dropdown.Toggle variant="link" bsPrefix="p-0">
                <TextIcon className="m-2" text={getNameInitials(currentGroup)} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {getAllGroups().map((group) => (
                  <Dropdown.Item
                    key={group.id}
                    onClick={handleGroupChange}
                    className={group.name === currentGroup ? "active" : ""}
                  >
                    {group.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}

          {/* User Info */}
          <Dropdown drop="down" align="end">
            <Dropdown.Toggle variant="link" bsPrefix="p-0">
              <PersonCircle color="#fff" size={40} className="m-2" />
            </Dropdown.Toggle>
            {isAuth() ? (
              <Dropdown.Menu>
                <Dropdown.Item>
                  User: <b>{getUserName()}</b>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => logout(null)}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            ) : (
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogin}>Log in</Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
