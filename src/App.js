import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { getOrganizations, getProjects } from "./GetData";
import "./App.css";

function App() {
  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);
  console.log("organizations", organizations);
  console.log("projects", projects);
  useEffect(() => {
    getOrganizations().then((orgData) => setOrganizations(orgData));
    getProjects().then((projectData) => setProjects(projectData));
  }, []);

  const orgData = organizations.filter((org) =>
    projects.some((proj) => org.oid === proj.oid)
  );
  console.log("App-orgData", orgData);

  const pieData = orgData.map((data) => ({
    name: data.oname,
    value: data.oid,
  }));

  const hexColorList = pieData.map(
    (data) => `#${Math.random().toString(16).substring(2, 8)}`
  );
  console.log("randomHexColor", hexColorList);

  return (
    <div className="App">
      <h1>Pie-Chart</h1>
      <div className="pie-chart">
        <PieChart width={800} height={600}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={200}
            paddingAngle={3}
            dataKey="value"
            label
          >
            {pieData.map((data, index) => (
              <Cell
                key={`cell-${index}`}
                fill={hexColorList[index % hexColorList.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <h2>List of Organization's with Project's</h2>
      <div>
        <ol className="org-list">
          {orgData.map((org, index) => (
            <li key={index}>{org.oname}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
