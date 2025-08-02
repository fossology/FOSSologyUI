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
    <footer className="w-full bg-neutral-300 text-gray-900 text-xs px-4 py-3">
      <div className="max-w-screen-xl mx-auto text-center">
        Version: [{version?.version}], Branch: [{version?.branchName}], Commit: [#{version?.commitHash}]{" "}
        {version?.commitDate} built @ {version?.buildDate}
      </div>
    </footer>
  );
};

export default Footer;