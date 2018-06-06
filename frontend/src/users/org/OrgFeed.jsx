import React, { Component } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Modal from "react-modal";

import "../../CSS/orgFeed.css";
import AcceptedPings from "./AcceptedPings";
import DeclinedPings from "./DeclinedPings";
import PendingPings from "./PendingPings";

Modal.setAppElement('#root')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class OrgFeed extends Component {
  constructor() {
    super();
  
    this.state = {
      pings: [],
      selectedId: "",
      message: "",
      accepted: [],
      pending: [],
      declined: []
   }

   this.openModal = this.openModal.bind(this);
   this.afterOpenModal = this.afterOpenModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
  }

  // ---------- Modal functions ---------- //
	openModal() {
    this.setState({ modalIsOpen: true });
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
	}
	// -------- End Modal functions -------- //

  componentDidMount() {
    this.getPings()
  }
  
  componentDidUpdate() {
    
  }

  getPings = () => {
    axios
      .get("/users/getPingsSentToOrg")
      .then(res => {
        let accepted = [];
        let pending = [];
        let declined = [];
        res.data.map(ping => {
          if (ping.accepted === true) {
            accepted.push(ping)
          } else if (ping.accepted === false) {
            declined.push(ping)
          } else {
            pending.push(ping)
          }
        })
        
        this.setState({
          pings: res.data,
          accepted: accepted,
          declined: declined,
          pending: pending
        })
      })
      .catch(err => {
        this.setState({
          message: "No ping requests found."
        })
      })
  }

  
  handleAcceptPing = (e) => {
    axios
      .put("/users/acceptPing", {
        pingId: e.target.id
      })
      .then(() => {
        this.setState({
          selectedId: "",
          message: "You've accepted this volunteer."
        })
      })
      .then( 
        this.getPings() 
      )
      .catch(err => {
        this.setState({ 
          message: "Couldn't accept this volunteer." 
        })
      })
  }

  handleDeclinePing = (e) => {
    axios
      .put("/users/declinePing", {
        pingId: e.target.id
      })
      .then(() => {
        this.setState({
          selectedId: "",
          message: "You've accepted this volunteer."
        })
      })
      .then(
        this.getPings()
      )
      .catch(err => {
        this.setState({ 
          message: "Couldn't decline this volunteer." 
        })
      })
  }

  renderAccepted = () => {
    return <AcceptedPings
              accepted={this.state.accepted}
              handleDeclinePing={this.handleDeclinePing} />
  }
  renderPending = () => {
    return <PendingPings
              pending={this.state.pending}
              handleAcceptPing={this.handleAcceptPing}
              handleDeclinePing={this.handleDeclinePing} />
  }
  renderDeclined = () => {
    return <DeclinedPings
              declined={this.state.declined} />
  }

  render() {
    const { pings, selectedId, accepted, declined, pending } = this.state;
    console.log(this.state)

    return (
      <div className="org-feed-parent">
        <Tabs className="tabs">
          <TabList className="tab-list">
            <Tab className="single-tab header">Accepted</Tab>
            <Tab className="single-tab header">Pending</Tab>
          </TabList>

          <TabPanel className="tab-panel">
            {accepted[0] ? (
              <div className="org-feed-pings-div">
                { this.renderAccepted() }
              </div>
              ) :
              <h3>No volunteers accepted yet.</h3> }
          </TabPanel>

          <TabPanel className="tab-panel">
            {pending[0] ? (
              <div className="org-feed-pings-div">
                { this.renderPending() }
              </div>
              ) : 
              <h3>No pending requests from volunteers.</h3>}
          </TabPanel>
        </Tabs>

        {/* <div>
					<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						style={customStyles}
						contentLabel="Org Pings Modal"
					>
						<button onClick={this.closeModal}>&#10005;</button>
					</Modal>
      	</div> */}
      </div>
    )
  }
}