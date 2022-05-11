import axios from "axios";

export const getOrganizations = async () => {
  const response = await axios("https://mdsa.bipad.gov.np/api/v1/organization");
  const orgData = await response.data.results;
  console.log("getOrganizations-orgData", orgData);
  return orgData;
};
export const getProjects = async () => {
  const response = await axios("https://mdsa.bipad.gov.np/api/v1/project");
  const projectData = await response.data.results;
  console.log("getProjects-projectData", projectData);
  return projectData;
};
