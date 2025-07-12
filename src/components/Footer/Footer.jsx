import { useState, useEffect } from "react";
import { getFossologyVersion } from "@/services/info";
import { getSessionStorage, setSessionStorage } from "@/shared/storageHelper";

const Footer = () => {
  const [version, setVersion] = useState(
    getSessionStorage("fossologyVersion") || null
  );

  const fetchVersion = () => {
    return getFossologyVersion()
      .then((res) => {
        setSessionStorage("fossologyVersion", res);
        setVersion(res);
        return res;
      })
      .catch(() => null);
  };

  useEffect(() => {
    if (!version) {
      fetchVersion();
    }
  }, []);

  return (
    <footer className="footer" id="footer">
      Version: [{version?.version}], Branch: [{version?.branchName}], Commit: [
      {`#${version?.commitHash}`}] {version?.commitDate} built @{" "}
      {version?.buildDate}
    </footer>
  );
};

export default Footer;