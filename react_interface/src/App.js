import {BiCalendar} from "react-icons/bi"
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointments";
// passing data to component
import AppointmentInfo from "./components/AppointmentInfo";

// to read data from a outside server to following hooks are imported
// useEffect - to perform side effects ,mount unmount update componets, data searching operations,
//             manually changing the DOM with certain component
import {useState, useEffect, useCallback} from 'react';


function App() {

  let [appointmentList,setAppointmentList] = useState([]) // initialize to empty array

  // read data from server
  const fetchData = useCallback(() => {
    // pass url note difference here eventhough in different folder
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      setAppointmentList(data)
    });
  },[])

  // useEffect to track the fetching data
  useEffect(() => {fetchData()},[fetchData])

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mt-3 mb-3">
        <BiCalendar className="inline-block text-red-400 align-top"/>
        Appointment App
      </h1>
      <AddAppointment/>
      <Search/>
      <ul className="divide-y divide-gray-290">
        {appointmentList
          .map(appointment => (
            <AppointmentInfo key={appointment.id}
              appointment={appointment}/>
          ))
        }
      </ul>


    </div>
  );
}

export default App;
