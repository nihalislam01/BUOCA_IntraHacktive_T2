import axios from 'axios';
import {useEffect, useState} from "react";
import {toast} from 'react-hot-toast';
import DetailsPopup from '../DetailsPopup/DetailsPopup';
import EventForm from './EventForm';
import EventTable from './EventTable';
import Chat from '../Chat/Chat';

const eventUrl = `/api/event/events`;

const Event = () => {

  const [events, setEvents] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [isThread, setThread] = useState(false);
  const [referenceId, setReferenceId] = useState(0);

  const [ispopup, setpopup] = useState(false);
  const [description, setdescription] = useState('');

  useEffect(()=>{

    axios.get(eventUrl).then((response)=>{
      setEvents(response.data.events);
    }).catch((error)=>{
        try {
        toast.error(error.response.data.message)
        } catch {
          toast.error("something went wrong")
        }
    })
  }, [])

  const openThread=(id)=>{
    setReferenceId(id);
    setThread(true);
  }

  return (
    <>
      {!isCreate && <EventTable events={events} setIsCreate={setIsCreate} setpopup={setpopup} setdescription={setdescription}/>}
      {isCreate && <EventForm setIsCreate={setIsCreate} />}
      {ispopup && <DetailsPopup title={'Event Description'} content={description} setpopup={setpopup}/>}
      {isThread && <Chat referenceId={referenceId} />}
    </>
  );
};

export default Event;