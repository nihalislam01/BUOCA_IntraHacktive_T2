import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import FormInput from "../../common/components/FormInput/FormInput";

const eventUrl = `/api/event/events`;

const eventInputs = [
    {
        id: "nameInput",
        name: "name",
        type: "text",
        label: "Event Name",
    },
    {
      id: "clubInput",
      name: "club",
      type: "text",
      label: "Club"
    },
    {
      id: "eventDateInput",
      name: "eventDate",
      type: "date",
      label: "Event Date"
  },
  ];

function EventForm({setIsCreate}) {

    const [formValues, setFormValues] = useState({
        name: "",
        club: "",
        eventDate: "",
        description: "",
      });

    const onChangeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const handleDescriptionChange = e => {
        setFormValues((prevValues) => ({...prevValues, description: e.target.value,}));
      };
    
    const onFormSubmit = e => {
        e.preventDefault();
        let hasError = !Object.values(formValues).every(value => value.trim().length !== 0);
    
        if (hasError) {
            toast.error("Fill all the fields");
            return;
        }
    
        axios.post(eventUrl, {
          ...formValues
        }).then((response) => {
            setIsCreate(false);
            toast.success("New Event Requested")
            console.log("we good");
        }).catch((error) => {
            try {
                toast.error(error.response.data.message);
            } catch {
                toast.error("Something went wrong");
            }
            setIsCreate(false);
        });
      }
      const cancel = () => {
        setIsCreate(false);
    }
    return (
        <>
            <h2>Create Event</h2>
            <hr />
            <div>
                {eventInputs.map(e => (
                    <FormInput key={e.id} onChange={onChangeHandler} {...e}/>
                ))}
                <label htmlFor="descriptionInput" className="form-label">Event Description</label>
                <textarea id="descriptionInput" type="text" name="description" className="form-control"  onChange={handleDescriptionChange} />

                <button type="submit" className={`btn btn-primary mt-2`} onClick={onFormSubmit}>Create</button>
                <button className={`btn btn-secondary mt-2 mx-2`} onClick={cancel}>Cancel</button>
            </div>
        </>
    )
}

export default EventForm;