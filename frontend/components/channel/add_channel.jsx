import React, { useState } from "react";

const AddChannel = ({
  createChannel,
  closeModal,
  serverId,
  history: { push },
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const formatName = (input) => input.replace(" ", "-").toLowerCase();

  const handleChange = (e) => setName(formatName(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    if (name.length) {
      createChannel({ name, server_id: serverId }).then((action) => {
        const [c] = Object.keys(action.channel);
        push(`/channels/${serverId}/${c}`);
      });
    } else {
      setError(true);
    }
  };

  return (
    <form className="new-channel-form" onSubmit={handleSubmit}>
      <header>
        <h4>CREATE TEXT CHANNEL</h4>
      </header>
      <label htmlFor="channel-name">
        <h5>CHANNEL NAME</h5>
        <input type="text" value={name} onChange={handleChange} />
        {error && <span className="err-msg">This field is required</span>}
      </label>
      <footer>
        <button type="button" onClick={closeModal} className="cancel">
          Cancel
        </button>
        <button type="submit" className="create">
          Create Channel
        </button>
      </footer>
    </form>
  );
};

export default AddChannel;
