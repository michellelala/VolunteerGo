// import React, { Component } from "react";
// import GoogleApiComponent from "google-maps-react/dist/GoogleApiComponent";
// import google from "google-maps-react";

// let marker = new google.maps.Marker({
//   position: somePosition,
//   map: map
// })

// export default class Marker extends React {
//   componentDidUpdate(prevProps) {
//     // If the relevant props have changed
//     if ((this.props.map !== prevProps.map) ||
//        (this.props.position !== prevProps.position)) {
//          this.renderMarker();
//     }
//   }

//   renderMarker() {
//     let { map, google, position, mapCenter } = this.props;
//     let pos = position || mapCenter;
//     position = new google.maps.LatLng(pos.lat, pos.lng);

//     const pref = {
//       map: map,
//       position: position
//     }
//     this.marker = new google.maps.Marker(pref);

//     const eventNames = ["click", "mouseover"];
//     eventNames.forEach(e => {
//       this.marker.addListener(e, this.handleEvent(e))
//     })
//   }

//   handleEvent = (eventName) => {
//     return (e) => {
//       const eventName = `on${camelize(event)}`
//       if (this.props[eventName]) {
//         this.props[eventName](this.props, this.marker, e)
//       }
//     }
//   }

//   render() {
//     return null;
//   }
// }

// Marker.propTypes = {
//   position: React.PropTypes.object,
//   map: React.PropTypes.object
// }