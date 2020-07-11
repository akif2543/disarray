import { closeModal } from "../../actions/ui_actions";
import DeleteAccount from "./delete_account";

const { connect } = require("react-redux");

const { getCurrentUser } = require("../../reducers/selectors");
const { deleteUser } = require("../../actions/session_actions");

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
  serverError: state.errors.session,
});

const mDTP = (dispatch) => ({
  deleteUser: (id) => dispatch(deleteUser(id)),
  closeModal: () => dispatch(closeModal()),
});

const DeleteAccountContainer = connect(mSTP, mDTP)(DeleteAccount);

export default DeleteAccountContainer;
