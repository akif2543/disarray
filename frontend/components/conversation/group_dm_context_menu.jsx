import React, { useRef } from "react";
import { connect } from "react-redux";

import { openModal } from "../../actions/ui_actions";
import { getCurrentConversation } from "../../reducers/selectors";
import { customizeConversation } from "../../actions/conversation_actions";

const GroupDMContextMenu = ({
  c,
  isOwner,
  id,
  modal,
  customize,
  toggleContext,
  setIcon,
}) => {
  const input = useRef(null);

  const handleModal = () => modal({ name: "leave dm", id });

  const handleClick = () => input.current.click();

  const { icon } = c;

  const handleRemove = () => {
    setIcon({ url: null, file: null });
    input.current.value = "";
    const formData = new FormData();
    formData.append("conversation[icon]", null);
    customize(id, formData).then(toggleContext());
  };

  const handleIcon = (e) => {
    const reader = new FileReader();
    const [file] = e.currentTarget.files;
    reader.onloadend = () => {
      setIcon({ url: reader.result, file });
      const formData = new FormData();
      formData.append("conversation[icon]", file);
      input.current.value = "";
      customize(id, formData).then(toggleContext());
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setIcon({ url: icon, file: null });
    }
  };

  return (
    <>
      {isOwner && (
        <>
          <input
            type="file"
            id="edit-dm-icon"
            onChange={handleIcon}
            accept=".jpg,.jpeg,.png,.gif"
            style={{ display: "none" }}
            ref={input}
          />
          <button type="button" onClick={handleClick}>
            Change Icon
          </button>
          {icon && (
            <button type="button" onClick={handleRemove}>
              Remove Icon
            </button>
          )}
          <div className="menu-divider" />
        </>
      )}
      <button type="button" className="red" onClick={handleModal}>
        Leave Group
      </button>
    </>
  );
};

const mSTP = (state, ownProps) => ({
  c: getCurrentConversation(state, ownProps),
});

const mDTP = (dispatch) => ({
  modal: (m) => dispatch(openModal(m)),
  customize: (id, convo) => dispatch(customizeConversation(id, convo)),
});

const GroupDMContextMenuContainer = connect(mSTP, mDTP)(GroupDMContextMenu);

export default GroupDMContextMenuContainer;
