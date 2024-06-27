import React, { useEffect, useState } from "react";
//import { useOutletContext} from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import SingleClient from "../components/SingleClient";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Clients() {
  const URL_API = "http://localhost:3000";
  const [jsonClientList, setJsonClientList] = useState();
  const [clientList, setClientList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [searchClientId, setSearchClientId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  useEffect(() => {
    (async () => await fetchClients())();
  }, []);

  //to update the names of the properties in the filter properly
  useEffect(() => {
    if (searchTerm == "" && searchClientId == "") {
      setClientList(jsonClientList);
    } else {
      setClientList(
        jsonClientList
          .filter((client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((client) =>
            searchClientId ? client.id.toString() === searchClientId : true
          )
      );
    }
  }, [searchTerm, searchClientId]);
  const fetchClients = async () => {
    try {
      const response = await fetch(`${URL_API}/users`);
      if (!response.ok) {
        throw Error("Did not received expected data");
      }
      const result = await response.json();
      setJsonClientList(result);
      setClientList(result);
    } catch (err) {
      console.log("there was an error");
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function randomSort(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    function sortClients() {
      switch (sort) {
        case "serial":
          //to check hwo the id is writen in the object
          const serialSort = jsonClientList.sort((a, b) => a.id - b.id);
          setClientList([...serialSort]);
          break;
        case "alphabetical":
          //to check hwo the id is writen in the object
          const alphabeticalSort = jsonClientList.sort((a, b) =>
            a.name.localeCompare(b.title)
          );
          console.log(alphabeticalSort);
          setClientList([...alphabeticalSort]);
          break;
        case "execute":
          const executeSort = jsonClientList.sort(
            (a, b) => a.completed - b.completed
          );
          console.log(executeSort);
          setClientList([...executeSort]);
          break;
        case "random":
          setClientList(randomSort([...jsonClientList]));
          break;
      }
    }
    sortClients();
  }, [sort]);

  function clearHandler() {
    setSearchTerm("");
    setSearchPostId("");
  }

  return (
    <>
      {isLoading && <Loading />}
      {fetchError && <Error message={fetchError} />}
      <InputLabel id="sort-by">מיון עפ"י</InputLabel>
      <Select
        labelId="sort-by"
        id="sort-by"
        value={sort}
        label="Age"
        onChange={(e) => setSort(e.target.value)}
      >
        <MenuItem value="serial">Ten</MenuItem>
        <MenuItem value="execute">Twenty</MenuItem>
        <MenuItem value="alphabetical">Thirty</MenuItem>
        <MenuItem value="random">Thirty</MenuItem>
      </Select>

      {/* <label className="sortBy" htmlFor="sort">
          Sort by:{" "}
        </label>
        <select id="sort" onChange={(e) => setSort(e.target.value)}>
          <option value="serial">Serial</option>
          <option value="execute">Execution</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select> */}

      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="הכנס שם לקוח לחיפוש"
      />
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        value={searchClientId}
        onChange={(e) => setSearchPostId(e.target.value)}
        placeholder="הכנס ת.ז. לחיפוש"
      />
      {!isLoading &&
        !fetchError &&
        clientList.map((client, key) => {
          return (
            <SingleClient
              client={client}
              clientList={clientList}
              setClientList={setClientList}
              key={client.id}
            />
          );
        })}
    </>
  );
}

export default Clients;
