import React, { useState, useEffect } from "react";
// === Components ===
import ObjectivesList from "./ObjectivesList";
import NewObjectives from "../forms/NewObjectives/NewObjectives";
import { getDataFromLocalStorage } from "../../../../utilities/localStorageConnection";

const BusinessObjectives = () => {
  // Component states
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    // Fetching objective from localstorage
    const fetchData = async () => {
      setDataLoading(true);
      const getAppData = await getDataFromLocalStorage();
      if (getAppData) setData(getAppData);
      setDataLoading(false);
    };
    fetchData();
  }, [showForm]);

  return (
    <div className="tab__body">
      {/* Loading data */}
      <section>
        {dataLoading ? <div className="p-5 text-center">Loading...</div> : null}
      </section>

      {/* Objectives List  */}
      <section>
        {!showForm && !dataLoading ? (
          <ObjectivesList
            data={data}
            setData={setData}
            setShowForm={setShowForm}
          />
        ) : null}
      </section>

      {/* New Objectives Form */}
      <section>
        {showForm && !dataLoading ? (
          <NewObjectives setShowForm={setShowForm} data={data} />
        ) : null}
      </section>
    </div>
  );
};

export default BusinessObjectives;
